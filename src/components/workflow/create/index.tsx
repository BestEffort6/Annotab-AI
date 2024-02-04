// 'use client';

// import {
//   ChevronDoubleLeftIcon,
//   ChevronDoubleRightIcon,
// } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import type { Connection, Edge, Node } from 'reactflow';
// import ReactFlow, {
//   addEdge,
//   Background,
//   BackgroundVariant,
//   Controls,
//   useEdgesState,
//   useNodesState,
// } from 'reactflow';

// import type { WorkflowListItemProps } from '@/app/providers';
// import { useLayout, useLayoutActions } from '@/app/providers';
// import Loading from '@/components/annotab/loading';
// import toast from '@/components/annotab/toast';

// import ItemAnnotate from '../item/annotate';
// import ItemArchive from '../item/archive';
// import ItemComplete from '../item/complete';
// import ItemDataset from '../item/dataset';
// import ItemReview from '../item/review';
// import ItemSampling from '../item/sampling';
// import WorkflowModal from '../modal';

// const defaultEdgeOptions = {
//   type: 'smoothstep',
//   style: {
//     stroke: '#31374A',
//   },
// };

// interface WorkflowStep {
//   id: string;
//   name: string;
// }

// interface CreateWorkflowProps {
//   step: WorkflowStep;
// }

// const CreateWorkflow = ({ step }: CreateWorkflowProps) => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedSteps, setSelectedSteps] = useState<WorkflowStep[]>([]);
//   const [updatedNodes, setUpdatedNodes] = useState([]);
//   const [loading] = useState(false);

//   const {
//     isOpenItemWorkflow,
//     toolItemWorkflow,
//     isOpenCreateWorkflow,
//     newWorkflow,
//   } = useLayout();

//   const {
//     setIsOpenItemWorkflow,
//     setToolItemWorkflow,
//     setIsOpenCreateWorkflow,
//   } = useLayoutActions();

//   const onConnect = useCallback(
//     (params: Connection | Edge) =>
//       setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
//     [setEdges]
//   );

//   const nodeTypes = useMemo(
//     () => ({
//       dataset: ItemDataset,
//       annotate: ItemAnnotate,
//       review: ItemReview,
//       archive: ItemArchive,
//       sampling: ItemSampling,
//       completed: ItemComplete,
//     }),
//     []
//   );

//   const handleOpen = () => {
//     setIsOpenItemWorkflow(!isOpenItemWorkflow);
//   };

//   const listItem: WorkflowListItemProps[] = [
//     {
//       label: 'dataset',
//       icon: '/images/svg/icon/workflow/icon-dataset-greypuplewhite-light.svg',
//       color: 'bg-vivid-magenta',
//       type: 'dataset',
//     },
//     {
//       label: 'annotation',
//       icon: '/images/svg/icon/workflow/icon-annotation-greypuplewhite-light.svg',
//       color: 'bg-blue-pastel',
//       type: 'annotate',
//     },
//     {
//       label: 'review',
//       icon: '/images/svg/icon/workflow/icon-review-greypuplewhite-light.svg',
//       color: 'bg-chili-red',
//       type: 'review',
//     },
//     {
//       label: 'archive',
//       icon: '/images/svg/icon/workflow/icon-archive-greypuplewhite-light.svg',
//       color: 'bg-neon-purple',
//       type: 'archive',
//     },
//     {
//       label: 'sampling',
//       icon: '/images/svg/icon/workflow/icon-sampling-greypuplewhite-light.svg',
//       color: 'bg-light-navy',
//       type: 'sampling',
//     },

//     {
//       label: 'completed',
//       icon: '/images/svg/icon/model/icon-check-greypuplewhite-light.svg',
//       color: 'bg-dark-pastel-green',
//       type: 'complete',
//     },
//   ];

//   const handleItemClick = (item: WorkflowListItemProps, step: WorkflowStep) => {
//     setToolItemWorkflow(item);
//     setSelectedSteps((prevSelectedSteps: WorkflowStep[]) => [
//       ...prevSelectedSteps,
//       step,
//     ]);
//   };

//   // const createSteps = updatedNodes.map((item) => item.data);

//   useEffect(() => {
//     if (!selectedSteps.some((step) => step.name === 'dataset')) {
//       const datasetStep = step.find((s: WorkflowStep) => s.name === 'dataset');
//       if (datasetStep) {
//         setSelectedSteps([datasetStep, ...selectedSteps]);
//       }
//     }

//     if (selectedSteps) {
//       const nodes = selectedSteps.map((item: any, index: number) => {
//         let type: string;
//         switch (item.name) {
//           case 'dataset':
//             type = 'dataset';
//             break;
//           case 'annotate':
//             type = 'annotate';
//             break;
//           case 'review':
//             type = 'review';
//             break;
//           case 'archive':
//             type = 'archive';
//             break;
//           case 'sampling':
//             type = 'sampling';
//             break;
//           default:
//             type = 'completed';
//             break;
//         }
//         const uniqueNodeId = `${item.id}_${index + 1}`;
//         return {
//           id: uniqueNodeId,
//           type,
//           data: {
//             steps: { ...item },
//           },
//           position: { x: (index + 1) * 300, y: 300 },
//         };
//       });

//       setNodes(nodes);
//     }
//   }, [selectedSteps, newWorkflow]);

//   // eslint-disable-next-line consistent-return
//   const processEdgesAndNodes = (
//     edges: any[],
//     nodes: Node<any, string | undefined>[]
//     // eslint-disable-next-line consistent-return
//   ) => {
//     try {
//       const nodeMap = nodes.reduce((map: any, node: any) => {
//         map[node.id] = { ...node };
//         return map;
//       }, {});

//       let currentGroup = 1;
//       let currentOrder = 1;

//       const updateSourceNode = (sourceNode: any) => {
//         if (!sourceNode.data.group) {
//           sourceNode.data.group = currentGroup;
//           sourceNode.data.order = currentOrder;
//           sourceNode.data.parentGroup = null;
//           sourceNode.data.parentOrder = null;
//         } else {
//           currentGroup = sourceNode.data.group;
//           currentOrder += 1;
//         }
//       };

//       const updateTargetNode = (targetNode: any, sourceNode: any) => {
//         const sourceGroup =
//           sourceNode && sourceNode.data.type !== 'dataset'
//             ? sourceNode.data.group
//             : null;

//         targetNode.data.parentGroup = sourceGroup;
//         targetNode.data.parentOrder = sourceNode?.data.order;

//         targetNode.data.group =
//           sourceGroup !== null ? sourceGroup + 1 : currentGroup;

//         const similarGroupNodes = nodes.filter(
//           (node: any) => node.data.group === targetNode.data.group
//         );

//         targetNode.data.order =
//           similarGroupNodes.length > 1 ? (currentOrder += 1) : 1;
//       };

//       edges.forEach((edge: any) => {
//         const sourceNode = nodeMap[edge.source];
//         const targetNode = nodeMap[edge.target];

//         if (sourceNode) {
//           updateSourceNode(sourceNode);
//         }

//         if (targetNode) {
//           updateTargetNode(targetNode, sourceNode);
//         }

//         const matchingEdge = edges.find((e: any) => e.target === edge.id);
//         if (matchingEdge) {
//           const matchingSourceNode = nodeMap[matchingEdge.source];
//           if (
//             matchingSourceNode &&
//             matchingSourceNode.data.parentGroup !== null
//           ) {
//             edge.group = matchingSourceNode.data.parentGroup + 1;
//           }
//         }

//         const childCount = nodes.filter(
//           (node: any) => node.data.group === currentGroup
//         ).length;

//         if (childCount === currentOrder - 1) {
//           currentOrder += 1;

//           currentOrder = 1;
//         }
//       });

//       return Object.values(nodeMap);
//     } catch (error) {
//       toast({
//         type: 'error',
//         content: 'Something when wrong',
//       });
//     }
//   };

//   useEffect(() => {
//     if (edges && nodes) {
//       setUpdatedNodes(processEdgesAndNodes(edges, nodes));
//     }
//   }, [edges, nodes]);

//   return (
//     <>
//       {loading && <Loading loading={false} />}
//       <div className="flex h-full w-full flex-col">
//         <div className="relative flex h-full w-full rounded-xl bg-grey-purple-white p-2">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             nodeTypes={nodeTypes}
//             defaultEdgeOptions={defaultEdgeOptions}
//             nodesDraggable={false}
//             fitView
//           >
//             <Background
//               variant={BackgroundVariant.Dots}
//               className="rounded-xl border bg-white shadow-inner"
//             />
//             <Controls className="bg-white" />
//           </ReactFlow>
//           {!newWorkflow && (
//             <div
//               className={clsx(
//                 'absolute right-4 top-4 rounded-2xl bg-grey-purple-white',
//                 isOpenItemWorkflow ? null : 'w-64',
//                 toolItemWorkflow ? 'bottom-4 w-64' : null
//               )}
//             >
//               <div
//                 className={clsx(
//                   'relative flex h-full flex-col',
//                   !toolItemWorkflow ? 'px-4 py-5' : null
//                 )}
//               >
//                 {!toolItemWorkflow ? (
//                   <div>
//                     {listItem.map((listItem) => {
//                       const matchingListItem = step.find(
//                         (step: WorkflowStep) => step.name === listItem.type
//                       );

//                       const isStepSelected = selectedSteps.some(
//                         (selectedStep) => selectedStep.name === listItem.type
//                       );

//                       const shouldHideButton =
//                         isStepSelected &&
//                         ['dataset', 'archive', 'complete'].includes(
//                           listItem.type
//                         );

//                       return (
//                         <div key={listItem.label}>
//                           {!shouldHideButton && matchingListItem && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 handleItemClick(listItem, matchingListItem)
//                               }
//                               key={listItem.label}
//                               className={clsx(
//                                 `flex flex-row items-center justify-start gap-x-3 border border-transparent p-2 hover:rounded-full hover:border hover:border-dark-navy-blue/5 hover:shadow-inner`
//                               )}
//                             >
//                               <div
//                                 className={clsx(
//                                   `flex h-7 w-7 items-center justify-center rounded-full text-white ${listItem.color}`
//                                 )}
//                               >
//                                 <LazyLoadImage
//                                   src={listItem.icon}
//                                   effect="blur"
//                                   alt=""
//                                 />
//                               </div>
//                               {!isOpenItemWorkflow ? (
//                                 <p className="text-base font-bold capitalize text-dark-navy-blue">
//                                   {listItem.label}
//                                 </p>
//                               ) : null}
//                             </button>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <WorkflowModal />
//                 )}
//                 <button
//                   type="button"
//                   onClick={handleOpen}
//                   className="absolute inset-y-0 left-0 my-auto h-24 w-5 rounded-l-sm rounded-r-xl bg-purple-grey/20 text-purple-grey"
//                 >
//                   {!isOpenItemWorkflow ? (
//                     <ChevronDoubleRightIcon width={18} height={18} />
//                   ) : (
//                     <ChevronDoubleLeftIcon width={18} height={18} />
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="flex flex-row items-center justify-between py-3">
//           <button
//             type="button"
//             onClick={() => setIsOpenCreateWorkflow(!isOpenCreateWorkflow)}
//             className="flex items-center justify-center rounded-full border bg-grey-purple-white px-8 py-1 text-base font-bold text-dark-navy-blue shadow-inner shadow-dark-navy-blue/20"
//           >
//             Back
//           </button>
//           <button
//             type="button"
//             className="flex items-center justify-center rounded-full border bg-dark-navy-blue px-8 py-1 text-base font-bold text-grey-purple-white shadow-inner shadow-grey-purple-white/20"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
// export default CreateWorkflow;
