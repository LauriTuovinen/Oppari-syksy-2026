import React from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { Image } from '@/components/ui/image';
import { Icon } from '@/components/ui/icon';
import { Star, MapPin, Heart } from "lucide-react-native";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from '@/components/ui/toast';
import { Button, ButtonText } from '@/components/ui/button';

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

  const imageName = Array.isArray(imageUri) ? imageUri[0] : imageUri;

  const images: Record<string, any> = {
  "Toripolliisi.jpg": require("../../../assets/images/Toripolliisi.jpg"),
	"Nallikarin-majakka.jpg": require("../../../assets/images/Nallikarin-majakka.jpg"),
	"tietomaa.jpg": require("../../../assets/images/tietomaa.jpg"),
	"Valkea.jpg": require("../../../assets/images/Valkea.jpg"),
	"Ideapark.jpg": require("../../../assets/images/Ideapark.jpg"),
	"Ainolanpuisto.jpg": require("../../../assets/images/Ainolanpuisto.jpg"),
	"Nallikari.jpg": require("../../../assets/images/Nallikari.jpg"),
	"rotuaari.jpg": require("../../../assets/images/rotuaari.jpg"),
	"PaskaKaupunni.jpg": require("../../../assets/images/PaskaKaupunni.jpg"),
};

  return (
    <View className='flex-1 bg-[#F6EFFF]'>
      <Image
        className="w-full h-90 mb-4"
        source={images[imageName as string]}
        resizeMode="cover"
        size='2xl'
        alt='placeName'
      />
      <View className='pt-6 m-4'>
        <Text className='text-5xl font-bold'>{placeName}</Text>
        <View className='flex flex-row justify-around w-full'>
          <View className='flex-1 flex-row'>
            <Icon as={MapPin} size='xl' className='text-[#44126B]'/>
            <Text className='text-xl'>{location}</Text>
          </View>
          <View className='flex-1 flex-row'>
            <Icon as={Star} size='xl' className='text-[#44126B] fill-[#44126B]'/>
            <Text className='font-bold text-xl'>{rating}</Text>
          </View>
        </View>
        <Text className='mt-6 text-xl'>{text}</Text>
      </View>
    </View>
  );
}