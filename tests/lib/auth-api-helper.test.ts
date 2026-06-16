import { auth } from '@/lib/auth/auth';
import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { ApiError } from '@/lib/error';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// tests/setup.ts mocks the helper itself; unmock it to test the real logic.
vi.unmock('@/lib/auth/auth-api-helper');

// Mock only the boundaries the helper depends on, not the helper.
vi.mock('next/headers', () => ({
  headers: vi.fn(async () => new Headers()),
}));

vi.mock('@/lib/auth/auth', () => ({
  auth: { api: { getSession: vi.fn() } },
}));

const mockedGetSession = vi.mocked(auth.api.getSession);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AuthHelper', { tags: ['backend'] }, () => {
  describe('getUser', () => {
    it('returns the user when a session exists', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'u1', role: 'user' },
      } as never);

      await expect(AuthHelper.getUser()).resolves.toEqual({
        id: 'u1',
        role: 'user',
      });
    });

    it('returns null when there is no session', async () => {
      mockedGetSession.mockResolvedValue(null as never);

      await expect(AuthHelper.getUser()).resolves.toBeNull();
    });
  });

  describe('requireUser', () => {
    it('returns the user when authenticated', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'u1', role: 'user' },
      } as never);

      await expect(AuthHelper.requireUser()).resolves.toEqual({
        id: 'u1',
        role: 'user',
      });
    });

    it('throws 401 when unauthenticated', async () => {
      mockedGetSession.mockResolvedValue(null as never);

      await expect(AuthHelper.requireUser()).rejects.toThrow(
        new ApiError('Unauthorized access attempt detected', 401),
      );
    });
  });

  describe('requireAdmin', () => {
    it('returns the user when the role is admin', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'admin1', role: 'admin' },
      } as never);

      await expect(AuthHelper.requireAdmin()).resolves.toEqual({
        id: 'admin1',
        role: 'admin',
      });
    });

    it('throws 403 when authenticated but not an admin', async () => {
      mockedGetSession.mockResolvedValue({
        user: { id: 'u1', role: 'user' },
      } as never);

      await expect(AuthHelper.requireAdmin()).rejects.toThrow(
        new ApiError('Admin privileges required', 403),
      );
    });

    it('throws 401 when unauthenticated', async () => {
      mockedGetSession.mockResolvedValue(null as never);

      await expect(AuthHelper.requireAdmin()).rejects.toThrow(
        new ApiError('Unauthorized access attempt detected', 401),
      );
    });
  });
});
