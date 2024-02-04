// 'use client';

// import { XMarkIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

// import { useLayout, useLayoutActions } from '@/app/providers';

// import AnnotateModal from './annotate';
// import ArchiveModal from './archive';
// import CompleteModal from './complete';
// import DatasetModal from './dataset';
// import ReviewModal from './review';
// import SamplingModal from './sampling';

// const WorkflowModal = () => {
//   const { toolItemWorkflow } = useLayout();
//   const { setToolItemWorkflow } = useLayoutActions();

//   if (!toolItemWorkflow) {
//     return null;
//   }

//   return (
//     <>
//       <div className="flex flex-row items-center justify-between gap-y-2 px-4 py-5">
//         <div className="flex flex-row items-center gap-x-2">
//           <div
//             className={clsx(
//               `flex h-7 w-7 items-center justify-center rounded-full text-white ${toolItemWorkflow.color}`
//             )}
//           >
//             <LazyLoadImage src={toolItemWorkflow.icon} effect="blur" alt="" />
//           </div>
//           <div>
//             <p className="text-base font-bold capitalize text-dark-navy-blue">
//               {toolItemWorkflow.label}
//             </p>
//             <p className="truncate text-xs font-normal capitalize text-dark-navy-blue/50">
//               Stage/ abcdef-12...
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-row gap-x-2">
//           <button
//             type="button"
//             className="flex h-5 w-5 items-center justify-center rounded-full bg-light-purple-grey text-grey-purple-white"
//           >
//             i
//           </button>
//           <button
//             type="button"
//             aria-label="Save"
//             onClick={() => setToolItemWorkflow(null)}
//             className="flex h-5 w-5 items-center justify-center rounded-full bg-light-purple-grey text-grey-purple-white"
//           >
//             <XMarkIcon width={15} height={15} />
//           </button>
//         </div>
//       </div>
//       <div className="h-full w-full">
//         {toolItemWorkflow.type === 'dataset' ? (
//           <DatasetModal />
//         ) : toolItemWorkflow.type === 'annotation' ? (
//           <AnnotateModal />
//         ) : toolItemWorkflow.type === 'archive' ? (
//           <ArchiveModal />
//         ) : toolItemWorkflow.type === 'review' ? (
//           <ReviewModal />
//         ) : toolItemWorkflow.type === 'sampling' ? (
//           <SamplingModal />
//         ) : toolItemWorkflow.type === 'completed' ? (
//           <CompleteModal />
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default WorkflowModal;
