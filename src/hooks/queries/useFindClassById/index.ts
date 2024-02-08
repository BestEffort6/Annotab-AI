import { keepPreviousData } from '@tanstack/query-core';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { ClassById } from '@/interfaces/classes';
import { Env } from '@/libs/Env.mjs';

const fetchClassById = async (
  accessToken: string | undefined,
  id: string
): Promise<ApiResponse<ClassById>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/class/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<ClassById>;

  return response;
};

const useFindClassById = (accessToken: string | undefined, id: string) => {
  return useQuery({
    queryKey: ['findClassById', accessToken, id],
    queryFn: () => fetchClassById(accessToken, id),
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchClassById, useFindClassById };
