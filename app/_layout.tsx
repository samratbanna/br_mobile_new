import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Theme} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Slot, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import {SessionProvider} from '~/providers/session';
import {NAV_THEME} from '~/lib/constants';
import {useColorScheme} from '~/lib/useColorScheme';
import '../global.css';
import {useColorScheme as useRnColorScheme} from '~/hooks/useRnColorScheme';
import {StatusBar} from 'expo-status-bar';
import {PortalHost} from '@rn-primitives/portal';
import QueryProvider from '~/providers/query/query-client.provider';
import {toastConfig} from '../lib/Toast';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {BottomSheetProvider} from '~/components/BottomSheetProvider';
import messaging from '@react-native-firebase/messaging';
import { backgroundNotificationHandler } from '~/firbase/backGroundService';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const {colorScheme, setColorScheme, isDarkColorScheme} = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const platformScheme = useRnColorScheme();

  // console.log({isDarkColorScheme, colorScheme});

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Urbanist: require('../assets/fonts/Urbanist-Regular.ttf'),
    UrbanistMedium: require('../assets/fonts/Urbanist-Medium.ttf'),
    UrbanistSemiBold: require('../assets/fonts/Urbanist-SemiBold.ttf'),
    UrbanistBold: require('../assets/fonts/Urbanist-Bold.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    messaging().setBackgroundMessageHandler(backgroundNotificationHandler);
    messaging().onMessage(backgroundNotificationHandler);
  }, [loaded]);

  useEffect(() => {
    if (platformScheme) {
      setColorScheme('light');
      setIsColorSchemeLoaded(true);
    }
  }, []);

  // React.useEffect(() => {
  //   (async () => {
  //     const theme = await AsyncStorage.getItem('theme');
  //     if (Platform.OS === 'web') {
  //       // Adds the background color to the html element to prevent white background on overscroll.
  //       document.documentElement.classList.add('bg-background');
  //     }
  //     if (!theme) {
  //       AsyncStorage.setItem('theme', colorScheme);
  //       setIsColorSchemeLoaded(true);
  //       return;
  //     }
  //     const colorTheme = theme === 'dark' ? 'dark' : 'light';
  //     if (colorTheme !== colorScheme) {
  //       setColorScheme(colorTheme);

  //       setIsColorSchemeLoaded(true);
  //       return;
  //     }
  //     setIsColorSchemeLoaded(true);
  //   })().finally(() => {
  //     SplashScreen.hideAsync();
  //   });
  // }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return loaded ? (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <QueryProvider>
          {/* <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}> */}
          <SessionProvider>
            <StatusBar
              style="light"
              backgroundColor={NAV_THEME[colorScheme ?? 'light'].header}
              translucent
            />
            <SafeAreaView edges={['bottom', 'left', 'right']} style={{flex: 1}}>
              <BottomSheetProvider>
                <Slot />
              </BottomSheetProvider>
            </SafeAreaView>
            <PortalHost />
          </SessionProvider>
          {/* </ThemeProvider> */}
        </QueryProvider>
        <Toast
          position="top"
          visibilityTime={3000}
          autoHide
          topOffset={40}
          config={toastConfig}
        />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  ) : null;
}
