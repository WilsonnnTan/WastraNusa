'use client';

import {
  type MappedArticleFieldsFromWikipedia,
  WikipediaSummaryFetchError,
  fetchWikipediaPageSummary,
  mapWikipediaSummaryToArticleFields,
  parseWikimediaArticleUrl,
  validateWikimediaArticleUrlShape,
} from '@/lib/wikimedia/wikipedia-summary';
import { useCallback, useEffect, useRef, useState } from 'react';

export type WikipediaSummaryPreview = {
  mapped: MappedArticleFieldsFromWikipedia;
  pageUrl: string;
  wikiType?: string;
};

/**
 * Client-side Wikipedia page summary import: URL state, debounced validation,
 * fetch with abort, loading/error/preview. Reset when `isActive` becomes false (e.g. modal closed).
 */
export function useWikipediaSummaryImport(isActive: boolean) {
  const [url, setUrl] = useState('');
  const [urlHint, setUrlHint] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<WikipediaSummaryPreview | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!isActive) {
      abortRef.current?.abort();
      setIsLoading(false);
      return;
    }
    setUrl('');
    setUrlHint(null);
    setError(null);
    setPreview(null);
    abortRef.current?.abort();
    setIsLoading(false);
  }, [isActive]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setUrlHint(validateWikimediaArticleUrlShape(url));
    }, 400);
    return () => window.clearTimeout(id);
  }, [url]);

  const urlLooksValid =
    url.trim().length > 0 && parseWikimediaArticleUrl(url) !== null;

  const fetchSummary = useCallback(async () => {
    const trimmed = url.trim();
    const parsed = parseWikimediaArticleUrl(trimmed);
    if (!parsed) {
      setError(
        'URL tidak valid atau bukan halaman artikel Wikipedia (*.wikipedia.org, jalur /wiki/… atau ?title=…).',
      );
      setPreview(null);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setIsLoading(true);
    setError(null);
    setPreview(null);

    try {
      const summary = await fetchWikipediaPageSummary(
        parsed.apiOrigin,
        parsed.pageTitle,
        ac.signal,
      );
      const mapped = mapWikipediaSummaryToArticleFields(summary);
      setPreview({
        mapped,
        pageUrl: trimmed,
        wikiType: summary.type,
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message =
        err instanceof WikipediaSummaryFetchError
          ? err.message
          : err instanceof TypeError
            ? 'Koneksi gagal atau diblokir. Periksa jaringan atau CORS browser.'
            : err instanceof Error
              ? err.message
              : 'Gagal mengambil ringkasan Wikipedia.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const discardPreview = useCallback(() => setPreview(null), []);

  return {
    url,
    setUrl,
    urlHint,
    isLoading,
    error,
    preview,
    urlLooksValid,
    fetchSummary,
    discardPreview,
  };
}
