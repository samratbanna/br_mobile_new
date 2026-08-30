import {create} from 'apisauce';
import apiMonitor from './Monitor';
import {showErrorToast} from '~/lib/Toast';

export const BASE_URL = 'https://api.brainrecoding.in/api/r1/';
// export const BASE_URL = 'https://api.troventia.com/api/r1/';
// export const BASE_URL = 'https://testapi.brainrecoding.in/api/r1/';
// export const BASE_URL = 'http://10.112.150.170:4000/api/r1/';

let api = create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
  timeout: 45000,
});

__DEV__ && api.addMonitor(apiMonitor);

// Global plan-limit (403) toast — runs in every build (not just __DEV__).
// Purely a side-effect notification; it never swallows or short-circuits
// the response, so each call site's own res.ok / throw res.data handling
// still runs normally afterward.
const planLimitMonitor = (response: any) => {
  const message = response?.data?.message;
  if (
    response?.status === 403 &&
    typeof message === 'string' &&
    message.toLowerCase().includes('plan limit')
  ) {
    showErrorToast(
      'Your organization has reached its plan limit. Please contact your administrator.',
    );
  }
};

api.addMonitor(planLimitMonitor);

export const setAuthorizationHeader = (access_token: string) =>
  api.setHeader('Authorization', 'Bearer ' + access_token);

export const removeAuthorizationHeader = () => {
  delete api.headers['Authorization'];
};

export {api as apiClient};

export const URIS = {
  LOGIN: 'auth/login',
  PHYSICALLY_MEETINGS: 'lead/followup-meeting',
  LIVE: 'liveMeeting/all',
  MEETINGLEAD: 'liveMeeting/meetingLead',
  ALLLEAD: 'lead/seller/all',
  LEAD: 'lead',
  WALLET: 'wallet/all',
  TRANSACTION: 'transaction/all',
  FOLLOWUPS: 'lead/followup-meeting',
  GET_LEAD_FOLLOWUP: 'LeadFollowUp/all',
  ADD_FOLLOWUP: 'LeadFollowUp',
  STAFFDATA: 'staff',
  DASHBOARD: 'lead/dashboard',
  PDF: 'uploadTemp/all?isLecture=false',
  REWARDS: 'uploadTemp/all?isAdmin=true',
  VIDEOS: 'uploadTemp/all?isLecture=true',
  TEAM: 'staff/team',
  TEAM_DASHBOARD: 'lead/team-dashboard',
  UPDATE_TOKEN: 'staff/fcmToken',
  LOGOUT: '/logout',
  ALL_CALL_LOGS: 'CallLogs/all',
  ADD_CALL_LOGS: 'CallLogs',
  ADD_MEETING_LIST: 'liveMeeting',
  ALL_TASK: 'tasks/all',
  TASK: 'tasks',
  USER_NOTIFICATION: 'notifications/user',
  ORG_ME: 'organization/me',
};
