import React, {useState} from 'react';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import {size} from 'lodash';
import {TouchableOpacity} from 'react-native';
import {Image} from 'expo-image';
import { Icon } from '~/components/navigation/TabBarIcon';

export default function ImageSlider(props: any) {
  const params: any = useLocalSearchParams();
  const images: any = JSON.parse(params?.images);
  const [currentPage, setCurrentPage] = useState(
    Number(params.currentpage) - 1,
  );
  const [totalPage] = useState(size(images));
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const PageView = () => {
    return (
      <Box className="absolute bottom-4 w-full items-center justify-center">
        <Text className="font-semibold text-lg">
          {currentPage + 1 + ' / ' + totalPage}
        </Text>
      </Box>
    );
  };

  const urls = images?.map((image: any) => {
    return {url: image?.file_url};
  });
  return (
    <SafeAreaView className="mt-2 flex-1">
      <ImageViewer
        imageUrls={urls}
        enableSwipeDown={true}
        backgroundColor="white"
        renderIndicator={() => null}
        index={currentPage}
        renderImage={props => <Image source={props?.source?.uri} {...props} />}
        onChange={index => setCurrentPage(index)}
      />
      <PageView />
      <TouchableOpacity
        style={{marginTop: insets.top}}
        className="top-100 absolute m-4 h-10 w-10 items-center justify-center rounded-full bg-white p-2 shadow-md"
        onPress={() => router.back()}>
        <Icon icon='arrow' size={18} imgMode='contain'/>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
