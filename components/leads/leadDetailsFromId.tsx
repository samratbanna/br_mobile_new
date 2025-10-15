import React, {useMemo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Box} from '~/components/ui/box';
import {Text} from '../ui/text';
import SelectDropdown from 'react-native-select-dropdown';
import {LEAD_STATUS_LIST, LeadStatus} from '~/lib/constants';
import {
  ChevronDown,
} from 'lucide-react-native';
import {findIndex} from 'lodash';
import {TouchableOpacity} from 'react-native';
import {
  getFollowUps,
  updateLead,
  getAllCallLogList,
  getAllDemoList,
} from '~/services/lead.service';
import {showSuccessToast} from '~/lib/Toast';
import Modal from 'react-native-modal';
import {useLeadStore} from '~/store/lead.store';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {useSessionContext} from '~/providers/session/ctx';
import {Icon} from '../navigation/TabBarIcon';

import {Linking} from 'react-native';
import { AddCallLogModal, AddDemoModal, CallLogLists, DemoList, FollowUpList, LeadItemDetails, ModalContent } from './leadDetails';

export const LeadDetails = () => {
  const {
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
  const {lead, setLead} = useSessionContext();
  
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
      setLead(response)
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
