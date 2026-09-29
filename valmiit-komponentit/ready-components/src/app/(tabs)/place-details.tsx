import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from "expo-router";
import { Image } from '@/components/ui/image';
import { Icon } from '@/components/ui/icon';
import { Star, MapPin, Heart } from "lucide-react-native";
import { Text } from '@/components/ui/text';
import { Toast, ToastTitle, ToastDescription, useToast, } from '@/components/ui/toast';
import {SafeAreaView} from 'react-native-safe-area-context';

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

  const toast = useToast();  
  const handleToast = () => {
  toast.show({
    placement: "top",
    duration: 3000,
    render: ({ id }) => (
      <Toast nativeID={`toast-${id}`} action="success" variant="solid">
        <ToastTitle>Onnistui</ToastTitle>
        <ToastDescription>
          Kohde lisätty suosikkeihin
        </ToastDescription>
      </Toast>
    ),
  });
};

  return (
    <SafeAreaView className='flex-1' edges={["top"]}>
      <ScrollView
      contentContainerStyle={{
        paddingBottom: 140,
      }}
      showsVerticalScrollIndicator={true}>
        <View>
          <Image
            className="w-full h-100"
            source={images[imageName as string]}
            resizeMode="cover"
            size='2xl'
            alt='placeName'
          /> 
          <View className='bg-[#F6EFFF] rounded-t-4xl -mt-10 px-6 pt-6 pb-10'>
            <View className='flex-row justify-between items-center'>   
              <Text className='pt-8 pb-4 text-5xl text-black font-bold'>{placeName}</Text>
              <TouchableOpacity onPress={handleToast}>
                <Icon as={Heart} size='xl' fill={'#44126B'} stroke={'#44126B'}></Icon>
              </TouchableOpacity>
            </View>
            <View className='flex-row justify-between items-center w-full'>
              <View className='flex-row items-center'>
                <Icon as={MapPin} size='xl' className='text-[#44126B]'/>
                <Text className='text-xl text-black'>{location}</Text>
              </View>
              <View className='flex-row items-center'>
                <Icon as={Star} size='xl' className='text-[#44126B] fill-[#44126B]'/>
                <Text className='font-bold text-xl text-black'>{rating}</Text>
              </View>
            </View>
            <Text className='mt-6 text-xl text-black'>{text}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}