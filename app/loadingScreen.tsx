import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';

export default function LoadingScreen() {
  return (
    <Box className="flex-1 items-center justify-center bg-background px-6">
      <ActivityIndicator size={'large'} color="#646464" />
      <Text className="mt-5 text-lg font-medium text-grey">
        Please wait while loading......
      </Text>
    </Box>
  );
}
