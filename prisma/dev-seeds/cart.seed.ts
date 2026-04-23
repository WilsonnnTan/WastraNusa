import prisma from '../../src/lib/prisma';
import {
  SEED_PRODUCT_1,
  SEED_PRODUCT_2,
  SEED_VARIANT_1_1,
} from './product.seed';
import { SEED_REGULAR_USER } from './user.seed';

async function getUserIdByEmail(email: string): Promise<string> {
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) throw new Error(`Seed user not found: ${email}`);
  return user.id;
}

export const SEED_CART_ITEM_1 = {
  id: 'c0000000-0000-0000-0000-000000000001',
  productId: SEED_PRODUCT_1.id,
  variantId: SEED_VARIANT_1_1.id,
  quantity: 2,
};

export const SEED_CART_ITEM_2 = {
  id: 'c0000000-0000-0000-0000-000000000002',
  productId: SEED_PRODUCT_2.id,
  variantId: null,
  quantity: 1,
};

export const SEED_CART = {
  id: 'cart-0000-0000-0000-0000-000000000001',
};

export async function seedCarts() {
  const regularUserId = await getUserIdByEmail(SEED_REGULAR_USER.email);

  const cartData = {
    ...SEED_CART,
    userId: regularUserId,
  };

  await prisma.$transaction(async (tx) => {
    // Create or update cart
    await tx.cart.upsert({
      where: { userId: regularUserId },
      update: {},
      create: cartData,
    });
    console.log(`Seeded cart for user: ${SEED_REGULAR_USER.email}`);

    // Create cart items
    const cartItems = [
      {
        ...SEED_CART_ITEM_1,
        cartId: cartData.id,
      },
      {
        ...SEED_CART_ITEM_2,
        cartId: cartData.id,
      },
    ];

    for (const item of cartItems) {
      await tx.cartItem.upsert({
        where: { id: item.id },
        update: { quantity: item.quantity },
        create: item,
      });
    }
    console.log(`Seeded ${cartItems.length} cart items`);
  });
}
