import React from "react";

export const PlusMinus = ({isVisible}) => {
  return (
    <svg
      className='fill-indigo-500 shrink-0 ml-8'
      width='16'
      height='16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect y='7' width='16' height='2' rx='1' className='origin-center' />
      {!isVisible && (
        <rect
          y='7'
          width='16'
          height='2'
          rx='1'
          className='transform origin-center rotate-90'
        />
      )}
    </svg>
  );
};
