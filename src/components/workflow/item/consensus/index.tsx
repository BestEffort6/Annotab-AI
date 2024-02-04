// 'use client';

// import React from 'react';
// import { Handle, Position } from 'reactflow';

// interface ItemConsensusProps {
//   isConnectable: boolean;
// }

// const ItemConsensus = ({ isConnectable }: ItemConsensusProps) => {
//   return (
//     <div className="block w-52 rounded-3xl bg-grey-purple-white shadow-md">
//       <div className="relative block rounded-full bg-purple-grey py-1">
//         <Handle
//           type="target"
//           position={Position.Left}
//           style={{
//             backgroundColor: '#ffffff',
//             padding: '5px',
//             position: 'absolute',
//             top: '20px',
//             left: '-5px',
//             borderRadius: '9999px',
//             border: '1px solid #E9C302',
//             zIndex: '10',
//           }}
//           isConnectable={isConnectable}
//         />
//         <p className="text-center text-base font-bold capitalize text-grey-purple-white">
//           Consensus
//         </p>
//         <p className="truncate px-8 text-xs font-normal text-white/50">
//           Stage/ abcdef-123456-ddddddddddddddddddddd
//         </p>
//         <Handle
//           type="target"
//           position={Position.Right}
//           style={{
//             backgroundColor: '#ffffff',
//             padding: '5px',
//             position: 'absolute',
//             top: '20px',
//             right: '-5px',
//             borderRadius: '9999px',
//             border: '1px solid #E9C302',
//             zIndex: '10',
//           }}
//           isConnectable={isConnectable}
//         />
//       </div>
//       <div className="flex flex-col items-start justify-center px-6">
//         <div className="w-full border-b py-2">
//           <p className="text-base font-bold capitalize text-dark-pastel-green">
//             Accepted
//           </p>
//         </div>
//         <div className="w-full border-b py-2">
//           <p className="text-base font-bold capitalize text-rusty-red">
//             Rejected
//           </p>
//         </div>
//       </div>
//       <div className="px-2 py-2">
//         <button
//           type="button"
//           className="flex w-full items-center justify-center rounded-full bg-purple-grey text-base font-bold text-grey-purple-white"
//         >
//           Add Stage
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ItemConsensus;
