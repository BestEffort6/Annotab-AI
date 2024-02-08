import { keepPreviousData } from '@tanstack/query-core';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Classes } from '@/interfaces/classes';
import { Env } from '@/libs/Env.mjs';

const fetchClasses = async (
  accessToken: string | undefined
): Promise<ApiResponse<Classes[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<Classes[]>;

  return response;
};

const useClasses = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['classes', accessToken],
    queryFn: () => fetchClasses(accessToken),
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchClasses, useClasses };
