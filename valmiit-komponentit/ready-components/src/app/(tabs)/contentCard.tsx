import React from 'react';
import { Card } from '@/components/ui/card';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import { Heart } from "lucide-react-native";
import { Spinner } from '@/components/ui/spinner';
import { Toast, ToastTitle, ToastDescription, useToast, } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon'
import { useUser } from '../../context/UserContext';

type Place = {
  id: number;
  imageUri: string;
  placeName: string;
  location: string;
  rating: number;
  reviewCount: number;
  text: string;
};

export default function ContentCard({ details }: { details: Place }) {
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
  
	const imageSource = images[details.imageUri];	
  
  const NavigateToPlaceDetails = () => {
			router.push({
				pathname: "/place-details",
				params: {
					id: details.id.toString(),
					imageUri: details.imageUri,
					placeName: details.placeName,
					location: details.location,
					rating: details.rating.toString(),
					reviewCount: details.reviewCount.toString(),
					text: details.text,
				},
			});
		}
  
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
  
  const {
    addFavourite,
    removeFavourite,
    isFavourite,
  } = useUser();

  const favourite = isFavourite(details.id);

  const handleFavourite = () => {
    if (favourite) {
      removeFavourite(details.id);
    } else {
      addFavourite(details);
      handleToast();
    }
  };

  return (
    <TouchableOpacity className="w-full" onPress={NavigateToPlaceDetails}>
      <Box className="bg-[#F6EFFF] mx-6 mb-8 rounded-2xl p-0">
        <View className="w-full h-50 rounded-2xl overflow-hidden">

          {imageSource ? (
            <Image
              className="w-full h-full rounded-2xl"
              source={imageSource}
              resizeMode="cover"
              alt={details.placeName}
            />
          ) : (
            <Spinner size="large" color="#44126B" />
          )}
        </View>            
        <TouchableOpacity hitSlop={8} onPress={handleFavourite} className="absolute top-2 right-2 z-10 bg-white/90 rounded-full p-2">
            <Icon as={Heart} size='xl' fill={favourite ? '#44126B' : 'transparent'} stroke={'#44126B'}></Icon>
          </TouchableOpacity>        
        <View className="flex-row items-center w-full">
          <Text className="text-black text-xl flex-1">
            {details.placeName}
          </Text>
        </View>
      </Box>
    </TouchableOpacity>
  );
}