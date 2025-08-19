import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {useRouter} from 'expo-router';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config.js';
import NetworkStatusBanner from '../screens/networkStatus';
import {  ArrowBigLeft, ArrowLeft, Bell } from 'lucide-react-native';


export default function Header(props: any) {
  const router = useRouter();
  const fullConfig = resolveConfig(tailwindConfig);
  const {header}:any = fullConfig.theme.colors;
  
  return (<>
    <Box className="flex-row items-center shadow-[1px] justify-between border-b-[0.5px] border-border bg-white p-[16px]">
      <Box className="flex-row items-center">
        <TouchableOpacity
          className="h-[24px] w-[24px] items-center justify-center"
          onPress={() => router.back()}>
            <ArrowLeft size={22} color='black'/>
        </TouchableOpacity>
        <Text className="ml-[16px] text-xl font-semibold">{props?.title}</Text>
      </Box>
      {props?.showNotificationIcon && (
        <TouchableOpacity
          onPress={() => router.navigate('/screens/notification/notification')}>
          <Box className="z-10 mb-[-8px] ml-[8px] h-[14px] w-[14px] items-center justify-center rounded-full bg-pink">
            <Text className="text-[8px] font-normal color-white">.</Text>
          </Box>
          <Bell size={20}/>
        </TouchableOpacity>
      )}
    </Box>
    <NetworkStatusBanner top = {25}/>
  </>
  );
}
