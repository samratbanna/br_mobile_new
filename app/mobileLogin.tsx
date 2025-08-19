import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {Icon, iconRegistry} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {RequestMobileNoSchema} from '~/constants/RequestMobileNoSchema';
import {useRouter} from 'expo-router';
import {useGetOtp} from '~/services';
import {showErrorToast} from '~/lib/Toast';
import Constants from 'expo-constants';
interface ManifestExtra {
  appLogo: string;
}

export default function MobileLogin() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RequestMobileNoSchema),
    mode: 'all',
  });

  const {appLogo} = (Constants.expoConfig?.extra ?? {}) as ManifestExtra;

  const {mutate, isPending} = useGetOtp({
    onSuccess: (data: any) => {
      if (data?.error) {
        showErrorToast(data?.msg);
      } else {
        router.push({
          pathname: '/otpScreen',
          params: {number: data?.contact, token: data?.token},
        });
      }
    },
    onError: () => {
      showErrorToast('FAILED TO SEND OTP');
    },
  });

  const getOtp = (data: any) => {
    let payload: any = {contact: data?.mobileNo};
    mutate(payload);
  };

  return (
    <ImageBackground
      className="flex-1 px-4 pt-32"
      source={iconRegistry.bgImg}
      resizeMode="cover">
      <Image
        className="mb-10"
        source={
          appLogo ? {uri: appLogo} : require('../assets/images/sl-splash.png')
        }
        style={{height: 130, width: '100%'}}
        resizeMode="stretch"
      />
      <Text className="font-cBold text-2xl">
        Enter Your mobile number to get OTP
      </Text>
      <Box className="mt-5 flex-row items-center justify-between rounded-md border-[1px] border-border1 bg-white p-3">
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              className="w-[90%] font-normal"
              maxLength={10}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              placeholder="Enter your mobile number"
              placeholderTextColor={'#666476'}
              style={{fontFamily: 'PoppinsMedium'}}
            />
          )}
          name="mobileNo"
        />
        <Icon icon="phone" size={20} imgMode="contain" color="#666476" />
      </Box>
      {errors?.mobileNo?.message && (
        <Text className="p-4 text-sm font-medium color-red">
          {errors?.mobileNo?.message}
        </Text>
      )}
      <TouchableOpacity
        className="mt-10 items-center justify-between"
        onPress={() => router.navigate('/login')}>
        <Text className="text-[14px] font-medium text-blue">
          or Login with username
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute bottom-2 left-4 h-12 w-full items-center justify-center rounded-full bg-blue"
        onPress={handleSubmit(getOtp)}>
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-lg font-semibold text-white">Get OTP</Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
}
