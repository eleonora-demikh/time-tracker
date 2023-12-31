import React, { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../../context/userContext";
import { formReducer, initialState } from '../../helpers/formReducer';
import { NoteType } from '../../types/Note';

type Props = {
  handleAddNote: React.Dispatch<React.SetStateAction<NoteType[]>>;
};

export const TrackForm: React.FC<Props> = ({ handleAddNote }) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [currentDate, setCurrentDate] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000)
      .toISOString()
      .split("T")[0];
    setCurrentDate(localDate);
  }, []);

  const handleFieldChange = useCallback((field: string, value: string | number) => {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
  }, []);

  const updateNotes = useCallback((updatedNote: NoteType) => {
    const storedNotesJSON = localStorage.getItem("notes");
    const storedNotes: NoteType[] | [] = storedNotesJSON
      ? JSON.parse(storedNotesJSON)
      : [];

    if (storedNotes.length > 0) {
      const existingNoteIndex = storedNotes.findIndex(
        (note: NoteType) =>
          note.username === updatedNote.username &&
          note?.tracker?.date === updatedNote.tracker.date
      );

      if (existingNoteIndex !== -1) {
        storedNotes[existingNoteIndex] = updatedNote;
        handleAddNote(storedNotes)
      } else {
        handleAddNote(prev => [...prev, updatedNote])
      }
    } else {
      handleAddNote((prev) => [...prev, updatedNote]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const URL = `https://jsonplaceholder.typicode.com/users/${user?.id}`;

      const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify({ ...user, tracker: formData }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok && user) {
        const newNote: NoteType = {
          id: Date.now(),
          name: user?.name,
          username: user?.username,
          project: user?.company.name,
          tracker: formData,
        };
        updateNotes(newNote);
      }
    } catch (error) {
      console.error(error);
    }

    dispatch({ type: "RESET" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='mb-2 border border-slate-100 rounded-lg mt-2 p-2 flex flex-row flex-wrap justify-center'
    >
      <div className='flex flex-col px-4'>
        <label htmlFor='dateInput' className='text-xs mt-3'>
          Choose date:
        </label>
        <input
          id='dateInput'
          className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-7 w-60 shrink-0 focus:outline-none'
          type='date'
          max={currentDate}
          value={formData.date}
          onChange={(e) => handleFieldChange("date", e.target.value)}
          required
        />

        <label htmlFor='timeInput' className='text-xs mt-3'>
          Time spent, h:
        </label>
        <input
          id='timeInput'
          className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-7 w-60 shrink-0 focus:outline-none'
          type='text'
          pattern='^([1-9]|1[0-9]|2[0-4])$'
          placeholder='0 hours'
          required
          value={formData.time}
          onChange={(e) => handleFieldChange("time", e.target.value)}
        />
      </div>

      <div className='flex flex-col px-4'>
        <label htmlFor='comment' className='text-xs mt-3'>
          Details:
        </label>
        <textarea
          id='comment'
          className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-20 w-60 shrink-0 focus:outline-none'
          onChange={(e) => handleFieldChange("details", e.target.value)}
          value={formData.details}
        />
      </div>

      <button
        type='submit'
        className='p-2 font-semibold border border-slate-200 rounded-lg text-slate-800 w-6/12 m-auto hover:bg-slate-100 mt-4'
      >
        Add note
      </button>
    </form>
  );
};
