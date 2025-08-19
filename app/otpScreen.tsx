import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {iconRegistry} from '~/components/navigation/TabBarIcon';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {useLocalSearchParams, useRouter} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import OTPTextInput from 'react-native-otp-textinput';
import {useGetOtp, useVerifyOtp} from '~/services';
import {showErrorToast, showSuccessToast} from '~/lib/Toast';
import {useSessionContext} from '~/providers/session/ctx';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CircleHelp} from 'lucide-react-native';

export default function OtpScreen() {
  const [otp, setOtp] = useState<string>('');
  const route: any = useLocalSearchParams();
  const [token, setToken] = useState<string>(route?.token);
  const [enableBtn, setEnableButton] = useState(false);
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(90);
  const {loginComplete} = useSessionContext();
  const inputRef = useRef<OTPTextInput>(null);
  const router: any = useRouter();
  const timerRef = useRef(null);
  let resendOtpTimerInterval: any;

  const {mutate, isPending} = useGetOtp({
    onSuccess: (data: any) => {
      setToken(data?.token);
      showSuccessToast('OTP SENT');
    },
    onError: () => {
      showErrorToast('FAILED TO SEND OTP');
    },
  });

  const {mutate: verify, isPending: verifyLoading} = useVerifyOtp({
    onSuccess: data => {
      loginComplete(data);
      showSuccessToast('Verified');
      router.navigate('/loading');
    },
    onError: e => {
      showErrorToast('Verification failed');
    },
  });

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inputRef.current]);

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, []);

  useEffect(() => {
    startResendOtpTimer();
    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const handleVerify = () => {
    let payload: any = {
      otp_token: token,
      otp: otp,
    };
    verify(payload);
  };

  const setupOtp = (val: string) => {
    setOtp(val);
    if (val?.length === 6) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  function handleResend() {
    let payload: any = {contact: route?.number};
    mutate(payload);
  }
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      className="flex-1"
      style={{marginTop: insets.top}}
      source={iconRegistry.bgImg}
      resizeMode="cover">
      <Box className="h-15 flex-row items-center justify-between border-b-[0.5px] border-b-border3 bg-white p-4">
        <Box className="flex-row items-center">
          <TouchableOpacity
            className="h-[40px] w-[40px] items-start justify-center"
            onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text className="ml-3 text-lg font-normal">
            {route?.id === 'password' ? 'Reset Password' : 'Phone Verification'}
          </Text>
        </Box>
        <TouchableOpacity className="flex-row items-center rounded-full border-[0.5px] border-header px-2"
        onPress={()=>router.navigate('/support')}>
          <CircleHelp size={12} />
          <Text className="ml-1 text-sm font-normal">Need Help?</Text>
        </TouchableOpacity>
      </Box>
      <Box className="mt-5 px-4">
        <Text className="font-cBold text-3xl">
          Enter the 6 digit pin to verify
        </Text>
        <OTPTextInput
          handleTextChange={val => setupOtp(val)}
          inputCount={6}
          keyboardType="numeric"
          containerStyle={{marginTop: 20}}
          tintColor="#0081F8"
          offTintColor="#EBE7FF"
          ref={inputRef}
          textInputStyle={{
            borderWidth: 1,
            borderRadius: 10,
            height: 52,
            width: 44,
          }}
          autoFocus={true}
        />
        {resendButtonDisabledTime > 0 ? (
          <Box className="mt-5 flex-row items-center">
            <Text className="text-lg font-normal text-lightGrey">
              Didn't receive it? Retry in{' '}
            </Text>
            <Text className="text-lg font-normal text-blue">{`${Math.floor(
              resendButtonDisabledTime / 60,
            )
              .toString()
              .padStart(2, '0')}:${(resendButtonDisabledTime % 60)
              .toString()
              .padStart(2, '0')}`}</Text>
          </Box>
        ) : (
          <TouchableOpacity
            className="mt-5 items-center"
            onPress={handleResend}>
            {isPending ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-lg font-medium text-blue">Resent OTP</Text>
            )}
          </TouchableOpacity>
        )}
      </Box>
      <TouchableOpacity
        className={`absolute bottom-2 left-4 h-[54px] w-[93%] items-center justify-center rounded-full bg-blue ${!enableBtn && 'opacity-50'}`}
        onPress={handleVerify}
        disabled={!enableBtn}>
        {verifyLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className="text-xl font-semibold text-white">Verify Now</Text>
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
}
