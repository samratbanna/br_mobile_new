import React from 'react';
import {Box} from '~/components/ui/box';
import {Text} from '~/components/ui/text';
import {useSessionContext} from '~/providers/session/ctx';
import {useRouter} from 'expo-router';
import {Alert, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from '~/components/navigation/TabBarIcon';
import {ChevronRight, LogOut} from 'lucide-react-native';
import {Image} from 'expo-image';
import {getTwoCharInitials} from '~/lib/constants';
import useTailwindColors from '~/hooks/useThemeColorTailwind';
import {Title} from '~/components/title';
import {Card} from '~/components/card';
import {getPdf, getRewards} from '~/services';
import {map, size} from 'lodash';

export default function UpdatesScreen() {
  const {setIsLoggedIn} = useSessionContext();
  const _logout = () => {
    setIsLoggedIn(false);
  };

  const router = useRouter();

  return <Profile />;
}

export const Profile = () => {
  const {user} = useSessionContext();
  return (
    <Box className={'flex-1 p-5'}>
      <ScrollView>
        <AvatarImage />
        <PersonalInfo />
        <MyAttendance />
        {/* <Others /> */}
        <Files />
        <Rewards />
        <Credentials />
      </ScrollView>
    </Box>
  );
};

const Files = () => {
  const {data, isLoading} = getPdf({});
  const router = useRouter();
  return data && size(data) > 0 ? (
    <Box className="mt-3">
      <Title title="Files" />
      <Card customStyle="py-0">
        {map(data, d => (
          <CardTab
            bgColor="lecturesBg"
            icon="class"
            title={d?.title}
            value={'View File'}
            onPress={() =>
              router.push({
                pathname: '/(app)/(drawer)/screens/documentViewer',
                params: {uri: d?.image},
              })
            }
          />
        ))}
      </Card>
    </Box>
  ) : null;
};

const Rewards = () => {
  const {data, isLoading} = getRewards({});
  const router = useRouter();
  return data && size(data) > 0 ? (
    <Box className="mt-3">
      <Title title="Rewards" />
      <Card customStyle="py-0">
        {map(data, d => (
          <CardTab
            bgColor="lecturesBg"
            icon="class"
            title={d?.title}
            value={'View'}
            onPress={() =>
              router.push({
                pathname: '/(app)/(drawer)/screens/documentViewer',
                params: {uri: d?.image},
              })
            }
          />
        ))}
      </Card>
    </Box>
  ) : null;
};

const MyAttendance = () => {
  const {user} = useSessionContext();
  console.log('user', user);

  return (
    <Box>
      <Title title="Personal Info" />
      <Card customStyle="py-0">
        <CardTab
          bgColor="lecturesBg"
          icon="class"
          title={'Contact'}
          value={user?.contact}
          onPress={() => console.log('klajfskdl')}
        />
        <Box className="h-[1px] bg-border1" />
        {user?.email ? (
          <CardTab
            bgColor="lecturesBg"
            icon="class"
            title={'Email'}
            value={user?.email}
            onPress={() => console.log('klajfskdl')}
          />
        ) : null}
        <Box className="h-[1px] bg-border1" />
        <CardTab
          bgColor="visitorsBg"
          icon="class"
          title={'Role'}
          value={user?.role?.name}
          onPress={() => console.log('klajfskdl')}
        />
      </Card>
    </Box>
  );
};

const Others = () => {
  const {user} = useSessionContext();
  console.log('user', user);

  return (
    <Box className='mt-5'>
      <Title title="Other" />
      <Card customStyle="py-0">
        <CardTab
          bgColor="lecturesBg"
          icon="class"
          title={'PDF Page'}
          onPress={() => console.log('klajfskdl')}
        />
        <Box className="h-[0.5px] bg-border1" />
        
        {/* <CardTab
          bgColor="visitorsBg"
          icon="class"
          title={'Rewards'}
          // value={user?.role?.name}
          onPress={() => console.log('klajfskdl')}
        /> */}
      </Card>
    </Box>
  );
};

const Credentials = () => {
  const router = useRouter();
  const {logout} = useSessionContext();
  const colors = useTailwindColors();

  const _onLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Logout', onPress: () => logout()},
    ]);
  };
  return (
    <Box className="mt-5">
      <Title title="Credentials" />
      <Card customStyle="py-0">
        <TouchableOpacity
          onPress={_onLogout}
          className="my-4 flex-row items-center">
          <Box className="items-center justify-center rounded-full border-[0.5px] border-border2 p-2">
            <Icon icon={'visitorsBg'} size={36} imgMode="stretch" />
            <LogOut style={{position: 'absolute'}} color={colors?.red} />
          </Box>
          <Box className="flex-1">
            <Text className="ml-3 font-medium text-lg text-reddish">
              {'Logout'}
            </Text>
          </Box>
          <ChevronRight strokeWidth={0.75} color={colors?.red} />
        </TouchableOpacity>
      </Card>
    </Box>
  );
};
const PersonalInfo = () => {
  const {user} = useSessionContext();

  return (
    <Box className={'items-center p-5'}>
      <Text className="font-medium text-xl">{user?.name}</Text>
      <Text className="text-md text-graniteGray">{user?.contact}</Text>
    </Box>
  );
};

const AvatarImage = () => {
  const {user} = useSessionContext();
  const colors = useTailwindColors();
  return (
    <Box className="items-center">
      {user?.avatar?.image ? (
        <Image
          style={{
            height: 150,
            width: 150,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: colors?.border2,
          }}
          source={{uri: user?.avatar?.image}}
          contentFit={'contain'}
        />
      ) : (
        <Box
          className="items-center justify-center rounded-full bg-blue"
          style={{width: 100, height: 100}}>
          <Text className="font-semibold text-[30px] text-white">
            {getTwoCharInitials(user?.name)}
          </Text>
        </Box>
      )}
    </Box>
  );
};

interface param {
  bgColor: string;
  icon: string;
  title: string;
  value?: string;
  onPress: () => void;
}
export const CardTab = ({bgColor, icon, title, onPress, value}: param) => {
  return (
    <TouchableOpacity onPress={onPress} className="my-4 flex-row items-center">
      <Box className="flex-1">
        <Text className="ml-3 font-medium text-lg">{title}</Text>
      </Box>
      {value ? (
        <Text className="font-medium text-graniteGray">{value}</Text>
      ) : (
        <ChevronRight strokeWidth={0.75} color={'#616161'} />
      )}
    </TouchableOpacity>
  );
};
