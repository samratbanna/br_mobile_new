import {Platform} from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const NOTIFICATION_CHANNEL_ID = 'BR_APP';
export const SUMMARY_ID = 13;

export const RegisterNotificationHandler = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      groupId: NOTIFICATION_CHANNEL_ID,
      name: 'Primary Notification Channel',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};


const displayNotification = async (remoteMessage : any) => {
  const message = remoteMessage.data;
  const notification = {
    title: message.subject || message.context || 'School Notification',
    body: message.body,
    android: {
      style: {text: message?.body || '-'},
      group: message.context,
      tag: message.context,
      channelId: NOTIFICATION_CHANNEL_ID,
      smallIcon: 'ic_notification_icon',
      importance: Notifications.AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
        launchApp: false,
      },
    },
  };
if (message.subject) {
  sendIt(notification);
}
};

export const sendIt = async (notification: any) => {
  // PushNotification.localNotification(notification);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notification?.title || 'BR Business',
      body: notification?.body || '',
      data: notification?.data,
      sound: 'default',
    },
    trigger: null,
  });
};

export default {
  displayNotification,
};
