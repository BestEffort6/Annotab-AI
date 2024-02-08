const AccountSeats = () => {
  return (
    <div className="rounded-[8px] border border-dark-navy-blue/25">
      <h6 className="border-b border-dark-navy-blue/25 p-[15px]">Seats</h6>
      <ul>
        <li className="flex justify-between border-b border-dark-navy-blue/25 px-[15px] py-[10px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            Total seats allowed
          </p>
          <p className="text-[14px] font-normal text-dark-navy-blue">0</p>
        </li>
        <li className="flex justify-between border-b border-dark-navy-blue/25 px-[15px] py-[10px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            Current seats
          </p>
          <p className="text-[14px] font-normal text-dark-navy-blue">0/0</p>
        </li>
        <li className="flex justify-between px-[15px] py-[10px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            Available seats
          </p>
          <p className="text-[14px] font-normal text-dark-navy-blue">0/0</p>
        </li>
      </ul>
    </div>
  );
};

export default AccountSeats;
