import React from "react";
import { useState } from "react";
import { User } from '../../types/User';
import { PlusMinus } from '../UI/PlusMinus';

type Props = {
  selectedUser: User | null;
}

export const AdditionalInfo:React.FC<Props> =({ selectedUser }) => {
  const [isOpenedInfo, setIsOpenedInfo] = useState(false);

  return (
    <section>
      <h2>
        <button
          type='button'
          className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-200 p-2'
          onClick={() => setIsOpenedInfo((prev) => !prev)}
        >
          <span>Additional Info</span>
          <PlusMinus isVisible={isOpenedInfo} />
        </button>
      </h2>
      {isOpenedInfo && (
        <div className='grid text-sm text-slate-600 overflow-hidden'>
          <section className='mb-2'>
            <h3 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-100 p-2'>
              Contacts
            </h3>
            <div className='grid text-sm text-slate-600 overflow-hidden'>
              <div className='overflow-hidden'>
                <ul className='p-3'>
                  <li className='flex flex-row'>
                    <span className='font-medium mr-3'>Phone:</span>
                    <span className='font-light'>{selectedUser?.phone}</span>
                  </li>

                  <li className='flex flex-row'>
                    <span className='font-medium mr-3'>Website:</span>
                    <a
                      className='font-light'
                      href={selectedUser?.website}
                      target='_blank'
                    >
                      {selectedUser?.website}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className='mb-2'>
            <h3 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-100 p-2'>
              Address
            </h3>
            <div className='grid text-sm text-slate-600 overflow-hidden'>
              <div className='overflow-hidden'>
                <ul className='p-3'>
                  <li className='flex flex-row'>
                    <span className='font-medium mr-3'>City:</span>
                    <span className='font-light'>
                      {selectedUser?.address.city}
                    </span>
                  </li>

                  <li className='flex flex-row'>
                    <span className='font-medium mr-3'>Street:</span>
                    <span className='font-light'>
                      {`${selectedUser?.address.street} str.`}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
