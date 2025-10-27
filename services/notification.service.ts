import {
  useInfiniteQuery,
} from '@tanstack/react-query';
import {apiClient, URIS} from './api';
import { Task } from '~/interfaces/task.interface';

interface Params {
  page?: number;
  limit?: number;
  staffId?: string;
}

export interface NotificationResponse {
  docs: Doc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: any;
  nextPage: any;
}

export interface Notification {
  _id: string;
  recipientType: string;
  recipientId: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  taskId: Task;
  __v: number;
}
export const getAllNotifications = (baseParams: Omit<Params, 'page'>) => {
  return useInfiniteQuery<
    NotificationResponse,
    Error,
    NotificationResponse,
    [string, Omit<Params, 'page'>]
  >({
    queryKey: [URIS.USER_NOTIFICATION, baseParams],
    queryFn: async ({pageParam = 1}) => {
      const res = await apiClient.get(URIS.USER_NOTIFICATION, {
        ...baseParams,
        page: pageParam,
      });
      if (res.ok) {
        return res.data as NotificationResponse;
      }
      throw res?.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.hasNextPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    retry: false,
    enabled: baseParams !== null
  });
};
