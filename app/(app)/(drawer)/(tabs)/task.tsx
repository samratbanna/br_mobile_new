import React from 'react';
import {TaskList} from '~/components/taskList';
import TaskTabs from '~/components/taskTabs';
import {Box} from '~/components/ui/box';

export default function MyChild() {
  return (
    <Box className="flex-1">
      <TaskTabs />
    </Box>
  );
}
