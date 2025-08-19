import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Text} from '~/components/ui/text';
import {useSessionContext} from '~/providers/session/ctx';
import {useLogin} from '~/services/auth.service';
import {useForm, Controller} from 'react-hook-form';
import {showErrorToast, showSuccessToast} from '~/lib/Toast';
import {iconRegistry} from '~/components/navigation/TabBarIcon';
import {yupResolver} from '@hookform/resolvers/yup';
import {RequestLoginSchema} from '~/constants/RequestLoginSchema';
import {Input, SecureInput} from '~/components/ui/input';
import {getSecureValue} from '~/services/secure-store.service';
import {SafeAreaView} from 'react-native-safe-area-context';
import Constants from 'expo-constants';
interface ManifestExtra {
  appLogo: string;
}

export default function LoginScreen() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const {isLoggedIn, loginComplete} = useSessionContext();
  const params = useLocalSearchParams();

  const {appLogo} = (Constants.expoConfig?.extra ?? {}) as ManifestExtra;

  const scrollViewRef = useRef(null);
  const router = useRouter();

  const {mutate, isPending} = useLogin({
    onSuccess: (data: any, variables: any) => {
      if (data?.error) {
        showErrorToast(data?.msg);
      } else {
        loginComplete({...data, ...variables});
        showSuccessToast('Login Successfully');
      }
    },
    onError: (e: any) => {
      showErrorToast(e);
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.navigate('/loading');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardHeight(40);
        // @ts-ignore
        scrollViewRef.current.scrollToEnd({animated: true});
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        // @ts-ignore
        scrollViewRef.current.scrollToEnd({animated: true});
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const loadStoredUsername = async () => {
      try {
        const storedUsername = (await getSecureValue('username')) || '';
        const storedPassword = (await getSecureValue('password')) || '';
        if (storedUsername) {
          setValue('username', storedUsername);
          setValue('password', storedPassword);
        }
      } catch (error) {
        console.error('Error retrieving stored username:', error);
      }
    };

    loadStoredUsername();
  }, []);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RequestLoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'all',
  });

  const _login = () => {
    mutate({
      username: getValues('username'),
      password: getValues('password'),
    } as any);
  };

  function handleForgetPassword() {
    router.push({pathname: '/change-username', params: {type: 'password'}});
  }

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        className="flex-1 px-4"
        source={iconRegistry.bgImg}
        resizeMode="cover">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{width: '100%'}}
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          // @ts-ignore
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
          contentContainerStyle={{paddingBottom: keyboardHeight}}>
          <Image
            className="my-10"
            source={
              appLogo
                ? {uri: appLogo}
                : require('../assets/images/sl-splash.png')
            }
            style={{height: 130, width: '100%'}}
            resizeMode="stretch"
          />
          <Text className="mb-2 font-medium text-lg">Username</Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                className="w-[90%] py-1"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Enter Username"
                placeholderTextColor={'#8f8f8f'}
                icon={'drawerUserIcon'}
              />
            )}
            name="username"
          />
          {errors?.username ? (
            <Text className="ml-4 mt-1 text-red">Enter a valid username</Text>
          ) : null}
          <Text className="mb-1 mt-4 font-medium text-lg">Password</Text>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <SecureInput
                value={value}
                onChangeText={onChange}
                className="w-[90%] py-1"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholder="Enter Password"
              />
            )}
            name="password"
          />

          {errors?.password ? (
            <Text className="ml-4 mt-1 text-red">Enter a valid password</Text>
          ) : null}

          <TouchableOpacity
            className="bg-[##2E3343] flex-row items-center justify-center rounded-full"
            disabled={isPending}
            onPress={handleSubmit(_login)}>
            <View className="flex">
              {isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="font-semibold text-lg text-white">Login</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="mt-10 items-center justify-center"
            onPress={handleForgetPassword}>
            <Text className="font-medium text-lg text-blue">
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
