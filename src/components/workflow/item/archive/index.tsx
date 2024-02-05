'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';

interface ItemArchiveProps {
  isConnectable: boolean;
}

const ItemArchive = ({ isConnectable }: ItemArchiveProps) => {
  return (
    <div className="relative block w-52 rounded-lg bg-light-slate-grey shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        style={{
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        }}
        className="-left-[5px] bg-white p-1"
        isConnectable={isConnectable}
        id="1"
      />
      <div className="relative flex w-full flex-row items-center justify-center gap-x-4">
        <div className="absolute inset-x-0 left-6 h-2 w-2 rounded-full bg-silver-sand" />
        <p className="text-center text-base font-bold capitalize text-grey-purple-white">
          Archive
        </p>
      </div>
      <p className="truncate px-8 text-xs font-normal text-white/50">
        Stage/ abcdef-123456-ddddddddddddddddddddd
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
  );
};

export default ItemArchive;
