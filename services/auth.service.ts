import {MutationOptions, useMutation} from '@tanstack/react-query';
import {apiClient, URIS} from './api';

export const useLogin = (config: MutationOptions) => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (payload): Promise<any> => {
      const res: any = await apiClient.post(URIS.LOGIN, payload, {
        params: payload,
      });
      if (res.ok) {
        return res.data;
      }
      throw res.data;
    },
    ...config,
  });
};

export const useLogout = (config: MutationOptions) => {
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: async (): Promise<any> => {
      const res = await apiClient.delete(URIS.LOGOUT);
      if (res.ok) {
        return res.data;
      }
      throw res.data;
    },
    ...config,
  });
};


export const updateFcmToken = (config: MutationOptions) => {
  return useMutation<any, Error, any>({
    mutationKey: [URIS.UPDATE_TOKEN],
    mutationFn: async (payload: any): Promise<any> => {
      const res = await apiClient.patch(URIS.UPDATE_TOKEN, payload);
      if (res.ok) {
        return res.data;
      }
      throw res;
    },
    ...config,
  });
};
