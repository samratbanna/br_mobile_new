import React, { useEffect } from 'react';
import {Animated} from 'react-native';
import { Dashboard } from '~/components/dashboard';
import {HelloWave} from '~/components/HelloWave';
import {Box, HStack} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import { useFirebase } from '~/firbase';
import { useGreeting } from '~/lib/Greeting';
import {useSessionContext} from '~/providers/session/ctx';
import { updateFcmToken } from '~/services/auth.service';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const {user} = useSessionContext();
  const greeting = useGreeting();

  const {mutate, isPending} = updateFcmToken({
    onSuccess: () => {

    }, onError: () => {

    }
  });

  const [fcmToken]: any = useFirebase();

  useEffect(() => {
    // ✅ Case 1: App opened from killed (terminated) state
    Notifications.getLastNotificationResponseAsync().then(response => {
      if (response) handleNotificationNavigation(response);
    });

    // ✅ Case 2: App already running (foreground/background)
    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        handleNotificationNavigation(response);
      },
    );

    return () => subscription.remove();
  }, []);

  const handleNotificationNavigation = (
    response: Notifications.NotificationResponse,
  ) => {
    const data = response.notification.request.content.data;
    console.log('App opened from notification with data:', data);
  };
  useEffect(() => {
    if (fcmToken) {
      mutate({id: user?._id, fcmToken});
    }
  }, [fcmToken]);

  return (
    <>
      <Animated.ScrollView
        className="flex-1 bg-gray-100 p-3 pb-20"
        showsVerticalScrollIndicator={false}>
        <Box className="flex-1">
          <HStack className="bg-gray-100">
            <Text className="mr-3 text-base color-gray-500">
              {greeting?.greeting}
            </Text>
            <HelloWave />
          </HStack>
          <Text className="font-semibold text-xl capitalize">{user?.name}</Text>
         
          <Dashboard />
        </Box>
      </Animated.ScrollView>
    </>
  );
}
