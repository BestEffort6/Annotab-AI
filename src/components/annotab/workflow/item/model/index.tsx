// 'use client';

// import { Combobox, Transition } from '@headlessui/react';
// import React, { Fragment, useState } from 'react';
// import { Handle, Position } from 'reactflow';

// import { useLayout, useLayoutActions } from '@/app/providers';

// interface SelectedItem {
//   id: string;
// }
// interface SelectedModel {
//   id: string;
//   name: string;
//   color: string;
// }

// interface Person {
//   id: string;
//   name: string;
// }

// interface ItemModelProps {
//   isConnectable: boolean;
//   data: Person[];
// }

// const ItemModel = ({ isConnectable, data }: ItemModelProps) => {
//   const { showModelWorkflow } = useLayout();
//   const { setShowModelWorkflow } = useLayoutActions();
//   const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
//   const selectedModel: SelectedModel | undefined = data.find(
//     (item: { id: string }) => item.id === showModelWorkflow
//   );

//   const handleConnectModel = () => {
//     if (selectedItem) {
//       setShowModelWorkflow(selectedItem?.id);
//     }
//   };

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
//           />
//           <div className="relative flex w-full flex-row items-center justify-center gap-x-4">
//             <div className="absolute inset-x-0 left-6 h-2 w-2 rounded-full bg-silver-sand" />
//             <p className="text-center text-base font-bold capitalize text-grey-purple-white">
//               Model
//             </p>
//           </div>
//           <p className="truncate px-8 text-xs font-normal text-white/50">
//             Stage/ abcdef-123456-ddddddddddddddddddddd
//           </p>
//           <Handle
//             type="source"
//             position={Position.Right}
//             style={{
//               boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
//             }}
//             className="-right-[5px] bg-white p-1"
//             isConnectable={isConnectable}
//             id="b"
//           />
//         </div>

//         <div className="px-2 py-2">
//           <Combobox
//             value={selectedItem}
//             onChange={(item: any) => setSelectedItem(item)}
//           >
//             <div className="relative">
//               <div className="focus-visible:none focus-visible:none w-full cursor-default overflow-hidden rounded-full bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm">
//                 <Combobox.Input
//                   style={{
//                     backgroundColor: selectedModel?.color,
//                   }}
//                   className="w-full rounded-full border px-3 py-1 text-sm leading-5 text-gray-900 shadow-inner focus:ring-0"
//                   displayValue={(item: any) =>
//                     selectedModel?.name || (item ? item.name : '')
//                   }
//                   placeholder="Searching"
//                 />
//               </div>
//               <Transition
//                 as={Fragment}
//                 leave="transition ease-in duration-100"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-greyish py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
//                   {data.length === 0 ? (
//                     <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
//                       Nothing found.
//                     </div>
//                   ) : (
//                     data.map((person: Person) => (
//                       <Combobox.Option
//                         key={person.id}
//                         className={({ active }) =>
//                           `relative cursor-default select-none p-2 ${
//                             active
//                               ? 'bg-silver-sand text-white'
//                               : 'text-gray-900'
//                           }`
//                         }
//                         value={person}
//                       >
//                         {({ selected }) => (
//                           <span
//                             className={`block truncate ${
//                               selected ? 'font-medium' : 'font-normal'
//                             }`}
//                           >
//                             {person.name}
//                           </span>
//                         )}
//                       </Combobox.Option>
//                     ))
//                   )}
//                 </Combobox.Options>
//               </Transition>
//             </div>
//           </Combobox>
//         </div>
//       </div>
//       <div className="flex w-full flex-col items-start justify-center px-2 py-2">
//         <button
//           type="button"
//           onClick={handleConnectModel}
//           className="w-full rounded-lg bg-light-slate-grey"
//         >
//           <p className="text-base font-bold text-grey-purple-white">
//             Connect Model
//           </p>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ItemModel;
