import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

import type { ApiResponse } from '@/interfaces/api-response';
import type { PaymentMethod } from '@/interfaces/payment-method';
import { Env } from '@/libs/Env.mjs';

const fetchPaymentMethod = async (
  accessToken: string | undefined
): Promise<ApiResponse<PaymentMethod>> => {
  const response = (await ky
    .get(`${Env.NEXT_PUBLIC_BACKEND_URL}/api/v1/payment-method`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .json()) as ApiResponse<PaymentMethod>;

  return response;
};

const usePaymentMethod = (accessToken: string | undefined) => {
  return useQuery({
    queryKey: ['paymentMethod', accessToken],
    queryFn: () => fetchPaymentMethod(accessToken),
    enabled: !!accessToken,
    staleTime: 1000 * 10,
  });
};

export { fetchPaymentMethod, usePaymentMethod };
