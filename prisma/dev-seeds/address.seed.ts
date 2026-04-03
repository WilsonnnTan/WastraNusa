import prisma from '../../src/lib/prisma';
import { SEED_REGULAR_USER } from './user.seed';

async function getUserIdByEmail(email: string): Promise<string> {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new Error(`Seed user not found: ${email}`);
  return user.id;
}

export const SEED_ADDRESS_USER = {
  id: 'addr0000-0000-0000-0000-000000000002',
  label: 'Home',
  recipientName: SEED_REGULAR_USER.name,
  phone: '081234567891',
  province: 'DKI Jakarta',
  city: 'Jakarta Pusat',
  district: 'Gambir',
  subdistrict: 'Gambir',
  postalCode: '10110',
  fullAddress: 'Jl. Gambir Raya No. 10, Gambir, Jakarta Pusat',
  isDefault: true,
};

export async function seedAddresses() {
  const regularUserId = await getUserIdByEmail(SEED_REGULAR_USER.email);

  const addresses = [{ ...SEED_ADDRESS_USER, userId: regularUserId }];

  for (const addr of addresses) {
    await prisma.customerAddress.upsert({
      where: { id: addr.id },
      update: {},
      create: addr,
    });
  }
  console.log(`Seeded ${addresses.length} customer addresses`);
}
