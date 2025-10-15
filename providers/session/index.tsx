import {useCallback, useEffect, useMemo, useState} from 'react';
import {SessionContext} from './ctx';
import {
  getSecureValue,
  removeSecureValue,
  saveSecureValue,
} from '~/services/secure-store.service';
import {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '~/services/api';
import { showErrorToast } from '~/lib/Toast';
import { useLogin } from '~/services/auth.service';
import { Task } from '~/interfaces/task.interface';
import { Lead } from '~/interfaces/lead.interface';

export const SessionProvider = ({children}: {children?: React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [task, setTask] = useState<Task>();
  const [lead, setLead] = useState<Lead>();

  const logout = useCallback(() => {
    removeSecureValue('access');
    removeSecureValue('refresh');
    removeAuthorizationHeader();
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const setReady = useCallback(() => {
    setIsAppReady(true);
  }, []);

  const loginComplete = useCallback((data: any) => {
    const accessToken = data?.token;
    const refreshToken = data?.refreshToken;
    setUser(data?.staff);
    saveSecureValue('access', accessToken);
    saveSecureValue('refresh', refreshToken);
    setAuthorizationHeader(accessToken);
    setIsLoggedIn(true);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isAppReady,
      loginComplete,
      logout,
      setReady,
      user,
      setUser,
      task,
      setTask,
      lead,
      setLead,
    }),
    [
      isLoggedIn,
      loginComplete,
      logout,
      setReady,
      isAppReady,
      user,
      setUser,
      task,
      setTask,
      lead,
      setLead,
    ],
  );

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

  useEffect(() => {
    const fetchData = async () => {
      const access = await getSecureValue('access');
      const refresh = await getSecureValue('refresh');

      if (access) {
        mutate({rtoken: refresh});
      }
    };

    fetchData();
  }, []);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
