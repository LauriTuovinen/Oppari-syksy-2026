import { useState, useEffect, use } from "react";
import {
    Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";

import BottomNavigation from "./components/bottomNavigation";
import ProfileTabs from "./components/profileTabs";
import Select from "./components/select";
import FavoriteCard from "./components/favoriteCard";
import places from "../../Data.json";
import { placeImages } from "../placeImages";
import { useFavorites } from "./hook/favoriteContext";
import Button from "./components/button";
import { useRouter } from "expo-router";
import { useUser } from "./hook/userContext";
import Avatar from "./components/avatar";

type ProfileTab = "favorites" | "settings";

export default function Profile() {
  const [activeTab, setActiveTab] =
    useState<ProfileTab>("favorites");
    const [darkMode, setDarkMode] = useState(false);
    const [showAge, setShowAge] = useState(true);
    const [gender, setGender] = useState("");
  const router = useRouter();
  const {currentUser, logout} = useUser();

  useEffect(() => {
    if (currentUser) {
      setGender(currentUser.gender || "");
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

    return (
    <View className="flex-1 bg-purple-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8 pt-10"
      >
        <Text className="font-heading text-3xl text-gray-900">
          Sinun profiilisi
        </Text>

        {/* Profiilitiedot */}
        <View className="mt-8 items-center">
          <Avatar
            image={require("../../assets/Avatar.png")}
            size="lg"
          />

          <Text className="mt-3 font-body-semibold text-lg">
            {currentUser?.name}
          </Text>

          <Text className="mt-1 font-body text-sm text-gray-500">
            {showAge && currentUser?.age ? 
            `${currentUser?.age}  · ` 
            : ""}
            {currentUser?.city}  ·   {gender}
          </Text>
        </View>

        <ProfileTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {activeTab === "favorites" ? (
          <FavoritesContent/>
        ) : (
          <SettingsContent 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            showAge={showAge}
            setShowAge={setShowAge}
            gender={gender}
            setGender={setGender}
            onLogout={handleLogout}
            />
        )}
      </ScrollView>

      <BottomNavigation activeTab="profile" />
    </View>
  );
}

type FavoritesContentProps = {
  favoriteIds: number[];
  setFavoriteIds: React.Dispatch<React.SetStateAction<number[]>>;
};

function FavoritesContent(){
    const { favoriteIds, removeFavorite } = useFavorites();
  
    const favoritePlaces = places.filter((place) =>
    favoriteIds.includes(place.id)
  );
    
 const handleRemoveFavorite = (placeId: number) => {
    Alert.alert(
      "Poista suosikeista",
      "Poistetaanko kohde suosikeista?",
      [
        {
          text: "Ei",
          style: "cancel",
        },
        {
          text: "Kyllä",
          onPress: () => removeFavorite(placeId),
          },
      ]
    );
  };

  return (
    <View className="mt-6">
      <Text className="font-heading-bold text-2xl">
        Omat suosikit
      </Text>

       {favoritePlaces.map((place) => (
        <FavoriteCard
          key={place.id}
          name={place.placeName}
          location={place.location}
          rating={place.rating}
          image={placeImages[place.imageUri]}
          onRemove={() => handleRemoveFavorite(place.id)}
        />
      ))}

      {favoritePlaces.length === 0 && (
        <Text className="mt-4 font-body text-gray-500">
          Ei suosikkeja.
        </Text>
      )}
    </View>
  );
}


type SettingsContentProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  showAge: boolean;
  setShowAge: (value: boolean) => void;
    gender: string;
    setGender: (value: string) => void;
    onLogout: () => void;
};

function SettingsContent({
    darkMode,
    setDarkMode,
    showAge,
    setShowAge,
    gender,
    setGender,
    onLogout,
}: SettingsContentProps) {
  return (
    <View className="mt-6">
      <Text className="font-heading-bold text-2xl">
        Asetukset
      </Text>

       {/* Tumma tila */}
      <View className="mt-5 flex-row items-center justify-between">
        <Text className="font-body text-base text-gray-900">
          Tumma tila
        </Text>

        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{
            false: "#D1D5DB",
            true: "#6D28D9",
          }}
          thumbColor={darkMode ? "#6D28D9" : "#F3F4F6"}
        />
      </View>

      {/* Iän näyttäminen */}
      <View className="mt-4 flex-row items-center justify-between">
        <Text className="font-body text-base text-gray-900">
          Näytä ikä
        </Text>

        <Switch
          value={showAge}
          onValueChange={setShowAge}
            trackColor={{
                false: "#D1D5DB",
                true: "#6D28D9",
            }}
            thumbColor={showAge ? "#6D28D9" : "#F3F4F6"}
        />
      </View>

        {/* Sukupuoli */}
        <View className="mt-6">
            <Text className="mb-2 font-body-medium text-base text-gray-900">
                Sukupuoli
            </Text>

        <Select
            value={gender}
            onChange={setGender}
            options={[
            "Nainen",
            "Mies",
            "En halua sanoa",
            ]}
            placeholder="Valitse sukupuoli"
        />
        </View>
          <View className="mt-10">
            <Button
              title="Kirjaudu ulos"
              onPress={onLogout}
              variant="danger"
            />
          </View>

    </View>
  );
}