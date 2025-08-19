import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {Href, useRouter} from 'expo-router';
import Header from './screens/header';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config.js';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Settings:{ id: number; title: string; routeName: Href }[] = [
  {
    id: 1,
    title: 'Change Username',
    routeName: '/screens/settings/usernameChange',
  },
  {
    id: 2,
    title: 'Change Password',
    routeName: '/screens/settings/passwordChange',
  },
];

export default function AccountSetting() {
  const router = useRouter();
  const fullConfig = resolveConfig(tailwindConfig);
  const {header} = fullConfig.theme.colors;
  const insets = useSafeAreaInsets();

  return (
    <Box className="flex-1 bg-white" style={{marginTop: insets.top}}>
      <Header title={'Account Settings'} showNotificationIcon={true} />
      {Settings?.map(item => (
        <TouchableOpacity
          key={item?.id}
          className="mt-[20px] flex-row items-center justify-between px-[16px]"
          onPress={() => router.navigate(item?.routeName)}>
          <Text className="text-md font-normal">{item?.title}</Text>
          <Icon
            icon="downArrow"
            size={15}
            color={header}
            imgMode='contain'
            style={{transform: [{rotate: '270deg'}]}}
          />
        </TouchableOpacity>
      ))}
    </Box>
  );
}
