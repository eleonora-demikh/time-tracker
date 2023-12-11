import React, { useState } from "react";
import { User } from '../../types/User';
import { PlusMinus } from '../UI/PlusMinus';

type Props = {
  data: User[];
};

export const UserInfo: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAdditionalInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <article className='flex flex-col justify-center m-2 p-4 lg:px-8 border rounded-lg border-slate-200'>
      <section className='mb-2'>
        <h2 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-200 p-2'>
          Main Info
        </h2>
        <div className='grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out'>
          <div className='overflow-hidden'>
            <ul className='p-3'>
              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Name:</span>
                <span className='font-light'>Alice</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Email:</span>
                <span className='font-light'>Alicedfgdsfgdsgdgsd</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Phone:</span>
                <span className='font-light'>Alicedfgdsfgdsgdgsd</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Website:</span>
                <a className='font-light' href='/'>
                  Alicedfgdsfgdsgdgsd.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>
          <button
            type='button'
            className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-200 p-2'
            onClick={toggleAdditionalInfo}
          >
            <span>Additional Info</span>
            <PlusMinus isVisible={isOpen} />
          </button>
        </h2>
        {isOpen && (
          <div className='grid text-sm text-slate-600 overflow-hidden'>
            <section className='mb-2'>
              <h2 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-200 p-2'>
                Contacts
              </h2>
              <div className='grid text-sm text-slate-600 overflow-hidden'>
                <div className='overflow-hidden'>
                  <ul className='p-3'>
                    <li className='flex flex-row'>
                      <span className='font-medium mr-3'>Phone:</span>
                      <span className='font-light'>Alicedfgdsfgdsgdgsd</span>
                    </li>

                    <li className='flex flex-row'>
                      <span className='font-medium mr-3'>Website:</span>
                      <a className='font-light' href='/'>
                        Alicedfgdsfgdsgdgsd.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* <button type='button' className='p-2 font-semibold bg-indigo-500 rounded-lg text-white w-6/12 self-center mt-4'>
        Add note
      </button> */}
      </section>
    </article>
  );
};
