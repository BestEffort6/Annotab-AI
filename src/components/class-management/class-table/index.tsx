import React from 'react';

const ClassTable = () => {
  return (
    <div>
      <h1 className="pb-5 text-base font-semibold text-[#535572]">Class 01</h1>
      <div className="max-w-[342px] rounded-lg border bg-[#FCFCFF]">
        <div className="m-4 h-[20px] max-w-[312px] rounded-lg bg-[#686299]" />
        <table className="m-4">
          <tbody>
            <tr>
              <td className=" max-w-[160px] text-sm font-semibold text-[#31374A]">
                Type of class:
              </td>
              <td className=" pl-14 text-sm font-normal text-[#31374A]">
                Bounding Box
              </td>
            </tr>
            <tr>
              <td className=" max-w-[160px] text-sm font-semibold text-[#31374A]">
                Date created:
              </td>
              <td className="  pl-14 text-sm font-normal text-[#31374A]">
                11/03/2023
              </td>
            </tr>
            <tr>
              <td className=" max-w-[160px] text-sm font-semibold text-[#31374A]">
                Number of class:
              </td>
              <td className="  pl-14 text-sm font-normal text-[#31374A]">12</td>
            </tr>
            <tr>
              <td className=" max-w-[160px] text-sm font-semibold text-[#31374A]">
                Sub-annotation class:
              </td>
              <td className=" W-full  pl-14 text-sm font-normal text-[#31374A]">
                XXX
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;
