'use client';

import { Switch } from '@headlessui/react';
import React, { useState } from 'react';

interface ModelProps {
  dataModel: {
    id: string;
    name: string;
    status: string;
    class: {
      id: string;
      nameClass: string;
      color: string;
    }[];
  }[];
}

const ModelModal = ({ dataModel }: ModelProps) => {
  const [showModelWorkflow, setShowModelWorkflow] = useState<string | null>();
  const [enabled, setEnabled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const selectedModel = dataModel.find((item) => item.id === showModelWorkflow);

  const classArray = selectedModel ? selectedModel.class : [];

  const handleModelClick = () => {
    setShowModelWorkflow(selectedItem);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      {showModelWorkflow ? (
        <div className="flex flex-col gap-y-2 px-4 py-2">
          <div className="flex flex-col gap-y-2 rounded-lg bg-light-purple-grey px-4 py-2">
            <p className="text-base font-bold text-grey-purple-white">Option</p>
            <div className="flex flex-row items-center gap-x-2 px-1">
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? 'bg-purple-grey' : 'bg-grey-purple-white'
                }
        relative flex h-4 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-inner transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  aria-hidden="true"
                  className={`${enabled ? 'translate-x-5' : '-translate-x-1'}
          pointer-events-none inline-block h-4 w-4 transform rounded-full bg-sea-green shadow shadow-sea-green ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className="text-base font-bold text-grey-purple-white">
                Auto On/Off
              </p>
            </div>
          </div>
          <div className="max-h-32 w-full rounded-lg bg-light-greyish">
            <div className="flex flex-col rounded-lg bg-light-purple-grey">
              <p className="px-4 py-1 text-base font-bold text-grey-purple-white">
                Class
              </p>
              <input
                type="search"
                name="search"
                className="w-full rounded-lg border px-4 shadow-inner placeholder:font-bold placeholder:text-dark-navy-blue/25 focus:border-none focus:outline-none focus:ring-1 focus:ring-dark-navy-blue"
                placeholder="Search User"
              />
            </div>
            <div className="flex w-full flex-col gap-y-4 p-2">
              {classArray.map((item) => (
                <div key={item.id} className="flex w-full flex-row">
                  <div className="w-1/3 px-3">
                    <div className="aspect-square w-full rounded-lg bg-silver-sand" />
                  </div>
                  <div className="flex w-2/3 flex-col items-start gap-y-2">
                    <p className="text-base font-bold capitalize">
                      {item.nameClass}
                    </p>
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-2 px-4 py-2">
          <input
            type="search"
            name="search"
            className="w-full rounded-lg border px-4 shadow-inner placeholder:font-bold placeholder:text-dark-navy-blue/25 focus:border-dark-navy-blue focus:outline-none focus:ring-1 focus:ring-dark-navy-blue"
            placeholder="Search User"
          />
          {dataModel.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item.id)}
              className="flex flex-col rounded-lg border bg-light-purple-grey px-4 py-1 shadow-inner"
            >
              <div className="flex flex-initial">
                <p className="rounded-full border border-lime-green bg-dark-pastel-green/50 px-2 text-xs font-medium capitalize text-lime-green">
                  {item.status}
                </p>
              </div>
              <p className="text-base font-bold capitalize text-grey-purple-white">
                {item.name}
              </p>
            </button>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-y-2 rounded-2xl bg-light-purple-grey px-4 py-2 shadow-lg">
        <button
          type="button"
          onClick={handleModelClick}
          className="rounded-full bg-purple-grey py-1 text-base font-bold text-grey-purple-white"
        >
          Connect Models
        </button>
        <button
          type="button"
          className="rounded-full bg-grey-purple-white py-1 text-base font-bold text-dark-navy-blue shadow-inner"
        >
          Manage Models
        </button>
      </div>
    </div>
  );
};

export default ModelModal;
