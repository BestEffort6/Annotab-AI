import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Workspace } from '@/interfaces/workspace';
import { Env } from '@/libs/Env.mjs';

const fetchWorkspaces = async (
  accessToken: string | undefined,
  page: number,
  take: number
): Promise<ApiResponse<Workspace[]>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspace`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      searchParams: {
        page,
        take,
      },
    })
    .json()) as ApiResponse<Workspace[]>;

  return response;
};

const useWorkspaces = (
  accessToken: string | undefined,
  page: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ['workspaces', accessToken, page, pageSize],
    queryFn: () => fetchWorkspaces(accessToken, page, pageSize),
    placeholderData: keepPreviousData,
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchWorkspaces, useWorkspaces };
