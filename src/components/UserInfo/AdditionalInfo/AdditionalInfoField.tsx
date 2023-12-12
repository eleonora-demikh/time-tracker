import React from "react";
import { uppercaseFirstLetter } from '../../../helpers/uppercaseFirstLetter';
import { InfoField } from '../../InfoField/InfoField';

type Props = {
  title: string | undefined;
  fieldValue: Record<string, string | undefined>;
};

export const AdditionalInfoField: React.FC<Props> = ({ title, fieldValue }) => {
  return (
    <section className='mb-2'>
      <h3 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-100 p-2'>
        {uppercaseFirstLetter(title)}
      </h3>
      <div className='grid text-sm text-slate-600 overflow-hidden'>
        <div className='overflow-hidden'>
          <ul className='p-3'>
            {Object.entries(fieldValue).map(([key, value]) => (
              <InfoField title={key} key={key} fieldValue={value} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
