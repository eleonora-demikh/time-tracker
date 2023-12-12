import React from "react";

type Props = {
  title: string | undefined,
  fieldValue: string | undefined,
};

export const InfoField: React.FC<Props> = ({ title, fieldValue}) => {
  return (
    <li className='flex flex-row'>
      <span className='font-medium mr-3'>{`${title}:`}</span>
      <span className='font-light'>{fieldValue}</span>
    </li>
  );
};
