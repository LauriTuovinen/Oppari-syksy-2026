import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useState } from "react";

import { placeImages } from "../../placeImages";
import Toast from "./toast";
import { useFavorites } from "../hook/favoriteContext";

type Place = {
  id: number;
  imageUri: string;
  placeName: string;
  location: string;
  rating: number;
  reviewCount: number;
  text: string;
};

type PlaceDetailsModalProps = {
  place: Place | null;
  visible: boolean;
  onClose: () => void;
};

export default function PlaceDetailsModal({
  place,
  visible,
  onClose,
}: PlaceDetailsModalProps) {
  if (!place) {
    return null;
  }

  const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    
const { isFavorite, toggleFavorite } = useFavorites();
const favorite = isFavorite(place?.id ?? -1);

const handleFavorite = () => {
    if (!place) return;

    const willBeFavorite = !isFavorite(place.id);

    toggleFavorite(place.id);

    // Toast näytetään vain, kun paikka lisätään suosikkeihin.
    setToastMessage(
    willBeFavorite
      ? "Kohde lisätty suosikkeihin"
      : "Kohde poistettu suosikeista"
  );
        
        setShowToast(true);

        setTimeout(() => {
        setShowToast(false);
        }, 2000);
    
    };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
        <Toast 
        visible={showToast} 
        message={toastMessage} 
        />
      {/* Tumma tausta modalin takana */}
      <View className="flex-1 justify-end bg-black/40">
        <View className="max-h-[85%] rounded-t-3xl bg-purple-50">
          
          {/* Sulkemispainike */}
          <Pressable
            onPress={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2"
            accessibilityRole="button"
            accessibilityLabel="Sulje"
          >
            <Ionicons name="close" size={24} color="#111827" />
          </Pressable>

          <ScrollView>
            <Image
              source={placeImages[place.imageUri]}
              className="h-72 w-full"
              resizeMode="cover"
            />

            <View className="-mt-6 rounded-t-3xl bg-purple-50 px-5 pb-10 pt-8">
              <View className="flex-row items-start justify-between">
                <Text className="flex-1 pr-4 font-heading-bold text-3xl">
                  {place.placeName}
                </Text>

                <Pressable onPress={handleFavorite}
                accessibilityRole="button"
                accessibilityLabel={isFavorite(place.id)
                 ? "Poista suosikeista" 
                 : "Lisää suosikkeihin"}>
                  <Ionicons
                    name={favorite ? "heart" : "heart-outline"}
                    size={28}
                    color={favorite ? "#EF4444" : "#111827"}
                  />
                </Pressable>
              </View>

              <View className="mt-3 flex-row justify-between">
                <View className="flex-row items-center">
                  <Ionicons
                    name="location"
                    size={15}
                    color="#6D28D9"
                  />

                  <Text className="ml-1 font-body text-sm">
                    {place.location}
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Ionicons
                    name="star"
                    size={15}
                    color="#6D28D9"
                  />

                  <Text className="ml-1 font-body text-sm">
                    {place.rating.toFixed(1)}
                  </Text>
                </View>
              </View>

              <Text className="mt-6 font-body text-base leading-6 text-gray-600">
                {place.text}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}