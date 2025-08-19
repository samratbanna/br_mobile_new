import {
  MutationFunction,
  MutationOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import {apiClient, URIS} from './api';
import {CallLogs, Followups, Lead, LeadDemo, LeadResponse} from '~/interfaces/lead.interface';

interface Payload {
  leadId: string;
  isDemo?: true;
}
export const getFollowUps = (payload: Payload) => {
  return useQuery<Followups[], Error, Followups[], [string, Payload]>({
    queryKey: [URIS.GET_LEAD_FOLLOWUP, payload],
    queryFn: async (): Promise<Followups[]> => {
      const res = await apiClient.get(URIS.GET_LEAD_FOLLOWUP, payload);
      if (res.ok) {
        return res.data as Followups[];
      }
      throw res?.data;
    },
    retry: false,
  });
};

interface getAllLeadConfig
  extends UseMutationOptions<LeadResponse, Error, any> {}

export const getAllLeads = (config: getAllLeadConfig) => {
  return useMutation<LeadResponse, Error, any>({
    mutationKey: [URIS.ALLLEAD],
    mutationFn: async (payload: any): Promise<LeadResponse> => {
      const res = await apiClient.get(URIS.ALLLEAD, payload);
      if (res.ok) {
        return res.data as LeadResponse;
      }
      throw res;
    },
    ...config,
  });
};

export const getAllFollowupLeads = (config: getAllLeadConfig) => {
  return useMutation<LeadResponse, Error, any>({
    mutationKey: [URIS.FOLLOWUPS],
    mutationFn: async (payload: any): Promise<LeadResponse> => {
      const res = await apiClient.get(URIS.FOLLOWUPS, payload);
      if (res.ok) {
        return res.data as LeadResponse;
      }
      throw res;
    },
    ...config,
  });
};

export const getAllMeetingList = (config: getAllLeadConfig) => {
  return useMutation<LeadResponse, Error, any>({
    mutationKey: [URIS.MEETINGLEAD],
    mutationFn: async (payload: any): Promise<LeadResponse> => {
      const res = await apiClient.get(URIS.MEETINGLEAD, payload);
      if (res.ok) {
        return res.data as LeadResponse;
      }
      throw res;
    },
    ...config,
  });
};

export const addFollowup = (config: MutationOptions) => {
  return useMutation<any, Error, any>({
    mutationKey: [URIS.ADD_FOLLOWUP],
    mutationFn: async (payload: any): Promise<any> => {
      const res = await apiClient.post(URIS.ADD_FOLLOWUP, payload);
      if (res.ok) {
        return res.data;
      }
      throw res;
    },
    ...config,
  });
};

export const updateLead = (config: any) => {
  return useMutation<any, Error, any>({
    mutationKey: [URIS.LEAD],
    mutationFn: async (payload: any): Promise<any> => {
      const res = await apiClient.patch(URIS.LEAD, payload);
      if (res.ok) {
        return res.data;
      }
      throw res;
    },
    ...config,
  });
};

export interface AddDemoParams {
  assignedTo: string
  dateTime: string
  isDemo: boolean
  leadId: string
  meetingtype: string
  time: string
  title: string
  url: string
}

export const addDemo = (config: any) => {
  return useMutation<any, Error, any>({
    mutationKey: [URIS.ADD_MEETING_LIST],
    mutationFn: async (payload: any): Promise<any> => {
      const res = await apiClient.post(URIS.ADD_MEETING_LIST, payload);
      if (res.ok) {
        return res.data;
      }
      throw res;
    },
    ...config,
  });
};

export const addCallLog = (config: any) => {
  return useMutation<any, Error, any>({
    mutationKey: [URIS.ADD_CALL_LOGS],
    mutationFn: async (payload: any): Promise<any> => {
      const res = await apiClient.post(URIS.ADD_CALL_LOGS, payload);
      if (res.ok) {
        return res.data;
      }
      throw res;
    },
    ...config,
  });
};

export const getAllDemoList = (payload: Payload) => {
  return useQuery<LeadDemo[], Error, LeadDemo[], [string, Payload]>({
    queryKey: [URIS.LIVE, payload],
    queryFn: async (): Promise<LeadDemo[]> => {
      const res = await apiClient.get(URIS.LIVE, payload);
      if (res.ok) {
        return res.data as LeadDemo[];
      }
      throw res?.data;
    },
    retry: false,
  });
};

export const getAllCallLogList = (payload: Payload) => {
  return useQuery<CallLogs[], Error, CallLogs[], [string, Payload]>({
    queryKey: [URIS.ALL_CALL_LOGS, payload],
    queryFn: async (): Promise<CallLogs[]> => {
      const res = await apiClient.get(URIS.ALL_CALL_LOGS, payload);
      if (res.ok) {
        return res.data as CallLogs[];
      }
      throw res?.data;
    },
    retry: false,
  });
};
