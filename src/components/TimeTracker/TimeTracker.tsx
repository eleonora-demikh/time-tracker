import React, { useEffect } from "react";
import { useState } from "react";
import { PlusMinus } from '../UI/PlusMinus';
import { ArrowDown } from '../UI/ArrowDown';
import { Close } from '../UI/Close';
import { TrackForm } from '../TrackForm/TrackForm';
import { WorkingHours } from '../WorkingHours/WorkingHours';
import useLocalStorage from '../../hooks/useLocalStorage';
import { NoteType } from '../../types/Note';
import { User } from '../../types/User';

type Props = {
  selectedUser: User,
}

export const TimeTracker: React.FC<Props> = ({selectedUser}) => {
  const [isOpenedTracker, setIsOpenedTracker] = useState(false);
  const [isOpenedLogs, setIsOpenedLogs] = useState(false);
  const [notes, setNotes] = useLocalStorage("notes", []);
  const iconsClass = "fill-slate-300 absolute right-3 top-1.5";

  useEffect(() => {
    const storedNotesJSON = localStorage.getItem("notes");
    const storedNotes: NoteType[] | [] = storedNotesJSON
      ? JSON.parse(storedNotesJSON)
      : [];

    setNotes(storedNotes);
  }, [selectedUser]);

  return (
    <section>
      <h2>
        <button
          type='button'
          className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-200 p-2'
          onClick={() => setIsOpenedTracker((prev) => !prev)}
        >
          <span>Time Tracker</span>
          <PlusMinus isVisible={isOpenedTracker} />
        </button>
      </h2>
      {isOpenedTracker && (
        <div className='grid text-sm text-slate-600 overflow-hidden'>
          <WorkingHours notes={notes} />

          <button
            type='button'
            className={`p-2 font-semibold border border-slate-200 rounded-lg text-slate-800 hover:bg-slate-100 w-6/12 mt-4 relative m-auto ${
              isOpenedLogs ? "bg-slate-100" : ""
            }`}
            onClick={() => setIsOpenedLogs((prev) => !prev)}
          >
            Log time
            {!isOpenedLogs ? (
              <ArrowDown className={iconsClass} />
            ) : (
              <Close className={iconsClass} />
            )}
          </button>

          {isOpenedLogs && <TrackForm handleAddNote={setNotes} />}
        </div>
      )}
    </section>
  );
};
