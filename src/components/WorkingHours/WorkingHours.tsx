import React, { useState, useContext, useEffect } from "react";
import { NoteType } from "../../types/Note";
import { UserContext } from "../../context/userContext";
import { InfoField } from '../InfoField/InfoField';

type Props = {
  notes: NoteType[] | [],
}

export const WorkingHours: React.FC<Props> = ({notes}) => {
  const [amountOfTime, setAmountOfTime] = useState(0);
  const context = useContext(UserContext);
  const WorkingHoursConfig = {
    'total time' : `${amountOfTime} hours`,
  };

  useEffect(() => {
    if (notes.length !== 0) {
      const findUserNotes = notes.filter(
        (note: NoteType) => note.username === context.user?.username
      );

      const total = findUserNotes.reduce(
        (acc, user) => acc + Number(user.tracker.time),
        0
      );
      setAmountOfTime(total);
    }
  }, [notes]);

  return (
    <section className='mb-2 border border-slate-100 rounded-lg mt-2'>
      <h3 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-100 p-2'>
        Working hours
      </h3>
      <div className='grid text-sm text-slate-600 overflow-hidden'>
        <div className='overflow-hidden'>
          <ul className='p-3'>
            {Object.entries(WorkingHoursConfig).map(([key, value]) => (
              <InfoField title={key} key={key} fieldValue={value} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
