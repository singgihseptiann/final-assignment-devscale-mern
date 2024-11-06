import React from 'react';
import Cookies from 'js-cookie';

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  role: string;
}

export interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
}

const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = Cookies.get('accessToken');
    const user = Cookies.get('user');
    const parsedUser = user ? JSON.parse(user) : null;

    if (token) {
      setIsAuthenticated(true);
      setUser(parsedUser);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const contextValue = React.useMemo(() => {
    return { isAuthenticated, user };
  }, [isAuthenticated, user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const value = React.useContext(AuthContext);
  return value;
};
