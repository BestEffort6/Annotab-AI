'use client';

import { Dialog } from '@headlessui/react';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useCreateCheckoutSession } from '@/hooks/mutations/useCreateCheckoutSession';
import { useExpireCheckoutSession } from '@/hooks/mutations/useExpireCheckoutSession';
import { Env } from '@/libs/Env.mjs';

import Popup from '../../popup';

const stripePromise = loadStripe(Env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type AttachCardModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedSubscriptionId: string;
};

const CheckoutModal = ({
  isOpen,
  setIsOpen,
  selectedSubscriptionId,
}: AttachCardModalProps) => {
  const { data: session } = useSession();
  const [clientSecret, setClientSecret] = useState('');
  const [sessionId, setSessionId] = useState('');

  const { mutate: expireCheckoutSession } = useExpireCheckoutSession();
  const { mutate: createCheckoutSession } = useCreateCheckoutSession();

  useEffect(() => {
    if (!isOpen) {
      if (sessionId) {
        expireCheckoutSession(
          {
            accessToken: session?.user.access.token,
            payload: {
              sessionId,
            },
          },
          {
            onSuccess: () => {
              setClientSecret('');
              setSessionId('');
            },
          }
        );
      }
    } else {
      createCheckoutSession(
        {
          accessToken: session?.user.access.token,
          payload: {
            subscriptionId: selectedSubscriptionId,
          },
        },
        {
          onSuccess: ({ data }) => {
            setClientSecret(data.clientSecret);
            setSessionId(data.id);
          },
        }
      );
    }
  }, [
    isOpen,
    selectedSubscriptionId,
    sessionId,
    createCheckoutSession,
    expireCheckoutSession,
    session?.user.access.token,
  ]);

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen} size="6xl" bgColor="bg-white">
      <Dialog.Title
        as="h3"
        className="mb-8 flex w-full items-center justify-center text-center text-3xl font-medium text-dark-navy-blue"
      >
        Checkout
      </Dialog.Title>
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </Popup>
  );
};

export default CheckoutModal;
