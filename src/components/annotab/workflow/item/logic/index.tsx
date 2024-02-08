'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';

interface ItemLogicProps {
  isConnectable: boolean;
}

const ItemLogic = ({ isConnectable }: ItemLogicProps) => {
  return (
    <div className="block w-80 rounded-3xl bg-grey-purple-white shadow-md">
      <div className="relative block rounded-full bg-purple-grey py-1">
        <Handle
          type="target"
          position={Position.Left}
          style={{
            backgroundColor: '#ffffff',
            padding: '5px',
            position: 'absolute',
            top: '20px',
            left: '-5px',
            borderRadius: '9999px',
            border: '1px solid #E9C302',
            zIndex: '10',
          }}
          isConnectable={isConnectable}
        />
        <p className="text-center text-base font-bold capitalize text-grey-purple-white">
          Logic
        </p>
        <p className="truncate px-8 text-xs font-normal text-white/50">
          Stage/ abcdef-123456-ddddddddddddddddddddd
        </p>
        <Handle
          type="target"
          position={Position.Right}
          style={{
            backgroundColor: '#ffffff',
            padding: '5px',
            position: 'absolute',
            top: '20px',
            right: '-5px',
            borderRadius: '9999px',
            border: '1px solid #E9C302',
            zIndex: '10',
          }}
          isConnectable={isConnectable}
        />
      </div>
      <div className="flex flex-row gap-x-5 px-2 py-2">
        <div className="rounded-lg border bg-light-purple-grey px-2">
          <p className="text-base font-bold text-grey-purple-white">If</p>
        </div>
        <p className="text-base font-bold text-dark-navy-blue">Annotation</p>
        <div className="rounded-lg border bg-light-purple-grey px-2">
          <p className="text-base font-bold text-grey-purple-white">Is</p>
        </div>
      </div>
      <div className="flex flex-row gap-x-5 px-2 py-2">
        <div className="rounded-lg border bg-light-purple-grey px-2">
          <p className="text-base font-bold text-grey-purple-white">Else</p>
        </div>
        <p className="text-base font-bold text-dark-navy-blue">Annotation</p>
      </div>
    </div>
  );
};

export default ItemLogic;
