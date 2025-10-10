import {capitalize, size} from 'lodash';
import React, { useState } from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {CommonLoader} from '~/components/commonLoader';
import {Box} from '~/components/ui/box';
import {useSessionContext} from '~/providers/session/ctx';
import {getVideos} from '~/services';
import EmptyScreen from '../screens/emptyScreen';
import {Alert, Dimensions, Linking, TouchableOpacity} from 'react-native';
import {Icon} from '~/components/navigation/TabBarIcon';
import {extractYouTubeVideoID, getYouTubeThumbnail} from '~/lib/utils';
import {Image} from 'expo-image';
import {Text} from '~/components/ui/text';
import YTPlayerModal from '../screens/ytPlayerModal';
import { useRouter } from 'expo-router';

export default function UpdatesScreen() {
  const router = useRouter();
  const {user} = useSessionContext();

  const {data: videos, isLoading} = getVideos({
    id: user?._id,
    isLecture: true,
  });
  
  // open video
  const openYouTubeApp = async (url: string) => {
    // setVideoId(extractYouTubeVideoID(url));
    // setIsPlayerVisible(!isPlayerVisible)
    router?.push({
      pathname: '/screens/youtubePlayer',
      params: {id: extractYouTubeVideoID(url), url},
    });
    // try {
    //   const supported = await Linking.canOpenURL(url);

    //   if (supported) {
    //     await Linking.openURL(url);
    //   } else {
    //     Alert.alert('Error', "Can't open the YouTube app.");
    //   }
    // } catch (error) {
    //   console.error('Error opening YouTube app:', error);
    // }
  };

  return (
    <Box className="flex-1 pb-3">
      {isLoading ? (
        <CommonLoader />
      ) : size(videos) ? (
        <Box className="flex-1">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={videos}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => openYouTubeApp(item?.videoUrl)}
                className="mb-4">
                {/* Thumbnail */}
                <Icon
                  icon={getYouTubeThumbnail(item?.videoUrl)}
                  imgMode="cover"
                  style={{
                    height: 183,
                    width: Dimensions.get('screen').width,
                  }}
                />

                {/* Info Row */}
                <Box className="flex-row items-center p-3">
                  <Box className="mr-4 overflow-hidden rounded-full">
                    <Icon icon="logo" size={40} />
                  </Box>
                  <Box>
                    <Text
                      className="font-semibold text-lg text-black"
                      numberOfLines={1}>
                      {capitalize(item.title)}
                    </Text>
                    <Text
                      className="text-sm text-graniteGray"
                      numberOfLines={2}>
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.toString() + index}
          />
        </Box>
      ) : (
        <EmptyScreen title="No Videos" icon="noData" />
      )}

    </Box>
  );
}
