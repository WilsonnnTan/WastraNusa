import { logError } from '@/logger/logger';
import { ZodError } from 'zod';

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

type PublicApiHandlerContext<T = unknown> = {
  params: T;
  req: Request;
};

type PublicApiHandler<T = unknown> = (
  context: PublicApiHandlerContext<T>,
) => Promise<Response>;

/**
 * Higher-order function to wrap API routes with authentication and standardized error handling.
 * @param handler The actual route logic
 * @returns A Next.js API route handler
 */
export function withApiAuth<T = unknown>(handler: ApiHandler<T>) {
  return async (req: Request, { params }: { params: Promise<T> }) => {
    try {
      const user = await AuthHelper.requireUser();
      const resolvedParams = await params;

      return await handler({ userId: user.id, params: resolvedParams, req });
    } catch (err) {
      const action = req.method + ' ' + new URL(req.url).pathname;
      logError(err, { action });

      if (err instanceof ApiError) {
        return jsend.fail({ message: err.message }, err.status);
      }

      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const flatErrors: Record<string, string> = {};
        for (const [key, errors] of Object.entries(fieldErrors)) {
          flatErrors[key] = (errors as string[])?.[0] || 'Invalid value';
        }

        return jsend.fail(flatErrors, 400);
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
      const user = await AuthHelper.requireAdmin();
      const resolvedParams = await params;

      return await handler({ userId: user.id, params: resolvedParams, req });
    } catch (err) {
      const action = req.method + ' ' + new URL(req.url).pathname;
      logError(err, { action });

      if (err instanceof ApiError) {
        return jsend.fail({ message: err.message }, err.status);
      }

      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const flatErrors: Record<string, string> = {};
        for (const [key, errors] of Object.entries(fieldErrors)) {
          flatErrors[key] = (errors as string[])?.[0] || 'Invalid value';
        }

        return jsend.fail(flatErrors, 400);
      }

      return jsend.error(
        err instanceof Error ? err.message : 'Internal Server Error',
        500,
      );
    }
  };
}

/**
 * Higher-order function to wrap public API routes with standardized error handling and async params.
 * @param handler The actual route logic
 * @returns A Next.js API route handler
 */
export function withApiPublic<T = unknown>(handler: PublicApiHandler<T>) {
  return async (req: Request, { params }: { params: Promise<T> }) => {
    try {
      const resolvedParams = await params;
      return await handler({ params: resolvedParams, req });
    } catch (err) {
      const action = req.method + ' ' + new URL(req.url).pathname;
      logError(err, { action });

      if (err instanceof ApiError) {
        return jsend.fail({ message: err.message }, err.status);
      }

      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const flatErrors: Record<string, string> = {};
        for (const [key, errors] of Object.entries(fieldErrors)) {
          flatErrors[key] = (errors as string[])?.[0] || 'Invalid value';
        }

        return jsend.fail(flatErrors, 400);
      }

      return jsend.error(
        err instanceof Error ? err.message : 'Internal Server Error',
        500,
      );
    }
  };
}
