import React from 'react';
import { useRanger } from 'react-ranger';

import { useLayout, useLayoutActions } from '@/app/providers';

const SamplingModal = () => {
  const { valuesSampling } = useLayout();
  const { setValuesSampling } = useLayoutActions();
  const { getTrackProps, segments, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: valuesSampling,
    onChange: setValuesSampling,
  });
  return (
    <div className="h-full w-full px-6 py-2">
      <div className="flex w-full flex-col rounded-lg border bg-grey-purple-white shadow-inner">
        <div className="rounded-lg bg-light-purple-grey px-3 py-1 shadow-lg">
          <p className="text-base font-bold text-grey-purple-white">Settings</p>
        </div>
        <div className="w-full px-3 py-2">
          <div className="flex w-full flex-row items-center justify-between">
            <p className="text-base font-bold text-dark-navy-blue">A</p>
            <p className="text-base font-bold text-dark-navy-blue">B</p>
          </div>
          <div {...getTrackProps()} className="h-1 w-full">
            {segments.map(({ getSegmentProps }, i) => (
              <div
                {...getSegmentProps()}
                className={`h-full rounded-2xl ${
                  i === 0 ? 'bg-dark-navy-blue' : 'bg-silver-sand'
                }`}
                key={getSegmentProps().key}
              />
            ))}
            {handles.map(({ getHandleProps }) => (
              <button
                key={getHandleProps().key}
                type="button"
                aria-label="Save"
                style={getHandleProps().style}
                onMouseDown={getHandleProps().onMouseDown}
                onTouchStart={getHandleProps().onTouchStart}
                tabIndex={getHandleProps().tabIndex}
                className="h-3 w-3 appearance-none rounded-full bg-dark-navy-blue shadow-sm shadow-silver-sand outline-none"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 px-3 py-1">
          <div className="flex w-full flex-row">
            <div className="w-1/2">
              <p className=" text-base font-bold text-dark-navy-blue">
                Sample A
              </p>
            </div>
            <div className="flex w-1/2 items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-light-greyish shadow-inner">
                <p className="text-base font-normal text-dark-navy-blue">
                  {valuesSampling[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-row">
            <div className="w-1/2">
              <p className=" text-base font-bold text-dark-navy-blue">
                Sample B
              </p>
            </div>
            <div className="flex w-1/2 items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-light-greyish px-1 shadow-inner">
                <p className="text-base font-normal text-dark-navy-blue">
                  {100 - valuesSampling[0]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplingModal;
