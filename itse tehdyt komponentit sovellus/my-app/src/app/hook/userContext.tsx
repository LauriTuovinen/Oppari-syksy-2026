import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import users from "../../../Users.json";


type User = {
  userId: number;
  name: string;
  age: string;
  city: string;
  gender: string;
  email: string;
  profilePicture: string;
  password: string;
};


type UserContextType = {
  currentUser: User | null;
  login: 
  (email: string, 
    password: string,
    ) => boolean;
  logout: () => void;
  updateGender: (gender: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (!user) {
      return false;
    }

    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateGender = (gender: string) => {
    setCurrentUser((current) => {
        if (!current) {
            return null;
        }
        return {
            ...current,
            gender,
        };
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        updateGender,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
}