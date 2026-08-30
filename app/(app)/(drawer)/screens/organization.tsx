import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import Header from './header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMyOrganization} from '~/services/organization.service';
import {Card} from '~/components/card';
import moment from 'moment';

export default function OrganizationScreen() {
  const insets = useSafeAreaInsets();
  const {data, isLoading} = useMyOrganization({enabled: true});

  return (
    <Box className="flex-1 bg-white" style={{marginTop: insets.top}}>
      <Header title={'Organization'} showNotificationIcon={false} />
      <ScrollView className="flex-1 p-5">
        {isLoading ? (
          <Box className="mt-10 items-center">
            <ActivityIndicator />
          </Box>
        ) : (
          <Card customStyle="py-0">
            <InfoRow label="Name" value={data?.name} />
            <Box className="h-[1px] bg-border1" />
            <InfoRow label="Slug" value={data?.slug} />
            <Box className="h-[1px] bg-border1" />
            <InfoRow label="Plan" value={data?.plan} />
            <Box className="h-[1px] bg-border1" />
            <InfoRow
              label="Plan Expires At"
              value={
                data?.planExpiresAt
                  ? moment(data.planExpiresAt).format('DD-MMM-YYYY')
                  : '-'
              }
            />
            <Box className="h-[1px] bg-border1" />
            <InfoRow
              label="Status"
              value={data?.isActive ? 'Active' : 'Inactive'}
            />
          </Card>
        )}
      </ScrollView>
    </Box>
  );
}

const InfoRow = ({label, value}: {label: string; value?: string}) => {
  return (
    <Box className="my-4 flex-row items-center justify-between">
      <Text className="text-lg font-medium">{label}</Text>
      <Text className="text-graniteGray font-medium">{value || '-'}</Text>
    </Box>
  );
};
