import {MutationOptions, useMutation, useQuery} from '@tanstack/react-query';
import {apiClient, URIS} from './api';
import {showErrorToast, showSuccessToast} from '~/lib/Toast';
import {compact, values} from 'lodash';

// export const useGetSchool = (config: MutationOptions) => {
//   return useMutation({
//     mutationKey: [URIS.SCHOOL_DETAILS],
//     mutationFn: async (payload): Promise<any> => {
//       const res = await apiClient.get(URIS.SCHOOL_DETAILS);
//       if (res.ok) {
//         return res.data;
//       }
//       throw res?.data;
//     },
//     ...config,
//   });
// };

export const getDashboardData = (payload: any) => {
  return useQuery({
    queryKey: [URIS.DASHBOARD, ...compact(values(payload))],
    queryFn: async () => {
      const res: any = await apiClient.get(URIS.DASHBOARD, payload);
      if (res.ok) {
        return res.data;
      } else console.log(res);
      throw res?.data;
    },
    retry: false,
    enabled: !!payload?.staffId,
  });
};

export const getVideos = (payload: any) => {
  return useQuery({
    queryKey: [URIS.VIDEOS, ...compact(values(payload))],
    queryFn: async () => {
      const res: any = await apiClient.get(URIS.VIDEOS, payload);
      if (res.ok) {
        return res.data;
      } else console.log(res);
      throw res?.data;
    },
    retry: false,
    enabled: !!payload?.staffId,
  });
};

export const getMeetings = (payload: any) => {
  return useQuery({
    queryKey: [URIS.LIVE, ...compact(values(payload))],
    queryFn: async () => {
      const res: any = await apiClient.get(URIS.LIVE, payload);
      if (res.ok) {
        return res.data;
      } else console.log(res);
      throw res?.data;
    },
    retry: false,
    enabled: !!payload?.staffId,
  });
};

export const getTeamDashboardData = (payload: any) => {
  return useQuery({
    queryKey: [URIS.TEAM_DASHBOARD, payload],
    queryFn: async () => {
      const res: any = await apiClient.get(URIS.TEAM_DASHBOARD, payload);
      if (res.ok) {
        return res.data;
      } else console.log(res);
      throw res?.data;
    },
    retry: false,
  });
};

export const getTeamList = (payload: any) => {
  return useQuery({
    queryKey: [URIS.TEAM, ...compact(values(payload))],
    queryFn: async () => {
      const res: any = await apiClient.get(URIS.TEAM, payload);
      if (res.ok) {
        return res.data;
      } else console.log(res);
      throw res?.data;
    },
    retry: false,
  });
};
