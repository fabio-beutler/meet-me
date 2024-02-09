import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@/lib/prisma-adapter';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/calendar',
          ].join(' '),
        },
      },
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.email.split('@')[0],
          email: profile.email,
          avatar_url: profile.picture,
        };
      },
    }),
  ],

  callbacks: {
    signIn: async ({ account }) => {
      if (!account?.scope?.includes('https://www.googleapis.com/auth/calendar')) {
        return '/register/connect-calendar?error=permissions';
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
