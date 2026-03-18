import { ApiError } from '@/lib/error';
import { headers } from 'next/headers';

import { auth } from './auth';

/**
 * Centralized authentication helpers for API routes
 */
export const AuthHelper = {
  async requireUser() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user) {
      throw new ApiError('Unauthorized access attempt detected', 401);
    }

    return session.user;
  },

  async getUserId() {
    const user = await this.requireUser();
    return user.id;
  },
};
