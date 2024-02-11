import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type {
  SwitchCurrentWorkspacePayload,
  Workspace,
} from '@/interfaces/workspace';
import { Env } from '@/libs/Env.mjs';

export const switchCurrentWorkspace = async (
  accessToken: string | undefined,
  payload: SwitchCurrentWorkspacePayload
) => {
  const response = (await ky
    .patch(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspace/current/switch`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      json: payload,
    })
    .json()) as ApiResponse<Workspace>;

  return response;
};

export const useSwitchCurrentWorkspace = () => {
  return useMutation({
    mutationKey: ['switchCurrentWorkspace'],
    mutationFn: ({
      accessToken,
      payload,
    }: {
      accessToken: string | undefined;
      payload: SwitchCurrentWorkspacePayload;
    }) => switchCurrentWorkspace(accessToken, payload),
  });
};
