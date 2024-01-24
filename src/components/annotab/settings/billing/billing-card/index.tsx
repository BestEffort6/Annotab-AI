import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const BillingCard = () => {
  return (
    <div className="my-[35px] flex flex-wrap gap-[20px]">
      <div className="mb-[20px] h-[162px] w-[calc(30%-14px)] rounded-[8px] bg-[#F2F2F8] px-[20px] py-[10px]">
        <h6 className="mb-[14px] text-[14px] font-normal text-dark-navy-blue">
          Spending on metered services
        </h6>
        <p className="mb-[14px] text-[14px] font-normal text-dark-navy-blue">
          $0.00
        </p>
        <Link
          className="mb-[14px] block text-[14px] font-normal text-neon-purple  transition-all hover:text-corn-flower-blue"
          href="/"
        >
          View spending limits
        </Link>
      </div>
      <div className="mb-[20px] h-[162px] w-[calc(40%-14px)] rounded-[8px] bg-[#F2F2F8] px-[20px] py-[10px]">
        <h6 className="mb-[14px] text-[14px] font-normal text-dark-navy-blue">
          Your lastest bill
        </h6>
        <p className="mb-[14px] text-[14px] font-normal text-dark-navy-blue">
          $0.00
        </p>
        <p className="mb-[14px] text-[14px] font-normal text-dark-navy-blue">
          Your next payment in MM DD, YY
        </p>
      </div>
      <div className="mb-[20px] h-[162px] w-[calc(30%-14px)] rounded-[8px] bg-[#F2F2F8] px-[20px] py-[10px]">
        <h6 className="mb-[11px] flex items-center gap-[10px] text-[14px] font-normal text-dark-navy-blue">
          Payment information <ArrowRightIcon width={15} height={15} />
        </h6>
        <Link
          className="mb-[11px] block text-[14px] font-normal text-neon-purple transition-all hover:text-corn-flower-blue"
          href="/"
        >
          View spending limits
        </Link>
        <Link
          className="mb-[11px] block text-[14px] font-normal text-neon-purple  transition-all hover:text-corn-flower-blue"
          href="/"
        >
          Switch to invoice
        </Link>
        <Link
          className="mb-[11px] block text-[14px] font-normal text-neon-purple  transition-all hover:text-corn-flower-blue"
          href="/"
        >
          Manage seats
        </Link>
      </div>
    </div>
  );
};

export default BillingCard;
