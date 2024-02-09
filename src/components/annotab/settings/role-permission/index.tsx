'use client';

import { Accordion, AccordionItem, Checkbox } from '@nextui-org/react';

const RolePermission = () => {
  const itemClasses = {
    base: 'p-0 w-full',
    title: 'font-normal text-[14px] text-dark-navy-blue',
    trigger: 'px-0 py-0',
    indicator: 'text-large',
    content: 'p-0',
  };

  return (
    <>
      <h4 className="mb-[6px] text-[18px] font-normal text-dark-navy-blue">
        Role Permission
      </h4>
      <hr className="" />
      <div className="custom-accordion mb-[20px] mt-[35px]">
        <Accordion
          variant="light"
          showDivider={false}
          itemClasses={itemClasses}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Owner"
            className="mb-3 rounded-[8px] border border-dark-navy-blue/25 bg-mostly-white p-4"
          >
            <div>
              <hr className="mt-4 border-dark-navy-blue/25 pb-4" />
              <div>
                <Checkbox
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Delete workspace
                </Checkbox>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Admin"
            className="mb-3 rounded-[8px] border border-dark-navy-blue/25 bg-mostly-white p-4"
          >
            <div>
              <hr className="mt-4 border-dark-navy-blue/25 pb-4" />
              <div>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Add or remove a user
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Invite outside collaborator
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Create class
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Modify workflow
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Start workflow
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Access payment settings
                </Checkbox>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            title="Member"
            className="mb-3 rounded-[8px] border border-dark-navy-blue/25 bg-mostly-white p-4"
          >
            <div>
              <hr className="mt-4 border-dark-navy-blue/25 pb-4" />
              <div>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Invite outside collaborator
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Create class
                </Checkbox>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 4"
            title="Guest"
            className="mb-3 rounded-[8px] border border-dark-navy-blue/25 bg-mostly-white p-4"
          >
            <div>
              <hr className="mt-4 border-dark-navy-blue/25 pb-4" />
              <div>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Invite outside collaborator
                </Checkbox>
                <Checkbox
                  className="mb-1 block"
                  classNames={{
                    label: 'text-[14px] text-dark-navy-blue font-normal p-0',
                  }}
                >
                  Create class
                </Checkbox>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default RolePermission;
