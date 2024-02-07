import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Subscription } from '@/interfaces/subscription';
import { Env } from '@/libs/Env.mjs';

const fetchSubscriptions = async (
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

const useSubscriptions = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['subscriptions', accessToken],
    queryFn: () => fetchSubscriptions(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchSubscriptions, useSubscriptions };
