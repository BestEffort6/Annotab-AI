import Link from 'next/link';
import { Fragment, useMemo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SettingsSidebar = () => {
  const menuItems = useMemo(
    () => [
      {
        value: 'General',
        link: '/settings/general',
      },
      {
        value: 'Appearance',
        link: '/settings/appearance',
      },
      {
        value: 'Notification',
        link: '/settings/notification',
        horizontalLine: true,
      },
      {
        parentLabel: 'Access',
        value: 'Account',
        link: '/settings/access/account',
        horizontalLine: true,
      },
      {
        value: 'Dataset Management',
        link: '/settings/dataset-management',
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
      <div className="mb-10 flex">
        <Link
          href="/"
          className="mx-auto rounded-lg border border-gray-100 bg-gray-100 px-8 py-1 text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
        >
          Back to workspace
        </Link>
      </div>
      <div className="mb-12 flex flex-row gap-x-4">
        <LazyLoadImage
          alt="workspace logo"
          effect="blur"
          src="/images/no-image.png"
          className="mx-auto h-20 w-20 rounded-full border object-cover shadow-lg"
        />
        <p className="my-auto text-lg font-semibold text-dark-navy-blue">
          Workspace Name
        </p>
      </div>
      <div className="flex flex-col justify-between gap-y-2">
        {menuItems.map((item) => (
          <Fragment key={item.value}>
            {item.parentLabel && (
              <p className="text-sm text-gray-500">{item.parentLabel}</p>
            )}
            <Link
              href={item.link}
              className="rounded-lg px-4 py-1 text-base font-bold text-dark-navy-blue hover:bg-gray-100"
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
