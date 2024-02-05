import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Invitation } from '@/interfaces/invitation';
import { Env } from '@/libs/Env.mjs';

const fetchSubscription = async (
  accessToken: string | undefined
): Promise<ApiResponse<Invitation[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/subscription`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<Invitation[]>;

  return response;
};

const useSubscription = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['subscription', accessToken],
    queryFn: () => fetchSubscription(accessToken),
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchSubscription, useSubscription };
