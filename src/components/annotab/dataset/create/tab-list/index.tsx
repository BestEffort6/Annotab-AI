import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const CreateDatasetTabList = ({ step }: { step: number }) => {
  return (
    <Tab.List as="div" className="mb-3 flex w-full flex-row justify-center">
      <Tab as="div" className="w-1/6 focus:outline-none focus:ring-0">
        <div className="relative mb-2">
          <button
            aria-label="Save"
            type="button"
            className="mx-auto flex h-10 w-10 cursor-auto items-center justify-center rounded-full bg-light-slate-grey text-lg text-white"
          >
            <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-title-greypuplewhite-light.svg" />
          </button>
        </div>

        <div className="text-center text-sm font-normal">Configuration</div>
      </Tab>

      <Tab as="div" className="w-1/6 focus:outline-none focus:ring-0">
        <div className="relative mb-2">
          <div
            className="align-center absolute flex content-center items-center align-middle"
            style={{
              width: 'calc(100% - 2.5rem - 1rem)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="align-center w-full flex-1 items-center rounded bg-gray-200 align-middle">
              <motion.div
                className={clsx(
                  'w-0 rounded py-0.5',
                  step > 1
                    ? 'bg-red-400'
                    : 'bg-gradient-to-r from-purple-grey to-silver-sand'
                )}
                initial={{ width: 0 }}
                animate={{
                  width: step > 0 ? '100%' : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.button
            type="button"
            className="mx-auto flex h-10 w-10 cursor-auto items-center justify-center rounded-full border text-lg shadow-inner"
            animate={{
              backgroundColor: step > 0 ? '#BBBCCC' : '#F5F5F9',
            }}
          >
            {step > 0 ? (
              <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-workflow-greypuplewhite-light.svg" />
            ) : (
              <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-workflow-darknavyblue-light.svg" />
            )}
          </motion.button>
        </div>

        <div className="text-center text-xs md:text-base">Workflow</div>
      </Tab>

      <Tab as="div" className="w-1/6 focus:outline-none focus:ring-0">
        <div className="relative mb-2">
          <div
            className="align-center absolute flex content-center items-center align-middle"
            style={{
              width: 'calc(100% - 2.5rem - 1rem)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="align-center w-full flex-1 items-center rounded bg-gray-200 align-middle">
              <motion.div
                className={clsx(
                  'w-0 rounded py-0.5',
                  step > 2
                    ? 'bg-purple-grey'
                    : 'bg-gradient-to-r from-purple-grey to-silver-sand'
                )}
                initial={{ width: 0 }}
                animate={{ width: step > 1 ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.button
            type="button"
            className="mx-auto flex h-10 w-10 cursor-auto items-center justify-center rounded-full text-lg text-white"
            animate={{
              backgroundColor: step > 1 ? '#535572' : '#F5F5F9',
            }}
          >
            {step > 1 ? (
              <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-data-greypuplewhite-light.svg" />
            ) : (
              <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-data-darknavyblue-light.svg" />
            )}
          </motion.button>
        </div>
        <div className="text-center text-xs md:text-base">Data</div>
      </Tab>
      <Tab as="div" className="w-1/6 focus:outline-none focus:ring-0">
        <div className="relative mb-2">
          <div
            className="align-center absolute flex content-center items-center align-middle"
            style={{
              width: 'calc(100% - 2.5rem - 1rem)',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="align-center w-full flex-1 items-center rounded bg-gray-200 align-middle">
              <motion.div
                className={clsx(
                  'w-0 rounded py-0.5',
                  step > 3
                    ? 'bg-purple-grey'
                    : 'bg-gradient-to-r from-purple-grey to-silver-sand'
                )}
                initial={{ width: 0 }}
                animate={{ width: step > 2 ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.button
            type="button"
            className="mx-auto flex h-10 w-10 cursor-auto items-center justify-center rounded-full text-lg text-white"
            animate={{
              backgroundColor: step > 2 ? '#535572' : '#F5F5F9',
            }}
          >
            {step > 2 ? (
              <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-class-greypuplewhite-light.svg" />
            ) : (
              <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-class-darknavyblue-light.svg" />
            )}
          </motion.button>
        </div>

        <div className="text-center text-xs md:text-base">Classes</div>
      </Tab>
    </Tab.List>
  );
};

export default CreateDatasetTabList;
