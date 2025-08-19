import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Icon} from '~/components/navigation/TabBarIcon';
import {useRouter} from 'expo-router';
import {showErrorToast} from '~/lib/Toast';
import {useSessionContext} from '~/providers/session/ctx';
import {Platform} from 'react-native';
import {useLogin} from '~/services/auth.service';

export default function OnboardingScreen() {
  const {isLoggedIn, loginComplete} = useSessionContext();
  const windowWidth = Dimensions.get('window').width;
  const [index, setIndex] = useState(0);
  const [username, setUsername] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const sliderRef = useRef(null);
  const router = useRouter();

  const onboardingData: any = [
    {
      image: 'intro1',
      id: 1,
    },
    {
      image: 'intro2',
      id: 2,
    },
  ];

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
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {mutate, isPending} = useLogin({
    onSuccess: (data: any) => {
      if (data?.error) {
        showErrorToast(data?.message);
      } else {
        loginComplete(data);
      }
    },
    onError: (e: any) => {
      showErrorToast(e.message);
    },
  });

  const renderItem = ({item, dataIndex}: any) => {
    return (
      <Box key={dataIndex} className="h-full">
        <Icon
          icon={item?.image}
          style={{
            width: windowWidth,
            height: '85%',
          }}
          imgMode="contain"
        />
        {!keyboardHeight ? (
          <Box className="mx-3">
            <Text className="w-[90%] text-2xl font-extrabold">
              {item?.title ?? 'Welcome'}
            </Text>
            <Text className="mt-2 font-normal text-lg">
              {item?.description ?? 'IVY Studio'}
            </Text>
          </Box>
        ) : null}
      </Box>
    );
  };

  function handleOnOtp() {
    if (!username || !password) {
      showErrorToast('username password is mendatory');
      return;
    }
    let payload: any = {username, password};
    mutate(payload);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          bottom: 0,
          width: '100%',
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'row',
        }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset as needed
      >
        <Box className="flex-1">
          <Box className="flex-1">
            <Box className="flex-1">
              <Carousel
                data={onboardingData}
                renderItem={renderItem}
                sliderWidth={windowWidth}
                itemWidth={windowWidth}
                ref={sliderRef}
                onSnapToItem={index => {
                  setIndex(index);
                }}
                vertical={false}
                autoplay={true}
                autoplayDelay={1500}
                autoplayInterval={4500}
              />
              {!keyboardHeight ? (
                <Pagination
                  dotsLength={onboardingData.length}
                  activeDotIndex={index}
                  carouselRef={sliderRef}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  tappableDots={true}
                  containerStyle={{
                    paddingVertical: 0,
                    marginTop: 5,
                    height: 20,
                  }}
                />
              ) : null}
            </Box>
            <Box className="mx-3 mb-10 bg-white p-2">
              <>
                <Text className="font-medium text-xl">Let's get started</Text>
                <Text className="text-md mt-3 font-normal">Username</Text>
                <Box className="mt-1 flex-row items-center justify-between rounded-md border-[1px] border-border2 bg-white px-4 py-2">
                  <TextInput
                    value={username}
                    onChangeText={setUsername}
                    className="w-[90%] py-1 font-normal"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholder="Enter Username... "
                    placeholderTextColor={'#646464'}
                    style={{fontFamily: 'Poppins', fontSize: 16}}
                  />
                  <Icon
                    icon="phone"
                    size={20}
                    imgMode="contain"
                    color="#4E5058"
                  />
                </Box>
                <Text className="text-md mt-3 font-normal">Password</Text>
                <Box className="mt-1 flex-row items-center justify-between rounded-md border-[1px] border-border2 bg-white px-4 py-2">
                  <TextInput
                    value={password}
                    secureTextEntry={true}
                    onChangeText={v => setpassword(v)}
                    className="w-[90%] py-1 font-normal"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={10}
                    placeholder="Enter Password... "
                    placeholderTextColor={'#646464'}
                    style={{fontFamily: 'Poppins', fontSize: 16}}
                  />
                </Box>
                <TouchableOpacity
                  className="mt-4 flex-row items-center justify-center rounded-xl py-3 bg-main"
                  onPress={handleOnOtp}>
                  {isPending ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <>
                      <Text className="mr-4 font-semibold text-lg text-white">
                        Login
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </>
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
