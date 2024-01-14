'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface Item {
  link: string;
  icon: JSX.Element;
}

const SidebarItem = ({ item }: { item: Item }) => {
  const router = usePathname();
  const { icon, link } = item;

  return (
    <Link
      href={link}
      className={clsx(
        router === link
          ? 'bg-grey-purple-white text-dark-navy-blue'
          : 'bg-light-purple-grey text-grey-purple-white',
        'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-left transition-all duration-1000 ease-in-out hover:bg-grey-purple-white hover:text-dark-navy-blue'
      )}
    >
      <span className="h-[25px] w-[25px]">{icon}</span>
    </Link>
  );
};

export default SidebarItem;
