import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SearchIcon } from '@/components/ui/icon';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack'; 
import { Button } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { FlatList, ScrollView } from "react-native";
import data from "../../data/Data.json";
import ContentCard from "../(tabs)/contentCard";

export default function Places() {
  const [search, setSearch] = React.useState('');

  const filteredData = data.filter((item) =>
    item.placeName.toLowerCase().includes(search.toLowerCase())
    
  );
  return (
    <ScrollView>
      <View className="bg-[#F6EFFF] flex-1 p-6 my-10 mb-28">
        <Center>
          <VStack>
            <Heading size='3xl'> Tutustu Oulun Nähtävyyksiin </Heading>
              <Input className="mt-8 rounded-full px-4 py-1 bg-[#d2a6f4]">
                <InputSlot>
                  <InputIcon
                    className="text-black h-10 w-10"
                    as={SearchIcon}
                    />
                </InputSlot>
                <InputField
                  className="text-white text-xl placeholder:text-gray-200"
                  placeholder="Etsi..."
                  value={search}
                  onChangeText={setSearch}
                  />
              </Input>
            <HStack>
            </HStack>
            <Text bold={true} size='3xl' className='mt-6 mb-4'>{filteredData.length} kohdetta</Text>
              <FlatList
                className='bg-[#F6EFFF]'
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <ContentCard details={item}/>
                )}
                ListEmptyComponent={
                <Text className="text-black text-xl text-center mt-10">
                  Haulla ei löytynyt tuloksia
                </Text>
              }
                contentContainerStyle={{
                  paddingBottom: 10
                }}
              />
          </VStack>
        </Center>
      </View>
    </ScrollView>
  );
}