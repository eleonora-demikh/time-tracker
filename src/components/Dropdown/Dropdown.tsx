import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import useClickOutside from '../../hooks/useClickOutside';
import { User } from '../../types/User';
import { filterUsers } from '../../helpers/usersFilter';
import { DropdownList } from '../DropdownList/DropdownList';
import { UserContext } from '../../context/userContext';
import { DropdownInput } from '../DropdownInput/DropdownInput';

type Props = {
  data: User[],
  handleSelectUser: React.Dispatch<React.SetStateAction<User | null>>,
  selectedUser: User | null,
};

export const Dropdown: React.FC<Props> = ({data, handleSelectUser, selectedUser}) => {
  const context = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [query, setQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context.user?.username !== undefined) {
      updateSearchParams(context.user?.username as string);
      setPlaceholder(context.user.username);
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

  const handleSelectItem = (user: User) => {
    context.updateUser(user);
    handleSelectUser(user);
    setPlaceholder(user.username);
    setQuery('');
    updateSearchParams(user.username);
    setIsOpen(false);
  };

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
            selectedUser={selectedUser}
            handleClick={handleSelectItem}
          />
        )}
      </div>
    </div>
  );
};
