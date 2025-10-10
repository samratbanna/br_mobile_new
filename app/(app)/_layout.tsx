import {Redirect} from 'expo-router';
import React, {useMemo, useState} from 'react';
import {Drawer} from 'expo-router/drawer';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Dimensions, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {Box, VStack} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {Icon} from '~/components/navigation/TabBarIcon';
import {useSessionContext} from '~/providers/session/ctx';
import {openUrl} from '~/constants/helper';
import {
  Check,
  CircleUserRound,
  LayoutGrid,
  LogOut,
  User2Icon,
  UserRound,
} from 'lucide-react-native';

export default function TabLayout() {
  const {isLoggedIn, isAppReady} = useSessionContext();

  if (!isLoggedIn) {
    return <Redirect href="/onboarding" />;
  }
  return isAppReady ? <MainDrawer /> : <Redirect href="/loading" />;
}

function CustomDrawerContent(props: any) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const {user, logout, sessions, activeSession} = useSessionContext();

  const currentSession = useMemo(() => {
    if (activeSession) {
      let session = sessions?.find((s: any) => s.key == activeSession);
      return session;
    }
    return null;
  }, [activeSession]);

  const handleCurrentSession = (child: any) => {
    setShow(false);
  };

  function handleOnClick(type: string) {
    switch (type) {
      case 'appSetting': {
        router.navigate('/(app)/(drawer)/(tabs)/profile');
        return;
      }
      case 'home': {
        router.navigate('/(app)/(drawer)/(tabs)/');
        return;
      }
    }
  }

  return (
    <DrawerContentScrollView {...props} className="bg-white">
      <Box className="mt-[-10] h-24"></Box>
      <VStack className="mt-[-50px]">
        <Icon
          icon="logo"
          style={{
            height: 200,
            width: (Dimensions.get('screen').width * 80) / 100,
          }}
          imgMode="center"
        />
        <Box className="mt-[32] h-[82px] w-[82px] items-center justify-center overflow-hidden rounded-full border-[-.5px] border-border1 bg-white">
          <CircleUserRound size={50} strokeWidth={1} />
        </Box>
        <Text className="font-cBold mt-1 text-xl capitalize">{user?.name}</Text>
      </VStack>
      <>
        <Box className="m-3 mt-6">
          <VStack className="mt-2 items-start gap-4 bg-background p-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleOnClick('home')}>
              <LayoutGrid size={17} color="#646464" />
              <Text className="ml-[6px] text-sm">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleOnClick('appSetting')}>
              <UserRound size={16} />
              <Text className="ml-[6px] text-sm">Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => openUrl('https://brainrecoding.in/policy')}>
              <Icon icon="drawerPrivacyIcon" imgMode="contain" size={16} />
              <Text className="ml-[6px] text-sm">Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => logout()}>
              <LogOut size={16} color="#B21717" />
              <Text className="ml-[6px] text-sm color-[#B21717]">Logout</Text>
            </TouchableOpacity>
          </VStack>
        </Box>
      </>
    </DrawerContentScrollView>
  );
}

export function MainDrawer() {
  return (
    <Drawer
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: '76%',
        },
        headerShown: false,
      }}></Drawer>
  );
}
