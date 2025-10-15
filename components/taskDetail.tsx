import React, {useState} from 'react';
import {useSessionContext} from '~/providers/session/ctx';
import {getTwoCharInitials} from '~/lib/constants';
import moment from 'moment';
import {
  Ban,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Loader,
} from 'lucide-react-native';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {TASK_STATUS_COLORS} from './taskList';
import {Box} from './ui/box';
import {Text} from './ui/text';
import {updateStatus} from '~/services/task.service';
import {showSuccessToast} from '~/lib/Toast';
import {getLead} from '~/services/lead.service';
import {useRouter} from 'expo-router';

const TASK_ICONS = {
  PENDING: (
    <Clock size={18} strokeWidth={3} color={TASK_STATUS_COLORS.PENDING} />
  ),
  IN_PROGRESS: (
    <Loader size={18} strokeWidth={3} color={TASK_STATUS_COLORS.IN_PROGRESS} />
  ),
  COMPLETED: (
    <Check size={18} strokeWidth={3} color={TASK_STATUS_COLORS.COMPLETED} />
  ),
  CANCELLED: (
    <Ban size={18} strokeWidth={3} color={TASK_STATUS_COLORS.CANCELLED} />
  ),
};
export const TaskDetail = () => {
  const router = useRouter();
  const [comment, setComment] = useState();
  const {task, user, setTask, lead, setLead} = useSessionContext();

  const {mutate: updateStatusAction, isPending: pending} = updateStatus({
    onSuccess: response => {
      console.log('response', response);
      showSuccessToast('Task status updated');
      setTask({...task, status: response?.status});
    },
    onError: (error: Error) => {
      console.log('Error', error);
    },
  });

  const _onHandleStatusChange = (status: string) => {
    updateStatusAction({status, id: task?._id});
  };

  const {data, isLoading} = getLead({
    id: task?.leadId,
  });

  return (
    <ScrollView>
      <Box className="flex-1">
        <Box className="m-3 flex-1 rounded-lg bg-white p-3">
          <Text className="text-md mb-2 self-end font-semibold text-blue">
            <Text>Last Update At : </Text>
            {moment(task.updatedAt).format('DD MMM, hh:mm A')}
          </Text>
          <Text className={'font-semibold text-xl capitalize'}>
            {`${task.title}`}
          </Text>
          <Text
            className={
              'text-md text-gray mb-2 border-b-[1px] border-border1 pb-2 font-normal'
            }>
            {`${task.description}`}
          </Text>
          <Box className="mt-5 flex-row items-center justify-between">
            <Box className="flex-1 flex-row">
              <Box className="self-center rounded-full bg-[#90D5FF] p-2.5">
                <Text className="text-md font-semibold color-white">
                  {getTwoCharInitials(user?.name) || 'NA'}
                </Text>
              </Box>
              <Box className="ml-2 flex-1">
                <Text className="font-medium text-grey">Assigned To</Text>
                <Text className="font-semibold text-lg">
                  {user?.name || '-'}
                </Text>
              </Box>
            </Box>
            <Box className="flex-1 flex-row items-center">
              <Box className="self-center rounded-full border-[1px] border-border1 p-2.5">
                <CalendarDays size={20} strokeWidth={1} />
              </Box>
              <Box className="ml-2 flex-1">
                <Text className="font-medium text-grey">Created At</Text>
                <Text className="text-md font-semibold">
                  {moment(task.createdAt).format('DD MMM, hh:mm A')}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box className="mt-8 flex-row items-center justify-between border-b-[0px] border-border1 pb-4">
            <TouchableOpacity
              onPress={() => {
                // toggleDateVisible();
              }}
              className="flex-1 flex-row items-center">
              <Box className="self-center rounded-full border-[1px] border-border1 p-2.5">
                <CalendarDays size={20} strokeWidth={1} color={'red'} />
              </Box>
              <Box className="ml-2 flex-1">
                <Text className="font-medium text-grey">Due Date At</Text>
                <Text className="text-md font-semibold text-red">
                  {task.dueDate
                    ? moment(task.dueDate).format('DD MMM, YYYY')
                    : '-'}
                </Text>
              </Box>
            </TouchableOpacity>
            <Box className="flex-1 flex-row items-center">
              <Box
                style={{
                  borderColor: TASK_STATUS_COLORS[task?.status || 'PENDING'],
                }}
                className={`self-center rounded-full p-2.5`}>
                {TASK_ICONS[task?.status]}
              </Box>
              <Box className="ml-2 flex-1">
                <Text className="font-medium text-grey">Current Status</Text>
                {task.status === 'CANCELLED' || task.status === 'COMPLETED' ? (
                  <Text className="text-md font-semibold">{task.status}</Text>
                ) : (
                  <SelectDropdown
                    data={[
                      'PENDING',
                      'IN_PROGRESS',
                      'COMPLETED',
                      'CANCELLED',
                      'HOLD',
                    ]}
                    onSelect={(selectedItem, index) => {
                      _onHandleStatusChange(selectedItem);
                      // onChange(selectedItem);
                    }}
                    renderButton={() => {
                      return (
                        <Box className="mt-1 flex-row items-center justify-between rounded-lg border-[1px] border-input bg-white p-3">
                          <Text className="text-md font-medium text-graniteGray">
                            {task.status}
                          </Text>
                          <ChevronDown size={16} color={'#A4A4A5'} />
                        </Box>
                      );
                    }}
                    renderItem={(action, index, isSelected) => {
                      return (
                        <Box className="w-full border-b-[1px] border-border1 bg-white px-2 py-3">
                          <Text
                            style={{
                              flex: 1,
                              fontSize: 14,
                              fontFamily: 'Poppins',
                              color: '#151E26',
                            }}>
                            {action}
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
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {task?.leadId ? (
          <TouchableOpacity
            onPress={() => {
              setLead(data);
              router.push('/screens/leadDetailFromTask');
            }}
            className="mx-4 flex-1 items-center justify-between rounded-lg bg-blue px-4 py-3">
            {isLoading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text className="font-semibold text-white">
                View Associated Lead
              </Text>
            )}
          </TouchableOpacity>
        ) : null}
      </Box>
    </ScrollView>
  );
};
