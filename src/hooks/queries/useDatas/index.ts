import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { DataProps } from '@/interfaces/dataProps';
import { Env } from '@/libs/Env.mjs';

const fetchDatas = async (
  accessToken: string | undefined,
  page: number,
  take: number,
  id: string
): Promise<ApiResponse<DataProps[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dataset/${id}/data`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        page,
        take,
      },
    })
    .json()) as ApiResponse<DataProps[]>;

  return response;
};

const useDatas = (
  accessToken: string | undefined,
  page: number,
  pageSize: number,
  id: string
) => {
  return useQuery({
    queryKey: ['datas', accessToken, page, pageSize, id],
    queryFn: () => fetchDatas(accessToken, page, pageSize, id),
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchDatas, useDatas };
