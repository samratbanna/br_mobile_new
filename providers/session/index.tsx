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
import { showErrorToast, isOrgInactiveError } from '~/lib/Toast';
import { useLogin } from '~/services/auth.service';
import { fetchMyOrganization } from '~/services/organization.service';
import { Task } from '~/interfaces/task.interface';
import { Lead } from '~/interfaces/lead.interface';

export const SessionProvider = ({children}: {children?: React.ReactNode}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [task, setTask] = useState<Task>();
  const [lead, setLead] = useState<Lead>();
  const [onlyMyLead, setOnlyMyLead] = useState(false);
  const [organization, setOrganization] = useState<any>(null);

  const logout = useCallback(() => {
    removeSecureValue('access');
    removeSecureValue('refresh');
    removeAuthorizationHeader();
    setUser(null);
    setIsLoggedIn(false);
    setOrganization(null);
  }, []);

  const setReady = useCallback(() => {
    setIsAppReady(true);
  }, []);

  // Org info is supplementary, not auth-critical — never block login on it.
  const loadOrganization = useCallback(async () => {
    try {
      const org = await fetchMyOrganization();
      setOrganization(org);
    } catch (e) {
      console.log('Failed to load organization', e);
    }
  }, []);

  const loginComplete = useCallback((data: any) => {
    const accessToken = data?.token;
    const refreshToken = data?.refreshToken;
    setUser(data?.staff);
    saveSecureValue('access', accessToken);
    saveSecureValue('refresh', refreshToken);
    setAuthorizationHeader(accessToken);
    setIsLoggedIn(true);
    loadOrganization();
  }, [loadOrganization]);

  const isOrgAdmin = !!user?.isOrgAdmin;

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
      onlyMyLead,
      setOnlyMyLead,
      organization,
      isOrgAdmin,
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
      onlyMyLead,
      setOnlyMyLead,
      organization,
      isOrgAdmin,
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
      // If the org was suspended after this session's last login, the
      // silent refresh-token login fails with "Organization is inactive" —
      // don't leave the user stuck in a dead logged-in-but-broken state.
      if (isOrgInactiveError(e?.message)) {
        logout();
      }
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
