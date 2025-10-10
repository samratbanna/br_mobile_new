import * as React from 'react';
import { ComponentType } from 'react';
import {
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { Box } from '../ui/box';
import { Text } from '../ui/text';

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: string;

  /**
   * An optional tint color for the icon
   */
  color?: string;

  /**
   * initials in case of you want to show the name initials
   */
  initials?: string;

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number;

  imgMode?: ImageResizeMode;

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps['onPress'];
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    imgMode,
    initials,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View;
  // const imageUrlCheck = icon?.includes("https") || icon?.includes("http");
  const imageUrlCheck =
    typeof icon === 'string' &&
    (icon.includes('https') || icon.includes('http'));

  return (
    <Wrapper
      accessibilityRole={isPressable ? 'imagebutton' : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}>
      {initials ?
        <Box className='bg-blue items-center rounded-full justify-center' style={{ width: size ?? 50, height: size ?? 50 }}>
          <Text className='text-white font-semibold text-xl'>{initials}</Text>
        </Box> : <Image
          style={[
            $imageStyle,
            color && { tintColor: color },
            size && { width: size, height: size },
            $imageStyleOverride,
          ]}
          // source={iconRegistry[icon]}
          source={imageUrlCheck ? { uri: icon } : iconRegistry[icon]}
          resizeMode={imgMode}
        />}
    </Wrapper>
  );
}

export const iconRegistry: any = {
  // Bottom Icon
  bottomHomeIcon: require('../../assets/images/bottomIcon/home.png'),
  bottomActiveHomeIcon: require('../../assets/images/bottomIcon/active-home.png'),
  bottomUpdateIcon: require('../../assets/images/bottomIcon/update.png'),
  bottomActiveUpdateIcon: require('../../assets/images/bottomIcon/active-update.png'),
  bottomSchoolIcon: require('../../assets/images/bottomIcon/school.png'),
  bottomActiveSchoolIcon: require('../../assets/images/bottomIcon/active-school.png'),
  reservedBooks: require('../../assets/images/bottomIcon/reservedBooks.png'),
  myBooks: require('../../assets/images/bottomIcon/myBooks.png'),

  // Drawer Icon
  drawerBlogIcon: require('../../assets/images/drawerIcon/blog.png'),
  drawerInfoIcon: require('../../assets/images/drawerIcon/info.png'),
  drawerPrivacyIcon: require('../../assets/images/drawerIcon/privacy.png'),

  // social media
  fb: require('../../assets/images/socialMedia/fb.png'),
  youtube: require('../../assets/images/socialMedia/youtube.png'),
  insta: require('../../assets/images/socialMedia/insta.png'),
  linkdln: require('../../assets/images/socialMedia/linkdln.png'),
  twitter: require('../../assets/images/socialMedia/twitter.png'),

  bgImg: require('../../assets/images/bgImg.png'),

  // menu icon
  timetable: require('../../assets/images/menuIcon/calendarDots.png'),
  exam: require('../../assets/images/menuIcon/exam.png'),
  homework: require('../../assets/images/menuIcon/homework.png'),
  syllabus: require('../../assets/images/menuIcon/syllabus.png'),
  leaveApplication: require('../../assets/images/menuIcon/leaveApplication.png'),
  complaints: require('../../assets/images/menuIcon/complaints.png'),
  events: require('../../assets/images/menuIcon/events.png'),
  transport: require('../../assets/images/menuIcon/transport.png'),
  library: require('../../assets/images/menuIcon/library.png'),
  reportCard: require('../../assets/images/menuIcon/reportCard.png'),

  // intro images
  intro1: require('../../assets/images/intro1.jpg'),
  intro2: require('../../assets/images/intro2.jpg'),
  noData: require('../../assets/images/noData.png'),
  logo: require('../../assets/images/sl-icon.png'),
  whatsapp: require('../../assets/images/whatsapp.png'),
  call: require('../../assets/images/call.png'),
};

const $imageStyle: ImageStyle = {
  resizeMode: 'contain',
};
