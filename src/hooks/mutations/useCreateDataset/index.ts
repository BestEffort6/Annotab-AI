import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { CreateDatasetFromData, DatasetProps } from '@/interfaces/dataset';
import { Env } from '@/libs/Env.mjs';

export const createDataset = async (
  accessToken: string | undefined,
  payload: CreateDatasetFromData
) => {
  const response = (await ky
    .patch(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspace/current`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: payload,
    })
    .json()) as ApiResponse<DatasetProps>;

  return response;
};

export const useCreateDataset = () => {
  return useMutation({
    mutationKey: ['createDataset'],
    mutationFn: ({
      accessToken,
      payload,
    }: {
      accessToken: string | undefined;
      payload: CreateDatasetFromData;
    }) => createDataset(accessToken, payload),
  });
};
