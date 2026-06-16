import { EmailType, sendEmail } from '@/lib/email/email';
import { logError } from '@/lib/logger';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the transporter boundary; let loadTemplate read the REAL template files
// so we genuinely exercise the {{placeholder}} interpolation.
const { sendMailMock, createTransportMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn();
  const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));
  return { sendMailMock, createTransportMock };
});

vi.mock('nodemailer', () => ({
  default: { createTransport: createTransportMock },
}));

vi.mock('@/lib/logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  logError: vi.fn(),
}));

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  vi.clearAllMocks();
  process.env.SMTP_HOST = 'smtp.example.com';
  process.env.SMTP_USER = 'user@example.com';
  process.env.SMTP_PASS = 'secret';
  delete process.env.SMTP_PORT;
  delete process.env.EMAIL_FROM;
});

afterAll(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe('sendEmail', { tags: ['backend'] }, () => {
  it('builds correct mail options and renders the template for RESET_PASSWORD', async () => {
    sendMailMock.mockResolvedValue({ messageId: 'msg-1' });

    const result = await sendEmail({
      to: 'customer@example.com',
      subject: 'Reset your password',
      type: EmailType.RESET_PASSWORD,
      params: {
        user_name: 'Budi',
        reset_url: 'https://wastranusa.test/reset?token=abc',
      },
    });

    expect(result).toEqual({ messageId: 'msg-1' });
    expect(sendMailMock).toHaveBeenCalledTimes(1);

    const mail = sendMailMock.mock.calls[0][0];
    expect(mail.to).toBe('customer@example.com');
    expect(mail.subject).toBe('Reset your password');
    expect(mail.from).toBe('"WastraNusa" <noreply@example.com>');
    expect(mail.text).toBe('Reset your password'); // falls back to subject
    // Template interpolation: placeholders replaced with real values + app_name.
    expect(mail.html).toContain('https://wastranusa.test/reset?token=abc');
    expect(mail.html).toContain('Budi');
    expect(mail.html).toContain('WastraNusa');
    expect(mail.html).not.toContain('{{');
  });

  it('configures the transporter from SMTP env vars (default port 587)', async () => {
    sendMailMock.mockResolvedValue({ messageId: 'msg-2' });

    await sendEmail({
      to: 'customer@example.com',
      subject: 'Verify your email address',
      type: EmailType.VERIFICATION,
      params: {
        user_name: 'Budi',
        verification_url: 'https://wastranusa.test/verify?token=xyz',
      },
    });

    expect(createTransportMock).toHaveBeenCalledWith({
      host: 'smtp.example.com',
      port: 587,
      auth: { user: 'user@example.com', pass: 'secret' },
    });
  });

  it('honours a custom EMAIL_FROM when set', async () => {
    process.env.EMAIL_FROM = '"Shop" <shop@wastranusa.test>';
    sendMailMock.mockResolvedValue({ messageId: 'msg-3' });

    await sendEmail({
      to: 'customer@example.com',
      subject: 'Verify your email address',
      type: EmailType.VERIFICATION,
      params: {
        user_name: 'Budi',
        verification_url: 'https://wastranusa.test/verify?token=xyz',
      },
    });

    expect(sendMailMock.mock.calls[0][0].from).toBe(
      '"Shop" <shop@wastranusa.test>',
    );
  });

  it('logs (does not throw) when sendMail rejects', async () => {
    const failure = new Error('SMTP down');
    sendMailMock.mockRejectedValue(failure);

    const result = await sendEmail({
      to: 'customer@example.com',
      subject: 'Reset your password',
      type: EmailType.RESET_PASSWORD,
      params: { user_name: 'Budi', reset_url: 'https://x.test/r' },
    });

    expect(result).toBeUndefined();
    expect(logError).toHaveBeenCalledWith(
      failure,
      expect.objectContaining({ to: 'customer@example.com' }),
    );
  });

  it('logs (does not throw) when the template is missing', async () => {
    const result = await sendEmail({
      to: 'customer@example.com',
      subject: 'No template',
      // Force loadTemplate down its "Template not found" path.
      type: 'does-not-exist' as never,
      params: { user_name: 'Budi', reset_url: 'https://x.test/r' } as never,
    });

    expect(result).toBeUndefined();
    expect(sendMailMock).not.toHaveBeenCalled();
    expect(logError).toHaveBeenCalled();
  });
});
