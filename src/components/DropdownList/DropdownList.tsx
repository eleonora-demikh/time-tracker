import React, { FC } from "react";
import { User } from '../../types/User';
import { UserIcon } from '../UI/UserIcon';

type Props = {
  users: User[];
  selectedUser: User | null;
  handleClick: (user: User) => void;
};

export const DropdownList:FC<Props> = ({ users, selectedUser, handleClick }) => {

  return (
    <ul className='origin-top-right absolute top-full left-1/2 -translate-x-1/2 min-w-[240px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl z-10'>
      {users.map((user: User) => (
        <li key={user.id}>
          <button
            className={`text-slate-800 hover:bg-slate-50 flex items-center p-2 w-full ${
              user.username === selectedUser?.username ? "bg-slate-50" : ""
            }`}
            onClick={() => handleClick(user)}
          >
            <div className='flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm h-7 w-7 shrink-0 mr-3'>
            <UserIcon />
            </div>
            <span className='whitespace-nowrap'>{user.username}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
