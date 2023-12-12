import React from "react";
import { useState } from "react";
import { User } from '../../types/User';
import { PlusMinus } from '../UI/PlusMinus';
import { AdditionalInfoField } from '../AdditionalInfoField/AdditionalInfoField';

type Props = {
  selectedUser: User | null;
}

export const AdditionalInfo:React.FC<Props> =({ selectedUser }) => {
  const [isOpenedInfo, setIsOpenedInfo] = useState(false);
  const AdditionalInfoConfig = {
    contacts: {
      phone: selectedUser?.phone,
      email: selectedUser?.email,
      website: selectedUser?.website,
    },
    adress: {
      city: selectedUser?.address.city,
      street: selectedUser?.address.street,
    }
  };

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
        <div className='text-sm text-slate-600 mb-2 border border-slate-100 rounded-lg mt-2 overflow-hidden'>
          {Object.entries(AdditionalInfoConfig).map(([key, value]) => (
            <AdditionalInfoField title={key} key={key} fieldValue={value} />
          ))}
        </div>
      )}
    </section>
  );
}
