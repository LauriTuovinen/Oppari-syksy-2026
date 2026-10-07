import React from 'react';
import { View } from 'react-native';
import { useUser } from '../../context/UserContext';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from '@/components/ui/alert-dialog';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image'
import { Switch } from '@/components/ui/switch';
import { Center } from '@/components/ui/center';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContentWrapper,
  TabsTriggerText,
  TabsIndicator,
} from '@/components/ui/tabs';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from '@/components/ui/select';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { ChevronDownIcon } from '@/components/ui/icon';

const images: Record<string, any> = {
  "profileFemale.jpg": require("../../../assets/images/profileFemale.jpg"),
  "profileMale.jpg": require("../../../assets/images/profileMale.jpg"),
};

export default function Profile() {
  const { user, setUser } = useUser();
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showAge, setShowAge] = React.useState(true);
  const handleClose = () => setShowAlertDialog(false);

  const handleSignOut = () => {
    setUser(null);
    router.replace('/login');
  };

  const handleGenderChange = (gender: string) => {
    if (!user) return;

    setUser({
      ...user,
      gender: gender,
    });
  };

  return (
    <View className="flex-1 bg-[#F6EFFF] p-5 m-4 my-10">
      <Heading size='3xl' className='text-left p-4'>Sinun profiilisi</Heading>
      <Center>
        <Avatar className="bg-pink-600 h-24 w-24">
          <AvatarFallbackText className="text-2xl">{user?.name}</AvatarFallbackText>
            <AvatarImage
              source={user?.profilePicture
          ? images[user.profilePicture]
          : undefined}
            />
        </Avatar>
        <Text className="text-3xl font-bold">
          {user?.name}
        </Text>

        <View className='flex-row justify-around w-full mb-4'>
          <Text>
           {showAge && <Text className="text-[#6F7D78]">{user?.age}</Text>}
          </Text>

          <Text className="text-[#6F7D78]">
            {user?.city}
          </Text>

          <Text className="text-[#6F7D78]">
            {user?.gender}
          </Text>
        </View>
      </Center>
      <Tabs variant="underlined" defaultValue="suosikit" className="w-full">
      <TabsList className="bg-[#F6EFFF]" contentContainerClassName="w-full flex-row justify-around"
    contentContainerStyle={{
      flexGrow: 1,
      justifyContent: 'space-around',
    }}>
        <TabsTrigger value="suosikit">
          <TabsTriggerText bold={true}>Suosikit</TabsTriggerText>
        </TabsTrigger>
        <TabsTrigger value="asetukset">
          <TabsTriggerText>Asetukset</TabsTriggerText>
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
       <TabsContentWrapper>
        <TabsContent value="suosikit">
          <Box className="pt-4">
            <Heading size='3xl' className="text-foreground text-center">Omat suosikit</Heading>

          </Box>
        </TabsContent>
        <TabsContent value="asetukset">
          <Box className="p-4">
            <Heading size='3xl' className="text-foreground text-center">Asetukset</Heading>
              <Center className='flex-row justify-between'>
                <Text bold={true}>Tumma tila</Text>
                <Switch
                  size="md"
                  isDisabled={false}
                  trackColor={{ false: '#E9DEF3', true: '#44126B' }}
                  thumbColor="#fafafa"
                  ios_backgroundColor="#d4d4d4"
                />
                </Center>
                <Center className='flex-row justify-between'>
                <Text bold={true}>Näytä ikä</Text>
                <Switch
                  size="md"
                  value={showAge}
                  onValueChange={setShowAge}
                  isDisabled={false}
                  trackColor={{ false: '#E9DEF3', true: '#44126B' }}
                  thumbColor="#fafafa"
                  ios_backgroundColor="#d4d4d4"
                  />
              </Center>

              <Select className="bg-[#C8CEE9]"
                selectedValue={user?.gender}
                onValueChange={handleGenderChange}
              >
                <SelectTrigger variant="underlined" size="md">
                  <SelectInput className="font-bold text-black" placeholder="Valitse sukupuoli" />
                  <SelectIcon className="mr-3 text-black" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop/>
                  <SelectContent className="bg-[#C8CEE9] font-bold text-black">
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Nainen" value="Nainen" />
                    <SelectItem label="Mies" value="Mies" />
                    <SelectItem label="En halua sanoa" value="En halua sanoa" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            <Button
              onPress={() => setShowAlertDialog(true)}
              className="m-auto mt-10 py-4 px-14 rounded-4xl bg-[#791BFD]"
              >
              <ButtonText className="text-2xl">
                Kirjaudu ulos
              </ButtonText>
            </Button>
            <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
              <AlertDialogBackdrop />
              <AlertDialogContent className="bg-[#E9DEF3]">
                <AlertDialogHeader>
                  <Heading className="text-foreground font-semibold text-lg">
                    Oletko varma, että haluat kirjautua ulos?
                  </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button variant="outline" onPress={handleClose} className="bg-[#906aae]">
                    <ButtonText className='text-white'>Peruuta</ButtonText>
                  </Button>
                  <Button onPress={handleSignOut} className='bg-[#791BFD]'>
                    <ButtonText>Kirjaudu ulos</ButtonText>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
        </TabsContent>
      </TabsContentWrapper>
    </Tabs>
    </View>
  );
}