import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { ArrowLeft, PauseIcon, PlayIcon } from "lucide-react-native";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Box } from "~/components/ui/box";
import { Text } from "~/components/ui/text";
import Slider from '@react-native-community/slider';

import { StatusBar } from "expo-status-bar";
import YTWebView from "./yt";

export default function PlayerScreenComponent ({videoId} :{videoId : string}) {
  // useEffect(  () => {
  //   let isMounted = true;

  //   const lockOrientation = async () => {
  //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   };

  //   lockOrientation();

  //   return () => {
  //     const unlockOrientation = async () => {
  //       if (isMounted) {
  //         await ScreenOrientation.unlockAsync();
  //       }
  //     };

  //     unlockOrientation();
  //     isMounted = false;
  //   };
  // }, []);

  const player: any = useRef();
  const [live, setLive] = useState(true);
  const [startDuration, setDuration] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);

  const startMoment = useRef<moment.Moment | null>(null);
  const [totalTime, setTotalTime] = useState(0);

  const startTime = useRef(0);

  const [buffering, setBuffering] = useState(true);

  const onDurationReady = (d: any) => {
    // setTotalTime(d)
    setDuration(d);
  };

  const onPlaying = (c: any) => {
    
    setCurrentTime(c);
    // setSlidingValue(c);
    // setDuration(c);

    if(!startTime.current){
      startMoment.current = moment();
      startTime.current = c
    }
    else{
      const elapsedTime = moment().diff(startMoment.current, 'second');
      setTotalTime(( startTime.current || 0) + elapsedTime)
      const diff = Math.abs(elapsedTime - (c - startTime.current));
      // const diff = Math.abs(
      //   moment().diff(startMoment.current, 'seconds') - (c - startTime.current),
      // );
      if (diff > 10) {
        setLive(false);
      } else {
        // setTotalTime(elapsedTime);
        setLive(true);
      }
    }
      
    
  };


  const onReady = (e: any) => {
    setReady(true);
  };

  const onEnd = () => {
    setEnded(true);
  };

  const onError = () => { };

  const onStateChanged = (s: any) => {
    if (s === 3) {
      setBuffering(true);
    } else {
      if (ready) {
        if (s === 1) {
          setPlaying(true);
          setBuffering(false);
        } else if (s === 2) {
          setPlaying(false);
          setBuffering(false);
        }
      }
    }
  };

  const [overlay, setOverlay] = useState(true);

  const _onSingleTap = (e: any) => {

    setOverlay(o => (o ? false : true));

    if (overlay) {
      setOverlay(false);
      // hideNavigationBar();
    } else {
      setOverlay(true);
    }
  };

  const [playing, setPlaying] = useState(true);

  // const seekback = () => {
  //   let time = currentTime && currentTime - 10;
  //   time && player.current._seekTo(time);
  // };
  // const seekforward = () => {
  //   let time = currentTime && currentTime + 10;
  //   time && player.current._seekTo(time);
  // };

  const _setLive = () => {
    let time = currentTime && currentTime + 36000;
    time && player?.current?._seekTo(time);
  };

  const _togglePlaying = () => {
    if (ready) {
      playing ? player?.current?._pauseVideo() : player.current._playVideo();
      setPlaying(playing ? false : true);
    }
  };

  const _onSlidingStart = (e: any) => {
    setPlaying(false);
  };
  const _onSlidingEnd = (e: any) => {
    console.log('end---->')
    player.current._seekTo(e);
    setCurrentTime(e);
    setPlaying(true);
  };

  const _valueChange = (e: any) => {
    console.log('e---->',e)
    // setSlidingValue(e);
    setCurrentTime(e)
    player?.current?._seekTo(e);

  };


  return (
    <Box className='flex-1'>
      {/* <StatusBar hidden /> */}
      <Box className='flex-1'>
        <YTWebView
          videoId={videoId}
          autoPlay={true}
          ref={player}
          onDurationReady={onDurationReady}
          onReady={onReady}
          onError={onError}
          onPlaying={onPlaying} 
          onEnd={onEnd}
          onStateChange={onStateChanged}
        />

        <TouchableWithoutFeedback onPress={_onSingleTap}>


          <Box className="absolute  top-0 left-0 right-0 bottom-0 ">

            {buffering ? (
              <Box
                style={{
                  top: 0,
                  position: 'absolute',
                  flex: 1,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }}>
                <ActivityIndicator
                  color={'blue'}
                  size="large"
                />
              </Box>
            ) : null}

            {overlay ?
              <>
                {/* <TouchableOpacity
                  className="absolute top-3 left-3 p- bg-red/30 rounded-full"
                  onPress={_goback}
                >
                  <ArrowLeft color="white" />
                </TouchableOpacity> */}


                <Box
                  style={{
                    top: 0,
                    position: 'absolute',
                    flex: 1,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',

                  }}>
                  <TouchableOpacity
                    className="p-2 bg-black/30 rounded-full" // Semi-transparent background and rounded corners
                    onPress={_togglePlaying}
                  >
                    {!playing ? (
                      <PlayIcon color='white' size={35} /> // White color for contrast
                    ) : (
                      <PauseIcon color='white' size={35}  /> // White color for contrast
                    )}
                  </TouchableOpacity>
                </Box>

                <Box className="absolute bottom-5 left-0 right-0 flex-row items-center px-5">
                  <Box className="flex-1 mr-3">

                    <Slider
                      minimumValue={0}
                      value={currentTime || 0}
                      maximumValue={totalTime}
                      onSlidingStart={_onSlidingStart}
                      onSlidingComplete={_onSlidingEnd}
                      onValueChange={_valueChange}
                      style={{ width: '100%', height: 40 }}
                      thumbTintColor="#FF0000" // Red thumb like YouTube
                      minimumTrackTintColor="#FF0000" // Red progress track
                      maximumTrackTintColor="#888" // Grey background track
                    />

                  </Box>
                  <Box className="ml-2">
                    <Text className="text-red">

                      {live ? 'LIVE' : 'NOT LIVE'}
                    </Text>
                  </Box>
                </Box>

              </> : null
            }

          </Box>
        </TouchableWithoutFeedback>
      </Box>
    </Box>
  );
};
const getTimerFromSeconds = (seconds: number) => {
  if (!seconds) {
    return '0:00';
  }
  const minutes = Math.floor(seconds / 60);
  const leftSeconds = (seconds % 60);
  const secondsStr =
    leftSeconds >= 0 && leftSeconds < 10
      ? '0' + leftSeconds
      : String(leftSeconds);

  return minutes + ':' + secondsStr;
};