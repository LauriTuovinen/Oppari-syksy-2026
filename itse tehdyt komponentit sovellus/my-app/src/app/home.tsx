import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

import Input from "./components/input";
import PlaceCard from "./components/placeCard";
import places from "../../Data.json";
import { router } from "expo-router";
import { placeImages } from "../placeImages";
import BottomNavigation from "./components/bottomNavigation";
import PlaceDetailsModal from "./components/detailsModal";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredPlaces = places.filter((place) =>
    place.placeName.toLowerCase().includes(search.trim().toLowerCase())
  );

  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[number] | null>(
  null
);

  return (
    <View className="flex-1 bg-purple-50">
    <ScrollView
      className="flex-1 bg-purple-50"
      contentContainerClassName="pb-10"
    >
      {/* Sivun yläosan kuva */}
      <Image
        source={require("../../assets/Header.png")}
        className="h-52 w-full"
        resizeMode="cover"
      />

      <View className="px-5">
        {/* Sovelluksen otsikko */}
        <Text className="text-center mt-4 font-heading text-5xl text-black">
          VisitOulu
        </Text>

        {/* Hakukenttä */}
        <View className="mt-8">
          <Input 
            variant="search"
            icon="search-outline"
            value={search}
            onChangeText={setSearch}
            onClear={() => setSearch("")}
            placeholder="Hae paikkaa"
          />
        </View>

        {/* Suositellut paikat */}
        <Text className="mb-4 mt-6 font-heading-bold text-xl text-gray-900">
          Parhaat paikat lähellä
        </Text>
<View className="gap-4">
{filteredPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            name={place.placeName}
            location={place.location}
            rating={place.rating}
            reviewCount={place.reviewCount}
            image={placeImages[place.imageUri]}
            onPress={() => 
                setSelectedPlace(place)}
            
            
          />
        ))}
        </View>
      </View>
    </ScrollView>
    
  
  <BottomNavigation activeTab="home" />
  <PlaceDetailsModal
        place={selectedPlace}
        visible={selectedPlace !== null}
        onClose={() => setSelectedPlace(null)}
      />
  </View>
  
  );
}