import {
  MutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {apiClient, URIS} from './api';
import { TaskResponse } from '~/interfaces/task.interface';

interface Params {
  page?: number;
  limit?: number;
  assignedTo?: string;
}

export const getAllTasks = (baseParams: Omit<Params, 'page'>) => {
  return useInfiniteQuery<
    TaskResponse,
    Error,
    TaskResponse,
    [string, Omit<Params, 'page'>]
  >({
    queryKey: [URIS.ALL_TASK, baseParams],
    queryFn: async ({pageParam = 1}) => {
      const res = await apiClient.get(URIS.ALL_TASK, {
        ...baseParams,
        page: pageParam,
      });
      if (res.ok) {
        return res.data as TaskResponse;
      }
      throw res;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.hasNextPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    retry: false,
    enabled: baseParams !== null,
  });
};

export const updateStatus = (config: MutationOptions) => {
  return useMutation({
    mutationKey: [URIS.TASK],
    mutationFn: async (payload: any): Promise<any> => {
      const res: any = await apiClient.patch(URIS.TASK, payload, {
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
