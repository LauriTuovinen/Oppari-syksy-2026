import React, { createContext, useContext, useState } from 'react';

export type Place = {
  id: number;
  imageUri: string;
  placeName: string;
  location: string;
  rating: number;
  reviewCount: number;
  text: string;
};

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
  user: User | null;
  setUser: (user: User | null) => void;

  favourites: Place[];
  addFavourite: (place: Place) => void;
  removeFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userFavourites, setUserFavourites] = useState<
    Record<number, Place[]>
  >({});

  const favourites = user ? userFavourites[user.userId] ?? [] : [];

  const addFavourite = (place: Place) => {
    if (!user) return;

    setUserFavourites((current) => {
      const currentFavourites = current[user.userId] ?? [];

      // Don't add the same place twice
      if (currentFavourites.some((item) => item.id === place.id)) {
        return current;
      }

      return {
        ...current,
        [user.userId]: [...currentFavourites, place],
      };
    });
  };

  const removeFavourite = (id: number) => {
    if (!user) return;

    setUserFavourites((current) => {
      const currentFavourites = current[user.userId] ?? [];

      return {
        ...current,
        [user.userId]: currentFavourites.filter(
          (item) => item.id !== id
        ),
      };
    });
  };

  const isFavourite = (id: number) => {
    return favourites.some((item) => item.id === id);
  };

  return (
    <UserContext.Provider value={{ user, setUser, favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }

  return context;
}