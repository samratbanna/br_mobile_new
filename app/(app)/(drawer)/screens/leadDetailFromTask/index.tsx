import React from 'react';
import LeadTabs from '~/components/leads/leadTabs';
import {Box} from '~/components/ui/box';
import Header from '../header';
import {LeadDetails} from '~/components/leads/leadDetailsFromId';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default () => {
  const insets = useSafeAreaInsets();
  return (
    <Box className="flex-1" style={{marginTop: insets.top}}>
      <Header title={'Lead Detail'} />
      <LeadDetails />
    </Box>
  );
};
