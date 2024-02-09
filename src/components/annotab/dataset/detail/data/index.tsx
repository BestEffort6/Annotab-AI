'use client';

import { ArrowUturnLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ConfirmModal from '@/components/annotab/confirm-modal';
import Loading from '@/components/annotab/loading';
import CoreTable from '@/components/annotab/table';
import toast from '@/components/annotab/toast';
import UploadDataModal from '@/components/annotab/upload-modal';
import { useDatas } from '@/hooks/queries/useDatas';
import type { DataProps } from '@/interfaces/dataProps';
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

// interface WorkflowSteps {
//   status: string;
//   workflowStep: {
//     stepDefinition: { name: string };
//   };
// }

interface DatasetProps {
  // data: any;
  datasetId: string;
  userId: string;
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

const Data = ({ datasetId, userId }: DatasetProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [item] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [setDatasetFiles] = useState<File[]>([]);
  const [type] = useState<'annotate' | 'delete'>('annotate');
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [dataList, setDataList] = useState<DataProps[]>([]);
  const [selectedDatas, setSelectedDatas] = useState<(string | number)[]>([]);
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

  const handlerUpdateArchive = async (isStatus: boolean) => {
    const request = {
      isStatus,
    };

    try {
      await selectedDatas.map(async (id) => {
        await fetch(
          `/api/dataset/data/${id}/update-archive?datasetId=${datasetId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
          }
        );
      });

      const updatedDataList = dataList.filter(
        (item) => !selectedDatas.includes(item.id)
      );

      setLoading(true);
      setDataList(updatedDataList);
      // setIsSelectAll(true);
      setIsArchive(false);
      setSelectedDatas([]);

      if (isArchive) {
        toast({
          type: 'success',
          content: 'Move back dataset successfully! ',
        });
      } else {
        toast({
          type: 'success',
          content: 'Move to archive successfully!',
        });
      }
    } catch (error) {
      toast({
        type: 'error',
        content: 'Something went wrong while deleting data!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectAnnotation = async () => {
    setLoading(true);
    let annotationRes: any;

    try {
      const request = {
        user_id: userId,
        image: item.file.url,
        resize_ratio: 1,
      };

      annotationRes = await fetch(`/api/annotation/init`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (annotationRes) {
        router.push(`/dataset/${datasetId}/image/${item.id}`);
      }
    } catch (error) {
      toast({ type: 'error', content: 'Something went wrong!' });
    } finally {
      setLoading(false);
    }
  };

  const handlerSelect = async (e: any) => {
    switch (e.target.name) {
      case 'backToData':
        setIsArchive(true);
        break;

      case 'selectAll':
        setSelectedDatas(dataList.map((item) => item.id));
        break;

      case 'deSelectAll':
        setSelectedDatas([]);
        break;

      case 'delete':
        try {
          await selectedDatas.map(async (id) => {
            await fetch(`/api/dataset/data/${id}/delete`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
          });

          const updatedDataList = dataList.filter(
            (item) => !selectedDatas.includes(item.id)
          );

          setDataList(updatedDataList);
          setSelectedDatas([]);

          toast({
            type: 'success',
            content: 'Deleted data successfully!',
          });
        } catch (error) {
          toast({
            type: 'error',
            content: 'Something went wrong while deleting data!',
          });
        } finally {
          setLoading(false);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      {loading && <Loading loading />}
      <div className="flex h-full w-full flex-col gap-y-2">
        {!isArchive && selectedDatas.length === 0 ? (
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
                onClick={handlerSelect}
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
                onClick={handlerSelect}
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                Select All
              </button>
              <button
                type="button"
                name="deSelectAll"
                onClick={handlerSelect}
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                De-Select All
              </button>
              <button
                type="button"
                name="delete"
                onClick={handlerSelect}
                className="flex flex-row items-center rounded-lg border border-rusty-red/10 px-5 py-2 text-sm font-normal text-rusty-red"
              >
                Delete
              </button>
              {!isArchive ? (
                <button
                  type="button"
                  onClick={() => handlerUpdateArchive(true)}
                  className="flex flex-row items-center rounded-lg border bg-purple-grey px-5 py-2 text-sm font-normal text-grey-purple-white"
                >
                  Move to Archive
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handlerUpdateArchive(false)}
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
        setDatasetFiles={setDatasetFiles}
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
              handleRedirectAnnotation();
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

export default Data;
