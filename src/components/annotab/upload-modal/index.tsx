import { Dialog, Transition } from '@headlessui/react';
import {
  DocumentMagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import toast from '@/components/annotab/toast';

interface UploadDataModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setDatasetFiles: any;
  setLoading: (loading: boolean) => void;
  datasetId: string;
}

const UploadDataModal = ({
  isOpen,
  setIsOpen,
  setDatasetFiles,
  setLoading,
  datasetId,
}: UploadDataModalProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setLoading(true);
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append('files', file as File);
      });

      fetch(`/api/dataset/upload/${datasetId}`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          toast({ type: 'success', content: 'Files uploaded' });
          setDatasetFiles((prev: any) => [...prev, ...acceptedFiles]);
          setIsOpen(false);
        })
        .catch(() => {
          toast({ type: 'error', content: 'Something went wrong' });
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [datasetId, setDatasetFiles, setIsOpen, setLoading]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  });
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="z-1 relative"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Upload Data
                  </Dialog.Title>
                  <div className="rounded-md hover:bg-slate-300">
                    <XMarkIcon
                      width={20}
                      height={20}
                      className="m-1"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                </div>
                <div
                  {...getRootProps()}
                  className="flex max-h-[calc(100vh-500px)] w-full flex-col items-center justify-center rounded-lg bg-white"
                >
                  <div className="flex h-[calc(100vh-500px)] flex-col justify-center gap-y-4">
                    <div className="flex flex-row justify-center">
                      <button
                        type="button"
                        id="button"
                        aria-label="Save"
                        className="focus:shadow-outline mt-2 rounded-lg bg-[#EDF1F9] p-3 hover:bg-gray-300 focus:outline-none"
                      >
                        <DocumentMagnifyingGlassIcon className="text-navyblue h-10 w-10" />
                      </button>
                    </div>
                    <p className="mb-3 text-center font-normal text-gray-900">
                      <span>Click to browse or drag and drop</span>
                      <br />
                      <span>Supported files: JPG, PNG, JPEG, WEBP</span>
                    </p>
                  </div>

                  <input {...getInputProps()} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UploadDataModal;
