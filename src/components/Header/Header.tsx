import React from "react";
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className='flex items-center justify-center w-full text-left font-semibold border-b border-slate-200 p-2'>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `${
            isActive ? "border-b-indigo-300" : ""
          } mr-12 border border-transparent hover:border-b-indigo-300`
        }
      >
        User Info
      </NavLink>
      <NavLink
        to='/notes'
        className={({ isActive }) =>
          `${
            isActive ? "border-b-indigo-300" : ""
          } mr-12 border border-transparent hover:border-b-indigo-300`
        }
      >
        Notes
      </NavLink>
    </nav>
  );
};
