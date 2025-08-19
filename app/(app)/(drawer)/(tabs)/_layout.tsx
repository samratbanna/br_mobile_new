import React from 'react';
import {Tabs, useRouter} from 'expo-router';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text, Pressable, TouchableOpacity} from 'react-native';
import {Box, HStack} from '~/components/ui/box';
import {NAV_THEME} from '~/lib/constants';
import {useColorScheme} from '~/lib/useColorScheme';
import {
  BellIcon,
  BookOpen,
  House,
  ListTodo,
  MenuIcon,
  Presentation,
  UserRound,
  YoutubeIcon,
} from 'lucide-react-native';
import {MainMenuBottomSheet} from '~/components/menu-dialog';
import {DrawerActions, useNavigation} from '@react-navigation/native';

function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <HStack className="w-full border-t-2 border-border bg-white dark:bg-gray-950">
      {state.routes.map((route, index) => {
        return (
          <Item
            key={index}
            route={route}
            state={state}
            index={index}
            descriptors={descriptors}
            navigation={navigation}
          />
        );
      })}
    </HStack>
  );
}

const Item = ({descriptors, navigation, route, state, index}: any) => {
  const {colorScheme} = useColorScheme();
  const {options} = descriptors[route.key];

  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  // console.log({route, index, options})

  const isFocused = state.index === index;
  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };
  return (
    <>
      <Pressable
        className={`flex-1 items-center justify-center py-3 pb-1 active:bg-active`}
        accessibilityRole="button"
        accessibilityState={isFocused ? {selected: true} : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        // style={({ pressed }) => {
        //   return { justifyContent: "center", alignItems: "center", padding: 10,
        //     backgroundColor: pressed ? "rgba(0,0,0,0.1)" :
        //     // undefined
        //     Colors[colorScheme ?? "light"]?.background

        //    }
        // }}
      >
        {options.tabBarIcon?.({
          size: 24,
          focused: isFocused,
          color: isFocused
            ? (options.tabBarActiveTintColor ?? 'white')
            : '#8a8a8a',
        })}
        <Text
          style={{
            color: isFocused ? options.tabBarActiveTintColor : '#8a8a8a',
            fontSize: 10,
            marginTop: 4,
          }}>
          {label as any}
        </Text>
      </Pressable>
    </>
  );
};

export default function TabLayout() {
  const router = useRouter();
  const {colorScheme} = useColorScheme();
  const navigation = useNavigation();

  return (
    <MainMenuBottomSheet>
      <Tabs
        tabBar={MyTabBar}
        screenOptions={{
          tabBarActiveTintColor: NAV_THEME[colorScheme ?? 'light'].primary,
          headerStyle: {
            backgroundColor: NAV_THEME[colorScheme ?? 'light'].header,
          },
          // Correctly add tabBarStyle as an object

          headerLeft: (props: {
            tintColor?: string;
            pressColor?: string;
            pressOpacity?: number;
            labelVisible?: boolean;
          }) => {
            const _openDrawer = () => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            };
            return (
              <Pressable onPress={_openDrawer} className="px-2">
                <MenuIcon color={props.tintColor} />
              </Pressable>
            );
          },
          headerTintColor: NAV_THEME[colorScheme ?? 'light'].headerTint,
          // headerShown: false,
          // tabBarActiveBackgroundColor:"red",
          // tabBarInactiveBackgroundColor:"white"
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerRight: (props: {
              tintColor?: string;
              pressColor?: string;
              pressOpacity?: number;
              labelVisible?: boolean;
            }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/screens/notification/notification',
                    })
                  }>
                  <Box className="z-10 ml-[12] mt-[-5] h-[10] w-[10] items-center justify-center rounded-full bg-pink">
                    <Text className="font-normal text-[10px] color-white">
                      {''}
                    </Text>
                  </Box>
                  <BellIcon
                    size={25}
                    color={'white'}
                    style={{marginRight: 16, marginTop: -5}}
                  />
                </TouchableOpacity>
              );
            },
            tabBarIcon: ({color, focused, size}) => (
              <House color={color} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="leads"
          options={{
            title: 'Leads',
            headerTitle: 'Leads',
            tabBarIcon: ({color, focused, size}) => (
              <BookOpen color={color} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="task"
          options={{
            title: 'Tasks',
            headerTitle: 'Tasks',
            tabBarIcon: ({color, focused, size}) => (
              <ListTodo color={color} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="meeting"
          options={{
            title: 'Meeting',
            headerTitle: 'Meeting',
            tabBarIcon: ({color, focused, size}) => (
              <Presentation color={color} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="videos"
          options={{
            title: 'Videos',
            headerTitle: 'Videos',
            tabBarIcon: ({color, focused, size}) => (
              <YoutubeIcon color={color} strokeWidth={1.5} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerTitle: 'Profile',
            tabBarIcon: ({color, focused, size}) => (
              <UserRound color={color} strokeWidth={1.5} />
            ),
          }}
        />
      </Tabs>
    </MainMenuBottomSheet>
  );
}
