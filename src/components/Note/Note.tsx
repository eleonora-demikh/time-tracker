import React, { ReactNode, useState } from "react";
// import { User } from "../../types/User";
import { PlusMinus } from '../UI/PlusMinus';
import { NoteType } from '../../types/Note';

type Props = {
  note: NoteType
};

export const Note: React.FC<Props> = ({ note }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <section className='mt-2'>
      <div
        className='h-8 border border-slate-200 rounded-lg text-xs flex justify-between p-2'
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <span>{`Date: ${note.tracker.date}`}</span>
        <span>{note.username}</span>
        <PlusMinus isVisible={isOpened} />
      </div>
      {isOpened && (
        <div className='text-sm text-slate-600 overflow-hidden border border-slate-200 rounded-lg mt-1'>
          <div className='overflow-hidden'>
            <ul className='p-3'>
              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Name:</span>
                <span className='font-light'>{note.name}</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Project:</span>
                <span className='font-light'>{note.project}</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Time spent</span>
                <span className='font-light'>{`${note.tracker.time} hours`}</span>
              </li>

              <li className='flex flex-row'>
                <span className='font-medium mr-3'>Details</span>
                <span className='font-light'>
                  {note.tracker.details}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
