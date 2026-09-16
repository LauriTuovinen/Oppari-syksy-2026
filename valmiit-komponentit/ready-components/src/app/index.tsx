import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider/index.web";
import { Text, View } from "react-native";
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
  User,
  Home,
  MapPinSearch
} from 'lucide-react-native';
import { Icon, EditIcon, FavouriteIcon } from '@/components/ui/icon';
import { Box } from '@/components/ui/box';

export default function Index() {
  return (
      <View className="flex-1 *:bg-background items-end justify-end">
        <Tabs defaultValue="home">
          <TabsList className="rounded-none">
            <TabsTrigger value="home">
              <Icon as={Home} size="lg" />
            </TabsTrigger>
            <TabsTrigger value="places">
              <Icon as={MapPinSearch} size="lg" />
            </TabsTrigger>
              <TabsTrigger value="saved">
              <Icon as={FavouriteIcon} size="lg" />
            </TabsTrigger>
            <TabsTrigger value="profile">
              <Icon as={User} size="lg" />
            </TabsTrigger>
            <TabsIndicator />
          </TabsList>

          <TabsContentWrapper>
            <TabsContent value="home">
              <Box className="p-4">
                <Icon as={Home} size="lg" />
                <Text className="text-foreground">Welcome to the Home tab!</Text>
              </Box>
            </TabsContent>
            <TabsContent value="places">
              <Box className="p-4">
                <Icon as={MapPinSearch} size="lg" />
                <Text className="text-foreground">Your places information</Text>
              </Box>
            </TabsContent>            
            <TabsContent value="saved">
              <Box className="p-4">
                <Icon as={FavouriteIcon} size="lg" />
                <Text className="text-foreground">Your saved items</Text>
              </Box>
            </TabsContent>
            <TabsContent value="profile">
              <Box className="p-4">
                <Icon as={User} size="lg" />
                <Text className="text-foreground">Your profile information</Text>
              </Box>
            </TabsContent>
          </TabsContentWrapper>
        </Tabs>
    </View>
  );
}


