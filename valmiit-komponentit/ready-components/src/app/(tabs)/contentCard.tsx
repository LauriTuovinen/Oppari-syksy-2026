import React from 'react';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
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

		 return (
    <TouchableOpacity className="w-full" onPress={NavigateToPlaceDetails}>
      <Card className="bg-[#E9DEF3] mx-6 mb-8 rounded-2xl">
        <Image
          className="w-full h-50 rounded-2xl"
          source={images[details.imageUri]}
          resizeMode="cover"
          alt={details.placeName}
        />
        <View className="flex-row items-center w-full">
          <Text className="text-black text-2xl font-bold flex-1">
            {details.placeName}
          </Text>
          <View className="flex-row items-center">
            <Icon
              as={Star}
              size="xl"
              className="text-[#44126B] fill-[#44126B]"
            />
            <Text className="text-black text-2xl font-bold ml-1">
              {details.rating}
            </Text>
          </View>
        </View>
        <Text className="text-[#7D7D7D]">
          {details.location}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}