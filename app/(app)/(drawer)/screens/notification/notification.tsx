import React from 'react';
import {Box} from '~/components/ui/box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../header';
import EmptyScreen from '../emptyScreen';

export default function Notification() {
  const insets = useSafeAreaInsets();
  return (
    <Box
      className="flex-1 bg-background"
      style={{marginTop: insets.top}}>
      <Header title={'Notifications'} showNotificationIcon={false} />
      <EmptyScreen title="No Notifications" icon="noData" />
    </Box>
  );
}
