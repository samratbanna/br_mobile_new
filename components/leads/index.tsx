import React, {useEffect, useMemo, useState} from 'react';
import {Box} from '~/components/ui/box';
import {size, toUpper} from 'lodash';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  View,
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
import SelectDropdown from 'react-native-select-dropdown';
import {ChevronDown} from 'lucide-react-native';

export const LeadList = ({
  type,
  extraTabs,
}: {
  type: string;
  extraTabs: boolean;
}) => {
  const {onlyMyLead, setOnlyMyLead} = useSessionContext();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const {user} = useSessionContext();
  const [paginationData, setPaginationData] = useState<any>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [searchName, setSearchName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
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
  }, [type, onlyMyLead, selectedIndex, searchName, selectedStatus]);

  useEffect(() => {
    if (page === 1) {
      reset();
      followupReset();
      meetingListReset();
      setLeadList(type as keyof typeof categorizedLeads, []);
      setPaginationData(undefined);
    }
    let params: any = {
      userRole: user?.role?.name,
      staffId: user?._id,
      isPopulate: true,
      page,
      limit: 20,
    };
    if (onlyMyLead) {
      params = {...params, myLeads: true};
    }
    if (searchName) {
      params = {...params, ownerName: searchName};
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
      if (selectedStatus !== 'all') {
        params = {...params, status: selectedStatus};
      }
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
  }, [page, type, selectedIndex, onlyMyLead, searchName, selectedStatus]);

  return (
    <Box className="flex-1 bg-background p-4">
      <Box style={{alignItems: 'flex-end'}}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={onlyMyLead ? '#f5dd4b' : '#white'}
          onValueChange={() => setOnlyMyLead(!onlyMyLead)}
          value={onlyMyLead}
        />
        <Text>Only My Leads</Text>
      </Box>
      <TextInput
        placeholder="Search by name"
        placeholderTextColor="#8F8F8F"
        value={searchName}
        onChangeText={setSearchName}
        className="mt-3 px-3 py-2 rounded-lg border border-border1 text-base"
        style={{
          borderWidth: 1,
          borderColor: '#e0e0e0',
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderRadius: 8,
          fontSize: 16,
          color: '#151E26',
        }}
      />
      {type === 'followup' ? (
        <SelectDropdown
          data={[
            {label: 'All', value: 'all'},
            {label: 'HIGH_FOLLOWUP', value: 'HIGH_FOLLOWUP'},
            {label: 'MED_FOLLOWUP', value: 'MED_FOLLOWUP'},
            {label: 'LOW_FOLLOWUP', value: 'LOW_FOLLOWUP'},
          ]}
          onSelect={selectedItem => {
            setSelectedStatus(selectedItem.value);
          }}
          renderButton={() => {
            return (
              <Box className="mt-3 flex-row items-center justify-between rounded-lg border-[1px] border-input bg-white p-3">
                <Text className="pl-1 font-medium text-lg text-graniteGray">
                  {selectedStatus === 'all' ? 'All' : selectedStatus}
                </Text>
                <ChevronDown size={20} color={'#A4A4A5'} />
              </Box>
            );
          }}
          renderItem={item => {
            return (
              <Box className="w-full border-b-[1px] border-border1 bg-white px-2 py-3">
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    color: '#151E26',
                  }}>
                  {item.label}
                </Text>
              </Box>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={{
            backgroundColor: '#E9ECEF',
            borderRadius: 8,
          }}
        />
      ) : null}
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

        {lead?.districtManagerId ? (
          <Box className="flex-row items-center justify-between pr-3">
            <Text>Team Leader</Text>
            <Text numberOfLines={1} className="text-graniteGray">
              {lead?.districtManagerId?.name}
            </Text>
          </Box>
        ) : null}
        {lead?.staffId ? (
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
