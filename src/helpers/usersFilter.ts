import { User } from '../types/User';

export  const filterUsers = (query: string, data: User[]) => {
    let filteredUsers = [...data] ;

    if (query.trim() !== '') {
      const normalizedQuery = query.toLowerCase();
      const isIncludes = (word: string | null) => {
        return word?.toLowerCase().includes(normalizedQuery);
      };

      filteredUsers = filteredUsers.filter(
        (user) =>
          isIncludes(user.name)
          || isIncludes(user.username)
      );
    }
    return filteredUsers
  }