import NextAuth, { NextAuthConfig } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
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
          bio: '',
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
    session: async ({ session, user }) => {
      return { ...session, user };
    },
    authorized: async ({ request, auth }) => {
      const { pathname } = request.nextUrl;
      if (pathname.match(/^\/register\/.+$/)) return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
