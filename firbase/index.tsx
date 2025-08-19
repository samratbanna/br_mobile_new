import { useEffect, useRef, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import { RegisterNotificationHandler } from './Notification';
import { requestNotifications } from 'react-native-permissions';
import { Platform } from 'react-native';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (Platform.OS === "android") {

    const permissionResult = await requestNotifications([
      'alert',
      'badge',
      'sound',
    ]);
    console.log({ permissionResult });
  }

  if (enabled) {
    return true;
  }
  return false;
}

// export const useFirebase =  () => {
//   const [fcmToken, setFcmToken] : any = useState();
//   //start
//   useEffect(() => {
//     requestUserPermission()
//       .then(f => {
  
//         messaging()
//           .getToken()
//           .then(token => {
//             RegisterNotificationHandler();
//             console.log('helloo-------->');
//             setFcmToken(token);
//           });
//       })
//       .catch(er => {
//         console.log('[messaging] permission error', er);
//       });
//     // Get the device token

//     return () => {
//       // Listen to whether the token changes
//       messaging().onTokenRefresh(token => {
//         setFcmToken(token);
//       });
//     };
//   }, []);

//   return [fcmToken];
// };


export const useFirebase = () => {
  const [fcmToken, setFcmToken] = useState(null); 

  const initializeFCM = async () => {
    try {
      // Request notification permission from the user
      const permissionGranted = await requestUserPermission();
      if (!permissionGranted) {
        console.warn('Notification permission not granted');
        return;
      }

      // Get the FCM token
      const token : any = await messaging().getToken();
      setFcmToken(token);

      // Register notification handler if necessary
      RegisterNotificationHandler();
    } catch (error) {
      console.error('[useFirebase] Error initializing FCM:', error);
    }
  };

  useEffect(() => {
    initializeFCM();

    // Set up a listener for FCM token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh((newToken : any) => {
      setFcmToken(newToken);
    });

    // Cleanup the listener on unmount
    return unsubscribeTokenRefresh;
  }, []);

  return [fcmToken];
};