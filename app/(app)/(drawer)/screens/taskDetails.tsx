import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '~/app/(app)/(drawer)/screens/header';
import { TaskDetail } from '~/components/taskDetail';
import {Box} from '~/components/ui/box';
import {useSessionContext} from '~/providers/session/ctx';

export default function TaskDetailScreen() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Box style={{marginTop: insets?.top}} className="flex-1 bg-gray-100">
        <Header title={'Task Details'} />
        <TaskDetail />
      </Box>
    </>
  );
}
