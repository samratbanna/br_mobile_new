import React, {useMemo} from 'react';
import {Box} from '~/components/ui/box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../header';
import EmptyScreen from '../emptyScreen';
import {
  getAllNotifications,
  Notification,
} from '~/services/notification.service';
import {useSessionContext} from '~/providers/session/ctx';
import {NotificationLoader} from '../loader/notificationLoader';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import useTailwindColors from '~/hooks/useThemeColorTailwind';
import {Bell, Icon} from 'lucide-react-native';
import {Text} from '~/components/ui/text';
import {cn} from '~/lib/utils';
import {getTimeDifference} from '~/lib/constants';

export default function NotificationScreen() {
  const insets = useSafeAreaInsets();
  const {user} = useSessionContext();

  const {data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} =
    getAllNotifications({limit: 10, staffId: user?._id});

  const allNotification: Notification[] = useMemo(
    () => data?.pages.flatMap(page => page.docs) || [],
    [data],
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box className="flex-1 bg-background" style={{marginTop: insets.top}}>
      <Header title={'Notifications'} showNotificationIcon={false} />
      <Box className="mx-4 h-screen flex-1">
        {isLoading ? (
          <NotificationLoader />
        ) : (
          <FlatList
            data={allNotification}
            renderItem={({item}) => <RenderItems notification={item} />}
            keyExtractor={item => item._id}
            onEndReached={handleLoadMore}
            contentContainerClassName="mt-3"
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyScreen title="No Projects" icon="noData" />
            )}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator /> : null
            }
          />
        )}
      </Box>
      <EmptyScreen title="No Notifications" icon="noData" />
    </Box>
  );
}

// render Notification
const RenderItems: React.FC<{
  notification: Notification;
}> = ({notification}) => {
  const router = useRouter();
  const colors = useTailwindColors();
  const {setTask} = useSessionContext();

  const _onNotification = () => {
    if (notification?.taskId) {
      setTask(notification?.taskId);
      router.push(`/(app)/(drawer)/screens/taskDetails`);
    }
  };
  return (
    <TouchableOpacity
      key={notification?._id}
      className={`mb-2 flex-row items-start justify-between rounded-xl border-[0.5px] border-border bg-white p-3`}
      onPress={_onNotification}>
      {/* Left Section */}
      <Box className="flex-row">
        <Box className="w-[80%] flex-row items-center">
          <Box className="h-[34px] w-[34px] items-center justify-center rounded-full bg-lightGreen">
            <Bell color={colors.green} />
          </Box>
          <Box className="ml-4 w-[80%]">
            {/* Subject */}
            <Text
              className={cn(
                'text-md font-semibold capitalize color-lightGrey',
              )}>
              {notification?.notificationTemplateId?.title
                ? notification?.notificationTemplateId?.title
                : notification?.title}
            </Text>
            {/* Body */}
            <Text
              className="mt-1 overflow-hidden text-ellipsis font-normal text-sm text-lightGrey"
              numberOfLines={2}>
              {notification?.notificationTemplateId?.description
                ? notification?.notificationTemplateId?.description
                : notification?.description}
            </Text>
          </Box>
        </Box>
        {/* Right Section */}
        <Box className="items-center">
          <Text className="border-lg font-normal text-sm text-lightGrey">
            {getTimeDifference(notification?.createdAt)}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
