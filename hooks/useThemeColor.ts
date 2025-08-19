/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';
import { NAV_THEME } from '~/lib/constants';


export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof NAV_THEME.light & keyof typeof NAV_THEME.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return NAV_THEME[theme][colorName];
  }
}
