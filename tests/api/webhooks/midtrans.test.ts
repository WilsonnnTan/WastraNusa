import { POST } from '@/app/api/webhooks/midtrans/route';
import { paymentService } from '@/services/payment.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/services/payment.service');

describe('Midtrans Webhook API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPayload = {
    transaction_id: 'tx-123',
    order_id: 'ord-123',
    gross_amount: '10000.00',
    status_code: '200',
    transaction_status: 'settlement',
    signature_key: 'sig-123',
    payment_type: 'credit_card',
  };

  it('should return 200 and call service on success', async () => {
    vi.mocked(paymentService.handleNotification).mockResolvedValue(undefined);

    const req = new Request('http://localhost/api/webhooks/midtrans', {
      method: 'POST',
      body: JSON.stringify(mockPayload),
    });

    const response = await POST(req, { params: Promise.resolve({}) });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(paymentService.handleNotification).toHaveBeenCalled();
  });

  it('should return 400 for invalid payload', async () => {
    const req = new Request('http://localhost/api/webhooks/midtrans', {
      method: 'POST',
      body: JSON.stringify({ invalid: 'data' }),
    });

    const response = await POST(req, { params: Promise.resolve({}) });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.status).toBe('fail');
  });
});
