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
import type { Subscription } from '@/interfaces/subscription';
import { Env } from '@/libs/Env.mjs';

import Popup from '../../popup';

const stripePromise = loadStripe(Env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type AttachCardModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedSubscription: Subscription;
};

const CheckoutModal = ({
  isOpen,
  setIsOpen,
  selectedSubscription,
}: AttachCardModalProps) => {
  const { data: session } = useSession();
  const [clientSecret, setClientSecret] = useState('');
  const [sessionId, setSessionId] = useState('');

  const { mutate: expireCheckoutSession } = useExpireCheckoutSession();
  const { mutate: createCheckoutSession } = useCreateCheckoutSession();

  useEffect(() => {
    if (!isOpen && sessionId) {
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
    if (isOpen && !sessionId) {
      createCheckoutSession(
        {
          accessToken: session?.user.access.token,
          payload: {
            subscriptionId: selectedSubscription.id,
          },
        },
        {
          onSuccess: ({ data }) => {
            setClientSecret(data.client_secret);
            setSessionId(data.id);
          },
        }
      );
    }
  }, [
    isOpen,
    selectedSubscription,
    createCheckoutSession,
    expireCheckoutSession,
    session,
    sessionId,
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
