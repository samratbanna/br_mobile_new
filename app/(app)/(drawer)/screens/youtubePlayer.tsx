import React, { useRef, useState } from "react";
import { View, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";

const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(false);
    const { width } = useWindowDimensions(); // Get screen width dynamically
  

  const togglePlayPause = (e : string) => {
    setPlaying(!playing);
  };

  const seekForward = async () => {
    const currentTime = await playerRef.current?.getCurrentTime();
    playerRef.current?.seekTo((currentTime ?? 0) + 10, true);
  };

  const seekBackward = async () => {
    const currentTime = await playerRef.current?.getCurrentTime();
    playerRef.current?.seekTo((currentTime ?? 0) - 10, true);
  };

  return (
    <View className="flex items-center justify-center bg-black p-4">
      <YoutubePlayer
        ref={playerRef}
        height={width*0.5}
        width={width*0.9}
        play={playing}
        videoId={videoId}
        // onChangeState={(e) => console.log('events---->',e)}
        initialPlayerParams={{
          controls: false, // Hides default YouTube controls
          modestbranding: true,
          rel: false,
          iv_load_policy: 3,
        }}
      />

      {/* Custom Controls */}
      {/* <View className="flex flex-row mt-4">
        <TouchableOpacity onPress={seekBackward} className="bg-red-600 px-4 py-2 mx-2 rounded-lg">
          <Text className="text-white text-lg">⏪ 10s</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause} className="bg-red-600 px-6 py-2 mx-2 rounded-lg">
          <Text className="text-white text-lg">{playing ? "⏸ Pause" : "▶ Play"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={seekForward} className="bg-red-600 px-4 py-2 mx-2 rounded-lg">
          <Text className="text-white text-lg">10s ⏩</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default YouTubePlayer;