'use client';

import { ArrowUturnLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ConfirmModal from '@/components/annotab/confirm-modal';
import Loading from '@/components/annotab/loading';
import CoreTable from '@/components/annotab/table';
import UploadDataModal from '@/components/annotab/upload-modal';
import { useDatas } from '@/hooks/queries/useDatas';
import { DEFAULT_PAGINATION } from '@/libs/constants';

const columnHelper = createColumnHelper<any>();

const listInfo = [
  {
    color: '#DA2C43',
    label: 'Train',
  },
  {
    color: '#0DA1CF',
    label: 'Valid',
  },
  {
    color: '#9B51E0',
    label: 'Test',
  },
];

interface DatasetProps {
  datasetId: string;
}

const defaultColumns = [
  columnHelper.accessor((row) => row.file?.url, {
    id: 'image',
    cell: (info) => (
      <LazyLoadImage
        src={info.getValue()}
        className="aspect-square h-9 w-9 object-cover"
      />
    ),
    header: () => <span>Image</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>Id</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'role',
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
    footer: (props) => props.column.id,
  }),
];

const DataList = ({ datasetId }: DatasetProps) => {
  const [loading, setLoading] = useState(false);
  const [item] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type] = useState<'annotate' | 'delete'>('annotate');
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [isArchive, setIsArchive] = useState(false);

  const { data: session } = useSession();
  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data } = useDatas(
    session?.user.access.token,
    page,
    pageSize,
    datasetId
  );

  return (
    <>
      {loading && <Loading loading />}
      <div className="flex h-full w-full flex-col gap-y-2">
        {!isArchive ? (
          <div className="flex h-[5%] flex-row items-center justify-center">
            <div className="flex w-1/2 flex-row gap-x-4">
              <form className="flex w-2/3 flex-row items-center justify-start gap-x-3">
                <label
                  htmlFor="search"
                  className="flex w-full flex-row items-center justify-center gap-x-3"
                >
                  <p className="text-base font-medium text-dark-navy-blue">
                    File name
                  </p>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="flex flex-grow rounded-full border bg-grey-purple-white px-3 py-1 shadow-inner"
                  />
                </label>
              </form>
              <div className="flex w-1/3 flex-row gap-x-3">
                {listInfo.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-row items-center gap-x-3"
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-1/2 flex-row items-center justify-end gap-x-3">
              <button
                type="button"
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-3 py-1 text-sm font-normal text-dark-navy-blue"
              >
                Filter
              </button>
              <button
                type="button"
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-3 py-1 text-sm font-normal text-dark-navy-blue"
              >
                Sort
              </button>
              <button
                type="button"
                name="backToData"
                className="flex flex-row items-center rounded-lg bg-sea-green px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                Archive
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex flex-row items-center justify-center gap-x-2 rounded-lg bg-mostly-white px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                <PlusIcon width={20} height={20} />
                Add More Data
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-[5%] flex-row items-center justify-center">
            {isArchive && (
              <div className="flex w-1/2 flex-row items-center justify-start gap-x-3">
                <button
                  type="button"
                  aria-label="Save"
                  onClick={() => setIsArchive(false)}
                  className="flex flex-row items-center rounded-full border border-dark-navy-blue/10 p-1 text-dark-navy-blue"
                >
                  <ArrowUturnLeftIcon width={15} height={15} />
                </button>
                <p className="text-base font-semibold text-dark-navy-blue">
                  Archive
                </p>
              </div>
            )}
            <div
              className={clsx(
                `flex flex-row items-center justify-end gap-x-3`,
                isArchive ? 'w-1/2' : 'w-full'
              )}
            >
              <button
                type="button"
                name="selectAll"
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                Select All
              </button>
              <button
                type="button"
                name="deSelectAll"
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                De-Select All
              </button>
              <button
                type="button"
                name="delete"
                className="flex flex-row items-center rounded-lg border border-rusty-red/10 px-5 py-2 text-sm font-normal text-rusty-red"
              >
                Delete
              </button>
              {!isArchive ? (
                <button
                  type="button"
                  className="flex flex-row items-center rounded-lg border bg-purple-grey px-5 py-2 text-sm font-normal text-grey-purple-white"
                >
                  Move to Archive
                </button>
              ) : (
                <button
                  type="button"
                  className="flex flex-row items-center rounded-lg border bg-purple-grey px-5 py-2 text-sm font-normal text-grey-purple-white"
                >
                  Move back to Dataset
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex h-[90%] w-full flex-col items-start overflow-y-auto pr-2">
          <CoreTable
            data={data?.data || []}
            columns={defaultColumns}
            loading={false}
            page={page}
            pageSize={pageSize}
            total={data?.meta.itemCount || 0}
            totalPage={data?.meta.pageCount || 0}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      </div>
      <UploadDataModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setLoading={setLoading}
        datasetId={datasetId}
      />
      {item && (
        <ConfirmModal
          size="3xl"
          isOpen={isOpenConfirm}
          setIsOpen={setIsOpenConfirm}
          handleSave={() => {
            if (type === 'delete') {
              // handle delete
            } else {
              // handle RedirectAnnotation
            }
          }}
          title={
            type === 'delete'
              ? 'Delete this item?'
              : item.status === 'in_progress'
                ? item.workflowStepsData.find(
                    (item: any) => item.status === 'in_progress'
                  )?.workflowStep.stepDefinition.name === 'review'
                  ? 'Start reviewing this item?' // review
                  : 'Start annotating this item?' // dataset
                : 'This item has been annotated before. You can start annotating again.' // completed
          }
          description=""
          executeBtn={
            type === 'delete'
              ? 'Delete'
              : item.status === 'in_progress'
                ? item.workflowStepsData.find(
                    (item: any) => item.status === 'in_progress'
                  )?.workflowStep.stepDefinition.name === 'review'
                  ? 'Start reviewing' // review
                  : 'Start annotating' // dataset
                : 'Start annotating' // completed
          }
          cancelBtn="Cancel"
        />
      )}
    </>
  );
};

export default DataList;
