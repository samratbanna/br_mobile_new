import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import * as ScreenOrientation from 'expo-screen-orientation';
import {screenheight, screenWidth} from '~/lib/constants';
import {ArrowLeft} from 'lucide-react-native';

export default function PlayerScreen() {
  const router = useRouter();
  const {id, url} = useLocalSearchParams<{id: string; url: string}>();
  console.log('id', url);

  useEffect(() => {
    // Force landscape on enter
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      // Restore portrait on exit
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={screenWidth}
        width={screenheight}
        play={true}
        videoId={id}
      />
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 ml-2 rounded-full bg-black p-2">
        <ArrowLeft color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
