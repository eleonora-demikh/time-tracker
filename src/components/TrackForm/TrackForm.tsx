import React, { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../../context/userContext";
import { formReducer, initialState } from '../../helpers/formReducer';

export const TrackForm: React.FC = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const context = useContext(UserContext);

  const handleFieldChange = (field: string, value: string | number) => {
    dispatch({
      type: "UPDATE_FIELD",
      field,
      value,
    });
  };

  const handleSubmit = async () => {
    const userId = context?.user?.id;

    if(userId) {
      handleFieldChange("userId", userId)
    }

    try {
      const URL = `https://jsonplaceholder.typicode.com/users/${userId}`;

      await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify({...context.user, tracker: formData}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          if(response.ok) {
            const existingArrayJSON = localStorage.getItem("notes");
            const existingArray = existingArrayJSON ? JSON.parse(existingArrayJSON) : [];
            const storedNote = {username: context.user?.username, userId: context.user?.id, tracker: formData}
            localStorage.setItem("notes", JSON.stringify([...existingArray, storedNote]));
          }
        })
    } catch(error) {
      console.error(error);
    };

    dispatch({ type: "RESET" });
  }

  return (
    <form onSubmit={handleSubmit} className='mb-2 border border-slate-100 rounded-lg mt-2 p-2 flex flex-row flex-wrap justify-between'>
      <div className='flex flex-col '>
        <label htmlFor='dateInput' className='text-xs'>
          Choose date:
        </label>
        <input
          id='dateInput'
          className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-7 w-60 shrink-0 focus:outline-none'
          type='date'
          max={currentDate}
          required
          value={formData.date}
          onChange={(e) => handleFieldChange("date", e.target.value)}
        />

        <label htmlFor='timeInput' className='text-xs mt-3'>
          Time spent:
        </label>
        <input
          id='timeInput'
          className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-7 w-60 shrink-0 focus:outline-none'
          type='number'
          min='0'
          max='24'
          placeholder='0 hours'
          required
          value={formData.time}
          onChange={(e) => handleFieldChange("time", e.target.value)}
        />
      </div>

      <div className='flex flex-col mb-3'>
        <label htmlFor='comment' className='text-xs'>
          Details:
        </label>
        <textarea
          id='comment'
          className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-full w-60 shrink-0 focus:outline-none'
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
