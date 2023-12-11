import React, { useEffect } from "react";
import { useState } from "react";
import { Dropdown } from "./components/Dropdown/Dropdown";
import { User } from './types/User';
import { UserInfo } from './components/UserInfo/UserInfo';
import "./App.css";

function App() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [selectedUser, setSelectedUser] = useState("");

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

  return (
    <div className='flex justify-center flex-col font-medium text-sm w-screen max-w-screen-md'>
      <Dropdown data={users} />
      <UserInfo data={users} />
    </div>
  );
}

export default App;
