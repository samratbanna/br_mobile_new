import React, {useState} from 'react';
import {TouchableOpacity, TextInput} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RequestPasswordSchema} from '~/constants/RequestPasswordSchema';
import {useRouter} from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';

export default function PasswordDetails({modal, type, token, onClose}: any) {
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(RequestPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      otp: '',
    },
    mode: 'all',
  });

  const changePassword = (data: any) => {
    let payload: any = {
      otp: data?.otp,
      otp_token: token,
      new_password: data?.newPassword,
    };

    // verify(payload);
  };

  const defaultChangePassword = (data: any) => {
    let payload: any = {
      new_password: data?.newPassword,
    };
    // changeDefaultPass(payload);
  };

  return (
    <Box className={`${!modal && 'h-[94%]'}`}>
      {type == 'forget' ? (
        <Box className="mt-6">
          <Text className="mb-2 font-normal text-lg">Enter OTP</Text>
          <Box className="flex-row items-center justify-between rounded-md bg-white p-2">
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  className="w-[90%] font-normal"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder="Enter OTP"
                  placeholderTextColor={'#8F8F8F'}
                  maxLength={6}
                  style={{fontFamily: 'PoppinsMedium'}}
                />
              )}
              name="otp"
            />
          </Box>
        </Box>
      ) : null}
      <Box className={`${!modal && 'mt-6'} mt-4`}>
        <Text className="mb-2 font-normal text-lg">New Password</Text>
        <Box
          className={`flex-row items-center justify-between rounded-md bg-white p-2 ${modal && 'border-[0.5px] border-border1'}`}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                className="w-[90%] font-normal"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholder="New Password"
                secureTextEntry={showNewPassword}
                placeholderTextColor={'#8F8F8F'}
              />
            )}
            name="newPassword"
          />
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? (
              <EyeOff size={20} color="#646464" />
            ) : (
              <Eye size={20} color="#646464" />
            )}
          </TouchableOpacity>
        </Box>
      </Box>
      {errors?.newPassword?.message && (
        <Text className="p-4 font-medium text-sm color-red">
          {errors?.newPassword?.message}
        </Text>
      )}
      <Box className={`mt-6 ${modal && 'mt-4 px-[-2px]'}`}>
        <Text className="mb-2 font-normal text-lg">Confirm New Password</Text>
        <Box
          className={`flex-row items-center justify-between rounded-md bg-white p-2 ${modal && 'border-[0.5px] border-border1'}`}>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                className="w-[90%] font-normal"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={showConfirmPassword}
                keyboardType="default"
                placeholder="Confirm New Password"
                placeholderTextColor={'#8F8F8F'}
              />
            )}
            name="confirmPassword"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <EyeOff size={20} color="#646464" />
            ) : (
              <Eye size={20} color="#646464" />
            )}
          </TouchableOpacity>
        </Box>
      </Box>
      {errors?.confirmPassword?.message && (
        <Text className="p-4 font-medium text-sm color-red">
          {errors?.confirmPassword?.message}
        </Text>
      )}
      {modal ? (
        <TouchableOpacity
          className={`mt-8 ${!isValid && 'opacity-50'} items-center justify-center rounded-full bg-blue p-2`}
          onPress={handleSubmit(defaultChangePassword)}
          disabled={!isValid}>
          {/* {changing ? (
            <ActivityIndicator color="white" />
          ) : ( */}
            <Text className="font-semibold text-xl color-white">
              Change Password
            </Text>
          {/* )} */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="position: absolute bottom-10 left-3 h-[48px] w-[94%] items-center justify-center rounded-full bg-blue p-2"
          onPress={handleSubmit(changePassword)}>
          {/* {isPending ? (
            <ActivityIndicator color="white" />
          ) : ( */}
            <Text className="font-semibold text-lg color-white">
              Change Password
            </Text>
          {/* )} */}
        </TouchableOpacity>
      )}
    </Box>
  );
}
