import {useRouter} from 'expo-router';
import moment from 'moment';
import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { Text } from '~/components/ui/text';
import { useFirebase } from '~/firbase';
import {useSessionContext} from '~/providers/session/ctx';
import { getSecureValue, removeSecureValue } from '~/services/secure-store.service';

const LoadingScreen = () => {
  const {setReady,setSettings, setActiveStudent, setUser, setSchool, logout , loginComplete , setSessions , setStudents  , setActiveSession , activeSession} =
    useSessionContext();
  const router = useRouter();

  // const [fcmToken] : any =  useFirebase();
  useEffect(() => {
    setReady();
    router.navigate('/');
  },[])
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#024C9D" />
      <Text style={styles.loadingText}>
        Fetching school and user details...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#024C9D',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default LoadingScreen;
