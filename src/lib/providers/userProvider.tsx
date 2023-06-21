import { existingApplicantEndpoint, get } from '@/lib/helpers/apiHelpers';
import { AccountResponseType } from '@/lib/types';
import { useAuth0 } from '@auth0/auth0-react';
import React, { ReactNode, useEffect, useState } from 'react';

export interface IUser {
  email: string;
  id: number;
  isPaused: boolean;
  name: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
  userExists: boolean;
  userErrorCode: number | null;
}

interface IUserProvider {
  children: ReactNode;
}

export class UserProviderError {
  public constructor(
    public errorCode: number,
    public response: Response = {} as Response
  ) {}
}

export const UserContext = React.createContext<IUserContext>(
  {} as IUserContext
);

const UserProvider: React.FC<IUserProvider> = ({ children }) => {
  // TODO: See if we can move all auth0 checks relevant to user inside here
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState<IUser | null>({} as IUser);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [userErrorCode, setUserErrorCode] = useState<number | null>(null);

  // TODO: cache this
  const getAccountData = async (): Promise<IUser | null> => {
    if (!userExists) {
      return get(existingApplicantEndpoint, await getAccessTokenSilently())
        .then(async (res) => {
          if (res.ok) {
            const accountResponse = (await res.json()) as AccountResponseType;
            setUser(accountResponse);

            return accountResponse as IUser;
          } else {
            setUserExists(false);
            setUserErrorCode(res.status);

            return null;
          }
        })
        .catch((e) => {
          console.error(e);

          return null;
        });
    }

    return null;
  };

  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userExists,
        userErrorCode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
