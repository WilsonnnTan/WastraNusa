import { auth } from '../../src/lib/auth/auth';
import prisma from '../../src/lib/prisma';

export const SEED_ADMIN_USER = {
  name: 'Admin User',
  email: 'admin@test.com',
  password: 'Admin@12345',
  role: 'admin',
};

export const SEED_REGULAR_USER = {
  name: 'Regular User',
  email: 'user@test.com',
  password: 'User@12345',
  role: 'user',
};

export async function seedUsers() {
  const users = [SEED_ADMIN_USER, SEED_REGULAR_USER];

  for (const user of users) {
    const existingUser = await prisma.user.findFirst({
      where: { email: user.email },
    });

    if (!existingUser) {
      const response = await auth.api.signUpEmail({
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });

      await prisma.user.update({
        where: { id: response.user.id },
        data: {
          emailVerified: true,
          role: user.role,
        },
      });

      console.log(`Created user: ${user.email} (role: ${user.role})`);
    } else {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          emailVerified: true,
          role: user.role,
        },
      });
      console.log(`Updated existing user: ${user.email} (role: ${user.role})`);
    }
  }

  console.log(`Seeded ${users.length} users`);
}
