/**
 * Custom error class for API failures (4xx/5xx)
 */
export class ApiError extends Error {
  status: number;
  constructor(message = 'API request failed', status = 401) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}
