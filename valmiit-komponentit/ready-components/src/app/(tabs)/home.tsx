import React from 'react';
import { View, StatusBar } from 'react-native';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { ScrollView } from '@/components/ui/scroll-view';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '@/components/ui/icon';
import { FlatList } from "react-native";
import data from "../../data/Data.json";
import ContentCard from "../(tabs)/contentCard";

export default function Home() {
  const [search, setSearch] = React.useState('');

  const filteredData = data.filter((item) =>
    item.placeName.toLowerCase().includes(search.toLowerCase())
    
  );
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} className="bg-[#F6EFFF] flex-1">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <FlatList
        className='bg-[#F6EFFF]'
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <ContentCard details={item}/>
        )}
        ListEmptyComponent={
        <Text className="text-black text-xl text-center mt-10 font-app">
          Haulla ei löytynyt tuloksia
        </Text>
      }
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <Image
              source={require("@/assets/images/Oulu.jpg")}
              className="w-full h-70"
              alt="Oulu"
            />

            <View className="bg-[#F6EFFF] items-center">
              <Text className="pt-4 text-black font-bold text-5xl text-center font-app">
                VisitOulu
              </Text>
            </View>

            <View className="bg-[#F6EFFF] w-full">
              <View className="items-center px-6">
                <Input className="mt-4 rounded-full px-4 py-1 bg-[#d2a6f4]">
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
              </View>

              <Text className="text-black font-bold text-2xl mt-4 px-4 py-4">
                Parhaat paikat lähellä
              </Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}