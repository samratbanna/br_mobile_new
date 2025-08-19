import {MoveRight, X} from 'lucide-react-native';
import React from 'react';
import {ActivityIndicator, Modal, TouchableOpacity} from 'react-native';
import {Icon} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';

const CustomModal = ({
  visible,
  onClose,
  title,
  desc,
  icon,
  btnTxt,
  btnTxt1,
  btnTxt2,
  title2,
  onSubmit,
  isLoading,
  closeable
}: any) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <Box
        className="flex-1 items-center justify-center bg-[#ffffff1a]"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
        <Box
          className={`${icon === 'doubleCheck' ? 'w-96' : 'w-80'} items-center rounded-lg border-[0.5px] border-gray-300 bg-white p-4`}>
          <Text className="mb-4 font-cBold text-lg">{title}</Text>
          {icon === 'doubleCheck' ? (
            <Box className="h-[98px] w-[98px] items-center justify-center rounded-full bg-present">
              <Icon icon={icon} size={48} imgMode="contain" />
            </Box>
          ) : (
            <Box className="h-[60px] w-[60px] items-center justify-center rounded-full bg-[#FFF2F2]">
              <Icon icon={icon} size={32} imgMode="contain" />
            </Box>
          )}
          {title2 && (
            <Text className="px-12 pt-7 text-center font-medium text-lg">
              {title2}
            </Text>
          )}
          <Box>
            <Box className="items-center p-6">
              <Text className="text-center text-sm">{desc}</Text>
            </Box>
          </Box>
          {btnTxt && (
            <TouchableOpacity
              className="mt-4 w-full flex-row items-center justify-center rounded-full bg-reddish p-2"
              onPress={onSubmit}>
              <Text className="mr-2 text-center text-white">{btnTxt}</Text>
              <MoveRight size={12} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          {btnTxt1 && (
            <TouchableOpacity
              className="mt-3 w-full items-center justify-center rounded-full bg-blue p-2"
              onPress={onSubmit}>
              {isLoading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text className="text-center font-medium text-lg color-white">
                  {btnTxt1}
                </Text>
              )}
            </TouchableOpacity>
          )}
          {btnTxt2 && (
            <TouchableOpacity
              className="mt-3 w-full items-center justify-center rounded-full bg-[#E9F4FF] p-2"
              onPress={onClose}>
              <Text className="text-center font-medium text-lg color-blue">
                {btnTxt2}
              </Text>
            </TouchableOpacity>
          )}
          {closeable && (
            <TouchableOpacity
              className="absolute top-3 right-5 items-center justify-center rounded-full bg-[#E9F4FF] p-2"
              onPress={onClose}>
              <X/>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
