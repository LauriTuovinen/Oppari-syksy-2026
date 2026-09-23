import React from 'react';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { FlatList} from '@/components/ui/flat-list';
import data from './Data.json';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { View, StatusBar } from 'react-native';
import { router } from "expo-router";

type Place = {
  id: number;
  imageUri: string;
  placeName: string;
  location: string;
  rating: number;
  reviewCount: number;
  text: string;
};

const DetailsItem = ({ details }: { details: Place }) =>{
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
			<TouchableOpacity onPress={NavigateToPlaceDetails}>
				<View>
					<Image
						source={details.imageUri}
						resizeMode="cover" // This keeps the aspect ratio and fills the box
					/>
					<View style={{flex:1, flexDirection: 'row',marginTop: 10,
					}}>
						<View style={{flex:2}}>
							<Text> {details.placeName} </Text>
							<Text> {details.location} </Text>
							<Text> {details.rating} ⭐⭐⭐⭐⭐</Text>
							<Text> {details.reviewCount} </Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
}

export default function ContentCard() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DetailsItem details={item} />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
