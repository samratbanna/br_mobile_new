import React from 'react';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import useNetworkStatus from '~/hooks/useNetworkStatus';

import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const NetworkStatusBanner = (props : any) => {
  const { isConnected, justReconnected } = useNetworkStatus();
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (!isConnected || justReconnected  ) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected, justReconnected]);

  return (
    (!isConnected || justReconnected)  ? 
    <Animated.View
      style={[
        styles.banner,
        {top : insets.top + (props?.top ?? 0)},
        justReconnected  ? styles.connectedBanner : styles.disconnectedBanner,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.bannerText}>
        {justReconnected ? ' You’re back online!' : ' No internet connection'}
      </Text>
    </Animated.View> : null
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    left: 16,
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  connectedBanner: {
    backgroundColor: '#4caf50',
  },
  disconnectedBanner: {
    backgroundColor: '#f44336',
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default NetworkStatusBanner;

