import React from 'react';
import { View, Image } from 'react-native';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, Icon } from '@/components/ui/icon';
import { RotateCw, Lock, Mail  } from 'lucide-react-native';
import { router } from 'expo-router';
import users from '../data/Users.json';


export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleLogin = () => {
    setError('');
    setEmailError(false);
    setPassError(false);

    if (email.trim() === '') {
      setEmailError(true);
      return;
    }

    if (password.trim() === '') {
      setPassError(true);
      return;
    }

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password
    );

    if (user) {
      console.log('Logged in user:', user);

      router.replace('/home');
    } else {
      setError('Virheellinen sähköposti tai salasana');
    }
  };

  return (      
    <View className="flex-1">
    <Image
      source={require("@/assets/images/OuluSkyline.jpg")}
      className="absolute inset-0 w-full h-full"
      resizeMode="cover"
      style={{ opacity: 0.6 }}
    />
      <View className="flex-1 items-center justify-center">
        <Heading size="5xl" className=''>VisitOulu</Heading>
          <FormControl className="p-4 w-full">
            <VStack className="gap-4">
            <VStack space="xs">
              
              <Input className={`bg-[#E9DEF3] p-2 rounded-2xl ${
                emailError ? 'border-red-500' : ''
              }`}>
                <InputField                   
                  type="text"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setEmailError(false);
                  }}
                  placeholder="Sähköposti"
                  autoCapitalize="none"
                  keyboardType="email-address" />
                <InputIcon as={Mail} stroke={'black'}/>
              </Input>
            </VStack>
            <VStack space="xs">
              
            <Input className={`bg-[#E9DEF3] p-2 rounded-2xl ${
              passError ? 'border-red-500':''
            }`}>
              <InputField 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChangeText={(text)=>{
                  setPassword(text);
                  setPassError(false);
                }}
                placeholder="Salasana"
              />
              <InputIcon as={Lock} stroke={'black'}/>
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon stroke={'black'} as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>

            </VStack>
            {error !== '' && (
              <Text className="text-red-600 text-center">
                {error}
              </Text>
            )}
            <Button onPress={handleLogin} className="m-auto mt-20 py-4 px-14 rounded-4xl bg-[#791BFD]">
              <ButtonText className='text-2xl'>Kirjaudu</ButtonText>
            </Button>
            <Button className="m-auto py-4 px-10 rounded-4xl bg-[#791BFD]">
              <Icon as={RotateCw} size='xl' className='text-white'></Icon>
              <ButtonText className='text-2xl'>Kirjaudu</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </View>
    </View>
  );
}