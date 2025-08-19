import React from 'react';
import {ImageBackground} from 'react-native';
import {iconRegistry} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {useLocalSearchParams} from 'expo-router';
import Header from './(app)/(drawer)/screens/header';
import PasswordDetails from './passwordDetails';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangePassword() {
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      className="flex-1"
      style={{marginTop: insets.top}}
      source={iconRegistry.bgImg}
      resizeMode="cover">
      <Header title={'Change Password'} />
      <Box className="mt-5 px-4">
        <Text className="text-2xl font-cBold">
          Enter details to change the password
        </Text>
      </Box>
      <Box className="mx-3">
        <PasswordDetails type={params?.type} token={params?.token} />
      </Box>
    </ImageBackground>
  );
}
