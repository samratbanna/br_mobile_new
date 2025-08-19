import { getSecureValue } from '~/services/secure-store.service';
import NotificationService from './Notification';

export const backgroundNotificationHandler=  async (message : any) => {
  // handle your message
  const credentials = await getSecureValue('access');

  if (!credentials) {
    return Promise.reject('Not logged in , cannot display notification');
  }
  // await saveValue('newnotification', 'yes');
  NotificationService.displayNotification(message);

  return Promise.resolve();
};

