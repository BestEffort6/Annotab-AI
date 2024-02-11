import { useMutation } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { Data } from '@/interfaces/data';
import { Env } from '@/libs/Env.mjs';

export const uploadDatas = async (
  accessToken: string | undefined,
  formData: FormData,
  id: string
) => {
  const response = (await ky
    .post(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dataset/${id}/upload`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    })
    .json()) as ApiResponse<Data>;

  return response;
};

export const useUploadDatas = () => {
  return useMutation({
    mutationKey: ['uploadDatas'],
    mutationFn: ({
      accessToken,
      formData,
      id,
    }: {
      accessToken: string | undefined;
      formData: FormData;
      id: string;
    }) => uploadDatas(accessToken, formData, id),
  });
};
