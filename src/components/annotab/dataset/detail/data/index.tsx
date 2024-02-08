'use client';

import { ArrowUturnLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Pagination } from '@nextui-org/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ConfirmModal from '@/components/annotab/confirm-modal';
import Loading from '@/components/annotab/loading';
import toast from '@/components/annotab/toast';
// import { useDatas } from '@/hooks/queries/useDatas';
import type { DataProps } from '@/interfaces/data';
import { DEFAULT_PAGINATION } from '@/libs/constants';

// import UploadDataModal from './upload-modal';

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
interface MetaPagination {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  page: number;
  pageCount: number;
  take: number;
}

const Data = ({ datasetId, userId }: DatasetProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState<any>();
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [datasetFiles, setDatasetFiles] = useState<File[]>([]);
  const [type, setType] = useState<'annotate' | 'delete'>('annotate');
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [search, setSearch] = useState('');
  const [dataList, setDataList] = useState<DataProps[]>([]);
  const [controller] = useState<MetaPagination>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { pageCount } = controller ?? { pageCount: 1 };
  const [selectedDatas, setSelectedDatas] = useState<(string | number)[]>([]);
  // const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [isArchive, setIsArchive] = useState(false);

  // const { data: session } = useSession();
  // const [page,setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  // const { data } = useDatas(
  //   session?.user.access.token,
  //   page,
  //   pageSize,
  //   datasetId
  // );

  const handleAnnotate = async (id: string, type: 'annotate' | 'delete') => {
    setLoading(true);
    const url = `/api/annotation/data/detail/${id}?dataset=${datasetId}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      setItem(response);
      setType(type);
      setIsOpenConfirm(true);
    } catch {
      toast({ type: 'error', content: 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChangePagePagination = (e: number) => {
    setPageNumber(e);
  };

  const toggleSelectedData = (itemLabel: string | number) => {
    if (selectedDatas.includes(itemLabel)) {
      setSelectedDatas(selectedDatas.filter((item) => item !== itemLabel));
    } else {
      setSelectedDatas([...selectedDatas, itemLabel]);
    }
  };

  // const handlerSelect = async (e: any) => {
  //   switch (e.target.name) {
  //     case 'backToData':
  //       setIsArchive(true);
  //       setIsSelectAll(false);
  //       break;

  //     case 'selectAll':
  //       setSelectedDatas(dataList.map((item) => item.id));
  //       setIsSelectAll(false);
  //       break;

  //     case 'deSelectAll':
  //       setSelectedDatas([]);
  //       setIsSelectAll(false);
  //       break;

  //     case 'delete':
  //       try {
  //         await selectedDatas.map(async (id) => {
  //           await fetch(`/api/dataset/data/${id}/delete`, {
  //             method: 'DELETE',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           });
  //         });

  //         const updatedDataList = dataList.filter(
  //           (item) => !selectedDatas.includes(item.id)
  //         );

  //         setDataList(updatedDataList);
  //         setIsSelectAll(false);
  //         setSelectedDatas([]);

  //         toast({
  //           type: 'success',
  //           content: 'Deleted data successfully!',
  //         });
  //       } catch (error) {
  //         toast({
  //           type: 'error',
  //           content: 'Something went wrong while deleting data!',
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const handleChangePage = (e: any) => {
    switch (e.target.name) {
      case 'pageSize':
        setPageSize(e.target.value);
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
                    onChange={handleSearch}
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
                // onClick={handlerSelect}
                className="flex flex-row items-center rounded-lg bg-sea-green px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                Archive
              </button>
              <button
                type="button"
                // onClick={() => setIsOpen(true)}
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
                // onClick={handlerSelect}
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                Select All
              </button>
              <button
                type="button"
                name="deSelectAll"
                // onClick={handlerSelect}
                className="flex flex-row items-center rounded-lg border border-dark-navy-blue/10 px-5 py-2 text-sm font-normal text-dark-navy-blue"
              >
                De-Select All
              </button>
              <button
                type="button"
                name="delete"
                // onClick={handlerSelect}
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

        {dataList && dataList.length ? (
          <div className="flex h-[90%] w-full flex-col items-start overflow-y-auto pr-2">
            <div className="flex flex-wrap gap-5">
              {dataList
                .filter((item) =>
                  search !== '' && item.file
                    ? item.file.filename
                        .split('/')[1]
                        ?.toLowerCase()
                        ?.includes(search.toLowerCase())
                    : true
                )
                .map((item: any) => (
                  <div
                    key={item.id}
                    className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-y-2"
                  >
                    <div className="relative h-[120px] w-[120px]">
                      {isArchive ? (
                        <LazyLoadImage
                          src={item.file?.url}
                          className="aspect-square h-[120px] w-[120px] rounded-xl object-cover"
                          effect="blur"
                        />
                      ) : (
                        <LazyLoadImage
                          onClick={() => handleAnnotate(item.id, 'annotate')}
                          src={item.file?.url}
                          className="aspect-square h-[120px] w-[120px] rounded-xl object-cover"
                          effect="blur"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => toggleSelectedData(item.id)}
                        className={clsx(
                          'absolute left-2 top-2  h-4 w-4 rounded-full',
                          selectedDatas.includes(item.id)
                            ? 'bg-sea-green'
                            : 'bg-light-greyish'
                        )}
                        aria-label="Save"
                      />
                      <div className="absolute -bottom-2 -right-1">
                        {/* {item.status === 'in_progress' ? (
                        item.workflowStepsData.find(
                          (item: WorkflowSteps) =>
                            item.status === 'in_progress'
                        )?.workflowStep.stepDefinition.name === 'review' ? (
                          <span className="text-base w-9 h-9 flex items-center justify-center rounded-full bg-chili-red text-grey-purple-white font-medium">
                            <LazyLoadImage src="/images/svg/icon/dataset/data/icon-review-greypuplewhite-light.svg" />
                          </span>
                        ) : (
                          <span className="text-base w-9 h-9 flex items-center justify-center rounded-full bg-blue-pastel text-grey-purple-white font-medium">
                            <LazyLoadImage src="/images/svg/icon/dataset/data/icon-annotation-greypuplewhite-light.svg" />
                          </span>
                        )
                      ) : ( */}
                        {isArchive ? (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neon-purple text-base">
                            <LazyLoadImage src="/images/svg/icon/dataset/create-new-dataset/icon-archive-greypuplewhite-light.svg" />
                          </span>
                        ) : (
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-dark-pastel-green text-base">
                            <LazyLoadImage src="/images/svg/icon/dataset/data/icon-check-greypuplewhite-light.svg" />
                          </span>
                        )}

                        {/* )} */}
                      </div>
                    </div>
                    <p className="dark-navy-blue w-[120px] truncate text-center text-base font-medium">
                      {item.file.filename.split('/')[1]}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center gap-y-2">
            <p className="text-center text-sm font-semibold text-gray-500">
              No datas yet
            </p>
          </div>
        )}
        {pageCount ? (
          <div className="flex h-[5%] flex-row items-center justify-between gap-x-2">
            <div className="flex flex-row items-center justify-start">
              <Pagination
                total={pageCount}
                initialPage={pageNumber}
                disableCursorAnimation
                showControls
                onChange={handleChangePagePagination}
              />
            </div>
            <div className="flex flex-row items-center justify-start gap-x-2 text-center">
              <p className="text-sm font-normal text-dark-navy-blue">
                Page&nbsp;
                <strong>
                  {pageNumber} of {pageCount}
                </strong>
                &nbsp;
              </p>
              <form className="flex flex-row items-center justify-center gap-x-3">
                <select
                  value={pageSize}
                  name="pageSize"
                  onChange={handleChangePage}
                  className="rounded-md border border-light-slate-grey text-center text-sm font-normal text-dark-navy-blue"
                >
                  {[10, 25, 50, 100].map((pageSize) => (
                    <option
                      className="bg-white text-sm font-normal text-dark-navy-blue"
                      key={pageSize}
                      value={pageSize}
                    >
                      {pageSize}
                    </option>
                  ))}
                </select>
              </form>
            </div>
          </div>
        ) : null}
      </div>
      {/* <UploadDataModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setDatasetFiles={setDatasetFiles}
        setLoading={setLoading}
        datasetId={datasetId}
        workspaceId={workspaceId}
      /> */}
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
