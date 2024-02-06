import Link from 'next/link';
import React from 'react';

const ClassesName = () => {
  return (
    <>
      <div className="flex items-center justify-between pb-7">
        <h1 className=" text-dark_navy_blue max-w-[57px] text-base font-semibold leading-5">
          Classes
        </h1>
        <button
          type="button"
          className="text-dark_navy_blue border-dark_navy_blue h-[37px] max-w-[181px] rounded-lg border border-opacity-10 bg-white px-6 py-2 text-sm font-semibold"
        >
          + Create New Class
        </button>
      </div>

      <div className="flex w-full flex-wrap gap-11">
        <div className="border-dark_navy_blue h-[238px]  w-full max-w-[230px] rounded-lg border border-opacity-10 bg-white">
          <Link href="/class/class01">
            <div className="mb-1 ml-3 mr-3 mt-3 h-[156px] max-w-[210px] rounded-lg border bg-[#686299]" />
            <h1 className="text-dark_navy_blue ml-3 w-full text-sm font-semibold">
              Class 01
            </h1>
          </Link>
        </div>

        <div className="border-dark_navy_blue h-[238px] w-full  max-w-[230px] cursor-pointer rounded-lg border border-opacity-10 bg-white">
          <Link href="/class/class02">
            <div className="mb-1 ml-3 mr-3 mt-3 h-[156px] max-w-[210px] rounded-lg border bg-[#F25656]" />
            <h1 className="text-dark_navy_blue ml-3 w-full text-sm font-semibold">
              Class 02
            </h1>
          </Link>
        </div>

        <div className="border-dark_navy_blue h-[238px] w-full  max-w-[230px] cursor-pointer rounded-lg border border-opacity-10 bg-white">
          <Link href="/class/class03">
            <div className="mb-1 ml-3 mr-3 mt-3 h-[156px] max-w-[210px] rounded-lg border bg-[#0CA1CF]" />
            <h1 className="text-dark_navy_blue ml-3 text-sm font-semibold">
              Class 03
            </h1>
          </Link>
        </div>

        <div className="border-dark_navy_blue h-[238px] w-full  max-w-[230px] cursor-pointer rounded-lg border border-opacity-10 bg-white">
          <Link href="/class/class04">
            <div className="mb-1 ml-3 mr-3 mt-3 h-[156px] max-w-[210px] rounded-lg border bg-[#FFA06B]" />
            <h1 className="text-dark_navy_blue ml-3 text-sm font-semibold">
              Class 04
            </h1>
          </Link>
        </div>

        <div className="border-dark_navy_blue h-[238px] w-full  max-w-[230px] cursor-pointer rounded-lg border border-opacity-10 bg-white">
          <Link href="/class/class05">
            <div className="mb-1 ml-3 mr-3 mt-3 h-[156px] max-w-[210px] rounded-lg border bg-[#017860]" />
            <h1 className="text-dark_navy_blue ml-3 text-sm font-semibold">
              Class 05
            </h1>
          </Link>
        </div>

        <div className="border-dark_navy_blue h-[238px] w-full  max-w-[230px] cursor-pointer rounded-lg border border-opacity-10 bg-white">
          <Link href="/class/class06">
            <div className="mb-1 ml-3 mr-3 mt-3 h-[156px] max-w-[210px] rounded-lg border bg-[#BAA147]" />
            <h1 className="text-dark_navy_blue ml-3 text-sm font-semibold">
              Class 06
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ClassesName;
