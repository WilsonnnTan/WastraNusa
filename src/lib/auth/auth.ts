import prisma from '@/lib/prisma';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, openAPI } from 'better-auth/plugins';
import z from 'zod';

export const Gender = z.enum(['male', 'female']);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      phoneNumber: {
        type: 'string',
        required: false,
        input: true,
      },
      gender: {
        type: 'string',
        required: false,
        input: true,
        validator: {
          input: Gender.optional(),
        },
      },
      birthDate: {
        type: 'date',
        required: false,
        input: true,
      },
    },
  },
  advanced: {
    useSecureCookies: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [admin(), openAPI()],
});
