import React, { useEffect, useState } from "react";
import { NoteType } from '../types/Note';
import { Note } from '../components/Note/Note';

export const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[] | []>([])

  useEffect(() => {
    const storedNotesJSON = localStorage.getItem("notes");
    const storedNotes: NoteType[] | [] = storedNotesJSON
      ? JSON.parse(storedNotesJSON)
      : [];

    setNotes(storedNotes);
  }, []);

  return (
    <article className='flex flex-col justify-center m-2 p-4 lg:px-8 border rounded-lg border-slate-200'>
      <h2 className='flex items-center justify-between w-full text-left text-lg font-semibold border-b border-slate-200 p-2'>
        Last Notes
      </h2>
      {notes.length === 0 
      ? (
        <p className='m-2'>No notes yet</p>
      ) : (
        notes.reverse().map(note => <Note note={note} key={note.id}/>)
      )}
    </article>
  );
};
