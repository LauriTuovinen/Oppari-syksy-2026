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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContentWrapper,
  TabsTriggerText,
  TabsIndicator,
} from '@/components/ui/tabs';

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
    <View className="flex-1 items-center bg-[#F6EFFF] p-5">
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

      <Tabs defaultValue="suosikit">
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
            <Text className="text-foreground">Omat suosikit</Text>

          </Box>
        </TabsContent>
        <TabsContent value="asetukset">
          <Box className="p-4">
            <Text className="text-foreground">Asetukset</Text>
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