import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Share,
  TouchableOpacity,
} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import Pdf from 'react-native-pdf';
import {Icon} from '~/components/navigation/TabBarIcon';
import {useLocalSearchParams, useRouter} from 'expo-router';
import AudioPlayer from './audioPlayer';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Download, Share2} from 'lucide-react-native';
import {showErrorToast, showSuccessToast} from '~/lib/Toast';
// import RNFetchBlob from 'rn-fetch-blob';

export default function DocumentViewer(props: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  // const [loading, setLoading] = useState(false);
  const params: any = useLocalSearchParams();
  const fileExtension: any = params?.uri
    ? params?.uri.split('.').pop().toLowerCase()
    : props.uri
      ? props?.uri.split('.').pop().toLowerCase()
      : null;

  const [view, setView] = useState('pdf');
  const [textContent, setTextContent] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (fileExtension === 'pdf') {
      setView('pdf');
    } else if (fileExtension === 'txt') {
      setView('text');
      fetchTextFile(params?.uri);
    } else if (fileExtension === 'mp3') {
      setView('audio');
    } else {
      setView('image');
    }
  }, [fileExtension]);

  const fetchTextFile = async (url: any) => {
    try {
      const response = await fetch(url);
      const text = await response.text();
      setTextContent(text);
    } catch (error) {
      console.error('Failed to load text file:', error);
    }
  };

  const source: any = {
    uri: params?.uri || props.uri,
    cache: true,
  };

  const PageView = ({total, currentPage}: any) => {
    return (
      <Box className="absolute bottom-4 w-full items-center justify-center">
        <Text className="font-cBold text-lg">
          {currentPage + ' / ' + total}
        </Text>
      </Box>
    );
  };

  // const onDownload = async (value: any) => {
  //   try {
  //     setLoading(true);

  //     if (Platform.OS === 'android' && Platform.Version < 33) {
  //       const rationale = {
  //         title: 'Storage Permission',
  //         message: 'App needs access to your storage to save files.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       };
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         rationale,
  //       );
        
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         Alert.alert(
  //           'Permission Required',
  //           'Storage permission is required to save files. Open settings to grant permission.',
  //           [
  //             {
  //               text: 'Cancel',
  //               style: 'cancel',
  //             },
  //             {
  //               text: 'Open Settings',
  //               onPress: () => Linking.openSettings(),
  //             },
  //           ],
  //           {cancelable: false},
  //         );
  //         setLoading(false);
  //         return;
  //       }
  //     }

  //     const {dirs} = RNFetchBlob.fs;
  //     const filePath = `${dirs.DownloadDir}/downloaded_file.pdf`;

  //     RNFetchBlob.config({
  //       fileCache: true,
  //       path: filePath,
  //     })
  //       .fetch('GET', value)
  //       .then(res => {
  //         showSuccessToast('PDF downloaded successfully.');
  //         setLoading(false);

  //         if (Platform.OS === 'android') {
  //           RNFetchBlob.fs
  //             .scanFile([{path: res.path(), mime: 'application/pdf'}])
  //             .then(() => {
  //               console.log('Scan complete, file visible in Downloads.');
  //             })
  //             .catch(err => {
  //               console.error('Error scanning file:', err);
  //             });
  //         }
  //       })
  //       .catch(error => {
  //         showErrorToast('Failed to download PDF');
  //         setLoading(false);
  //         // console.error("Download Error:", error);
  //       });
  //   } catch (error) {
  //     // console.error("Error:", error);
  //     setLoading(false);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1">
      {props.uri ? null : (
        <Box className="flex-row items-center">
          <Box className="w-[80%] flex-row items-center">
            <TouchableOpacity
              className="m-4 h-10 w-10 justify-center"
              onPress={() => router.back()}>
              <Icon icon="arrow" size={18} imgMode="contain" />
            </TouchableOpacity>
            {params?.title ? (
              <Text className="ml-2 font-semibold text-lg" numberOfLines={1}>
                {params?.title}
              </Text>
            ) : null}
          </Box>
          {/* {params?.type == 'report' ? (
            <Box className="w-[20%] flex-row items-center justify-between pr-2">
              <TouchableOpacity
                className="w-[50%]"
                onPress={() =>
                  Share.share({
                    message: 'Checkout this video',
                    url: params?.uri,
                  })
                }>
                <Share2 size={20} color="#0081F8" />
              </TouchableOpacity>
              {loading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <TouchableOpacity
                  className="w-[50%]"
                  onPress={() => onDownload(params?.uri)}>
                  <Download size={20} />
                </TouchableOpacity>
              )}
            </Box>
          ) : null} */}
        </Box>
      )}
      {view === 'pdf' && (
        <Box className="mx-2 flex-1">
          <Pdf
            source={source}
            style={{flex: 1}}
            trustAllCerts={false}
            onLoadComplete={(page, path) => {
              setTotalPage(page);
            }}
            onPageChanged={page => {
              setCurrentPage(page);
            }}
            showsVerticalScrollIndicator={false}
          />
          <PageView currentPage={currentPage} total={totalPage} />
        </Box>
      )}
      {view === 'image' && (
        <Box className="mx-4 flex-1">
          <ImageViewer
            imageUrls={[{url: params?.uri || props.uri}]} // Array of image objects with URLs
            enableSwipeDown={true} // Optional: Allow swipe-down to close
            backgroundColor="white"
            
          />
        </Box>

        // <Box className="flex-1 items-center justify-center">
        //   <Box className="overflow-hidden rounded-xl">
        //     <Icon
        //       icon={params?.uri || props.uri}
        //       imgMode="contain"
        //       style={{
        //         width: Dimensions.get('screen').width - 32,
        //         height: Dimensions.get('screen').height - 180,
        //       }}
        //     />
        //   </Box>
        // </Box>
      )}
      {view === 'audio' && (
        <Box className="mx-4 mt-4">
          <AudioPlayer />
        </Box>
      )}
      {view === 'text' && (
        <ScrollView className="mb-4 px-4" showsVerticalScrollIndicator={false}>
          <Text selectable={true} className="text-md">
            {textContent || 'Loading text content...'}
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}