import React from "react";
import { User } from '../../types/User';

type Props = {
  selectedUser: User | null;
};

export const MainInfo: React.FC<Props> = ({ selectedUser }) => {
  return (
    <section className='mb-2'>
      <h2 className='flex items-center justify-between w-full text-left text-lg font-semibold border-b border-slate-200 p-2'>
        Main Info
      </h2>
      <div className='grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out'>
        <div className='overflow-hidden'>
          <ul className='p-3'>
            <li className='flex flex-row'>
              <span className='font-medium mr-3'>Username:</span>
              <span className='font-light'>{selectedUser?.username}</span>
            </li>

            <li className='flex flex-row'>
              <span className='font-medium mr-3'>Name:</span>
              <span className='font-light'>{selectedUser?.name}</span>
            </li>

            <li className='flex flex-row'>
              <span className='font-medium mr-3'>Email:</span>
              <span className='font-light'>{selectedUser?.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
