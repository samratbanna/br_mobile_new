import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {Icon} from '~/components/navigation/TabBarIcon';
import {useSessionContext} from '~/providers/session/ctx';
import {Power} from 'lucide-react-native';

export default function NoStudentsScreen() {
  const {logout} = useSessionContext();
  return (
    <Box className="flex-1 items-center justify-center bg-background">
      <Icon icon="noStudent" size={250} imgMode="contain" />
      <Text className="font-cBold text-red-600 text-2xl">
        Students Not Found
      </Text>
      <TouchableOpacity
        className="mt-4 flex-row items-center rounded-full bg-lightBlue p-2 px-4"
        onPress={() => logout()}>
        <Power size={20} color="#0081F8" />
        <Text className="ml-2 font-medium text-lg text-blue">Logout</Text>
      </TouchableOpacity>
    </Box>
  );
}
