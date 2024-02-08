'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export interface Item {
  value: string;
  link: string;
  src: string;
  srcActive?: string;
}

const SidebarItem = ({ item, isOpen }: { item: Item; isOpen: boolean }) => {
  const router = usePathname();
  const { src, link, value, srcActive } = item;

  return (
    <div
      className={clsx(
        'relative flex w-full flex-col items-start justify-center',
        router === link ? 'pl-2' : 'px-2'
      )}
    >
      {router === link && (
        <>
          <b className="absolute -top-6 right-0 z-0 h-6 w-full bg-light-greyish" />
          <b className="absolute -top-6 right-0 z-0 h-6 w-full rounded-br-2xl bg-mostly-white" />
        </>
      )}
      <Link
        href={link}
        className={clsx(
          'flex-row gap-x-2',
          router === link
            ? 'h-11 w-full items-center justify-start rounded-l-full bg-light-greyish pl-4 text-neon-purple'
            : isOpen
              ? 'h-11 w-full items-center justify-start bg-transparent pl-4 text-dark-navy-blue duration-75 hover:text-dark-navy-blue dark:bg-light-purple-grey'
              : 'h-11 w-11 items-center justify-start bg-transparent pl-[13px] duration-75 dark:bg-light-purple-grey',
          'z-10 flex transition-all ease-in-out'
        )}
      >
        <div className="flex items-center justify-center">
          {router === link ? (
            <LazyLoadImage src={srcActive} effect="blur" />
          ) : (
            <LazyLoadImage src={src} effect="blur" />
          )}
        </div>
        {isOpen && <p className="text-base font-normal">{value}</p>}
      </Link>
      {router === link && (
        <>
          <b className="absolute right-0 top-11 z-0 h-6 w-full bg-light-greyish" />
          <b className="absolute right-0 top-11 z-0 h-6 w-full rounded-tr-2xl bg-mostly-white" />
        </>
      )}
    </div>
  );
};

export default SidebarItem;
