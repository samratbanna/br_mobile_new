import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {useRouter} from 'expo-router';
import {Icon} from '~/components/navigation/TabBarIcon';
import {ChevronRight} from 'lucide-react-native';
import {openUrl} from '~/constants/helper';
import Constants from 'expo-constants';

interface ManifestExtra {
  supportNo: string;
  supportMail: string;
}

export default function SupportScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const {supportMail, supportNo} = (Constants.expoConfig?.extra ?? {}) as ManifestExtra;

  return (
    <Box className="bg-bg flex-1" style={{marginTop: insets.top}}>
      <Box className="flex-row items-center p-4">
        <TouchableOpacity
          className="h-[24px] w-[24px] items-center justify-center"
          onPress={() => router.back()}>
          <Icon icon="arrow" size={18} imgMode="contain" />
        </TouchableOpacity>
        <Text className="ml-[16px] text-[16px] font-bold">Support</Text>
      </Box>
      <Box className="mx-4 mt-[35%]">
        <Box className="items-center justify-center">
          <Icon icon="support" size={40} imgMode="contain" color="#0081F8" />
          <Text className="mt-4 text-[24px] text-blue">
            Hello, How can we Help you?
          </Text>
        </Box>
        <Box className="mt-[10%]">
          <TouchableOpacity
            className="flex-row justify-between border-[0.5px] border-border1 bg-white p-3"
            onPress={() => openUrl(`tel: ${supportNo}`)}>
            <Box className="flex-row items-center">
              <Icon icon="phone" size={20} imgMode="contain" />
              <Text className="ml-[16px] text-[16px] text-darkGrey">
                Our 24*7 Customer Service
              </Text>
            </Box>
            <ChevronRight size={20} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity className="mt-4 flex-row justify-between border-[0.5px] border-border1 bg-white p-4">
            <Box className="flex-row items-center">
              <Icon
                icon="phone"
                size={20}
                imgMode="contain"
                onPress={() => openUrl(`mailto:${supportMail}`)}
              />
              <Text className="ml-[16px] text-[16px] text-darkGrey">
                Sent us an E-mail
              </Text>
            </Box>
            <ChevronRight size={20} color="#000000" />
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
}
