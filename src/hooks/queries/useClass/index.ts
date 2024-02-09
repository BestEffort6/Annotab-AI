import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { IClass } from '@/interfaces/class';
import { Env } from '@/libs/Env.mjs';

const fetchClass = async (
  accessToken: string | undefined,
  id: string
): Promise<ApiResponse<IClass>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<IClass>;

  return response;
};

const useClass = (accessToken: string | undefined, id: string) => {
  return useQuery({
    queryKey: ['class', accessToken, id],
    queryFn: () => fetchClass(accessToken, id),
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchClass, useClass };
