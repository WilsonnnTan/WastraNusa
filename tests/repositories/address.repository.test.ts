import prisma from '@/lib/prisma';
import { addressRepository } from '@/repositories/address.repository';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { SEED_ADDRESS_USER } from '../../prisma/dev-seeds/address.seed';
import { SEED_REGULAR_USER } from '../../prisma/dev-seeds/user.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/address.repository');

const createdAddressIds: string[] = [];
let regularUserId: string;

beforeAll(async () => {
  const regular = await prisma.user.findFirst({
    where: { email: SEED_REGULAR_USER.email },
  });

  if (!regular) {
    throw new Error('Seed users not found. Run `pnpm prisma db seed` first.');
  }

  regularUserId = regular.id;
});

afterAll(async () => {
  for (const id of createdAddressIds) {
    await prisma.customerAddress.delete({ where: { id } }).catch(() => {});
  }
});

describe('addressRepository', { tags: ['db'] }, () => {
  describe('findAllByUser', () => {
    it('should return addresses for a user ordered by default then created', async () => {
      const addresses = await addressRepository.findAllByUser(regularUserId);
      expect(addresses.length).toBeGreaterThanOrEqual(1);

      const first = addresses[0];
      // Seeded address is default, so it should be first
      expect(first.isDefault).toBe(true);
    });
  });

  describe('create', () => {
    it('should create a new address', async () => {
      const id = crypto.randomUUID();
      createdAddressIds.push(id);

      const address = await addressRepository.create({
        id,
        userId: regularUserId,
        label: 'Office',
        recipientName: 'Work Budi',
        phone: '081234567899',
        province: 'DKI Jakarta',
        city: 'Jakarta Selatan',
        district: 'Kebayoran Baru',
        postalCode: '12110',
        fullAddress: 'Jl. Sudirman No. 2',
        isDefault: false,
      });

      expect(address.id).toBe(id);
      expect(address.label).toBe('Office');
    });
  });

  describe('clearDefaultsByUser', () => {
    it('should set isDefault to false for all user addresses', async () => {
      // Ensure at least one is default
      await prisma.customerAddress.updateMany({
        where: { userId: regularUserId },
        data: { isDefault: true },
      });

      await addressRepository.clearDefaultsByUser(regularUserId);

      const addresses = await prisma.customerAddress.findMany({
        where: { userId: regularUserId },
      });

      expect(addresses.every((a) => !a.isDefault)).toBe(true);

      // Restore seed state
      await prisma.customerAddress.update({
        where: { id: SEED_ADDRESS_USER.id },
        data: { isDefault: true },
      });
    });
  });

  describe('setDefault', () => {
    it('should atomically set one address as default and clear others', async () => {
      const id = crypto.randomUUID();
      createdAddressIds.push(id);
      await addressRepository.create({
        id,
        userId: regularUserId,
        label: 'Temp',
        recipientName: 'Temp',
        phone: '081234567899',
        province: 'P',
        city: 'C',
        district: 'D',
        postalCode: '1',
        fullAddress: 'A',
        isDefault: false,
      });

      await addressRepository.setDefault(id, regularUserId);

      const addresses = await prisma.customerAddress.findMany({
        where: { userId: regularUserId },
      });

      const defaultAddr = addresses.find((a) => a.isDefault);
      expect(defaultAddr?.id).toBe(id);
      expect(addresses.filter((a) => a.isDefault)).toHaveLength(1);

      // Restore seed state
      await addressRepository.setDefault(SEED_ADDRESS_USER.id, regularUserId);
    });
  });
});
