import React from 'react';
import { View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Text } from './ui/text';

const ProgressCircle = ({ progress  }:any) => {
  return (
    <View className="flex items-center justify-center">
      <AnimatedCircularProgress
        size={50}
        width={2}
        fill={Number(progress)}
        tintColor="#FF6F61" // Primary color for the progress
        backgroundColor="#E6E6E6" // Background color for the unfilled portion
        lineCap="round"
      />
      <View className="absolute flex items-center justify-center">
        <Text className="text-sm font-medium">{`${progress}%`}</Text>
      </View>
    </View>
  );
};

export default ProgressCircle;
