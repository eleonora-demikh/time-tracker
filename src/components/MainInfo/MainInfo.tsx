import React from "react";
import { User } from '../../types/User';
import { InfoField } from '../InfoField/InfoField';

type Props = {
  selectedUser: User | null;
};

export const MainInfo: React.FC<Props> = ({ selectedUser }) => {
  const MainInfoConfig = {
    username: selectedUser?.username,
    name: selectedUser?.name,
  }

  return (
    <section className='mb-2'>
      <h2 className='flex items-center justify-between w-full text-left text-lg font-semibold border-b border-slate-200 p-2'>
        Main Info
      </h2>

      <div className='grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out'>
        <div className='overflow-hidden'>
          <ul className='mb-2 border border-slate-100 rounded-lg mt-2 p-2'>
            {Object.entries(MainInfoConfig).map(([key, value]) => (
              <InfoField title={key} key={key} fieldValue={value} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
