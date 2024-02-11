'use client';

import type { HTTPError } from 'ky';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useLayoutActions } from '@/components/providers/LayoutProvider';
import { useVerifyToken } from '@/hooks/mutations/useVerifyToken';
import type { TokenTypes } from '@/interfaces/token';

import toast from '../toast';

const VerifyToken = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setLoading } = useLayoutActions();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') as string;
  const type = searchParams.get('type') as TokenTypes;

  const { mutate } = useVerifyToken();

  useEffect(() => {
    if (token && type) {
      setLoading(true);
      mutate(
        { payload: { token, type } },
        {
          onSuccess() {
            toast({
              type: 'success',
              content: 'Token verified successfully',
            });
          },
          async onError(error) {
            if (error.name === 'HTTPError') {
              const errJson = await (error as HTTPError).response.json();

              toast({
                type: 'error',
                content: errJson.message,
              });
            }
          },
          onSettled() {
            setLoading(false);
            if (session) {
              router.push('/');
            } else {
              router.push('/sign-in');
            }
          },
        }
      );
    } else {
      redirect('/sign-in');
    }
  }, [token, type, mutate, setLoading]);

  return null;
};

export default VerifyToken;
