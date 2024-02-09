import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { IClass } from '@/interfaces/class';
import { Env } from '@/libs/Env.mjs';

const fetchClasses = async (
  accessToken: string | undefined
): Promise<ApiResponse<IClass[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<IClass[]>;

  return response;
};

const useClasses = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['classes', accessToken],
    queryFn: () => fetchClasses(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchClasses, useClasses };
