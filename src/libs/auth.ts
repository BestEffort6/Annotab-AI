import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && profile && account.provider === 'google') {
        if (!profile.email_verified) {
          return false;
        }

        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/auth/verify-sso`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${account.id_token}`,
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              provider: account.provider,
              user: {
                email: user.email,
                firstName: profile.given_name,
                lastName: profile.family_name,
                image: user.image,
              },
              idToken: account.id_token,
            }),
          }
        ).then((response) => response.json());

        const { data } = res;
        if (!data || !data.accessToken || !data.refreshToken) {
          return false;
        }

        user.access = data.accessToken;
        user.refresh = data.refreshToken;
      }

      const userResponse = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/me`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.access.token}`,
          },
        }
      ).then((res) => res.json());

      user.workspaceId = userResponse.currentWorkspaceId;
      user.id = userResponse.id;

      return true;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.access = token.access;
        session.user.refresh = token.refresh;
        session.user.workspaceId = token.workspaceId;
        session.expires = token.access.expiresAt;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access = user.access;
        token.refresh = user.refresh;
        token.workspaceId = user.workspaceId;
      }

      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
      checks: ['none'],
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await fetch(
            `${process.env.BACKEND_URL}/api/v1/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            }
          )
            .then((response) => response.json())
            .then((response) => response.data);

          if (res.statusCode === 401) {
            throw new Error('Invalid email or password');
          }

          return {
            ...res.user,
            access: res.accessToken,
            refresh: res.refreshToken,
          };
        } catch (err) {
          throw new Error('Invalid email or password');
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/404',
  },
};
