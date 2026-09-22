import React from 'react';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

type ContentCardProps = {
	imageUri: string;
	placeName: string;
	location: string;
	rating: number;
	reviewCount: number;
};

export default function ContentCard({
	imageUri,
	placeName,
	location,
	rating,
	reviewCount,
}: ContentCardProps) {
	return (
		<Card size="sm" className="mx-4 my-2 flex-row items-center bg-white shadow-md">
			<Image
				source={{ uri: imageUri }}
				className="h-24 w-24 rounded-xl bg-gray-200"
			/>

			<VStack className="ml-3.5 flex-1">
				<Text className="mb-1.5 text-lg font-bold text-gray-900" numberOfLines={1}>
					{placeName}
				</Text>
				<Text className="mb-3 text-sm text-gray-500" numberOfLines={1}>
					{location}
				</Text>
				<HStack className="items-center">
					<Text className="mr-1 text-base text-amber-500">★</Text>
					<Text className="mr-1.5 text-sm font-semibold text-gray-900">
						{rating.toFixed(1)}
					</Text>
					<Text className="text-xs text-gray-500">({reviewCount} reviews)</Text>
				</HStack>
			</VStack>
		</Card>
	);
}
