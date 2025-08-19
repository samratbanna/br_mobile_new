import {Platform} from 'react-native';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';


export const NOTIFICATION_CHANNEL_ID = 'SL_APP';
export const SUMMARY_ID = 13;

export const RegisterNotificationHandler = () => {

  Platform.OS === 'android' &&
    notifee.createChannel(
      {
        id: NOTIFICATION_CHANNEL_ID, // (required)
        name: 'Primary Notification Channel', // (required)
        description:
          'Primary notification channel to deliver mostly required notifications', // (optional) default: undefined.
        sound: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: AndroidImportance.DEFAULT, // (optional) default: 4. Int value of the Android notification importance
        vibration: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      // created => {}, // (optional) callback returns whether the channel was created, false means it already existed.
    );
};

const displayNotification = async (remoteMessage : any) => {
  const message = remoteMessage.data;
  const notification = {
    title: message.subject || message.context || 'School Notification',
    body: message.body,
    
    // body: 'Main body content of the notification',
    
    android: {
      style: { type: AndroidStyle.BIGTEXT, text: message?.body || "-" },
      group: message.context,
      tag: message.context,        
      channelId: NOTIFICATION_CHANNEL_ID,
      smallIcon: 'ic_launcher',      
      importance: AndroidImportance.DEFAULT,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  }

  notifee.onBackgroundEvent(async ({ type, detail } : any) => {
    if (type === EventType.PRESS) {
      console.log('User pressed the notification.', detail.pressAction.id, detail);
    }
  });
  sendIt(notification); 
};

export const sendIt = (notification : any) => {
  // PushNotification.localNotification(notification);
  notifee.displayNotification(notification)
};

export default {
  displayNotification,
};
