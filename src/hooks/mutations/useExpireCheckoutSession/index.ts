import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { ExpireCheckoutSessionPayload } from '@/interfaces/payment';
import { Env } from '@/libs/Env.mjs';

export const expireCheckoutSession = async (
  accessToken: string | undefined,
  payload: ExpireCheckoutSessionPayload
) => {
  const response = (await ky
    .post(
      `${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transaction/expire-checkout-session`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: payload,
      }
    )
    .json()) as ApiResponse<any>;

  return response;
};

export const useExpireCheckoutSession = () => {
  return useMutation({
    mutationKey: ['expireCheckoutSession'],
    mutationFn: ({
      accessToken,
      payload,
    }: {
      accessToken: string | undefined;
      payload: ExpireCheckoutSessionPayload;
    }) => expireCheckoutSession(accessToken, payload),
  });
};
