import React from 'react';
import {Box} from '~/components/ui/box';
import {ActivityIndicator} from 'react-native';
import {Text} from '~/components/ui/text';
import useTailwindColors from '~/hooks/useThemeColorTailwind';

export const CommonLoader = () => {
  const colors = useTailwindColors();
  return (
    <Box className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={colors?.blue} />
      <Text className="text-center">Loading...</Text>
    </Box>
  );
};
