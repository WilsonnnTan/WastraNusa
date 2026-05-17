import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const origin = searchParams.get('origin');
    const title = searchParams.get('title');
    if (!origin || !title) {
      return NextResponse.json(
        { error: 'Missing origin or title' },
        { status: 400 },
      );
    }
    const enc = encodeURIComponent(title);
    const ua =
      'WastraNusa/1.0 (wastranusa.example; contact: dev@wastranusa.example)';

    // 1) get section list via action=parse&prop=sections
    const sectionsUrl = `${origin}/w/api.php?action=parse&page=${enc}&prop=sections&format=json`;
    const secRes = await fetch(sectionsUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': ua,
        Referer: origin,
      },
    });

    const secText = await secRes.text();
    if (!secRes.ok) {
      return new Response(secText, {
        status: secRes.status,
        headers: {
          'Content-Type':
            secRes.headers.get('content-type') ?? 'application/json',
        },
      });
    }

    interface WikiApiResponse {
      parse?: {
        sections?: Array<{ index?: string | number; line?: string }>;
        text?: { '*'?: string };
      };
    }

    let secJson: WikiApiResponse;
    try {
      secJson = secText ? JSON.parse(secText) : {};
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON from wiki' },
        { status: 502 },
      );
    }

    const sections = secJson.parse?.sections ?? [];

    // Section titles that are pure boilerplate — skip them entirely
    const BOILERPLATE_SECTION_TITLES = new Set([
      'referensi',
      'references',
      'reference',
      'catatan',
      'catatan kaki',
      'notes',
      'footnotes',
      'lihat pula',
      'see also',
      'pranala luar',
      'external links',
      'external link',
      'daftar pustaka',
      'bibliography',
      'bacaan lebih lanjut',
      'further reading',
      'sumber',
      'sources',
      'bibliografi',
    ]);

    // helper to strip HTML and remove Wikipedia-specific artifacts
    const stripHtml = (html?: string) => {
      if (!html) return '';

      // Remove script and style blocks — loop until no more matches to prevent
      // bypass via nested or malformed tags (fixes CodeQL incomplete-sanitization).
      const SCRIPT_RE = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
      const STYLE_RE = /<style[\s\S]*?>[\s\S]*?<\/style>/gi;
      let sanitized = html;
      let prev: string;
      do {
        prev = sanitized;
        sanitized = sanitized.replace(SCRIPT_RE, '').replace(STYLE_RE, '');
      } while (sanitized !== prev);

      const withoutTags = sanitized.replace(/<[^>]+>/g, '');

      // Decode named/numeric HTML entities.
      // &amp; is decoded LAST so that encoded sequences like &amp;lt; are never
      // converted into raw '<', which would re-introduce injection vectors
      // (fixes CodeQL double-escaping/unescaping).
      const decoded = withoutTags
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');

      // Strip Wikipedia-specific artifacts
      return decoded
        .replace(/\[sunting\s*\|\s*sunting sumber\]/gi, '')
        .replace(/\[edit\s*\|\s*edit source\]/gi, '')
        .replace(/\[\d+\]/g, '')
        .replace(/\[[a-z]\]/gi, '')
        .replace(/\[lower-alpha\]/gi, '')
        .replace(/\[upper-alpha\]/gi, '')
        .replace(/\[note\s*\d*\]/gi, '')
        .replace(/code:\s*\S+\s+is\s+deprecated/gi, '')
        .replace(/\^[^\n]*/g, '')
        .replace(/Kesalahan pengutipan:[^\n]*/g, '')
        .replace(/,?\s*hlm\.\s*[\d\u00a0\s–\-]+/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    // For each section, fetch its HTML via action=parse&section=index&prop=text
    const outSections: Array<{ title: string; content: string }> = [];
    for (const s of sections) {
      const idx = s.index;
      if (typeof idx === 'undefined') continue;
      const secHtmlUrl = `${origin}/w/api.php?action=parse&page=${enc}&section=${idx}&prop=text&format=json`;
      try {
        const r = await fetch(secHtmlUrl, {
          headers: {
            Accept: 'application/json',
            'User-Agent': ua,
            Referer: origin,
          },
        });
        if (!r.ok) continue;
        const t = await r.text();
        const j = t ? JSON.parse(t) : {};
        const rawHtml = j.parse?.text?.['*'] ?? '';
        const titleClean = stripHtml(s.line);

        // Skip boilerplate sections (References, See Also, External Links, etc.)
        if (BOILERPLATE_SECTION_TITLES.has(titleClean.toLowerCase())) continue;

        const contentClean = stripHtml(rawHtml);

        // Skip sections whose content is empty after cleaning
        if (!contentClean) continue;

        // try to extract first image src from HTML
        let imageURL: string | undefined;
        const imgMatch = /<img[^>]+src\s*=\s*"([^"]+)"/i.exec(rawHtml);
        if (imgMatch && imgMatch[1]) {
          let src = imgMatch[1];
          if (src.startsWith('//')) src = 'https:' + src;
          else if (src.startsWith('/')) src = origin + src;
          imageURL = src;
        }
        outSections.push({
          title: titleClean,
          content: contentClean,
          ...(imageURL ? { imageURL } : {}),
        });
      } catch (e) {
        // ignore individual section failures

        console.debug('section fetch fail', e);
      }
    }

    return NextResponse.json({ sections: outSections });
  } catch (err) {
    // generic server error
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
