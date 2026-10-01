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
import { ChevronDownIcon } from '@/components/ui/icon';

const images: Record<string, any> = {
  "profileFemale.jpg": require("../../../assets/images/profileFemale.jpg"),
  "profileMale.jpg": require("../../../assets/images/profileMale.jpg"),
};

export default function Profile() {
  const { user, setUser } = useUser();
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const handleClose = () => setShowAlertDialog(false);

  const handleSignOut = () => {
    setUser(null);
    router.replace('/login');
  };

  return (
    <View className="flex-1 items-center bg-[#F6EFFF] p-5 m-4 my-10">
      <Heading>Sinun profiilisi</Heading>
      <Image 
        className="w-full h-50 mb-4"
          source={user?.profilePicture}
          resizeMode="cover"
          size='2xl'
          alt='placeName'
      />
      <Text className="text-3xl font-bold">
        {user?.name}
      </Text>
      <View className='flex-row justify-between items-center m-4'>
        <Text>
          {user?.age}
        </Text>

        <Text>
           {user?.city}
        </Text>

        <Text>
           {user?.gender}
        </Text>
      </View>

      <Tabs variant="underlined" defaultValue="suosikit">
      <TabsList >
        <TabsTrigger value="suosikit">
          <TabsTriggerText>Suosikit</TabsTriggerText>
        </TabsTrigger>
        <TabsTrigger value="asetukset">
          <TabsTriggerText>Asetukset</TabsTriggerText>
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
       <TabsContentWrapper>
        <TabsContent value="suosikit">
          <Box className="p-4">
            <Heading className="text-foreground">Omat suosikit</Heading>

          </Box>
        </TabsContent>
        <TabsContent value="asetukset">
          <Box className="p-4">
            <Heading className="text-foreground">Asetukset</Heading>
              <Center className='flex-row justify-between items-center'>
                <Text bold={true}>Tumma tila</Text>
                <Switch
                  size="md"
                  isDisabled={false}
                  trackColor={{ false: '#E9DEF3', true: '#525252' }}
                  thumbColor="#fafafa"
                  ios_backgroundColor="#d4d4d4"
                />
                </Center>
                <Center className='flex-row justify-between items-center'>
                <Text bold={true}>Näytä ikä</Text>
                <Switch
                  size="md"
                  isDisabled={false}
                  trackColor={{ false: '#E9DEF3', true: '#525252' }}
                  thumbColor="#fafafa"
                  ios_backgroundColor="#d4d4d4"
                />
              </Center>

              <Select>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Näytä sukupuoli" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Nainen" value="Nainen" />
                    <SelectItem label="Mies" value="Mies" />
                    <SelectItem label="En halua sanoa" value="EnHaluaSanoa" />
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
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Heading className="text-foreground font-semibold text-lg">
                    Oletko varma, että haluat kirjautua ulos?
                  </Heading>
                </AlertDialogHeader>
                <AlertDialogBody className="mt-3 mb-4">
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button variant="outline" onPress={handleClose}>
                    <ButtonText>Peruuta</ButtonText>
                  </Button>
                  <Button onPress={handleSignOut}>
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