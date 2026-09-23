import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function PlaceDetails() {
  const {
    id,
    imageUri,
    placeName,
    location,
    rating,
    reviewCount,
    text,
  } = useLocalSearchParams();

  return (
    <View>
      <Text>{placeName}</Text>
      <Text>{location}</Text>
      <Text>{rating}</Text>
      <Text>{reviewCount}</Text>
      <Text>{text}</Text>
    </View>
  );
}