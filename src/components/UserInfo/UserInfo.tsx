import React, { useContext, useEffect, useState } from "react";
import { User } from '../../types/User';
import { UserContext } from '../../context/userContext';
import { AdditionalInfo } from '../AdditionalInfo/AdditionalInfo';
import { TimeTracker } from '../TimeTracker/TimeTracker';
import { MainInfo } from '../MainInfo/MainInfo';

export const UserInfo: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const context = useContext(UserContext)

  useEffect(() => {
    setSelectedUser(context.user)
  }, [context])

  return (
    <>
      {!selectedUser ? (
        <article className='flex flex-col justify-center m-2 p-4 lg:px-8 border rounded-lg border-slate-200'>
          Select the user first
        </article>
      ) : (
        <article className='flex flex-col justify-center m-2 p-4 lg:px-8 border rounded-lg border-slate-200'>
          <MainInfo selectedUser={selectedUser} />
          <AdditionalInfo selectedUser={selectedUser} />
          <TimeTracker />
        </article>
      )}
    </>
  );
};
