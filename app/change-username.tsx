import React from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, TouchableOpacity} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {RequestUsernameSchema} from '~/constants/RequestUnameSchema';
import Header from './(app)/(drawer)/screens/header';
import {useLocalSearchParams, useRouter} from 'expo-router';
import { useGetOtpForForgetPassword } from '~/services';
import { showErrorToast, showSuccessToast } from '~/lib/Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserRound } from 'lucide-react-native';

export default function ChangeUsername() {
  const params = useLocalSearchParams();
  const router= useRouter()
  const insets = useSafeAreaInsets()

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
    getValues,
  } = useForm({
    resolver: yupResolver(RequestUsernameSchema),
    defaultValues: {
      username: '',
    },
    mode: 'all',
  });

  const {mutate: getOtp, isPending: Loading} = useGetOtpForForgetPassword({
    onSuccess: (data: any) => {
      if (data?.error) {
        showErrorToast(data.msg);
        return;
      }
      showSuccessToast('OTP SENT');
      router.push({
        pathname: '/change-password',
        params: {type: 'forget', token: data?.token},
      });
    },
    onError: error => {
      showErrorToast('FAILED TO SEND OTP');
    },
  });

  function handleForgetPassword() {
    let username = getValues('username');
    if (!username) {
      showErrorToast('Enter a valid Username to Change Password');
      return;
    }
    let payload: any = {username};
    getOtp(payload);
  }

  return (
    <Box className="flex-1 bg-background" style={{marginTop: insets.top}}>
      <Header
        title={params?.type === 'password' ? 'Change Password' : 'New Username'}
      />
      <Box className="mt-7 px-4">
        <Text className="font-cBold text-2xl">
          Enter Your Username to Change Password
        </Text>
        <Text className="text-md mb-2 mt-4 font-medium">New Username</Text>
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
                placeholder="Write your Username"
                placeholderClassName={'font-placeholder'}
                style={{fontFamily: 'PoppinsMedium'}}
              />
            )}
            name="username"
          />
          <Box>
            <UserRound size={20} />
          </Box>
        </Box>
      </Box>
      {errors?.username?.message && (
        <Text className="p-4 font-medium text-sm color-red">
          {errors?.username?.message}
        </Text>
      )}
      <TouchableOpacity
        className={`absolute bottom-4 ${!isValid && 'opacity-50'} left-4 h-14 w-[92%] items-center justify-center rounded-full bg-blue p-2`}
        onPress={handleForgetPassword}
        disabled={!isValid}>
        <Text className="font-semibold text-lg color-white">
          {params?.type === 'password' ? 'Forget Password' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
    </Box>
  );
}
