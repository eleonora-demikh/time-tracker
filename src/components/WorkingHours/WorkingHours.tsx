import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { NoteType } from "../../types/Note";
import { UserContext } from "../../context/userContext";

type Props = {
  notes: NoteType[] | [],
}

export const WorkingHours: React.FC<Props> = ({notes}) => {
  const [amountOfTime, setAmountOfTime] = useState(0);
  const context = useContext(UserContext);
  // const storedNotesJSON = localStorage.getItem("notes");

  // const amountChange = () => {
  //   const storedNotes: NoteType[] | [] = storedNotesJSON
  //     ? JSON.parse(storedNotesJSON)
  //     : [];

  //   if (storedNotes.length !== 0) {
  //     const findUserNotes = storedNotes.filter(
  //       (note: NoteType) => note.username === context.user?.username
  //     );

  //     const total = findUserNotes.reduce(
  //       (acc, user) => acc + Number(user.tracker.time),
  //       0
  //     );
  //     setAmountOfTime(total);
  //   }
  // };

  // useEffect(()=>{
  //   amountChange()
  // }, [])

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
            <li className='flex flex-row'>
              <span className='font-medium mr-3'>Total time:</span>
              <span className='font-light'>{`${amountOfTime} hours`}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
