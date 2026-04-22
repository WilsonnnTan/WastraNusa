import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { addressService } from '@/services/address.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET, POST } from '../../../src/app/api/addresses/route';

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

const VALID_CREATE_BODY = {
  label: 'Rumah',
  recipientName: 'Budi',
  phone: '081234567890',
  province: 'DKI Jakarta',
  city: 'Jakarta Pusat',
  district: 'Gambir',
  postalCode: '10110',
  fullAddress: 'Jl. Gambir No. 1',
};

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/addresses', { tags: ['backend'] }, () => {
  it('should return address list for authenticated user', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.getAddresses.mockResolvedValue([MOCK_ADDRESS] as never);

    const req = createRequest('http://localhost/api/addresses');
    const res = await GET(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data).toEqual([MOCK_ADDRESS]);
    expect(mockService.getAddresses).toHaveBeenCalledWith('user-1');
  });
});

describe('POST /api/addresses', { tags: ['backend'] }, () => {
  it('should create address and return 201', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.createAddress.mockResolvedValue(MOCK_ADDRESS as never);

    const req = createRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(VALID_CREATE_BODY),
    });
    const res = await POST(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.status).toBe('success');
    expect(mockService.createAddress).toHaveBeenCalledWith(
      'user-1',
      expect.objectContaining({ label: 'Rumah' }),
    );
  });

  it('should return 400 on invalid body (Zod validation)', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);

    const req = createRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: '' }), // missing required fields
    });
    const res = await POST(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.status).toBe('fail');
  });
});
