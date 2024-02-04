// 'use client';

// import React from 'react';
// import { Handle, Position } from 'reactflow';

// interface ItemAnnotateProps {
//   isConnectable: boolean;
//   data: {
//     data: any[];
//     steps: {
//       id: string;
//     };
//   };
// }

// const ItemAnnotate = ({ isConnectable, data }: ItemAnnotateProps) => {
//   return (
//     <div className="block w-52 flex-initial rounded-lg bg-gainsboro shadow-sm">
//       <div className="w-full rounded-lg bg-grey-purple-white shadow-sm">
//         <div className="relative block rounded-lg bg-light-slate-grey">
//           <Handle
//             type="target"
//             position={Position.Left}
//             style={{
//               boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
//             }}
//             className="-left-[5px] bg-white p-1"
//             isConnectable={isConnectable}
//             id="1"
//           />
//           <div className="relative flex w-full flex-row items-center justify-center gap-x-4">
//             <div className="absolute inset-x-0 left-6 h-2 w-2 rounded-full bg-silver-sand" />
//             <p className="text-center text-base font-bold capitalize text-grey-purple-white">
//               Annotation
//             </p>
//           </div>
//           {data && data.data && data.data.length > 0 ? (
//             <p className="truncate px-8 text-xs font-normal text-white/50">
//               Stage / {data.steps.id}
//             </p>
//           ) : null}
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
//         <div className="px-6 py-1">
//           <p className="text-base font-medium capitalize text-dark-navy-blue">
//             Any Classes
//           </p>
//         </div>
//       </div>
//       <div className="flex flex-col items-start justify-center px-6 py-1">
//         <p className="text-base font-medium capitalize text-dark-navy-blue">
//           Anyone
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ItemAnnotate;
