import React, {FC} from 'react';
import {View, ViewStyle, Dimensions} from 'react-native';
import SkeletonLoader from 'expo-skeleton-loader';
import {LoaderItemStyle} from 'expo-skeleton-loader/lib/Constants';

const windowWidth = Dimensions.get('window').width;

type LoaderProps = {
  height: number;
  width?: number | string;
  customStyle?: any; // use LoaderItemStyle
};

export const RowLoader: FC<LoaderProps> = ({height, width}: any) => {
  const $stepItem: LoaderItemStyle = {
    height: height,
    width: width,
    borderRadius: 24,
  };
  const $dataContainer: ViewStyle = {
    backgroundColor: '#F5F7F8',
    borderRadius: 12,
    marginBottom: 16,
    height: height,
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
  return (
    <View style={{width: '100%'}}>
      <SkeletonLoader boneColor="#F3F3F3" highlightColor="#E7ECEE">
        <SkeletonLoader.Container style={$dataContainer}>
          <SkeletonLoader.Item style={$stepItem} />
          <SkeletonLoader.Item style={$stepItem} />
        </SkeletonLoader.Container>
      </SkeletonLoader>
    </View>
  );
};

export const BoxLoader: FC<LoaderProps> = ({
  width,
  height,
  customStyle,
}: any) => {
  const boxStyle: LoaderItemStyle = {
    height: height,
    width: width,
    borderRadius: 10,
  };
  const itemStyle: LoaderItemStyle = {
    ...boxStyle,
    ...customStyle,
  };
  return (
    <View>
      <SkeletonLoader boneColor="#F3F3F3" highlightColor="#E7ECEE">
        <SkeletonLoader.Item style={itemStyle} />
      </SkeletonLoader>
    </View>
  );
};

export const GoalProgressLoader = () => {
  const $firstItem: LoaderItemStyle = {
    height: 34,
    width: 34,
    borderRadius: 5,
    marginTop: 4,
  };

  const $secondItem: LoaderItemStyle = {
    height: 30,
    width: 80,
    borderRadius: 5,
    marginTop: 2,
  };
  const $thirdItem: LoaderItemStyle = {
    height: 10,
    width: 40,
    borderRadius: 4,
    marginTop: 2,
  };
  const $circleSkeleton: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
  };
  const $circleContainer: ViewStyle = {
    borderColor: '#E7ECEE',
    borderWidth: 15,
    height: 118,
    width: 118,
    borderRadius: 118,
    alignItems: 'center',
  };
  return (
    <View style={{justifyContent: 'center', height: 180, marginTop: 30}}>
      <SkeletonLoader
        boneColor="#F3F3F3"
        highlightColor="#E7ECEE"
        // @ts-ignore
        style={$circleSkeleton}>
        <SkeletonLoader.Container style={$circleContainer}>
          <SkeletonLoader.Item style={$firstItem} />
          <SkeletonLoader.Item style={$secondItem} />
          <SkeletonLoader.Item style={$thirdItem} />
        </SkeletonLoader.Container>
      </SkeletonLoader>
    </View>
  );
};
