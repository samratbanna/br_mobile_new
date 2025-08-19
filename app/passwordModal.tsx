import React from 'react';
import {Modal} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import PasswordDetails from './passwordDetails';

const PasswordModal = ({visible , onClose}: any) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Box
        className="flex-1 items-center justify-center bg-[#ffffff1a]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
        <Box className="w-[92%] items-center rounded-lg border-[0.5px] border-gray-300 bg-white p-4">
          <Text className= " mb-4 text-center text-xl font-cBold capitalize border-b-[1px] pb-3 border-b-border3">
            To continue using the app, please change your default password !
          </Text>
          <PasswordDetails modal={true} onClose = {onClose}/>
        </Box>
      </Box>
    </Modal>
  );
};
export default PasswordModal;
