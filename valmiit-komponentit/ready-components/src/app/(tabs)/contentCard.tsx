import React from 'react';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { FlatList} from '@/components/ui/flat-list';
import { TouchableOpacity } from 'react-native';
import { View} from 'react-native';
import { router } from "expo-router";
import { Icon } from '@/components/ui/icon';
import { Star } from "lucide-react-native";


type Place = {
  id: number;
  imageUri: string;
  placeName: string;
  location: string;
  rating: number;
  reviewCount: number;
  text: string;
};

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

export default function ContentCard({ details }: { details: Place }) {
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

		return(
			<TouchableOpacity className='bg-[#F6EFFF]' onPress={NavigateToPlaceDetails}>
				<View className='flex-1 items-center bg-[#E9DEF3] m-4 p-4 rounded-2xl'>
					<Image
						className="w-full h-50 mb-4"
						source={images[details.imageUri]}
						resizeMode="cover"
						size='2xl'
						alt='placeName'
					/>
					<View className='flex-1 flex-row justify-between w-full'>
						<View className='flex-1 flex-row justify-between w-full'>
							<Text className='text-black text-2xl font-bold'> {details.placeName} </Text>
						</View>
							<Icon as={Star} size="xl" className='text-[#44126B] fill-[#44126B] mt-1' />
							<Text className='text-black text-2xl font-bold'> {details.rating} </Text>
					</View>
					<View className='flex flex-row justify-between w-full'>
						<Text className='text-[#7D7D7D]'> {details.location} </Text>
					</View>
					</View>	
			</TouchableOpacity>
		);
}
