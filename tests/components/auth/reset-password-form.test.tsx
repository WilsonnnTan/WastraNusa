import { ResetPasswordForm } from '@/components/auth/(forget-reset-password)/reset-password/reset-password-form';
import { authClient } from '@/lib/auth/auth-client';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

vi.mock('@/lib/auth/auth-client', () => ({
  authClient: { resetPassword: vi.fn() },
}));

const mockedReset = vi.mocked(authClient.resetPassword);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ResetPasswordForm', { tags: ['frontend'] }, () => {
  it('shows the invalid-link state when no token is provided', () => {
    render(<ResetPasswordForm />);

    expect(screen.getByText(/invalid or has expired/i)).toBeTruthy();
    expect(screen.queryByLabelText('New Password')).toBeNull();
  });

  it('shows the invalid-link state when urlError is INVALID_TOKEN', () => {
    render(<ResetPasswordForm token="some-token" error="INVALID_TOKEN" />);

    expect(screen.getByText(/invalid or has expired/i)).toBeTruthy();
  });

  it('validates the minimum password length', async () => {
    render(<ResetPasswordForm token="valid-token" />);

    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText('Password must be at least 8 characters.'),
    ).toBeTruthy();
    expect(mockedReset).not.toHaveBeenCalled();
  });

  it('rejects mismatched passwords', async () => {
    render(<ResetPasswordForm token="valid-token" />);

    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'different123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('Passwords do not match.')).toBeTruthy();
    expect(mockedReset).not.toHaveBeenCalled();
  });

  it('submits and shows success when the passwords are valid', async () => {
    mockedReset.mockResolvedValue({ error: null } as never);
    render(<ResetPasswordForm token="valid-token" />);

    fireEvent.change(screen.getByLabelText('New Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/successfully updated/i)).toBeTruthy();
    expect(mockedReset).toHaveBeenCalledWith({
      newPassword: 'password123',
      token: 'valid-token',
    });
  });
});
