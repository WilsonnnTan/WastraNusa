/**
 * State machine-based HTML parser for secure parsing
 * Replaces unsafe regex-based HTML parsing
 */

export class HTMLStateMachineParser {
  private static readonly ENTITIES: Record<string, string> = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&amp;': '&',
    '&#91;': '[',
    '&#93;': ']',
  };

  /**
   * Clean up Wikipedia-specific artifacts and extra whitespace
   */
  private static cleanWikipediaArtifacts(text: string): string {
    let cleaned = text;

    // Remove Wikipedia markers: [ sunting | sunting sumber ], [ edit | edit source ]
    cleaned = cleaned.replace(
      /\[\s*(?:sunting|edit)\s*\|\s*sunting\s+sumber\s*\]/gi,
      '',
    );
    cleaned = cleaned.replace(/\[\s*edit\s*\|\s*edit\s+source\s*\]/gi, '');

    // Remove reference numbers: [1], [2], etc
    cleaned = cleaned.replace(/\[\s*\d+\s*\]/g, '');

    // Remove citation error messages
    cleaned = cleaned.replace(/Kesalahan pengutipan:.*?(?:\n|$)/gi, '');
    cleaned = cleaned.replace(/Tanda\s+<ref>.*?ref\s+bernama.*?$/gim, '');

    // Remove reference lines starting with ^ (caret marker) - Wikipedia citation references
    cleaned = cleaned.replace(/^\s*\^\s+.+$/gm, '');

    // Remove "tidak ditemukan teks untuk ref" error messages
    cleaned = cleaned.replace(
      /tidak\s+ditemukan\s+teks\s+untuk\s+ref\s+bernama[^\n]*/gi,
      '',
    );

    // Remove .mw-parser-output CSS blocks specifically
    cleaned = cleaned.replace(
      /\.mw-parser-output\s+[.\w\-:,\s()>\[="'#~+]+\{[^}]*\}/g,
      '',
    );

    // Remove @media rules
    cleaned = cleaned.replace(/@media\s+[^{]*\{[^}]*\}/gi, '');

    // Remove body:not(...) CSS selectors and similar
    cleaned = cleaned.replace(
      /body:\s*not\([^)]*\)(?:\s*:\s*not\([^)]*\))*(?:\s+\.mw-parser-output[^{]*)?/gi,
      '',
    );
    cleaned = cleaned.replace(/body:not\([^)]*\)[^{]*\{[^}]*\}/g, '');

    // Remove CSS class selectors
    cleaned = cleaned.replace(/\.\w+[\w\-]*\s*\{[^}]*\}/g, '');

    // Remove CSS properties (but avoid false positives like "Dewi.")
    cleaned = cleaned.replace(
      /(?:background|padding|margin|border|display|color|font|width|height|position)[\w\-]*:\s*[^;,\s}]+/gi,
      '',
    );

    // Remove CSS measurements
    cleaned = cleaned.replace(/\s+[\d.]+(?:em|px|%|rem)/g, ' ');

    // Remove double braces
    cleaned = cleaned.replace(/\}\}/g, '');

    // Clean up blank lines and excessive whitespace
    cleaned = cleaned.replace(/\n\s*\n/g, '\n'); // Remove blank lines
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  }

  /**
   * Escape a string for safe use in RegExp constructors
   */
  private static escapeRegExp(literal: string): string {
    return literal.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private static decodeAllEntities(text: string): string {
    let result = text;

    // First decode named entities
    for (const [entity, char] of Object.entries(this.ENTITIES)) {
      result = result.replace(new RegExp(this.escapeRegExp(entity), 'g'), char);
    }

    // Then decode numeric entities: &#123; or &#x1F;
    result = result.replace(/&#(\d+);/g, (_, code) => {
      const num = parseInt(code, 10);
      return num > 0 && num < 1114112 ? String.fromCodePoint(num) : '';
    });

    result = result.replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      const num = parseInt(code, 16);
      return num > 0 && num < 1114112 ? String.fromCodePoint(num) : '';
    });

    return result;
  }

  static extractText(html: string): string {
    const replaceUntilStable = (input: string, pattern: RegExp, replacement: string): string => {
      let previous: string;
      let current = input;
      do {
        previous = current;
        current = current.replace(pattern, replacement);
      } while (current !== previous);
      return current;
    };

    // Pre-cleanup: remove style tags and their content before processing
    let cleaned = replaceUntilStable(
      html,
      /<style\b[^>]*>[\s\S]*?<\/\s*style(?:\s[^>]*)?>/gi,
      '',
    );

    // Remove script tags
    cleaned = replaceUntilStable(
      cleaned,
      /<script\b[^>]*>[\s\S]*?<\/\s*script(?:\s[^>]*)?>/gi,
      '',
    );

    const text: string[] = [];

    let i = 0;
    let textBuffer = '';

    while (i < cleaned.length) {
      // Skip tags
      if (cleaned[i] === '<') {
        if (textBuffer.trim()) {
          text.push(textBuffer.trim());
          textBuffer = '';
        }
        // Find end of tag
        const tagEnd = cleaned.indexOf('>', i);
        if (tagEnd !== -1) {
          i = tagEnd + 1;
          continue;
        }
      }

      textBuffer += cleaned[i];
      i++;
    }

    if (textBuffer.trim()) {
      text.push(textBuffer.trim());
    }

    // Join with newlines instead of spaces to preserve line structure for reference cleanup
    let result = text.join('\n');

    // Decode all entities
    result = this.decodeAllEntities(result);

    // Clean Wikipedia artifacts - this must happen AFTER entity decoding
    result = this.cleanWikipediaArtifacts(result);

    return result;
  }

  /**
   * Extract all image URLs from HTML with fallback for different formats
   */
  static extractImages(html: string): Array<{ src: string; alt?: string }> {
    const images: Array<{ src: string; alt?: string }> = [];

    // Match <img tags with src attribute
    const imgRegex = /<img[^>]+/gi;
    let match;

    while ((match = imgRegex.exec(html)) !== null) {
      const imgTag = match[0];

      // Extract src
      const srcMatch = imgTag.match(/src\s*=\s*["']?([^"'>\s]+)["']?/i);
      if (!srcMatch || !srcMatch[1]) continue;

      let src = this.decodeAllEntities(srcMatch[1]);

      // Make relative URLs absolute
      if (src.startsWith('//')) {
        src = 'https:' + src;
      }

      // Extract alt text (optional)
      const altMatch = imgTag.match(/alt\s*=\s*["']?([^"'>\s]+)["']?/i);
      const alt = altMatch ? altMatch[1] : undefined;

      images.push({ src, alt });
    }

    return images;
  }

  /**
   * Extract first image URL from HTML
   */
  static extractFirstImageUrl(html: string): string | undefined {
    const images = this.extractImages(html);
    return images.length > 0 ? images[0].src : undefined;
  }

  /**
   * Extract multiple image URLs from HTML
   */
  static extractImageUrls(html: string): string[] {
    return this.extractImages(html).map((img) => img.src);
  }
}
