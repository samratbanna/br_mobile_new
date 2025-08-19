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
import {Check, LayoutGrid, LogOut, UserRound} from 'lucide-react-native';

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
      case 'aboutSchool': {
        router.navigate('/(app)/(drawer)/screens/aboutSchool');
        return;
      }
      case 'appSetting': {
        router.navigate('/(app)/(drawer)/account-settings');
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
      <Box className="mt-[-10] h-24 bg-header"></Box>
      <VStack className="mt-[-50px]">
        <Icon
          icon="schoolImg"
          style={{
            height: 107,
            width: (Dimensions.get('screen').width * 80) / 100,
          }}
          imgMode="cover"
        />
        <Box className="mt-[-32] h-[82px] w-[82px] items-center justify-center overflow-hidden rounded-full border-[-.5px] border-border1 bg-white">
          <Icon
            icon={user?.avatar ? user?.avatar : 'profile'}
            imgMode="contain"
            size={82}
          />
        </Box>
        <Text className="font-cBold mt-1 text-xl capitalize">{user?.name}</Text>
      </VStack>
      <TouchableOpacity
        className="mx-5 mt-3 flex-row items-center justify-center rounded-full bg-[#E9EEFF] p-2"
        onPress={() => {
          setShow(!show);
        }}>
        <Text className="mr-2 font-semibold text-sm color-blue">{`Session: ${currentSession?.lable}`}</Text>
        {show ? (
          <Icon icon="upArrow" imgMode="contain" size={12} color="#0081F8" />
        ) : (
          <Icon icon="downArrow" imgMode="contain" size={12} />
        )}
      </TouchableOpacity>
      {show && (
        <Box className="mx-4 mt-2 rounded-lg border-[1px] border-border1 px-4 pt-4">
          {sessions?.map((session: any) => {
            return (
              <TouchableOpacity
                className={`mb-[16px] flex-row items-center justify-between rounded-md border-[1px] ${currentSession?.key === session?.key ? 'border-blue' : 'border-border1'} p-[4px]`}
                onPress={() => handleCurrentSession(session)}
                key={session?.key}>
                <Box>
                  <Text className="font-semibold text-sm/[16px] color-darkGrey">
                    {session?.lable}
                  </Text>
                </Box>
                <Box
                  className={`h-[15px] w-[15px] items-center justify-center rounded-full border-[1.5px] ${
                    currentSession?.key === session?.key
                      ? 'border-blue'
                      : 'border-darkGrey'
                  }`}>
                  {currentSession?.key === session?.key && (
                    <Check size={7} color="#0081F8" />
                  )}
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      )}

      <>
        <Box className="m-3 mt-6">
          <Text className="ml-3 text-xs">Quick Links</Text>
          <VStack className="mt-2 items-start gap-4 bg-background p-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleOnClick('home')}>
              <LayoutGrid size={17} color="#646464" />
              <Text className="ml-[6px] text-sm">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => openUrl('https://blog.schoollog.in/')}>
              <Icon
                icon="drawerBlogIcon"
                imgMode="contain"
                size={20}
                style={{marginLeft: -2}}
              />
              <Text className="ml-[6px] text-sm">Blog</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleOnClick('aboutSchool')}>
              <Icon
                icon="drawerInfoIcon"
                imgMode="contain"
                size={20}
                style={{marginLeft: -2}}
              />
              <Text className="ml-[6px] text-sm">About School</Text>
            </TouchableOpacity>
          </VStack>
        </Box>
        <Box className="m-4">
          <Text className="ml-3 text-xs">Other</Text>
          <VStack className="mt-1 items-start gap-4 bg-background p-4">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleOnClick('appSetting')}>
              <UserRound size={16} />
              <Text className="ml-[6px] text-sm">Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() =>
                openUrl('https://schoollog.in/privacy_policy.php')
              }>
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
