import React from 'react';
import { View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack'; 
import { Center } from '@/components/ui/center';
import data from "../../data/Data.json";
import ContentCard from "../(tabs)/contentCard";

type Place = {
  id: number;
  imageUri: string;
  placeName: string;
  location: string;
  rating: number;
  reviewCount: number;
  text: string;
  tags?: string[];
};

const places = data as Place[];

export default function Places() {
  const [search, setSearch] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const availableTags = Array.from(
    new Set(places.flatMap((place) => place.tags ?? []))
  ).sort((a, b) => a.localeCompare(b, 'fi'));

  const filteredData = places.filter((place) => {
    const matchesSearch = place.placeName
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesTag =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => (place.tags ?? []).includes(tag));

    return matchesSearch && matchesTag;
  });
  return (
    <View className="flex-1 bg-[#F6EFFF]">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
      <FlatList
        className="bg-[#F6EFFF]"
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContentCard details={item} />
        )}
        ListHeaderComponent={
          <View className="p-5 mx-4 mt-10">
            <Center>
              <VStack className="w-full">
                <Heading size="3xl">
                  Tutustu Oulun Nähtävyyksiin
                </Heading>
                <Input className="mt-8 border-b-[#44126B] border-b-4 rounded-none border-t-0 border-x-0 px-4 py-1">
                  <InputSlot>
                    <InputIcon
                      className="text-[#44126B] h-10 w-10"
                      as={SearchIcon}
                    />
                  </InputSlot>
                  <InputField
                    className="text-black text-xl placeholder:text-[#44126B]"
                    placeholder="Etsi..."
                    value={search}
                    onChangeText={setSearch}
                  />
                </Input>
                <View className="flex-row justify-center flex-wrap mt-4">
                  <TouchableOpacity
                    onPress={() => setSelectedTags([])}
                    className={`mr-2 mb-2 rounded-none px-4 py-2 ${
                      selectedTags.length === 0
                        ? 'bg-[#44126B]'
                        : 'bg-[#E9DEF3]'
                    }`}
                  >
                    <Text
                      className={
                        selectedTags.length === 0
                          ? 'text-white font-semibold'
                          : 'text-black font-semibold'
                      }
                    >
                      Kaikki
                    </Text>
                  </TouchableOpacity>
                  {availableTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <TouchableOpacity
                        key={tag}
                        onPress={() => {
                          setSelectedTags((current) =>
                            current.includes(tag)
                              ? current.filter((item) => item !== tag)
                              : [...current, tag]
                          );
                        }}
                        className={`mr-2 mb-2 rounded-none px-6 py-2 ${
                          isSelected
                            ? 'bg-[#44126B]'
                            : 'bg-[#E9DEF3]'
                        }`}
                      >
                        <Text className={isSelected ? 'text-white font-semibold' : 'text-black font-semibold'}>
                          {tag}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text bold size="3xl" className="mt-4 mb-4">
                  {filteredData.length} kohdetta
                </Text>
              </VStack>
            </Center>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-black text-xl text-center mt-4">
            Haulla tai suodattimella ei löytynyt tuloksia
          </Text>
        }
        contentContainerStyle={{
          paddingBottom: 90,
        }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}