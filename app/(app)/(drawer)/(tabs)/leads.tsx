import React from 'react';
import LeadTabs from '~/components/leads/leadTabs';
import {Box} from '~/components/ui/box';

export default function MyChild() {
  return (
    <Box className="flex-1">
      <LeadTabs />
    </Box>
  );
}
