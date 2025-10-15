import React, {useEffect, useMemo, useState} from 'react';
import {Box} from '~/components/ui/box';
import {size, toUpper} from 'lodash';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Text} from '~/components/ui/text';
import moment from 'moment';
import {useSessionContext} from '~/providers/session/ctx';
import {
  getAllFollowupLeads,
  getAllLeads,
  getAllMeetingList,
} from '~/services/lead.service';
import {CommonLoader} from '../commonLoader';
import {Lead} from '~/interfaces/lead.interface';
import {LEAD_COLORS} from '~/lib/constants';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import EmptyScreen from '~/app/(app)/(drawer)/screens/emptyScreen';
import {Switch} from 'react-native-gesture-handler';
import {useRouter} from 'expo-router';
import {useLeadStore} from '~/store/lead.store';

export const LeadList = ({
  type,
  extraTabs,
}: {
  type: string;
  extraTabs: boolean;
}) => {
  const router = useRouter();
  const [myLead, setMyLead] = useState(false);
  const [page, setPage] = useState(1);
  const {user} = useSessionContext();
  const [paginationData, setPaginationData] = useState<any>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const {
    categorizedLeads,
    setLeadList,
    setSelectedLeadIndex,
    setSelectedCategory
  } = useLeadStore();
  
  const leadList: Lead[] = useMemo(() => {
    return categorizedLeads[type as keyof typeof categorizedLeads];
  }, [categorizedLeads]);


  //
  const {mutate, reset, isPending} = getAllLeads({
    onSuccess: response => {
      if (response && size(response?.docs) > 0) {
        if (page === 1) {
          setLeadList(type as keyof typeof categorizedLeads, response?.docs);
        } else {
          setLeadList(type as keyof typeof categorizedLeads, [
            ...leadList,
            ...response?.docs,
          ]);
        }
      }
      setPaginationData(response);
    },
    onError: (error: Error) => {},
  });
  //
  const {mutate: getFollowupLeads, reset: followupReset, isPending: pending} = getAllFollowupLeads({
    onSuccess: response => {
      if (response && response?.docs) {
        if (page === 1) {
          setLeadList(type as keyof typeof categorizedLeads, response?.docs);
        } else {
          setLeadList(type as keyof typeof categorizedLeads, [
            ...leadList,
            ...response?.docs,
          ]);
        }
      }
      setPaginationData(response);
    },
    onError: (error: Error) => {},
  });
  //
  const {mutate: getMeetingLeads, reset: meetingListReset, isPending: ispending} = getAllMeetingList({
    onSuccess: response => {
      if (response && size(response?.docs) > 0) {
        if (page === 1) {
          setLeadList(type as keyof typeof categorizedLeads, response?.docs);
        } else {
          setLeadList(type as keyof typeof categorizedLeads, [
            ...leadList,
            ...response?.docs,
          ]);
        }
      }
      setPaginationData(response);
    },
    onError: (error: Error) => {},
  });

  useEffect(() => {
    setPage(1);
  }, [type, myLead, selectedIndex]);

  useEffect(() => {
    if (page === 1) {
      console.log("reset Status");
      
      reset();
      followupReset();
      meetingListReset();
      setLeadList(type as keyof typeof categorizedLeads, []);
      setPaginationData(undefined);
    }
    let params: any = {
      staffId: user?._id,
      isPopulate: true,
      page,
      limit: 20,
    };
    if (myLead) {
      params = {...params, myLeads: true};
    }
    if (type === 'bucket') {
      params = {...params, isBucket: true};
      mutate(params);
    }
    if (type === 'conversions') {
      params = {...params, isConverted: true};
      mutate(params);
    }
    if (type === 'all') {
      mutate(params);
    }
    if (type === 'meeting') {
      params = {...params, isMeeting: true};
      if (selectedIndex === 0) {
        reset();
        params = {...params, passed: true};
        getFollowupLeads(params);
      } else if (selectedIndex === 1) {
        reset();
        params = {...params, today: true};
        getMeetingLeads(params);
      } else if (selectedIndex === 2) {
        reset();
        params = {...params, upcoming: true};
        getMeetingLeads(params);
      }
    }
    if (type === 'followup') {
      params = {...params};
      if (selectedIndex === 0) {
        reset();
        params = {...params, passed: true};
      } else if (selectedIndex === 1) {
        reset();
        params = {...params, today: true};
      } else if (selectedIndex === 2) {
        reset();
        params = {...params, upcoming: true};
      }
      getFollowupLeads(params);
    }
  }, [page, type, selectedIndex, myLead]);

  return (
    <Box className="flex-1 bg-background p-4">
      <Box style={{alignItems: 'flex-end'}}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={myLead ? '#f5dd4b' : '#white'}
          onValueChange={() => setMyLead(!myLead)}
          value={myLead}
        />
        <Text>Only My Leads</Text>
      </Box>
      {extraTabs ? (
        <SegmentedControl
          style={{marginTop: 10}}
          values={['Passed', 'Today', 'Upcoming']}
          selectedIndex={selectedIndex}
          onChange={event => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      ) : null}
      {(isPending || pending || ispending) && page === 1 ? (
        <CommonLoader />
      ) : size(leadList) > 0 ? (
        <FlatList
          data={leadList}
          renderItem={({item, index}) => <LeadItem lead={item} _onPress={() => {{
            setSelectedCategory(type);
            setSelectedLeadIndex(index);
            router.push({
              pathname: '/screens/leadDetails',
              // params: {lead: JSON.stringify(lead)},
            });
          }}} />}
          keyExtractor={(item, index) => item?._id + index}
          onEndReached={() => {
            if (page < paginationData?.totalPages) {
              setPage(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isPending ? (
              <ActivityIndicator size="small" color="#ff7477" />
            ) : null
          }
          ListEmptyComponent={<EmptyScreen title="No Lead" icon="noData" />}
          refreshControl={
            <RefreshControl
              refreshing={isPending}
              onRefresh={() => setPage(1)}
            />
          }
        />
      ) : (
        <EmptyScreen title="No Lead" icon="noData" />
      )}
    </Box>
  );
};

const LeadItem: React.FC<{lead: Lead, _onPress: () => void}> = ({lead, _onPress}) => {
  console.log('lead', lead, lead?.status);
  
  const router = useRouter();
  const {user} = useSessionContext();
  const isSelfLead = lead?.staffId?._id === user?._id;
  const {
    categorizedLeads,
    setLeadList,
    setSelectedLeadIndex,
    setSelectedCategory,
  } = useLeadStore();
  return (
    <TouchableOpacity
      onPress={_onPress}
      className={`mt-2 flex-row items-center justify-center rounded-xl border-[1px] border-l-[3px] border-border1 bg-white pb-3 pl-3`}
      style={{borderLeftColor: LEAD_COLORS[lead?.status]}}>
      <Box className="ml-3 flex-1">
        <Box className="flex-1">
          <Box className="flex-row items-center justify-between">
            <Text className="mr-3 text-sm text-graniteGray">
              {moment(lead?.createdAt).format('DD MMM YYYY')}
            </Text>
            <Box
              style={{backgroundColor: LEAD_COLORS[lead?.status]}}
              className="rounded-bl-xl rounded-tr-xl px-4 py-2">
              <Text className="font-semibold text-sm text-graniteGray text-white">
                {lead?.status}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box className="mb-2 mr-5 mt-2">
          {lead?.remark ? (
            <Text className="text-sm text-graniteGray">
              #{toUpper(lead?.remark)}
            </Text>
          ) : null}
          <Text className="text-md text-main font-semibold">
            {lead?.ownerName}
          </Text>
          {lead?.contact ? (
            <Text className="text-sm text-graniteGray">{`M.No.: ${lead?.contact}`}</Text>
          ) : null}
          {lead?.email ? (
            <Text className="text-sm text-graniteGray">{`Email: ${lead?.email}`}</Text>
          ) : null}
        </Box>

        {isSelfLead ? null : user?.role === 'GROWTH_PARTNER' &&
          lead?.districtManagerId ? (
          <Box className="flex-row items-center justify-between pr-3">
            <Text>Team Leader</Text>
            <Text numberOfLines={1} className="text-graniteGray">
              {lead?.districtManagerId?.name}
            </Text>
          </Box>
        ) : null}
        {isSelfLead ? null : lead?.staffId ? (
          <Box className="flex-row items-center justify-between pr-3">
            <Text>{lead?.districtManagerId ? 'Trainer' : 'Team Leader'}</Text>
            <Text numberOfLines={1} className="text-graniteGray">
              {lead?.staffId?.name}
            </Text>
          </Box>
        ) : null}
      </Box>
    </TouchableOpacity>
  );
};
