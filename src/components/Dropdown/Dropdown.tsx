import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import useClickOutside from '../../hooks/useClickOutside';
import { User } from '../../types/User';
import { filterUsers } from '../../helpers/usersFilter';
import { ArrowDown } from '../UI/ArrowDown';
import { Close } from '../UI/Close';
import { DropdownList } from '../DropdownList/DropdownList';

type Props = {
  data: User[]
};

export const Dropdown: React.FC<Props> = ({data}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('Select the team member...');
  const [selectedUser, setSelectedUser] = useState('');
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPlaceholder(searchParams.get('user') || '')
  }, [data]);

  const visibleUsers = useMemo(() => {
    return filterUsers(query, data)
  }, [data, query])

  useClickOutside(
    dropdownRef,
    useCallback(() => {
      setIsOpen(false);
    }, [])
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateSearchParams = (newUser: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newUser !== "") {
      newSearchParams.set("user", newUser);
    } else {
      newSearchParams.delete("user");
    }

    setSearchParams(newSearchParams);
  };

  const handleSelectUser = (userName: string) => {
    setSelectedUser(userName);
    setPlaceholder(userName);
    setQuery('');
    updateSearchParams(userName);
    setIsOpen(false);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim();
    setQuery(newQuery);
  };

  return (
    <div className='p-4 lg:px-8 relative w-full flex justify-center'>
      <div ref={dropdownRef}>
        <div className='flex space-x-5 relative w-320' onClick={toggleDropdown}>
          <input
            className='border rounded text-slate-800 border-slate-200 focus:border-indigo-300 shadow-sm p-2 pr-6 h-7 w-60 shrink-0 focus:outline-none'
            type='text'
            placeholder={placeholder}
            value={query}
            onChange={handleQueryChange}
          />
          {!isOpen ? <ArrowDown /> : <Close />}
        </div>

        {isOpen && (
          <DropdownList
            users={visibleUsers}
            selectedUser={selectedUser}
            handleClick={handleSelectUser}
          />
        )}
      </div>
    </div>
  );
};
