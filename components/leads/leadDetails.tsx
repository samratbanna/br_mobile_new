import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Box} from '~/components/ui/box';
import {Text} from '../ui/text';
import SelectDropdown from 'react-native-select-dropdown';
import {LEAD_STATUS_LIST, LeadStatus} from '~/lib/constants';
import {
  ChevronDown,
  Circle,
  CircleCheck,
  PhoneCall,
  X,
} from 'lucide-react-native';
import {findIndex, size} from 'lodash';
import {TextInput, TouchableOpacity} from 'react-native';
import {
  getFollowUps,
  addFollowup,
  updateLead,
  getAllCallLogList,
  getAllDemoList,
  addCallLog,
  addDemo,
} from '~/services/lead.service';
import moment from 'moment';
import {showErrorToast, showSuccessToast} from '~/lib/Toast';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import useTailwindColors from '~/hooks/useThemeColorTailwind';
import {useLeadStore} from '~/store/lead.store';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {Followups, LeadDemo} from '~/interfaces/lead.interface';
import EmptyScreen from '~/app/(app)/(drawer)/screens/emptyScreen';
import {useSessionContext} from '~/providers/session/ctx';
import {Icon} from '../navigation/TabBarIcon';

import {Linking} from 'react-native';

export const LeadDetails = () => {
  const {
    selectedLeadIndex,
    selectedCategory,
    categorizedLeads,
    updateLeadStatus,
  } = useLeadStore();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => setIsVisible(!isVisible);
  //
  const [demoVisible, setDemoVisible] = useState(false);
  const toggleDemoVisible = () => setDemoVisible(!demoVisible);
  //
  const [callLogVisible, setcallLogVisible] = useState(false);
  const togglecallLogVisible = () => setcallLogVisible(!callLogVisible);

  const leadList = useMemo(
    () => categorizedLeads[selectedCategory],
    [isPending],
  );
  const lead = useMemo(
    () => leadList.at(selectedLeadIndex),
    [isPending, selectedLeadIndex],
  );

  const {data: followups, refetch} = getFollowUps({leadId: lead?._id});
  const {data: callLogList, refetch: refetchCallLog} = getAllCallLogList({
    leadId: lead?._id,
  });
  const {data: demoList, refetch: refetchDemoList} = getAllDemoList({
    leadId: lead?._id,
    isDemo: true,
  });

  const {mutate: udpateLeadStatus, isPending} = updateLead({
    onSuccess: (response: any) => {
      const findSelectedIndex = findIndex(
        LEAD_STATUS_LIST,
        s => s == response?.status,
      );
      console.log('findSelectedIndex', findSelectedIndex);
      
      if (findSelectedIndex > 0) setSelectedIndex(findSelectedIndex);
      updateLeadStatus(selectedCategory, lead?._id, response?.status);
      refetch();
      showSuccessToast('status updated');
    },
    onError: (error: Error) => {},
  });

  useMemo(() => {
    const findSelectedIndex = findIndex(
      LEAD_STATUS_LIST,
      s => s == lead?.status,
    );
    if (findSelectedIndex > 0) setSelectedIndex(findSelectedIndex);
  }, [lead]);

  const sendWhatsApp = (phoneNumber: string) => {
    // Ensure phone number is with country code, e.g., +91 for India
    const url = `whatsapp://send?phone=${phoneNumber}`;

    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device');
    });
  };
  const dialCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  return (
    <Box className="flex-1 bg-background p-4">
      {lead?.status === LeadStatus.CONVERTED ? (
        <Box className="mb-3 ml-3 flex-row items-center justify-between self-end rounded-lg rounded-md border-[1px] border-border2 bg-white px-4 py-2">
          <Text className="text-md px-3 text-[#646464]">{lead.status}</Text>
        </Box>
      ) : (
        <SelectDropdown
          data={LEAD_STATUS_LIST}
          onSelect={(selectedItem, index) => {
            udpateLeadStatus({
              id: lead?._id,
              status: (LEAD_STATUS_LIST.at(index) || '').replace(/ /g, '_'),
            });
            setSelectedIndex(index);
          }}
          renderButton={() => {
            return (
              <Box className="mb-3 ml-3 flex-row items-center justify-between self-end rounded-lg rounded-md border-[1px] border-border2 bg-white px-4 py-2">
                <Text className="text-md px-3 text-[#646464]">
                  {LEAD_STATUS_LIST.at(selectedIndex)}
                </Text>
                <ChevronDown size={20} color={'#646464'} />
              </Box>
            );
          }}
          renderItem={action => {
            return (
              <Box className="w-full border-b-[1px] border-border1 bg-white px-2 py-3">
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
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
      <ScrollView>
        <Box className="rounded-lg bg-white p-4 shadow-lg">
          <LeadItemDetails title="Name" value={lead?.ownerName} />
          <LeadItemDetails title="Business" value={lead?.schoolName} />
          <LeadItemDetails title="Mobile" value={lead?.contact} />
          <LeadItemDetails title="Whatsapp" value={lead?.whatsAppNumber} />
          <LeadItemDetails title="Email" value={lead?.email} />
          <LeadItemDetails title="Medium" value={lead?.schoolMedium} />
          <LeadItemDetails title="Address" value={lead?.schoolAddress} />
          <LeadItemDetails title="School Type" value={lead?.schoolType} />
          <LeadItemDetails title="Block" value={lead?.blockName} />
          <LeadItemDetails title="Tehsil" value={lead?.tehsil} />
          <LeadItemDetails title="District" value={lead?.district} />
          <LeadItemDetails title="State" value={lead?.state} />
          <LeadItemDetails title="Pincode" value={lead?.pincode} />
          <LeadItemDetails title="message" value={lead?.message} />
          <LeadItemDetails title="totalStudent" value={lead?.totalStudent} />
          <LeadItemDetails title="referralBy" value={lead?.referralBy} />
        </Box>
        <Box className="mt-4 flex-1">
          <Box className="flex-row items-center gap-2 self-end py-3">
            {lead?.contact || lead?.whatsAppNumber ? (
              <TouchableOpacity
                onPress={() =>
                  dialCall(lead?.contact ? lead?.contact : lead?.whatsAppNumber)
                }>
                <Icon size={40} icon="call" />
              </TouchableOpacity>
            ) : null}
            {lead?.whatsAppNumber ? (
              <TouchableOpacity
                onPress={() => sendWhatsApp(lead?.whatsAppNumber)}>
                <Icon size={40} icon="whatsapp" />
              </TouchableOpacity>
            ) : null}
          </Box>
          <Box className="flex-row items-center justify-between">
            <Text className="font-medium text-xl text-main">
              {selectedTab === 0
                ? `Followup List`
                : selectedTab === 1
                  ? 'Demo List'
                  : 'Call Logs List'}
            </Text>
            {selectedTab === 0 ? (
              <TouchableOpacity
                onPress={toggleVisible}
                className="rounded-lg bg-main px-4 py-2">
                <Text className="font-medium text-lg text-white">
                  Add Followup
                </Text>
              </TouchableOpacity>
            ) : null}
            {selectedTab === 1 ? (
              <TouchableOpacity
                onPress={toggleDemoVisible}
                className="items-center rounded-lg bg-main px-4 py-2">
                <Text className="font-medium text-lg text-white">Add Demo</Text>
              </TouchableOpacity>
            ) : null}
            {selectedTab === 2 ? (
              <TouchableOpacity
                onPress={togglecallLogVisible}
                className="items-center rounded-lg bg-main px-4 py-2">
                <Text className="font-medium text-lg text-white">
                  Add Call Log
                </Text>
              </TouchableOpacity>
            ) : null}
          </Box>
          <SegmentedControl
            style={{marginTop: 10}}
            values={['Followup', 'Demo', 'Call Logs']}
            selectedIndex={selectedTab}
            onChange={event => {
              setSelectedTab(event.nativeEvent.selectedSegmentIndex);
            }}
          />
          {selectedTab === 0 ? (
            <FollowUpList followups={followups || []} />
          ) : null}
          {selectedTab === 1 ? <DemoList demoList={demoList || []} /> : null}
          {selectedTab === 2 ? (
            <CallLogLists callLogs={callLogList || []} />
          ) : null}
        </Box>
      </ScrollView>
      <Modal
        testID={'modal'}
        isVisible={isVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        onBackdropPress={toggleVisible}
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <ModalContent
          toggleVisible={toggleVisible}
          setIsVisible={setIsVisible}
          lead={lead}
          refetch={refetch}
          updateLeadPending={isPending}
          udpateLeadStatus={udpateLeadStatus}
        />
      </Modal>
      <Modal
        testID={'modal'}
        isVisible={demoVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        onBackdropPress={toggleDemoVisible}
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <AddDemoModal
          toggleVisible={toggleDemoVisible}
          setIsVisible={setDemoVisible}
          lead={lead}
          refetch={refetchDemoList}
          updateLeadPending={isPending}
          udpateLeadStatus={udpateLeadStatus}
        />
      </Modal>
      <Modal
        testID={'modal'}
        isVisible={callLogVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        onBackdropPress={togglecallLogVisible}
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <AddCallLogModal
          toggleVisible={togglecallLogVisible}
          setIsVisible={setcallLogVisible}
          lead={lead}
          refetch={refetchCallLog}
        />
      </Modal>
    </Box>
  );
};

export const FollowUpList = ({followups}: {followups: Followups[]}) => {
  return (
    <Box>
      {followups && size(followups) > 0
        ? followups.map((item: any) => {
            return (
              <Box
                key={item?._id}
                className="border-[1px] border-border1 shadow-lg"
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  marginTop: 10,
                }}>
                <Text className="text-grantieGray text-right">
                  <Text style={{color: 'grey', fontWeight: 'normal'}}>
                    {moment(item?.createdAt).format('DD MMM, YYYY hh:mm a')}
                  </Text>
                </Text>

                <Text className="font-medium" style={{color: 'black'}}>
                  Remark :{' '}
                  <Text style={{color: 'black', fontWeight: 'normal'}}>
                    {item?.remark}
                  </Text>
                </Text>
                {item?.dateTime ? (
                  <Text className="font-medium">
                    Next Followup Date:{' '}
                    <Text style={{color: 'black', fontWeight: 'normal'}}>
                      {moment(item?.dateTime).format('DD MMM, YYYY hh:mm a')}
                    </Text>
                  </Text>
                ) : null}
              </Box>
            );
          })
        : null}
    </Box>
  );
};

export const DemoList = ({demoList}: {demoList: LeadDemo[]}) => {
  return (
    <Box>
      {demoList && size(demoList) > 0 ? (
        demoList.map((item: any) => {
          return (
            <Box
              key={item?._id}
              className="border-[1px] border-border1 shadow-lg"
              style={{
                backgroundColor: 'white',
                padding: 10,
                justifyContent: 'space-between',
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text className="text-grantieGray text-right">
                <Text style={{color: 'grey', fontWeight: 'normal'}}>
                  {moment(item?.createdAt).format('DD MMM, YYYY hh:mm a')}
                </Text>
              </Text>
              <Text className="font-medium" style={{color: 'black'}}>
                Title :{' '}
                <Text style={{color: 'black', fontWeight: 'normal'}}>
                  {item?.title}
                </Text>
              </Text>
              {item?.dateTime ? (
                <Text className="font-medium">
                  Next Followup Date:{' '}
                  <Text style={{color: 'black', fontWeight: 'normal'}}>
                    {moment(item?.dateTime).format('DD MMM, YYYY hh:mm a')}
                  </Text>
                </Text>
              ) : null}
            </Box>
          );
        })
      ) : (
        <EmptyScreen title="No Demo Scheduled" icon="noData" />
      )}
    </Box>
  );
};

export const callLogStatus = {
  ANSWERED: 'Answered',
  INVALID_NUMBER: 'Invalid Number',
  NO_ANSWER: 'No Answer',
  BUSY: 'Busy',
};

export const callLogStatusColors = {
  ANSWERED: 'green', // success
  INVALID_NUMBER: 'purple', // neutral / invalid
  NO_ANSWER: 'orange', // warning
  BUSY: 'red', // error / busy
};

export const CallLogLists = ({callLogs}: {callLogs: Followups[]}) => {
  return (
    <Box>
      {callLogs && size(callLogs) > 0 ? (
        callLogs.map((item: any) => {
          return (
            <Box
              key={item?._id}
              className="border-[1px] shadow-lg"
              style={{
                backgroundColor: 'white',
                padding: 10,
                justifyContent: 'space-between',
                borderRadius: 10,
                marginTop: 10,
                borderColor: callLogStatusColors[item?.callStatus],
              }}>
              <Text className="text-grantieGray flex-row text-right">
                <Text style={{color: 'grey', fontWeight: 'normal'}}>
                  {moment(item?.createdAt).format('DD MMM, YYYY hh:mm a')}
                </Text>
              </Text>
              <Text
                className="font-medium"
                style={{color: callLogStatusColors[item?.callStatus]}}>
                {callLogStatus[item?.callStatus]}
              </Text>
              <Text className="font-medium" style={{color: 'black'}}>
                Remark :{' '}
                <Text style={{color: 'black', fontWeight: 'normal'}}>
                  {item?.remark}
                </Text>
              </Text>
              {item?.dateTime ? (
                <Text className="font-medium">
                  Next Followup Date:{' '}
                  <Text style={{color: 'black', fontWeight: 'normal'}}>
                    {moment(item?.dateTime).format('DD MMM, YYYY hh:mm a')}
                  </Text>
                </Text>
              ) : null}
            </Box>
          );
        })
      ) : (
        <EmptyScreen title="No Calllogs" icon="noData" />
      )}
    </Box>
  );
};

export const LeadItemDetails = ({title, value}: {title: string; value: string}) => {
  return value ? (
    <Box className="mb-1 flex-row justify-between">
      <Box className="w-[30%]">
        <Text className="text-graniteGray">{title}</Text>
      </Box>
      <Text>: </Text>
      <Box className="w-[70%]">
        <Text className="font-medium">{value}</Text>
      </Box>
    </Box>
  ) : null;
};

export const ModalContent = ({toggleVisible, udpateLeadStatus, updateLeadPending, refetch}: any) => {
  const {user} = useSessionContext();
  const {selectedLeadIndex, categorizedLeads} = useLeadStore();

  const [isChecked, setIsChecked] = React.useState(false);
  const [showPicker, setShowPicker] = React.useState(false);
  const [date, setDate] = React.useState<any>();
  const [note, setNote] = React.useState<string>('');
  const {updateLeadStatus, selectedCategory} = useLeadStore();

  const leadList = useMemo(
    () => categorizedLeads[selectedCategory],
    [updateLeadPending],
  );
  const lead = useMemo(
    () => leadList.at(selectedLeadIndex),
    [updateLeadPending],
  );

  const {mutate, isPending} = addFollowup({
    onSuccess: (response: any) => {
      showSuccessToast('Followup added successfully');
      if (lead?.status === 'PENDING')
        udpateLeadStatus({id: lead?._id, status: 'MED_FOLLOWUP'});
      toggleVisible();
      //   followupList({leadId: lead?._id});
    },
    onError: (error: Error) => {},
  });
  console.log('date', date);

  const handleDateChange = (data: any) => {
    setDate(moment(data));
    setShowPicker(false);
  };

  const _onSubmit = () => {
    let params: any = {leadId: lead?._id, remark: note, assignedTo: user?._id};
    if (isChecked) {
      if (date) {
        params = {...params, follow: true, dateTime: date.toDate()};
      } else {
        showErrorToast('Please select date time for followup');
      }
    }
    mutate(params);
  };
  const colors = useTailwindColors();
  return (
    <Box className="rounded-lg bg-white p-5">
      <Box className="flex-row items-center justify-between">
        <Text className="font-semibold text-xl text-main">Add Followup</Text>
        <TouchableOpacity onPress={toggleVisible}>
          <X color={'red'} />
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={{marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
        {isChecked ? (
          <CircleCheck size={18} color={colors?.blue} />
        ) : (
          <Circle size={18} />
        )}
        <Text className="ml-2">Need Followup</Text>
      </TouchableOpacity>

      {isChecked ? (
        <Box>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text>
              {date ? date.format('DD MMM, YYYY hh:mm a') : 'Select Date Time'}
            </Text>
          </TouchableOpacity>
        </Box>
      ) : null}
      <TextInput
        style={{
          width: '100%',
          height: 100,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          textAlignVertical: 'top',
          marginBottom: 20,
          marginTop: 20,
          color: 'black',
        }}
        multiline
        placeholder="Enter remark"
        value={note}
        onChangeText={setNote}
      />
      <TouchableOpacity
        onPress={_onSubmit}
        className="items-center rounded-lg bg-main px-4 py-2">
        <Text className="font-semibold text-lg text-white">Add Followup</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        onConfirm={handleDateChange}
        onCancel={() => setShowPicker(false)}
      />
    </Box>
  );
};

export const AddDemoModal = ({toggleVisible, udpateLeadStatus, updateLeadPending, refetch}: any) => {
  const {selectedLeadIndex, categorizedLeads} = useLeadStore();
  const {user} = useSessionContext();
  const [isChecked, setIsChecked] = React.useState(false);
  const [showPicker, setShowPicker] = React.useState(false);
  const [date, setDate] = React.useState<any>();
  const [note, setNote] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [link, setLink] = React.useState<string>('');
  const {updateLeadStatus, selectedCategory} = useLeadStore();

  const leadList = useMemo(
    () => categorizedLeads[selectedCategory],
    [updateLeadPending],
  );
  const lead = useMemo(
    () => leadList.at(selectedLeadIndex),
    [updateLeadPending],
  );

  const {mutate, isPending} = addDemo({
    onSuccess: (response: any) => {
      showSuccessToast('Followup added successfully');
      if (lead?.status === 'PENDING')
        udpateLeadStatus({id: lead?._id, status: 'DEMO_SCHEDULED'});
      toggleVisible();
      refetch();
    },
    onError: (error: Error) => {},
  });
  console.log('date', date);

  const handleDateChange = (data: any) => {
    setDate(moment(data));
    setShowPicker(false);
  };

  const _onSubmit = () => {
    if (title && link && date) {
      let params: any = {
        leadId: lead?._id,
        remark: note,
        title,
        url: link,
        meetingtype: 'ONLINE',
        isDemo: true,
        assignedTo: user?._id,
        staffId: user?._id,
        dateTime: date?.format('YYYY-MM-DD'),
        time: date?.format('hh:mm a'),
      };
      mutate(params);
    } else {
      showErrorToast('All fields are mendatory');
    }
  };
  const colors = useTailwindColors();
  return (
    <Box className="rounded-lg bg-white p-5">
      <Box className="flex-row items-center justify-between">
        <Text className="font-semibold text-xl text-main">Add Demo</Text>
        <TouchableOpacity onPress={toggleVisible}>
          <X color={'red'} />
        </TouchableOpacity>
      </Box>
      <TextInput
        style={{
          width: '100%',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          textAlignVertical: 'top',
          marginTop: 20,
          color: 'black',
        }}
        multiline
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{
          width: '100%',
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          textAlignVertical: 'top',
          marginTop: 10,
          color: 'black',
        }}
        multiline
        placeholder="Enter Demo Link"
        value={link}
        onChangeText={setLink}
      />
      <Box>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text>
            {date ? date.format('DD MMM, YYYY hh:mm a') : 'Select Date Time'}
          </Text>
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        onPress={_onSubmit}
        className="mt-2 items-center rounded-lg bg-main px-4 py-2">
        <Text className="font-semibold text-lg text-white">Add Demo</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        onConfirm={handleDateChange}
        onCancel={() => setShowPicker(false)}
      />
    </Box>
  );
};

export const AddCallLogModal = ({toggleVisible, setIsVisible, refetch}: any) => {
  const {selectedLeadIndex, categorizedLeads} = useLeadStore();
  const {user} = useSessionContext();
  const [showPicker, setShowPicker] = React.useState(false);
  const [date, setDate] = React.useState<any>();
  const [note, setNote] = React.useState<string>('');
  const [selectedIndex, setSelectedIndex] = React.useState<any>();
  const {updateLeadStatus, selectedCategory} = useLeadStore();

  const {mutate, isPending: updateLeadPending} = addCallLog({
    onSuccess: (response: any) => {
      refetch();
      toggleVisible();
    },
    onError: (error: Error) => {},
  });

  const leadList = useMemo(
    () => categorizedLeads[selectedCategory],
    [updateLeadPending],
  );
  const lead = useMemo(
    () => leadList.at(selectedLeadIndex),
    [updateLeadPending],
  );

  const handleDateChange = (data: any) => {
    setDate(moment(data));
    setShowPicker(false);
  };

  const _onSubmit = () => {
    if (selectedIndex && note) {
      let params: any = {
        assignedTo: user?._id,
        callStatus: selectedIndex,
        leadId: lead?._id,
        remark: note,
      };
      mutate(params);
    } else {
      showErrorToast('All Fields are mendatory');
    }
  };
  const colors = useTailwindColors();
  return (
    <Box className="rounded-lg bg-white p-5">
      <Box className="flex-row items-center justify-between">
        <Text className="font-semibold text-xl text-main">Add Call Log</Text>
        <TouchableOpacity onPress={toggleVisible}>
          <X color={'red'} />
        </TouchableOpacity>
      </Box>
      <TextInput
        style={{
          width: '100%',
          height: 100,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          textAlignVertical: 'top',
          marginBottom: 20,
          marginTop: 20,
          color: 'black',
        }}
        multiline
        placeholder="Enter remark"
        value={note}
        onChangeText={setNote}
      />
      <SelectDropdown
        data={['ANSWERED', 'INVALID_NUMBER', 'NO_ANSWER', 'BUSY']}
        onSelect={(selectedItem, index) => {
          setSelectedIndex(selectedItem);
        }}
        renderButton={() => {
          return (
            <Box className="mb-3 ml-3 flex-row items-center justify-between rounded-lg rounded-md border-[1px] border-border2 bg-white px-4 py-2">
              <Text className="text-md px-3 text-[#646464]">
                {selectedIndex ?? 'Select Call Status'}
              </Text>
              <ChevronDown size={20} color={'#646464'} />
            </Box>
          );
        }}
        renderItem={action => {
          return (
            <Box className="w-full border-b-[1px] border-border1 bg-white px-2 py-3">
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
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
      <TouchableOpacity
        onPress={_onSubmit}
        className="items-center rounded-lg bg-main px-4 py-2">
        <Text className="font-semibold text-lg text-white">Add Call Log</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        onConfirm={handleDateChange}
        onCancel={() => setShowPicker(false)}
      />
    </Box>
  );
};
