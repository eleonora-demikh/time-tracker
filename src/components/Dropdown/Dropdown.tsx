import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import useClickOutside from '../../hooks/useClickOutside';
import { User } from '../../types/User';
import { UserContext } from '../../context/userContext';
import { filterUsers } from '../../helpers/usersFilter';
import { DropdownList } from './DropdownList';
import { DropdownInput } from './DropdownInput';

type Props = {
  data: User[],
};

export const Dropdown: React.FC<Props> = ({ data }) => {
  const { user, updateUser } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user?.username !== undefined) {
      updateSearchParams(user?.username as string);
      setPlaceholder(user.username);
    } else {
      updateSearchParams("");
      setPlaceholder("Select the team member...");
    }
  }, []);

  const visibleUsers = useMemo(() => {
    return filterUsers(query, data)
  }, [data, query])

  useClickOutside(
    dropdownRef,
    useCallback(() => {
      setIsOpen(false);
    }, [])
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, []);

  const updateSearchParams = useCallback((newUser: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newUser !== "") {
      newSearchParams.set("user", newUser);
    } else {
      newSearchParams.delete("user");
    }

    setSearchParams(newSearchParams);
  }, []);

  const handleSelectItem = useCallback((user: User) => {
    updateUser(user);
    setPlaceholder(user.username);
    setQuery('');
    updateSearchParams(user.username);
    setIsOpen(false);
  }, []);

  return (
    <div className='p-4 lg:px-8 relative w-full flex justify-center'>
      <div ref={dropdownRef}>
        <DropdownInput
          handleToggle={toggleDropdown}
          handleChange={setQuery}
          value={query}
          placeholder={placeholder}
          isOpen={isOpen}
        />

        {isOpen && (
          <DropdownList
            users={visibleUsers}
            handleClick={handleSelectItem}
          />
        )}
      </div>
    </div>
  );
};
