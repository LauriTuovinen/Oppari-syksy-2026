import React from 'react';
import { View } from 'react-native';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { ScrollView } from '@/components/ui/scroll-view';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchIcon } from '@/components/ui/icon';
import { FlatList } from "react-native";
import data from "./Data.json";
import ContentCard from "../(tabs)/contentCard";

export default function Home() {
  return (
    <SafeAreaView className="bg-[#F6EFFF] flex-1">
      <FlatList
        className='bg-[#F6EFFF]'
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
        <ContentCard details={item}/>
        )}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListHeaderComponent={
          <>
            <Image
              source={require("@/assets/images/Oulu.jpg")}
              className="w-full h-65"
              alt="Oulu"
            />

            <View className="bg-[#F6EFFF] items-center">
              <Text className="pt-4 text-black font-bold text-5xl text-center">
                VisitOulu
              </Text>
            </View>

            <View className="bg-[#F6EFFF] w-full">
              <View className="items-center">
                <Input className="w-11/12 mt-4 rounded-full px-4 py-2 bg-[#9756c8]">
                  <InputSlot>
                    <InputIcon
                      className="text-black h-10 w-10"
                      as={SearchIcon}
                    />
                  </InputSlot>

                  <InputField
                    className="text-black placeholder:text-gray-200"
                    placeholder="Etsi..."
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