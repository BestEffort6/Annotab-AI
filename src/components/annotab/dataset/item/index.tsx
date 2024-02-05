'use client';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import type { DatasetProps } from '@/interfaces/dataset';

interface DatasetItemProps {
  rowData: DatasetProps;
  onItemClick: (id: string) => void;
}

const DatasetItem = ({ rowData, onItemClick }: DatasetItemProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      {rowData ? (
        <div
          onClick={() => onItemClick(rowData.id)}
          key={rowData.id}
          className="flex w-60 cursor-pointer flex-col gap-y-1 rounded-lg bg-grey-purple-white px-4 py-4 shadow-md"
          aria-hidden="true"
        >
          <div className="flex h-40 w-full flex-row">
            <LazyLoadImage
              src={rowData.firstData?.file?.url ?? '/images/no-image.png'}
              className="full h-full w-full rounded-lg object-cover shadow-md"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <p className="truncate text-sm font-semibold text-dark-navy-blue">
              {rowData.name}
            </p>
            <p className="text-xs font-normal text-dark-navy-blue">
              {/* {rowData.dataList.length} Items */}
            </p>
            <p className="text-xs font-normal text-dark-navy-blue">
              0% Annotated
            </p>
          </div>
        </div>
      ) : (
        <div>nodata</div>
      )}
    </div>
  );
};
export default DatasetItem;
