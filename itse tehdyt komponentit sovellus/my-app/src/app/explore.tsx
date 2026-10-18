import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";

import places from "../../Data.json";
import { placeImages } from "../placeImages";

import Input from "./components/input";
import PlaceCard from "./components/placeCard";
import BottomNavigation from "./components/bottomNavigation";
import PlaceDetailsModal from "./components/detailsModal";
import CategoryFilter from "./components/categoryFilter";

export default function Places() {
  const [search, setSearch] = useState("");
  const [category,setCategory]=useState< "Kaikki" | "Nähtävyydet" | "Museot">("Kaikki");

  const [selectedPlace, setSelectedPlace] =
    useState<(typeof places)[number] | null>(null);

  // Suodatetaan paikat hakukentän tekstin perusteella.
  const filteredPlaces = places.filter((place) => {
    const matchSearch = place.placeName
      .toLowerCase() 
      .includes(search.trim().toLowerCase())
  
  const matchCategory =
    category === "Kaikki" || 
    place.category === category;

    return matchSearch && matchCategory;
  });


  return (
    <View className="flex-1 bg-purple-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6 pt-8"
      >
        <Text className="font-heading text-3xl text-gray-900">
          Tutustu Oulun
        </Text>

        <Text className="font-heading text-3xl text-gray-900">
          nähtävyyksiin
        </Text>

        {/* Haku */}
        <View className="mt-6">
          <Input
            variant="search"
            icon="search-outline"
            value={search}
            onChangeText={setSearch}
            onClear={() => setSearch("")}
            placeholder="Hae paikkaa"
          />
        </View>

        <CategoryFilter
          selected={category}
          onChange={setCategory}
        />

        <Text className="mb-4 mt-6 font-body-semibold text-base">
          {filteredPlaces.length} kohdetta
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
              onPress={() => setSelectedPlace(place)}
            />
          ))}
        </View>
      </ScrollView>

      <BottomNavigation activeTab="places" />

      <PlaceDetailsModal
        place={selectedPlace}
        visible={selectedPlace !== null}
        onClose={() => setSelectedPlace(null)}
      />
    </View>
  );
}