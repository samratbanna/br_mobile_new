import {size} from 'lodash';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {CommonLoader} from '~/components/commonLoader';
import {Box} from '~/components/ui/box';
import {useSessionContext} from '~/providers/session/ctx';
import {getVideos} from '~/services';
import EmptyScreen from '../screens/emptyScreen';
import {Alert, Dimensions, Linking, TouchableOpacity} from 'react-native';
import {Icon} from '~/components/navigation/TabBarIcon';
import {getYouTubeThumbnail} from '~/lib/utils';

export default function UpdatesScreen() {
  const {user} = useSessionContext();
  const {data: videos, isLoading} = getVideos({
    id: user?._id,
    isLecture: true,
  });

  // open video
  const openYouTubeApp = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', "Can't open the YouTube app.");
      }
    } catch (error) {
      console.error('Error opening YouTube app:', error);
    }
  };

  return (
    <Box className="flex-1 p-3 pb-20">
      {isLoading ? (
        <CommonLoader />
      ) : size(videos) ? (
        <Box className="flex-1">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={videos}
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => openYouTubeApp(item?.postUrl)}>
                <Icon
                  icon={getYouTubeThumbnail(item?.postUrl)}
                  imgMode="cover"
                  style={{
                    height: 183,
                    width: Dimensions.get('screen').width - 32,
                  }}
                />
                <Box
                  className="items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    height: 183,
                    width: Dimensions.get('screen').width - 32,
                    position: 'absolute',
                  }}>
                  <Icon icon="youtube" size={40} />
                </Box>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.toString()}
          />
        </Box>
      ) : (
        <EmptyScreen title="No Videos" icon="noData" />
      )}
    </Box>
  );
}
