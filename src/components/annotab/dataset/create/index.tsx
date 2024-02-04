'use client';

import { Tab } from '@headlessui/react';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import { useRanger } from 'react-ranger';
import Loading from '../../loading';
import toast from '../../toast';
import CreateDatasetTabList from './tab-list';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Dataset = {
  id: string;
  name: string;
  description: string;
};

const CreateDataset = () => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  // const [values, setValues] = useState([20, 80]);
  const [newDataset] = useState<Dataset>();
  const [datasetFiles] = useState<File[]>([]);
  const [isOpenCreateWorkflow, setIsOpenCreateWorkflow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalSteps] = useState(6);

  // const percentages = useMemo(() => {
  //   if (!values) {
  //     // Handle the case where `values` is undefined (if necessary)
  //     return {
  //       train: 0,
  //       valid: 0,
  //       test: 0,
  //     };
  //   }
  //   const trainPercentage = values[0];
  //   const validPercentage = 100 - (100 - values[1] + values[0]);
  //   const testPercentage = 100 - values[1];

  //   return {
  //     train: trainPercentage,
  //     valid: validPercentage,
  //     test: testPercentage,
  //   };
  // }, [values]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setLoading(true);
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append('files', file as File);
      });

      // fetch(`/api/dataset/upload/${newDataset.id}`, {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       toast({ type: 'error', content: 'Something went wrong' });
      //       throw new Error();
      //     }
      //     return response.json();
      //   })
      //   .then(() => {
      //     toast({ type: 'success', content: 'Files uploaded' });
      //     setDatasetFiles((prev) => [...prev, ...acceptedFiles]);
      //   })
      //   .catch(() => {
      //     toast({ type: 'error', content: 'Something went wrong' });
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    },
    [newDataset]
  );

  const handleNext = () => {
    if (step < totalSteps - 1) {
      switch (step) {
        case 0:
          setStep(step + 1);
          break;
        case 1:
          setStep(step + 1);
          break;
        case 2:
          if (datasetFiles.length > 0) setStep(step + 1);
          else toast({ type: 'error', content: 'Please upload dataset files' });
          break;
        default:
      }
      if (step === 3) {
        router.push(`/`);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
    },
  });

  // const { getTrackProps, segments, handles } = useRanger({
  //   min: 0,
  //   max: 100,
  //   stepSize: 1,
  //   values,
  //   onChange: setValues,
  // });

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ];

  return (
    <>
      {loading && <Loading loading={false} />}
      <div className="flex h-full w-full flex-col px-4 py-2">
        {!isOpenCreateWorkflow && (
          <p className="texte text-base font-semibold capitalize">
            create new dataset
          </p>
        )}
        <form className="flex h-full flex-col gap-y-2 overflow-y-auto p-4">
          <Tab.Group defaultIndex={0} selectedIndex={step}>
            {!isOpenCreateWorkflow && <CreateDatasetTabList step={step} />}
            <Tab.Panels>
              <Tab.Panel>
                <motion.div
                  className="flex h-full flex-col gap-y-3 overflow-y-auto rounded-xl border bg-grey-purple-white px-4 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex w-full flex-col gap-y-3">
                    <div className="w-full">
                      <div className="flex flex-col">
                        <p className="text-lg font-bold text-dark-navy-blue">
                          Title
                        </p>
                        <p className="text-base font-normal text-dark-navy-blue">
                          Type a name for your Project
                        </p>
                      </div>
                      <div className="mt-4">
                        <input
                          name="name"
                          type="text"
                          className={clsx(
                            'focus:border-navyblue w-full rounded-lg border bg-transparent px-4 py-1 text-base font-normal text-dark-navy-blue shadow-inner focus:outline-none focus:ring-0'
                          )}
                          placeholder="Project_1"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex flex-col gap-y-3">
                        <p className="text-lg font-bold text-dark-navy-blue">
                          Train/Validation/ Test Set Split
                        </p>
                        <p className="text-base font-normal text-dark-navy-blue">
                          Here is how you split your images when you added them
                          to the dataset
                        </p>
                      </div>
                      {/* <div className="flex w-full flex-col items-center justify-center gap-y-3 py-4">
                        <div className="flex w-1/2 flex-row items-center justify-between">
                          <div className="flex w-1/3 flex-col items-center justify-center gap-y-1">
                            <p className="text-sm font-normal text-rusty-red">
                              {percentages.train} %
                            </p>
                          </div>
                          <div className="flex w-1/3 flex-col items-center justify-center gap-y-1">
                            <p className="text-sm font-normal text-light-navy">
                              {percentages.valid} %
                            </p>
                          </div>
                          <div className="flex w-1/3 flex-col items-center justify-center gap-y-1">
                            <p className="text-sm font-normal text-soft-violet">
                              {percentages.test} %
                            </p>
                          </div>
                        </div>
                        <div {...getTrackProps()} className="h-2 w-1/2">
                          {segments.map(({ getSegmentProps }, i) => (
                            <div
                              {...getSegmentProps()}
                              className={`h-full rounded-2xl ${
                                i === 0
                                  ? 'bg-rusty-red'
                                  : i === 1
                                    ? 'bg-light-navy'
                                    : 'bg-soft-violet'
                              }`}
                              key={getSegmentProps().key}
                            />
                          ))}
                          {handles.map(({ getHandleProps }) => (
                            <button
                              key={getHandleProps().key}
                              aria-label="Save"
                              type="button"
                              style={getHandleProps().style}
                              onMouseDown={getHandleProps().onMouseDown}
                              onTouchStart={getHandleProps().onTouchStart}
                              tabIndex={getHandleProps().tabIndex}
                              className="h-4 w-4 appearance-none rounded-full border bg-white shadow-sm outline-none"
                            />
                          ))}
                        </div>
                      </div> */}
                    </div>
                    <div className="w-full rounded-lg">
                      <div className="mb-4 flex flex-row justify-between">
                        <p className="text-lg font-bold text-dark-navy-blue">
                          Instruction
                        </p>
                      </div>
                      <ReactQuill
                        readOnly={!!newDataset}
                        theme="snow"
                        className="h-full text-black lg:h-52"
                        placeholder="Add instruction here"
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              </Tab.Panel>
              <Tab.Panel>
                {isOpenCreateWorkflow ? (
                  <motion.div
                    className="flex h-[calc(100vh-10vh)] flex-row justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* <CreateWorkflow /> */}
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex h-[calc(100vh-36vh)] flex-row justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex h-full w-full flex-col justify-start rounded-xl border bg-mostly-white px-4 py-3">
                      <div className="flex w-full flex-row items-center justify-between ">
                        <p className="text-lg font-bold text-dark-navy-blue">
                          Duplicate Template
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsOpenCreateWorkflow(true)}
                          className="flex items-center justify-center rounded-xl border border-dark-navy-blue/10 px-5 py-2 text-sm font-semibold text-dark-navy-blue"
                        >
                          Create New Workflow
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Tab.Panel>
              <Tab.Panel>
                <motion.div
                  className="rounded-4xl flex h-[calc(100vh-45vh)] flex-col justify-center border bg-grey-purple-white p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-2 flex w-full justify-end">
                    <button
                      // onClick={(e) => getRootProps().onClick(e)}
                      type="button"
                      id="button"
                      className="rounded-full border border-transparent bg-purple-grey px-6 py-1 text-base font-bold text-grey-purple-white shadow-sm hover:bg-purple-grey/70 focus:outline-none focus:ring-2 focus:ring-purple-grey focus:ring-offset-2"
                    >
                      Upload Images
                    </button>
                  </div>
                  <div
                    {...getRootProps()}
                    className={clsx(
                      !datasetFiles.length ? 'justify-center' : 'justify-start',
                      'flex h-full w-full flex-col items-center rounded-lg bg-transparent'
                    )}
                  >
                    {!datasetFiles.length ? (
                      <div className="flex flex-col justify-center gap-y-4">
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
                    ) : (
                      <div className="grid grid-cols-8 gap-10 overflow-auto p-4">
                        {datasetFiles.map((file) => (
                          <div
                            className="flex h-[120px] flex-col justify-between"
                            key={file.type}
                          >
                            <LazyLoadImage
                              src={URL.createObjectURL(file)}
                              className="max-h-[100px] rounded-lg"
                            />
                            <p className="line-clamp-1 text-sm font-light">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <input {...getInputProps()} />
                </motion.div>
              </Tab.Panel>
              <Tab.Panel>
                <motion.div
                  className="rounded-4xl flex h-[calc(100vh-45vh)] flex-col gap-y-4 border bg-grey-purple-white p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex w-full justify-end">
                    <button
                      type="button"
                      // onClick={() => setOpenClassModal(true)}
                      className="flex flex-row items-center justify-center gap-x-2 rounded-full border border-transparent bg-purple-grey px-6 py-1 text-base font-bold text-grey-purple-white shadow-sm hover:bg-purple-grey/70 focus:outline-none focus:ring-2 focus:ring-purple-grey focus:ring-offset-2"
                    >
                      <LazyLoadImage src="/images/svg/icon/dataset/icon-plus-greypurplewhite-light.svg" />
                      Create new class
                    </button>
                  </div>
                  <div className="w-full">
                    <table className="w-full table-auto divide-y divide-gray-200 overflow-scroll">
                      <thead className="flex w-full flex-row rounded-t-lg bg-transparent">
                        <tr className="flex w-full">
                          <th className="w-1/5 rounded-sm px-4 py-4 text-left text-lg font-bold tracking-wider text-dark-navy-blue">
                            Class
                          </th>
                          <th className="w-1/5 rounded-sm px-4 py-4 text-left text-lg font-bold tracking-wider text-dark-navy-blue">
                            Annotation class
                          </th>
                          <th className="w-1/5 rounded-sm px-4 py-4 text-left text-lg font-bold tracking-wider text-dark-navy-blue">
                            Sub Annotation Class
                          </th>
                          <th className="w-1/5 rounded-sm px-4 py-4 text-left text-lg font-bold tracking-wider text-dark-navy-blue">
                            Description
                          </th>
                          <th className="w-1/5 rounded-sm px-4 py-4 text-left text-lg font-bold tracking-wider text-dark-navy-blue">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="flex h-[40vh] w-full flex-col justify-start divide-y divide-gray-200 overflow-auto rounded-b-lg bg-transparent">
                        <tr className="flex h-[calc(100vh-55vh)] flex-row justify-center">
                          <td colSpan={15} className="m-auto text-center">
                            No data
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          {!isOpenCreateWorkflow && (
            <div className="mt-3 flex h-[5vh] flex-row justify-between">
              <div className="mt-auto">
                {step !== 0 && step !== 2 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    type="button"
                    className="rounded-full border border-transparent bg-grey-purple-white px-6 py-1 text-sm font-medium text-dark-navy-blue shadow-sm hover:bg-grey-purple-white/75 focus:outline-none focus:ring-2 focus:ring-dark-navy-blue focus:ring-offset-2"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="mt-auto">
                {step !== 1 && (
                  <button
                    onClick={handleNext}
                    type="button"
                    className="rounded-full border border-transparent bg-dark-navy-blue px-6 py-1 text-sm font-medium text-grey-purple-white shadow-sm hover:bg-dark-navy-blue/75 focus:outline-none focus:ring-2 focus:ring-dark-navy-blue focus:ring-offset-2"
                  >
                    {step < 4 ? 'Next' : 'Back to dashboard'}
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateDataset;
