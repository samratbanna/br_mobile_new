import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';

import { NAV_THEME } from '~/lib/constants';
import { Text } from './ui/text';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          // color={theme === 'light' ? NAV_THEME.light.icon : NAV_THEME.dark.icon}
        />
        <Text >{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
