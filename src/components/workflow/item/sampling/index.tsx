// 'use client';

// import React from 'react';
// import { Handle, Position } from 'reactflow';

// import { useLayout } from '@/app/providers';

// interface ItemSamplingProps {
//   isConnectable: boolean;
// }

// const ItemSampling = ({ isConnectable }: ItemSamplingProps) => {
//   const { valuesSampling } = useLayout();
//   return (
//     <div className="block w-52 flex-initial rounded-lg bg-grey-purple-white shadow-sm">
//       <div className="relative block rounded-lg bg-light-slate-grey">
//         <Handle
//           type="target"
//           position={Position.Left}
//           style={{
//             boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
//           }}
//           className="-left-[5px] bg-white p-1"
//           isConnectable={isConnectable}
//           id="0"
//         />
//         <div className="relative flex w-full flex-row items-center justify-center gap-x-4">
//           <div className="absolute inset-x-0 left-6 h-2 w-2 rounded-full bg-silver-sand" />
//           <p className="text-center text-base font-bold capitalize text-grey-purple-white">
//             Sampling
//           </p>
//         </div>
//         <p className="truncate px-8 text-xs font-normal text-white/50">
//           Stage/ abcdef-123456-ddddddddddddddddddddd
//         </p>
//       </div>
//       <div className="flex flex-col items-start justify-center">
//         <div className="relative flex w-full flex-row px-6 py-1">
//           <div className="w-1/2">
//             <p className="text-base font-bold capitalize text-dark-navy-blue">
//               Sample A
//             </p>
//           </div>
//           <div className="w-1/2 text-end">
//             <p className="text-base font-bold capitalize text-dark-navy-blue">
//               {valuesSampling[0]}%
//             </p>
//           </div>
//           <Handle
//             type="source"
//             position={Position.Right}
//             style={{
//               boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
//             }}
//             className="-right-[5px] bg-white p-1"
//             isConnectable={isConnectable}
//             id="1"
//           />
//         </div>
//         <div className="h-[1px] w-full bg-light-slate-grey" />
//         <div className="relative flex w-full flex-row px-6 py-1">
//           <div className="w-1/2">
//             <p className="text-base font-bold capitalize text-dark-navy-blue">
//               Sample B
//             </p>
//           </div>
//           <div className="w-1/2 text-end">
//             <p className="text-base font-bold capitalize text-dark-navy-blue">
//               {100 - valuesSampling[0]}%
//             </p>
//           </div>
//           <Handle
//             type="source"
//             position={Position.Right}
//             style={{
//               boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
//             }}
//             className="-right-[5px] bg-white p-1"
//             isConnectable={isConnectable}
//             id="2"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemSampling;
