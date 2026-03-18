import { logError } from '@/logger/logger';

import { AuthHelper } from './auth/auth-api-helper';
import { ApiError } from './error';
import { jsend } from './jsend';

type ApiHandlerContext<T = unknown> = {
  userId: string;
  params: T;
  req: Request;
};

type ApiHandler<T = unknown> = (
  context: ApiHandlerContext<T>,
) => Promise<Response>;

/**
 * Higher-order function to wrap API routes with authentication and standardized error handling.
 * @param handler The actual route logic
 * @returns A Next.js API route handler
 */
export function withApiAuth<T = unknown>(handler: ApiHandler<T>) {
  return async (req: Request, { params }: { params: Promise<T> }) => {
    try {
      const userId = await AuthHelper.getUserId();
      const resolvedParams = await params;

      return await handler({ userId, params: resolvedParams, req });
    } catch (err) {
      const action = req.method + ' ' + new URL(req.url).pathname;
      logError(err, { action });

      if (err instanceof ApiError) {
        return jsend.fail({ message: err.message }, err.status);
      }

      return jsend.error(
        err instanceof Error ? err.message : 'Internal Server Error',
        500,
      );
    }
  };
}

/**
 * Higher-order function to wrap API routes with admin authentication and standardized error handling.
 * @param handler The actual route logic
 * @returns A Next.js API route handler
 */
export function withApiAdmin<T = unknown>(handler: ApiHandler<T>) {
  return async (req: Request, { params }: { params: Promise<T> }) => {
    try {
      const user = await AuthHelper.requireUser();

      if (user.role !== 'admin') {
        throw new ApiError('Admin privileges required', 403);
      }

      const resolvedParams = await params;

      return await handler({ userId: user.id, params: resolvedParams, req });
    } catch (err) {
      const action = req.method + ' ' + new URL(req.url).pathname;
      logError(err, { action });

      if (err instanceof ApiError) {
        return jsend.fail({ message: err.message }, err.status);
      }

      return jsend.error(
        err instanceof Error ? err.message : 'Internal Server Error',
        500,
      );
    }
  };
}
