import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Subscription } from '@/interfaces/subscription';
import { Env } from '@/libs/Env.mjs';

const fetchSubscription = async (
  accessToken: string | undefined
): Promise<ApiResponse<Subscription[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/subscription`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<Subscription[]>;

  return response;
};

const useSubscription = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['subscription', accessToken],
    queryFn: () => fetchSubscription(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchSubscription, useSubscription };
