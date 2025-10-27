import {create} from 'apisauce';
import apiMonitor from './Monitor';

export const BASE_URL = 'https://api.brainrecoding.in/api/r1/';
// export const BASE_URL = 'https://testapi.brainrecoding.in/api/r1/';
// export const BASE_URL = 'http://10.149.67.115:4000/api/r1/';

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
};
