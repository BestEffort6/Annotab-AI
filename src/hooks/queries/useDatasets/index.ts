import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { DatasetProps } from '@/interfaces/dataset';
import { Env } from '@/libs/Env.mjs';

const fetchDatasets = async (
  accessToken: string | undefined,
  page: number,
  take: number
): Promise<ApiResponse<DatasetProps[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dataset`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        page,
        take,
      },
    })
    .json()) as ApiResponse<DatasetProps[]>;

  return response;
};

const useDatasets = (
  accessToken: string | undefined,
  page: number,
  pageSize: number,
  initialData?: any
) => {
  return useQuery({
    queryKey: ['datasets', accessToken, page, pageSize],
    queryFn: () => fetchDatasets(accessToken, page, pageSize),
    initialData,
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchDatasets, useDatasets };
