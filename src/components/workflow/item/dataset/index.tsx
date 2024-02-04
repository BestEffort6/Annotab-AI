// 'use client';

// import React from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { Handle, Position } from 'reactflow';

// interface ItemDatasetProps {
//   isConnectable: boolean;
//   data: {
//     data: any[];
//     steps: {
//       id: string;
//     };
//   };
// }

// const ItemDataset = ({ isConnectable, data }: ItemDatasetProps) => {
//   return (
//     <div className="block w-52 rounded-lg bg-grey-purple-white shadow-sm">
//       <div className="relative block rounded-lg bg-light-slate-grey">
//         <div className="relative flex w-full flex-row items-center justify-center gap-x-4">
//           <div className="absolute inset-x-0 left-6 h-2 w-2 rounded-full bg-silver-sand" />
//           <p className="text-center text-base font-bold capitalize text-grey-purple-white">
//             Dataset
//           </p>
//         </div>
//         {data && data.data && data.data.length > 0 && (
//           <p className="truncate px-8 text-xs font-normal text-white/50">
//             Stage / {data.steps.id}
//           </p>
//         )}
//         <Handle
//           type="source"
//           position={Position.Right}
//           style={{
//             boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
//           }}
//           className="-right-[5px] bg-white p-1"
//           isConnectable={isConnectable}
//           id="0"
//         />
//       </div>
//       <div className="flex flex-row items-center justify-between px-3 py-3">
//         {data && data.data && data.data.length > 0 ? (
//           <>
//             <LazyLoadImage
//               src={data.data[0].file.url}
//               alt="Picture of the author"
//               className="h-14 w-14 rounded-lg border object-cover"
//               effect="blur"
//             />
//             <LazyLoadImage
//               src={
//                 data.data[1] ? data.data[1].file.url : '/images/no-image.png'
//               }
//               className="h-14 w-14 rounded-lg border object-cover"
//               alt=""
//               effect="blur"
//             />
//             <LazyLoadImage
//               src={
//                 data.data[2] ? data.data[2].file.url : '/images/no-image.png'
//               }
//               className="h-14 w-14 rounded-lg border object-cover"
//               alt=""
//               effect="blur"
//             />
//           </>
//         ) : (
//           <>
//             <LazyLoadImage
//               src="/images/no-image.png"
//               alt="Picture of the author"
//               className="h-14 w-14 rounded-lg border object-cover"
//               effect="blur"
//             />
//             <LazyLoadImage
//               src="/images/no-image.png"
//               className="h-14 w-14 rounded-lg border object-cover"
//               alt=""
//               effect="blur"
//             />
//             <LazyLoadImage
//               src="/images/no-image.png"
//               className="h-14 w-14 rounded-lg border object-cover"
//               alt=""
//               effect="blur"
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ItemDataset;
