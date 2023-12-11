import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { User } from './types/User';
import { UserInfo } from './components/UserInfo/UserInfo';
import "./App.css";
import { useSearchParams } from 'react-router-dom';
import { UserContext } from './context/userContext';

function App() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(UserContext);
  let selectedUser = '';

  useEffect((() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    }
    
    fetchData()
  }), []);

  useEffect(() => {
    selectedUser = (searchParams.get('user') || '')
    let user;

    if(selectedUser.length > 0) {
      user = users.find(u => u.username === selectedUser)
      context.updateUser(user)
    }
  }, [])

  return (
    <div className='flex justify-center flex-col font-medium text-sm w-screen max-w-screen-md'>
      <Dropdown data={users} />
      <UserInfo />
    </div>
  );
}

export default App;
