import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { VerifyTokenPayload } from '@/interfaces/token';
import { Env } from '@/libs/Env.mjs';

export const verifyToken = async (payload: VerifyTokenPayload) => {
  const { type } = payload;

  switch (type) {
    case 'email_verification':
      return (await ky
        .post(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-email`, {
          json: { token: payload.token },
        })
        .json()) as ApiResponse<any>;

    case 'workspace_invitation':
      return (await ky
        .post(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/invitation/accept`, {
          json: { token: payload.token },
        })
        .json()) as ApiResponse<any>;
    default:
      throw new Error('Invalid token type');
  }
};

export const useVerifyToken = () => {
  return useMutation({
    mutationKey: ['verifyToken'],
    mutationFn: ({ payload }: { payload: VerifyTokenPayload }) =>
      verifyToken(payload),
  });
};
