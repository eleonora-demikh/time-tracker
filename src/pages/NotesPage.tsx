import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { User } from "../types/User";
import { MainInfo } from "../components/MainInfo/MainInfo";
import { AdditionalInfo } from "../components/AdditionalInfo/AdditionalInfo";
import { TimeTracker } from "../components/TimeTracker/TimeTracker";
import { Note } from '../components/Note/Note';
import { NoteType } from '../types/Note';

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[] | []>([])

  useEffect(() => {
    const storedNotesJSON = localStorage.getItem("notes");
    const storedNotes: NoteType[] | [] = storedNotesJSON
      ? JSON.parse(storedNotesJSON)
      : [];

    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "notes") {
        setNotes(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);  

  return (
    <article className='flex flex-col justify-center m-2 p-4 lg:px-8 border rounded-lg border-slate-200'>
      <h2 className='flex items-center justify-between w-full text-left text-lg font-semibold border-b border-slate-200 p-2'>
        Last Notes
      </h2>
      {notes.length === 0 
      ? (
        <p>No notes to show</p>
      ) : (
        notes.map(note => <Note note={note} key={note.id}/>)
      )}
    </article>
  );
};
