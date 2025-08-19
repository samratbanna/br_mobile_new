import React, {} from 'react';
import {Animated} from 'react-native';
import { Dashboard } from '~/components/dashboard';
import {HelloWave} from '~/components/HelloWave';
import {Box, HStack} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import { useGreeting } from '~/lib/Greeting';
import {useSessionContext} from '~/providers/session/ctx';

export default function HomeScreen() {
  const {user} = useSessionContext();
  const greeting = useGreeting();

  return (
    <>
      <Animated.ScrollView
        className="flex-1 bg-gray-100 p-3 pb-20"
        showsVerticalScrollIndicator={false}>
        <Box className="flex-1">
          <HStack className="bg-gray-100">
            <Text className="mr-3 text-base color-gray-500">
              {greeting?.greeting}
            </Text>
            <HelloWave />
          </HStack>
          <Text className="font-semibold text-xl capitalize">{user?.name}</Text>
         
          <Dashboard />
        </Box>
      </Animated.ScrollView>
    </>
  );
}
