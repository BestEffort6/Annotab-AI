'use client';

import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import PdfDocument from '@/components/annotab/pdf-document';
import useWindowSize from '@/libs/hooks/use-window-size';

import Popup from '../popup';

interface PolicyModalProps {
  loading?: boolean;
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleSave: () => void;
  executeBtn: string;
  size?: '3xl';
  url: string;
}

const Document = dynamic(() => Promise.resolve(PdfDocument), { ssr: false });

const PolicyModal = ({
  loading = false,
  title,
  isOpen,
  setIsOpen,
  handleSave,
  executeBtn,
  size = '3xl',
  url,
}: PolicyModalProps) => {
  const [numPages, setNumPages] = useState<number>(1);
  const { isDesktop } = useWindowSize();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Popup
      bgColor="bg-greyish-blue"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={size}
      forceClose
    >
      <Dialog.Title
        as="h3"
        className="flex w-full items-center justify-center text-center text-2xl font-medium text-dark-navy-blue"
      >
        {title}
      </Dialog.Title>
      <div className="mt-2 flex h-[400px] w-full flex-col rounded-2xl bg-light-purple p-2">
        <div className="w-full overflow-y-auto overflow-x-hidden text-transparent">
          <Document
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            numPages={numPages}
            url={url}
            isDesktop={isDesktop}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-row justify-end">
        <button
          disabled={loading}
          type="button"
          className={clsx(
            loading
              ? 'bg-dark-navy-blue/50 text-gray-500'
              : 'bg-dark-navy-blue text-white hover:bg-dark-navy-blue/80',
            'inline-flex justify-center rounded-full border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
          )}
          onClick={handleSave}
        >
          {executeBtn}
        </button>
      </div>
    </Popup>
  );
};

export default PolicyModal;
