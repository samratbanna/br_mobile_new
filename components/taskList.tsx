import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {Text} from '~/components/ui/text';
import {
  Ban,
  Check,
  ChevronDown,
  Clock,
  Loader,
  Pause,
  X,
} from 'lucide-react-native';
import Modal from 'react-native-modal';
import {size} from 'lodash';
import {useFocusEffect, useRouter} from 'expo-router';
import {useSessionContext} from '~/providers/session/ctx';
import SelectDropdown from 'react-native-select-dropdown';
import moment from 'moment';
import EmptyScreen from '~/app/(app)/(drawer)/screens/emptyScreen';
import {Task} from '~/interfaces/task.interface';
import {getAllTasks} from '~/services/task.service';
import {Box} from './ui/box';
import {useQueryFocusAware} from '~/providers/query/useQueryFocusAware';

export const TASK_STATUS_COLORS = {
  PENDING: '#FFA500',
  IN_PROGRESS: '#007BFF',
  COMPLETED: '#28A745',
  HOLD: '#6C757D',
  CANCELLED: '#DC3545',
};

export const TaskList = ({type}) => {
  const {user, logout} = useSessionContext();

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = getAllTasks({assignedTo: user?._id, limit: 10, status: type});

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {
        refetch();
      };
    }, []),
  );

  useEffect(() => {
    if (error && error.status === 401) {
      logout();
    }
  }, [error]);

  const allTasks = useMemo(
    () => data?.pages.flatMap(page => page.docs) || [],
    [data],
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Box className="flex-1">
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Box className="mt-3 flex-1 rounded-lg bg-white px-3 py-1">
          <FlatList
            data={allTasks}
            renderItem={({item, index}) => (
              <TaskItem item={item} isLast={size(allTasks) === index + 1} />
            )}
            keyExtractor={(item, index) => item._id + index}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyScreen title="No Tasks" icon="noData" />
            )}
            ListFooterComponent={
              isFetchingNextPage ? <ActivityIndicator /> : null
            }
          />
        </Box>
      )}
    </Box>
  );
};

export const TASK_ICONS = {
  PENDING: <Clock size={12} strokeWidth={3} color={'white'} />,
  IN_PROGRESS: <Loader size={12} strokeWidth={3} color={'white'} />,
  COMPLETED: <Check size={12} strokeWidth={3} color={'white'} />,
  HOLD: <Pause size={12} strokeWidth={3} color={'white'} />,
  CANCELLED: <X size={12} strokeWidth={3} color={'white'} />,
};

const TaskItem = ({item, isLast}: {item: Task; isLast: boolean}) => {
  const router = useRouter();
  const {setTask} = useSessionContext();
  return (
    <TouchableOpacity
      onPress={() => {
        setTask(item);
        router.push(`/(app)/(drawer)/screens/taskDetails`);
      }}
      className={`flex-row items-center border-border1 py-3 ${isLast ? 'border-b-0' : 'border-b-[1px]'}`}>
      <Box
        className="mr-3 rounded-full p-1"
        style={{
          backgroundColor:
            TASK_STATUS_COLORS[
              (item.status || 'UNASSIGNED') as keyof typeof TASK_STATUS_COLORS
            ],
        }}>
        {TASK_ICONS[(item.status || 'UNASSIGNED') as keyof typeof TASK_ICONS]}
      </Box>
      <Box className="flex-1">
        {item.dueDate ? (
          <Text className="text-gray self-end text-sm">
            Due:{' '}
            <Text className="text-red">
              {moment(item.dueDate).format('DD MMM, YY')}
            </Text>
          </Text>
        ) : null}
        <Text className={`text-md mt-1 font-semibold`}>{item.title}</Text>
        <Text className={`text-md text-graniteGray`}>{item.description}</Text>
      </Box>
    </TouchableOpacity>
  );
};

interface ModalParams {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  _onSubmit: (vendor: any, staff: any) => void;
  staff: any;
  vendor: any;
}
const FilterModal: React.FC<ModalParams> = ({
  isModalVisible,
  setModalVisible,
  _onSubmit,
  vendor,
  staff,
}) => {
  const [selectedVendor, setSelectedVendor] = useState<any>(vendor);
  const [selectedStaff, setSelectedStaff] = useState<any>(staff);

  const submit = () => {
    _onSubmit(selectedVendor, selectedStaff);
    setModalVisible(false);
  };

  const {data} = useGetFilterData();

  const vendors = useMemo(() => {
    if (data[2] && size(data[2].data)) {
      return data[2]?.data;
    }
    return [];
  }, [data]);

  const staffs = useMemo(() => {
    if (data[1] && size(data[1].data)) {
      return data[1]?.data;
    }
    return [];
  }, [data]);

  const _onReset = () => {
    setSelectedStaff(undefined);
    setSelectedVendor(undefined);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      style={{justifyContent: 'center'}}>
      <Box className="rounded-lg bg-white p-5">
        <Box className="flex-row items-center justify-between">
          <Text className="font-medium text-xl">Filter</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <X color={'red'} size={20} />
          </TouchableOpacity>
        </Box>
        <Text className="mb-1 mt-3 font-semibold">Select Staff</Text>
        <SelectDropdown
          data={staffs || []}
          onSelect={selectedItem => {
            setSelectedStaff(selectedItem);
          }}
          renderButton={() => {
            return (
              <Box className="flex-row items-center justify-between rounded-lg border-[1px] border-input bg-white p-3">
                <Text className="pl-1 font-medium text-lg text-graniteGray">
                  {selectedStaff ? selectedStaff?.name : 'Select Staff'}
                </Text>
                <ChevronDown size={20} color={'#A4A4A5'} />
              </Box>
            );
          }}
          renderItem={action => {
            return (
              <Box className="w-full border-b-[1px] border-border1 bg-white px-2 py-3">
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    color: '#151E26',
                  }}>
                  {action?.name}
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
        <Text className="mb-1 mt-3 font-semibold">Select Vendor</Text>
        <SelectDropdown
          data={vendors || []}
          onSelect={selectedItem => {
            setSelectedVendor(selectedItem);
          }}
          renderButton={() => {
            return (
              <Box className="flex-row items-center justify-between rounded-lg border-[1px] border-input bg-white p-3">
                <Text className="pl-1 font-medium text-lg text-graniteGray">
                  {selectedVendor
                    ? selectedVendor?.vendorName
                    : 'Select Vendor'}
                </Text>
                <ChevronDown size={20} color={'#A4A4A5'} />
              </Box>
            );
          }}
          renderItem={action => {
            return (
              <Box className="w-full border-b-[1px] border-border1 bg-white px-2 py-3">
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    color: '#151E26',
                  }}>
                  {action?.vendorName}
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
        <Box className="flex-row items-center justify-between">
          <Box className="flex-1">
            <CustomButton
              customStyle="bg-background"
              titleStyle="text-[#808080] font-medium text-md"
              title="Reset"
              onPress={_onReset}
            />
          </Box>
          <Box className="ml-2 flex-1">
            <CustomButton
              customStyle="bg-blue"
              titleStyle="text-white font-medium text-md"
              title="Apply"
              onPress={submit}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
