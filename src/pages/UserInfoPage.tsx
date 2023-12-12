import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/userContext';
import { User } from '../types/User';
import { MainInfo } from '../components/UserInfo/MainInfo/MainInfo';
import { AdditionalInfo } from '../components/UserInfo/AdditionalInfo/AdditionalInfo';
import { TimeTracker } from '../components/TimeTracker/TimeTracker';
import { Dropdown } from '../components/Dropdown/Dropdown';

export const UserInfoPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Dropdown
        data={users}
      />
      <article className='flex flex-col justify-center m-2 p-4 lg:px-8 border rounded-lg border-slate-200'>
        {!user ? (
          <h3>Select the user first</h3>
        ) : (
          <>
            <MainInfo selectedUser={user} />
            <AdditionalInfo selectedUser={user} />
            <TimeTracker selectedUser={user} />
          </>
        )}
      </article>
    </>
  );
};
