import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const SettingsNavbar = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 flex h-16 w-full flex-row border-b bg-mostly-white dark:bg-light-purple-grey">
      <div className="flex w-1/3">
        <LazyLoadImage
          src="/images/svg/logo-icon-dark.svg"
          wrapperClassName="w-11 h-11 z-20 cursor-pointer my-auto ml-3"
          effect="blur"
          onClick={() => router.push('/')}
        />
      </div>
      <div className="flex w-1/3 flex-row items-center justify-center">
        <form className="w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-2xl bg-light-greyish px-4 py-2 text-black shadow-inner shadow-black/10 placeholder:text-base placeholder:font-medium placeholder:text-black/50 focus:outline-none focus:ring-1 focus:ring-purple-navy-blue focus:ring-opacity-50"
          />
        </form>
      </div>
      <div className="flex w-1/3 flex-row items-center justify-end gap-x-8 px-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-light-greyish text-grey-purple-white dark:bg-purple-grey">
          <LazyLoadImage
            alt="notification"
            effect="blur"
            src="/images/svg/icon/top-bar/icon-bell-greypuplewhite-light.svg"
          />
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex h-11 w-11 flex-col items-center justify-center rounded-full bg-light-greyish text-grey-purple-white dark:bg-purple-grey">
              <LazyLoadImage src="/images/svg/icon/top-bar/icon-person-greypuplewhite-light.svg" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-30 mt-3 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  <button
                    type="button"
                    onClick={() =>
                      signOut({
                        callbackUrl: '/sign-in',
                      })
                    }
                    className="w-full rounded-md px-4 py-2 text-base font-normal text-black hover:bg-purple-grey/80 hover:text-grey-purple-white"
                  >
                    Sign Out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default SettingsNavbar;
