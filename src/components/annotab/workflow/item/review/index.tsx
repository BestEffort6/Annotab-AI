'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';

interface ItemReviewProps {
  isConnectable: boolean;
  data: {
    data: any[];
    steps: {
      id: string;
    };
  };
}
const ItemReview = ({ isConnectable, data }: ItemReviewProps) => {
  return (
    <div className="block w-52 rounded-lg bg-gainsboro shadow-sm">
      <div className="flex flex-col rounded-lg bg-grey-purple-white">
        <div className="relative block rounded-lg bg-light-slate-grey">
          <Handle
            type="target"
            position={Position.Left}
            style={{
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            }}
            className="-left-[5px] bg-white p-1"
            isConnectable={isConnectable}
            id="0"
          />
          <div className="relative flex w-full flex-row items-center justify-center gap-x-4">
            <div className="absolute inset-x-0 left-6 h-2 w-2 rounded-full bg-silver-sand" />
            <p className="text-center text-base font-bold capitalize text-grey-purple-white">
              Review
            </p>
          </div>
          {data && data.data && data.data.length > 0 ? (
            <p className="truncate px-8 text-xs font-normal text-white/50">
              Stage / {data.steps.id}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-start justify-center">
          <div className="relative w-full px-6 py-1">
            <p className="text-base font-bold capitalize text-dark-pastel-green">
              Accepted
            </p>
            <Handle
              type="source"
              position={Position.Right}
              style={{
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
              }}
              className="-right-[5px] bg-white p-1"
              isConnectable={isConnectable}
              id="1"
            />
          </div>
          <div className="h-[1px] w-full bg-light-slate-grey" />
          <div className="relative w-full px-6 py-1">
            <p className="text-base font-bold capitalize text-rusty-red">
              Rejected
            </p>
            <Handle
              type="source"
              position={Position.Right}
              style={{
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
              }}
              className="-right-[5px] bg-white p-1"
              isConnectable={isConnectable}
              id="2"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center px-6 py-1">
        <p className="text-base font-medium capitalize text-dark-navy-blue">
          Anyone
        </p>
      </div>
    </div>
  );
};

export default ItemReview;
