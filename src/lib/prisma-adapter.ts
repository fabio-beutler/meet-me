import { type PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { Adapter } from 'next-auth/adapters';

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user) {
      const userIdOnCookies = cookies().get('@meetMe:userId');

      if (!userIdOnCookies) {
        throw new Error('User ID not found on cookies');
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userIdOnCookies.value,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      cookies().delete('@meetMe:userId');

      return {
        id: updatedUser.id,
        bio: updatedUser.bio ?? '',
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email!,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
      };
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        bio: user.bio ?? '',
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        bio: user.bio ?? '',
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: { user: true },
      });

      if (!account) {
        return null;
      }

      const { user } = account;

      return {
        id: user.id,
        bio: user.bio ?? '',
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      };
    },
    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      });

      return {
        id: updatedUser.id,
        bio: updatedUser.bio ?? '',
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email!,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
      };
    },
    async deleteUser(userId) {
      return;
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      });
      return;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return;
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      });
      return { sessionToken, userId, expires };
    },
    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      });

      if (!prismaSession) {
        return null;
      }

      const { user, ...session } = prismaSession;

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          bio: user.bio ?? '',
          name: user.name,
          username: user.username,
          email: user.email!,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      };
    },
    async updateSession({ sessionToken, userId, expires }) {
      const updatedSession = await prisma.session.update({
        where: { session_token: sessionToken },
        data: {
          user_id: userId,
          expires,
        },
      });

      return {
        sessionToken: updatedSession.session_token,
        userId: updatedSession.user_id,
        expires: updatedSession.expires,
      };
    },
    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      });
      return;
    },
    async createVerificationToken({ identifier, expires, token }) {
      return null;
    },
    async useVerificationToken({ identifier, token }) {
      return null;
    },
  };
}
