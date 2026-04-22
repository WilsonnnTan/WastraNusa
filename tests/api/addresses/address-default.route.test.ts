import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { addressService } from '@/services/address.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from '../../../src/app/api/addresses/[id]/default/route';

const mockService = vi.mocked(addressService);
const mockAuth = vi.mocked(AuthHelper);

const MOCK_ADDRESS = {
  id: 'addr-1',
  userId: 'user-1',
  label: 'Rumah',
  recipientName: 'Budi',
  phone: '081234567890',
  province: 'DKI Jakarta',
  city: 'Jakarta Pusat',
  district: 'Gambir',
  subdistrict: null,
  postalCode: '10110',
  fullAddress: 'Jl. Gambir No. 1',
  notes: null,
  isDefault: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/addresses/[id]/default', { tags: ['backend'] }, () => {
  it('should set address as default and return 200', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.setDefaultAddress.mockResolvedValue(MOCK_ADDRESS as never);

    const req = createRequest('http://localhost/api/addresses/addr-1/default', {
      method: 'POST',
    });
    const res = await POST(req, { params: Promise.resolve({ id: 'addr-1' }) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data).toEqual(MOCK_ADDRESS);
    expect(mockService.setDefaultAddress).toHaveBeenCalledWith(
      'addr-1',
      'user-1',
    );
  });
});
