import { type DefaultSession } from 'next-auth';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      workspaceId: string;
      access: {
        token: string;
        expiresAt: string;
      };
      refresh: {
        token: string;
        expiresAt: string;
      };
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    workspaceId: string;
    access: {
      token: string;
      expiresAt: string;
    };
    refresh: {
      token: string;
      expiresAt: string;
    };
  }

  interface Profile {
    given_name: string;
    family_name: string;
    email_verified: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    workspaceId: string;
    access: {
      token: string;
      expiresAt: string;
    };
    refresh: {
      token: string;
      expiresAt: string;
    };
  }
}
