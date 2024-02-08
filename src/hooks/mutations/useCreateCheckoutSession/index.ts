import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type {
  CreateCheckoutSessionPayload,
  CreateCheckoutSessionResponse,
} from '@/interfaces/payment';
import { Env } from '@/libs/Env.mjs';

export const createCheckoutSession = async (
  accessToken: string | undefined,
  payload: CreateCheckoutSessionPayload
): Promise<ApiResponse<CreateCheckoutSessionResponse>> => {
  const response = (await ky
    .post(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/transaction/subscribe`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: payload,
    })
    .json()) as ApiResponse<CreateCheckoutSessionResponse>;

  return response;
};

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationKey: ['createCheckoutSession'],
    mutationFn: ({
      accessToken,
      payload,
    }: {
      accessToken: string | undefined;
      payload: CreateCheckoutSessionPayload;
    }) => createCheckoutSession(accessToken, payload),
  });
};
