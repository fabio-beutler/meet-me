import { fromUnixTime, isBefore } from 'date-fns';
import { google } from 'googleapis';

import { prisma } from '@/lib/prisma';

export async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      provider: 'google',
      userId: userId,
    },
  });

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  });

  if (!account.expires_at) {
    return auth;
  }

  const isTokenExpired = isBefore(fromUnixTime(account.expires_at), new Date());

  if (isTokenExpired) {
    const {
      credentials: { expiry_date, ...credentials },
    } = await auth.refreshAccessToken();

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        ...credentials,
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
      },
    });

    auth.setCredentials(credentials);
  }

  return auth;
}
