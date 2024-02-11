import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

import Popup from '../popup';

const ConfirmModal = ({
  loading = false,
  isOpen,
  setIsOpen,
  handleSave,
  title,
  description,
  executeBtn,
  cancelBtn,
  size = 'md',
}: {
  loading?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSave: () => void;
  title: string;
  description: string;
  executeBtn: string;
  cancelBtn: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}) => {
  return (
    <Popup
      bgColor="bg-grey-purple-white"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={size}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        {title}
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="mt-4 flex flex-row justify-between">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
          onClick={() => setIsOpen(false)}
        >
          {cancelBtn}
        </button>
        <button
          disabled={loading}
          type="button"
          className={clsx(
            loading
              ? 'bg-gray-300 text-gray-500'
              : 'bg-purple-grey text-white hover:bg-purple-grey/80',
            'inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          )}
          onClick={handleSave}
        >
          {executeBtn}
        </button>
      </div>
    </Popup>
  );
};

export default ConfirmModal;
