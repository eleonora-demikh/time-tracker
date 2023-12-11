import React from "react";
import { useState } from "react";
import { PlusMinus } from '../UI/PlusMinus';
import { ArrowDown } from '../UI/ArrowDown';
import { Close } from '../UI/Close';

export const TimeTracker: React.FC = () => {
  const [isOpenedTracker, setIsOpenedTracker] = useState(false);
  const [isOpenedLogs, setIsOpenedLogs] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const iconsClass = "fill-slate-300 absolute right-3 top-1.5";

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
          <section className='mb-2 border border-slate-100 rounded-lg mt-2'>
            <h3 className='flex items-center justify-between w-full text-left font-semibold border-b border-slate-100 p-2'>
              Working hours
            </h3>
            <div className='grid text-sm text-slate-600 overflow-hidden'>
              <div className='overflow-hidden'>
                <ul className='p-3'>
                  <li className='flex flex-row'>
                    <span className='font-medium mr-3'>Per week:</span>
                    <span className='font-light'>Alicedfgdsfgdsgdgsd</span>
                  </li>

                  <li className='flex flex-row'>
                    <span className='font-medium mr-3'>Per mounth:</span>
                    <a className='font-light' href='/'>
                      Alicedfgdsfgdsgdgsd.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

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

          {isOpenedLogs && (
            <section className='mb-2 border border-slate-100 rounded-lg mt-2 p-2 flex flex-row flex-wrap justify-between'>
              <div className='flex flex-col '>
                <label htmlFor='dateInput' className='text-xs'>
                  Choose date:
                </label>
                <input
                  id='dateInput'
                  className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-7 w-60 shrink-0 focus:outline-none'
                  type='date'
                  max={currentDate}
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
                />
              </div>

              <div className='flex flex-col mb-3'>
                <label htmlFor='comment' className='text-xs mt-3'>
                  Details:
                </label>
                <textarea
                  id='comment'
                  className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 h-16 w-60 shrink-0 focus:outline-none'
                />
              </div>

              <button
                type='button'
                className='p-2 font-semibold border border-slate-200 rounded-lg text-slate-800 w-6/12 m-auto hover:bg-slate-100'
              >
                Add new entry
              </button>
            </section>
          )}
        </div>
      )}
    </section>
  );
};
