import React from 'react';
import { View, Image } from 'react-native';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { FormControl } from '@/components/ui/form-control';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, Icon } from '@/components/ui/icon';
import { RotateCw } from 'lucide-react-native';



export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
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
              <Text className="text-foreground/60">Email</Text>
              <Input>
                <InputField type="text" />
              </Input>
            </VStack>
            <VStack space="xs">
              <Text className="text-foreground/60">Password</Text>
              <Input>
                <InputField type={showPassword ? 'text' : 'password'} />
                <InputSlot className="pr-3" onPress={handleState}>
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            </VStack>
            <Button className="m-auto mt-20 py-4 px-14 rounded-4xl bg-[#791BFD]">
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