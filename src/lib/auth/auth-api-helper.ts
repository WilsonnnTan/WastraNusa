import { headers } from 'next/headers';

import { ApiError } from '../error';
import { auth } from './auth';

/**
 * Centralized authentication helpers for API routes
 */
export const AuthHelper = {
  async getUser() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user ?? null;
  },

  async requireUser() {
    const user = await this.getUser();

    if (!user) {
      throw new ApiError('Unauthorized access attempt detected', 401);
    }

    return user;
  },

  async requireAdmin() {
    const user = await this.requireUser();

    if (user.role !== 'admin') {
      throw new ApiError('Admin privileges required', 403);
    }

    return user;
  },
};
