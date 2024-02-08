import Link from 'next/link';
import { Fragment, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SettingsSidebar = ({ currentRoute }: any) => {
  const menuItems = useMemo(
    () => [
      {
        value: 'General',
        link: '/settings/general',
        horizontalLine: true,
      },
      {
        parentLabel: 'Access',
        value: 'Account',
        link: '/settings/account',
      },
      {
        value: 'Role and Permission',
        link: '/settings/role-permission',
        horizontalLine: true,
      },
      {
        value: 'Dataset Management',
        link: '/settings/dataset-management',
        horizontalLine: true,
      },
      {
        parentLabel: 'Billing and Plans',
        value: 'Billing',
        link: '/settings/billing',
      },
    ],
    []
  );

  return (
    <div className="w-1/4 px-4 pt-6 text-black 2xl:w-1/6">
      <Link
        href="/"
        className="mb-[30px] block w-full max-w-[180px] rounded-lg border border-gray-100 bg-gray-100 px-2 py-1 text-center text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
      >
        Back to workspace
      </Link>
      <div className="mb-[38px] flex items-center gap-[15px]">
        <LazyLoadImage
          alt="Owner logo"
          effect="blur"
          src="/images/no-image.png"
          className="h-[43px] w-[43px] rounded-full object-cover"
        />
        <p className="text-[14px] font-[600] text-dark-navy-blue">Owner</p>
      </div>
      <div className="flex flex-col justify-between gap-y-2">
        {menuItems.map((item) => (
          <Fragment key={item.value}>
            {item.parentLabel && (
              <p className="mb-[13px] text-[12px] font-[600] text-dark-navy-blue">
                {item.parentLabel}
              </p>
            )}
            <Link
              href={item.link}
              className={`relative rounded-lg py-[6px] pl-[27px] pr-[10px] text-[14px] font-normal text-dark-navy-blue hover:bg-[#E0E0E8] ${
                currentRoute === item.link
                  ? "active bg-[#E0E0E8] after:absolute after:left-[2px] after:top-[50%] after:h-[70%] after:w-[6px] after:translate-y-[-50%] after:rounded-[4rem] after:bg-neon-purple after:content-['']"
                  : ''
              }`}
            >
              {item.value}
            </Link>
            {item.horizontalLine && <hr className="my-2" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SettingsSidebar;
