import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type {
  UpdateCurrentWorkspaceFormData,
  Workspace,
} from '@/interfaces/workspace';
import { Env } from '@/libs/Env.mjs';

export const updateCurrentWorkspace = async (
  accessToken: string | undefined,
  payload: UpdateCurrentWorkspaceFormData
) => {
  const response = (await ky
    .patch(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspace/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
    })
    .json()) as ApiResponse<Workspace>;

  return response;
};

export const useUpdateCurrentWorkspace = () => {
  return useMutation({
    mutationKey: ['updateCurrentWorkspace'],
    mutationFn: ({
      accessToken,
      payload,
    }: {
      accessToken: string | undefined;
      payload: UpdateCurrentWorkspaceFormData;
    }) => updateCurrentWorkspace(accessToken, payload),
  });
};
