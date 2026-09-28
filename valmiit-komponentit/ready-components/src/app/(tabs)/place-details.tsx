import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { Image } from '@/components/ui/image';

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
      <Image
        size='xl'
        source={typeof imageUri === 'string' ? imageUri : imageUri?.[0]}
        alt="placeName"
        className=''
      />
      <Text>{placeName}</Text>
      <Text>{location}</Text>
      <Text>{rating}</Text>
      <Text>{reviewCount}</Text>
      <Text>{text}</Text>
    </View>
  );
}