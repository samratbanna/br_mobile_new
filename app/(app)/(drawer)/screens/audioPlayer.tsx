import React, {useEffect, useState} from 'react';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {Audio} from 'expo-av';
import {Dimensions, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {Pause, Play} from 'lucide-react-native';

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function AudioPlayer({url}: any) {
  const [sound, setSound] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const [isFinished, setIsFinished] = useState(false); // New state for tracking if audio has finished
  const windowWidth = (Dimensions.get('screen').width * 60) / 100;

  async function playSound() {
    if (sound && isFinished) {
      await sound.replayAsync();
      setIsFinished(false);
      setIsPlaying(true);
    } else if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const {sound: newSound} = await Audio.Sound.createAsync(
        {
          //   uri: 'https://file-examples.com/storage/feb05093336710053a32bc1/2017/11/file_example_MP3_700KB.mp3',
          uri: url,
        },
        {shouldPlay: true},
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          setDurationMillis(status.durationMillis || 0);
          setPositionMillis(status.positionMillis || 0);

          // Check if the audio has finished
          if (status.didJustFinish) {
            setIsFinished(true); // Mark as finished
            setIsPlaying(false); // Stop the playback
          }
        }
      });
    }
  }

  const handlePauseResume = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await playSound();
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const progress = positionMillis / durationMillis || 0;

  const remainingTime = durationMillis - positionMillis;

  return (
    <Box className="flex-row items-center justify-between">
      <Box className="flex-row items-center">
        <TouchableOpacity
          className="h-8 w-8 items-center justify-center rounded-full bg-lightBlue"
          onPress={handlePauseResume}>
          {isPlaying ? (
            <Pause size={16} color="#0081F8" />
          ) : (
            <Play size={16} color="#0081F8" />
          )}
        </TouchableOpacity>
        <Progress.Bar
          progress={progress}
          width={windowWidth}
          height={10}
          color="#0081F8"
          borderRadius={5}
          style={{marginLeft: 16}}
        />
      </Box>
      <Text className="text-md ml-5 font-medium text-blue">
        {formatTime(remainingTime)}
      </Text>
    </Box>
  );
}
