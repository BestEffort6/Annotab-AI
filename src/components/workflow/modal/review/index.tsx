import React from 'react';

const listUser = [
  {
    name: 'James Adams',
  },
  {
    name: 'Henry Worker',
  },
  {
    name: 'Henry Worker 1',
  },
  {
    name: 'Henry Worker 2',
  },
  {
    name: 'Henry Worker 3',
  },
  {
    name: 'Henry Worker 4',
  },
  {
    name: 'Henry Worker 5',
  },
];

const ReviewModal = () => {
  return (
    <div className="flex flex-col gap-y-2 px-4">
      <input
        type="search"
        name="search"
        className="w-full rounded-full border px-4 shadow-inner placeholder:font-bold placeholder:text-dark-navy-blue/25 focus:border-dark-navy-blue focus:outline-none focus:ring-1 focus:ring-dark-navy-blue"
        placeholder="Search User"
      />
      <div className="rounded-2xl border bg-light-purple-grey px-4 py-1 shadow-inner">
        <p className="text-base font-bold text-dark-navy-blue">Anyone</p>
        {listUser.map((item) => (
          <p
            key={item.name}
            className="text-base font-normal text-grey-purple-white"
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReviewModal;
