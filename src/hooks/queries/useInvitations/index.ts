import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Invitation } from '@/interfaces/invitation';
import { Env } from '@/libs/Env.mjs';

const fetchInvitations = async (
  accessToken: string | undefined,
  page: number,
  take: number
): Promise<ApiResponse<Invitation[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/invitation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        page,
        take,
      },
    })
    .json()) as ApiResponse<Invitation[]>;

  return response;
};

const useInvitations = (
  accessToken: string | undefined,
  page: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ['invitations', accessToken, page, pageSize],
    queryFn: () => fetchInvitations(accessToken, page, pageSize),
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchInvitations, useInvitations };
