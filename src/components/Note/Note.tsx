import React, { useState } from "react";
import { NoteType } from '../../types/Note';
import { PlusMinus } from '../UI/PlusMinus';
import { InfoField } from '../InfoField/InfoField';

type Props = {
  note: NoteType
};

export const Note: React.FC<Props> = ({ note }) => {
  const [isOpened, setIsOpened] = useState(false);
  const NotesConfig = {
    name: note.name,
    project: note.project,
    'time spent': `${note.tracker.time} hours`,
    details: note.tracker.details
  }

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
              {Object.entries(NotesConfig).map(([key, value]) => (
                <InfoField title={key} key={key} fieldValue={value} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};
