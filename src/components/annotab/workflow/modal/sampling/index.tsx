import type { Ranger } from '@tanstack/react-ranger';
import { useRanger } from '@tanstack/react-ranger';
import React, { useRef, useState } from 'react';

const SamplingModal = () => {
  const rangerRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ReadonlyArray<number>>([10, 15]);
  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values,
    min: 0,
    max: 100,
    stepSize: 5,
    onChange: (instance: Ranger<HTMLDivElement>) =>
      setValues(instance.sortedValues),
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
          <div
            ref={rangerRef}
            style={{
              position: 'relative',
              userSelect: 'none',
              height: '4px',
              background: '#ddd',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,.6)',
              borderRadius: '2px',
            }}
          >
            {rangerInstance
              .handles()
              .map(
                ({
                  value,
                  onKeyDownHandler,
                  onMouseDownHandler,
                  onTouchStart,
                  isActive,
                }) => (
                  <button
                    aria-label="handle"
                    type="button"
                    key={`handle-${value}`}
                    onKeyDown={onKeyDownHandler}
                    onMouseDown={onMouseDownHandler}
                    onTouchStart={onTouchStart}
                    role="slider"
                    aria-valuemin={rangerInstance.options.min}
                    aria-valuemax={rangerInstance.options.max}
                    aria-valuenow={value}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${rangerInstance.getPercentageForValue(value)}%`,
                      zIndex: isActive ? '1' : '0',
                      transform: 'translate(-50%, -50%)',
                      width: '14px',
                      height: '14px',
                      outline: 'none',
                      borderRadius: '100%',
                      background:
                        'linear-gradient(to bottom, #eee 45%, #ddd 55%)',
                      border: 'solid 1px #888',
                    }}
                  />
                )
              )}
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
                  {values[0]}
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
                  {values[0] ? 100 - values[0] : 0}
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
