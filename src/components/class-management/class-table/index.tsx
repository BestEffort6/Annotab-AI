import React from 'react';

import type { ClassById } from '@/interfaces/classes';

const ClassTable = ({ classData }: { classData: ClassById }) => {
  const date = new Date(classData?.createdAt);

  return (
    <div>
      <h1 className="pb-5 text-base font-semibold text-purple-grey">
        {classData?.name ?? ''}
      </h1>
      <div className="max-w-[342px] rounded-lg border bg-mostly-white">
        <div
          className="m-4 h-5 max-w-[312px] rounded-lg"
          style={{ backgroundColor: classData?.color ?? '#686299' }}
        />
        <table className="m-4">
          <tbody>
            <tr>
              <td className="max-w-40 text-sm font-semibold text-dark-navy-blue">
                Type of class:
              </td>
              <td className="pl-14 text-sm font-normal text-dark-navy-blue">
                {classData?.annotationClass ?? ''}
              </td>
            </tr>
            <tr>
              <td className="max-w-40 text-sm font-semibold text-dark-navy-blue">
                Date created:
              </td>
              <td className="pl-14 text-sm font-normal text-dark-navy-blue">
                {`${date.getUTCDate()}/${
                  date.getUTCMonth() + 1
                }/${date.getUTCFullYear()}` ?? ''}
              </td>
            </tr>
            <tr>
              <td className="max-w-40 text-sm font-semibold text-dark-navy-blue">
                Number of class:
              </td>
              <td className="pl-14 text-sm font-normal text-dark-navy-blue">
                12
              </td>
            </tr>
            <tr>
              <td className="max-w-40 text-sm font-semibold text-dark-navy-blue">
                Sub-annotation class:
              </td>
              <td className="W-full pl-14 text-sm font-normal text-dark-navy-blue">
                {classData?.subAnnotationClass ?? ''}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassTable;
