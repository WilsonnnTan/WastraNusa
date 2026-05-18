import { convert } from 'html-to-text';
import { NextResponse } from 'next/server';

const BOILERPLATE_SECTION_TITLES = new Set([
  'references',
  'see also',
  'external links',
  'further reading',
  'notes',
  'footnotes',
  'citations',
  'sources',
  'bibliography',
  'weblinks',
  'links',
  'references and sources',
  'external references',
]);

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

    const ALLOWED_ORIGINS = new Set([
      'https://en.wikipedia.org',
      'https://id.wikipedia.org',
      'https://commons.wikimedia.org',
    ]);

    let safeOrigin: string;
    try {
      const parsedOrigin = new URL(origin);
      if (
        (parsedOrigin.protocol !== 'https:' &&
          parsedOrigin.protocol !== 'http:') ||
        !ALLOWED_ORIGINS.has(parsedOrigin.origin)
      ) {
        return NextResponse.json({ error: 'Invalid origin' }, { status: 400 });
      }
      safeOrigin = parsedOrigin.origin;
    } catch {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 400 });
    }

    const enc = encodeURIComponent(title);
    const ua =
      'WastraNusa/1.0 (wastranusa.example; contact: dev@wastranusa.example)';

    // 1) get section list via action=parse&prop=sections
    const sectionsUrl = `${safeOrigin}/w/api.php?action=parse&page=${enc}&prop=sections&format=json`;
    const secRes = await fetch(sectionsUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': ua,
        Referer: safeOrigin,
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

    // helper to strip HTML
    const stripHtml = (html?: string) => {
      const text = convert(html ?? '', {
        wordwrap: false,
        selectors: [{ selector: 'a', options: { ignoreHref: true } }],
      });
      return text
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');

      // Strip Wikipedia-specific artifacts
      return (
        decoded
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
          // Broken-ref error fragments that appear without the prefix above,
          // e.g. "tidak ditemukan teks untuk ref bernama :2"
          .replace(/tidak ditemukan teks untuk ref bernama\s*:\S*/gi, '')
          .replace(/ref name not found\s*:\S*/gi, '')
          .replace(/,?\s*hlm\.\s*[\d\u00a0\s\u2013\-]+/g, '')
          // Hatnote cross-references injected by MediaWiki (e.g. "Lihat pula: Sejarah batik di Indonesia")
          .replace(/^Lihat pula:\s*[^.!?]*[.!?]?\s*/i, '')
          .replace(/^See also:\s*[^.!?]*[.!?]?\s*/i, '')
          .replace(/^Untuk.*?lihat\s+[^.]+\.\s*/i, '')
          .replace(/\s+/g, ' ')
          .trim()
      );
    };

    // For each section, fetch its HTML via action=parse&section=index&prop=text
    const outSections: Array<{ title: string; content: string }> = [];
    for (const s of sections) {
      const idx = s.index;
      if (typeof idx === 'undefined') continue;
      const secHtmlUrl = `${safeOrigin}/w/api.php?action=parse&page=${enc}&section=${idx}&prop=text&format=json`;
      try {
        const r = await fetch(secHtmlUrl, {
          headers: {
            Accept: 'application/json',
            'User-Agent': ua,
            Referer: safeOrigin,
          },
        });
        if (!r.ok) continue;
        const t = await r.text();
        const j = t ? JSON.parse(t) : {};
        const rawHtml = j.parse?.text?.['*'] ?? '';
        const titleClean = stripHtml(s.line);

        // Skip boilerplate sections (References, See Also, External Links, etc.)
        if (BOILERPLATE_SECTION_TITLES.has(titleClean.toLowerCase())) continue;

        let contentClean = stripHtml(rawHtml);

        // MediaWiki embeds the section heading inside the HTML, so after
        // tag-stripping the title appears verbatim at the start of the content.
        // Remove it to avoid duplication.
        if (
          titleClean &&
          contentClean.toLowerCase().startsWith(titleClean.toLowerCase())
        ) {
          contentClean = contentClean.slice(titleClean.length).trimStart();
        }

        // Skip sections whose content is empty after cleaning
        if (!contentClean) continue;

        let imageURL: string | undefined;
        const imgMatch = /<img[^>]+src\s*=\s*"([^"]+)"/i.exec(rawHtml);
        if (imgMatch && imgMatch[1]) {
          let src = imgMatch[1];
          if (src.startsWith('//')) src = 'https:' + src;
          else if (src.startsWith('/')) src = safeOrigin + src;
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
