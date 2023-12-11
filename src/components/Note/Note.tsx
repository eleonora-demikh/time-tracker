import React, { useState } from "react";
// import { User } from "../../types/User";
import { PlusMinus } from '../UI/PlusMinus';

type Props = {

};

export const Note: React.FC<Props> = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <section className='mt-2'>
      <div
        className='h-8 border border-slate-200 rounded-lg text-xs flex justify-between p-2'
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <span>Date: 12-12-12</span>
        <span>Username: Alice</span>
        <PlusMinus isVisible={isOpened} />
      </div>
      {isOpened && (
        <div className='text-sm text-slate-600 overflow-hidden border border-slate-200 rounded-lg mt-1'>
          <div className='overflow-hidden'>
            <ul className='p-3'>
              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Name:</span>
                <span className='font-light'>name</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Project:</span>
                <span className='font-light'>proj name</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Time spent</span>
                <span className='font-light'>0 hours</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Details</span>
                <span className='font-light'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Explicabo eos maiores iusto illo labore fugit quam iure
                  consequatur? Qui quasi magni harum eius voluptate voluptatum
                  fugit nobis. Quis iure voluptate ipsa illo ratione nulla
                  accusamus, saepe expedita, provident iste exercitationem
                  reiciendis nisi aliquid! Incidunt unde temporibus, perferendis
                  ipsa quasi autem nulla expedita maxime veritatis?
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
