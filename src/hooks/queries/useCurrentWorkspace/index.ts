import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Workspace } from '@/interfaces/workspace';
import { Env } from '@/libs/Env.mjs';

const fetchCurrentWorkspace = async (
  accessToken: string | undefined
): Promise<ApiResponse<Workspace>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspace/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<Workspace>;

  return response;
};

const useCurrentWorkspace = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['currentWorkspace', accessToken],
    queryFn: () => fetchCurrentWorkspace(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchCurrentWorkspace, useCurrentWorkspace };
