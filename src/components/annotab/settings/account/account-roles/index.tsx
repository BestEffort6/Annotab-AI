const AccountRoles = () => {
  return (
    <div className="rounded-[8px] border border-dark-navy-blue/25">
      <h6 className="border-b border-dark-navy-blue/25 p-[15px]">Roles</h6>
      <ul>
        <li className="flex justify-between border-b border-dark-navy-blue/25 px-[15px] py-[10px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            Workspace members
          </p>
          <p className="text-[14px] font-normal text-dark-navy-blue">0</p>
        </li>
        <li className="flex justify-between border-b border-dark-navy-blue/25 px-[15px] py-[10px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">Admin</p>
          <p className="text-[14px] font-normal text-dark-navy-blue">0</p>
        </li>
        <li className="flex justify-between px-[15px] py-[10px]">
          <p className="text-[14px] font-normal text-dark-navy-blue">
            Outside collaborators
          </p>
          <p className="text-[14px] font-normal text-dark-navy-blue">0</p>
        </li>
      </ul>
    </div>
  );
};

export default AccountRoles;
