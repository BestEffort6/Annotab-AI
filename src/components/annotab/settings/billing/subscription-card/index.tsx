import { Checkbox } from '@nextui-org/react';
import clsx from 'clsx';
import React from 'react';
import Markdown from 'react-markdown';

import type { Subscription } from '@/interfaces/subscription';

type SubscriptionCardProps = {
  plan: Subscription;
  selectedSubscription: string | null;
  setSelectedSubscription: (subscription: string | null) => void;
};

const SubscriptionCard = ({
  plan,
  selectedSubscription,
  setSelectedSubscription,
}: SubscriptionCardProps) => {
  const formatSubscriptionPrice = (plan: Subscription) => {
    const unitAmountDecimal =
      plan.stripeSubscription?.default_price?.unit_amount;
    const price = unitAmountDecimal ? unitAmountDecimal / 100 : 0;
    return `${plan?.currency?.toUpperCase()} ${
      plan.stripeSubscription ? price : 0
    }`;
  };

  return (
    <div className="flex w-1/3 flex-col" key={plan.id}>
      <Checkbox
        className="m-auto w-full"
        id="terms"
        isSelected={selectedSubscription === plan.id}
        onClick={() =>
          setSelectedSubscription(
            selectedSubscription === plan.id ? null : plan.id
          )
        }
      />
      <div className="rounded-[8px] border border-silver-sand/25 bg-grey-purple-white">
        <span
          className={clsx(
            'block h-[14px] w-full rounded-[8px_8px_0_0]',
            plan.name === 'Free'
              ? 'bg-chili-red'
              : plan.name === 'Personal'
                ? 'bg-blue-pastel'
                : 'bg-[#8315F9]'
          )}
        >{` `}</span>
        <div className="px-[29px] pb-[30px] pt-[19px]">
          <h6 className="mb-[20px] text-[18px] font-[600]">{plan.name}</h6>
          <h2
            className={clsx(
              'mb-[25px] text-[50px] font-[600]',
              plan.name === 'Free'
                ? 'text-chili-red'
                : plan.name === 'Personal'
                  ? 'text-blue-pastel'
                  : 'text-[#8315F9]'
            )}
          >
            {formatSubscriptionPrice(plan)}
          </h2>
          <Markdown>{plan.description}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
