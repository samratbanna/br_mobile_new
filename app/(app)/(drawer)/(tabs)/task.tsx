import React from 'react';
import LeadTabs from '~/components/leads/leadTabs';
import { TaskList } from '~/components/taskList';
import {Box} from '~/components/ui/box';

export default function MyChild() {
  return (
    <Box className="flex-1">
      <TaskList />
    </Box>
  );
}
