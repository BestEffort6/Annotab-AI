import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';

export default function Popup({
  isOpen,
  setIsOpen,
  children,
  size = 'md',
  forceClose = false,
  bgColor,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  forceClose?: boolean;
  bgColor: string;
}) {
  const closePopup = () => {
    if (forceClose) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity" />
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto shadow"
          onClose={closePopup}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  size === 'xs' && 'sm:max-w-xs',
                  size === 'sm' && 'sm:max-w-sm',
                  size === 'md' && 'sm:max-w-md',
                  size === 'lg' && 'sm:max-w-lg',
                  size === 'xl' && 'sm:max-w-xl',
                  size === '2xl' && 'sm:max-w-2xl',
                  size === '3xl' && 'sm:max-w-3xl',
                  size === '4xl' && 'sm:max-w-4xl',
                  size === '5xl' && 'sm:max-w-5xl',
                  size === '6xl' && 'sm:max-w-6xl',
                  `my-8 inline-block w-full transform overflow-hidden rounded-2xl ${bgColor} p-6 text-left align-middle shadow-xl transition-all`
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
