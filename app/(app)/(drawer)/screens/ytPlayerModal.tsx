import React, { useEffect } from 'react';// Adjust imports based on your project structure
import * as ScreenOrientation from 'expo-screen-orientation';
import { Modal, TouchableOpacity } from 'react-native';
import { Box } from '~/components/ui/box';
import PlayerScreenComponent from './ytPlayer';
import { Text } from '~/components/ui/text';
import { ArrowLeft } from 'lucide-react-native';

export default function YTPlayerModal({ visible, onClose, videoId } : any) {
  console.log("viviviviviviviv", videoId);
  
  useEffect(() => {
    let isMounted = true;

    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    const unlockOrientation = async () => {
      if (isMounted) {
        await ScreenOrientation.unlockAsync();
      }
    };

    if (visible) {
      lockOrientation();
    } else {
      unlockOrientation();
    }

    return () => {
      isMounted = false;
      unlockOrientation();
    };
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}>
      <Box className="flex-1 bg-black">
        <PlayerScreenComponent videoId = {videoId} />
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-3 left-3 p-2 bg-red/30 rounded-full">
         <ArrowLeft color='white'/>
        </TouchableOpacity>
      </Box>
    </Modal>
  );
}