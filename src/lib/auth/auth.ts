import { EmailType, sendEmail } from '@/lib/email/email';
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
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        type: EmailType.VERIFICATION,
        params: {
          user_name: user.name || 'User',
          verification_url: url,
        },
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
  },
  plugins: [admin(), openAPI()],
});
