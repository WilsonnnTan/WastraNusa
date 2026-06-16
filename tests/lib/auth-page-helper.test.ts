import { auth } from '@/lib/auth/auth';
import { requireAdmin, requireUser } from '@/lib/auth/auth-page-helper';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Headers()),
}));

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/lib/auth/auth', () => ({
  auth: { api: { getSession: vi.fn() } },
}));

const mockedGetSession = vi.mocked(auth.api.getSession);
const mockedRedirect = vi.mocked(redirect);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('auth-page-helper', { tags: ['backend'] }, () => {
  describe('requireUser', () => {
    it('returns the user when a session exists', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'u1', role: 'user' },
      } as never);

      const user = await requireUser();

      expect(user).toEqual({ id: 'u1', role: 'user' });
      expect(mockedRedirect).not.toHaveBeenCalled();
    });

    it('redirects to login when there is no session', async () => {
      mockedGetSession.mockResolvedValue(null as never);

      await requireUser();

      expect(mockedRedirect).toHaveBeenCalledWith(
        '/login?session_expired=true',
      );
    });
  });

  describe('requireAdmin', () => {
    it('returns the user when the role is admin', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'a1', role: 'admin' },
      } as never);

      const user = await requireAdmin();

      expect(user).toEqual({ id: 'a1', role: 'admin' });
      expect(mockedRedirect).not.toHaveBeenCalled();
    });

    it('redirects home when authenticated but not an admin', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'u1', role: 'user' },
      } as never);

      await requireAdmin();

      expect(mockedRedirect).toHaveBeenCalledWith('/');
    });

    it('redirects to login when there is no session', async () => {
      mockedGetSession.mockResolvedValue(null as never);

      await requireAdmin();

      expect(mockedRedirect).toHaveBeenCalledWith(
        '/login?session_expired=true',
      );
    });
  });
});
