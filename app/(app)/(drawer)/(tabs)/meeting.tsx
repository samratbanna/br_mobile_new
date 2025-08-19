import React from 'react';
import {Box} from '~/components/ui/box';
import {useSessionContext} from '~/providers/session/ctx';
import {getMeetings} from '~/services';
import Header from '../screens/header';
import {CommonLoader} from '~/components/commonLoader';
import {FlatList, Linking, TouchableOpacity} from 'react-native';
import {Text} from '~/components/ui/text';
import moment from 'moment';
import { size } from 'lodash';
import EmptyScreen from '../screens/emptyScreen';

export default function UpdatesScreen() {
  const {user} = useSessionContext();
  const {data: meetings, isLoading} = getMeetings({
    id: user?._id,
  });

  return (
    <Box className="flex-1 p-3 pb-20">
      {isLoading ? (
        <CommonLoader />
      ) : size(meetings) ? (
        <Box className="flex-1">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={meetings}
            renderItem={render_Item}
            keyExtractor={item => item.toString()}
          />
        </Box>
      ) : <EmptyScreen title='No Meetings' icon='noData' />}
    </Box>
  );
}

export const render_Item = ({item}: any) => {
  const navigateTOZoom = () => {
    Linking.openURL(item?.url);
  };

  return (
    <Box className="my-3 rounded-lg bg-white px-3 py-5">
      <Box style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Box>
          <Text className="font-semibold text-lg">
            {item?.title ?? 'Meeting'}
          </Text>
          <Text className="text-md font-semibold">
            {moment(item?.dateTime).format('DD-MMM-YYYY')}{' '}
            {moment(item?.time, 'HH:mm').format('hh:mm a')}
          </Text>
        </Box>
        <TouchableOpacity
          style={{
            backgroundColor: '#38a169',
            paddingVertical: 10,
            paddingHorizontal: 30,
            // marginTop: 14,
            borderRadius: 6,
            alignItems: 'center',
            // justifyContent: "center",
            marginHorizontal: 16,
            // position: "absolute",
            // bottom: 10,
            // right: 0,
          }}
          onPress={navigateTOZoom}>
          <Text className="text-md font-semibold">Join Now</Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
