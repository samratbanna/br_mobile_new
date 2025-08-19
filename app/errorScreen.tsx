import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';

export default function ErrorScreen() {
  return (
    <Box className="flex-1 items-center justify-center bg-background px-6">
      <Icon icon="errorIcon" size={100} imgMode="contain" />
      <Text className="mt-5 text-lg font-medium">Sorry about that!</Text>
      <Text className="text-md mt-3 text-center">
        It's not you, it's us.We are having a trouble, please try again later.
      </Text>
      {
        <TouchableOpacity className="mt-4">
          <Text className="text-md font-medium text-blue">Try Again!</Text>
        </TouchableOpacity>
      }
    </Box>
  );
}
