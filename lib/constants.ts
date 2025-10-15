import {Href} from 'expo-router';
import moment from 'moment';
import {Dimensions} from 'react-native';

export const NAV_THEME = {
  light: {
    background: 'hsl(229 57% 100%)', // background
    border: 'hsl(220 13% 91%)', // border
    card: 'hsl(0 0% 99%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(212 100% 49%)', // primary
    text: 'hsl(229 63% 4%)', // foreground
    header: '#1C2840',
    headerTint: '#fff',
  },
  dark: {
    header: '#1C2840',
    headerTint: '#fff',
    background: 'hsl(229 41% 4%)', // background
    border: 'hsl(215 27.9% 16.9%)', // border
    card: 'hsl(229 41% 5%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(237.75 46.51% 33.73%)', // primary
    text: 'hsl(229 23% 99%)', // foreground
  },
};

export const screenWidth = Dimensions.get('window').width;
export const screenheight = Dimensions.get('window').height;

export const StudentRecordMenu: Array<{
  name: string;
  title: string;
  icon: string;
  route: Href<string | object>;
}> = [
  {
    name: 'attendanceFeature',
    title: 'Attendance',
    icon: 'attendance',
    route: '/(app)/(drawer)/screens/attendance',
  },
  {
    name: 'leaveApplicationFeature',
    title: 'Leave Application',
    icon: 'leaveApplication',
    route: '/(app)/(drawer)/screens/leave/leave',
  },
  {
    name: 'feedbackFeature',
    title: 'Feedback/Suggestions',
    icon: 'complaints',
    route: '/(app)/(drawer)/screens/complaints',
  },
  {
    name: 'reportCardFeature',
    title: 'Report Card',
    icon: 'reportCard',
    route: '/(app)/(drawer)/screens/reportcard',
  },
  {
    name: 'copyCheckingFeature',
    title: 'Copy Checking',
    icon: 'syllabus',
    route: '/(app)/(drawer)/screens/copycheck',
  },
];

export const TimetableColors = [
  {
    light: '#FDF2F7',
    dark: '#EF4C4C',
  },
  {
    light: '#F9F1FF',
    dark: '#450875',
  },
  {
    light: '#FDF2F7',
    dark: '#1BB458',
  },
];

export const getTimeDifference = (
  timestamp: any,
  isFromNotification?: boolean,
) => {
  let now = moment();

  if (!isFromNotification) {
    now = moment().add(5, 'hours').add(30, 'minutes');
  }
  const now1 = moment().toISOString();
  const time = moment(timestamp);
  const time2 = moment(timestamp).toISOString();
  const minutes = now.diff(time, 'minutes');
  const hours = now.diff(time, 'hours');
  const days = now.diff(time, 'days');
  const months = now.diff(time, 'months');

  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (days >= 7 && days < 30) {
    return `${Math.floor(days / 7)} week${Math.floor(days / 7) !== 1 ? 's' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    return `${time?.format('DD MMM YY, hh:mm a')}`;
  }
};

export function getTwoCharInitials(name: string) {
  if (!name) return ''; // Handle empty input
  const words = name.trim().split(/\s+/); // Split by spaces and remove extra spaces

  // If there are multiple words, take the first letters of the first two words
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  // If only one word, take the first two characters
  return name.slice(0, 2).toUpperCase();
}

export enum LeadStatus {
  RINGING = 'RINGING',
  PENDING = 'PENDING',
  NON_CONTACTABLE = 'NON_CONTACTABLE',
  LOW_FOLLOW_UP = 'LOW_FOLLOWUP',
  MED_FOLLOW_UP = 'MED_FOLLOWUP',
  HIGH_FOLLOW_UP = 'HIGH_FOLLOWUP',
  REGISTRATION_DONE = 'DONE',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  DEMO_SCHEDULED = 'DEMO_SCHEDULED',
  DEMO_FINISHED = 'FINISHED',
  NOT_INTERESTED = 'NOT_INTERESTED',
  REJECTED = 'REJECTED',
  DUPLICATE = 'DUPLICATE',
  WRONG_NUMBER = 'WRONG_NO',
  CONVERTED = 'CONVERTED',
  IN_PROCESS = 'IN_PROCESS',
}
export const LEAD_STATUS_LIST: string[] = [
  'PENDING',
  'RINGING',
  'WRONG_NO',
  'DUPLICATE',
  'NOT_INTERESTED',
  'LOW_FOLLOWUP',
  'MED_FOLLOWUP',
  'HIGH_FOLLOWUP',
  'MEETING_SCHEDULED',
  'DEMO_SCHEDULED',
  'IN_PROCESS',
  'REJECTED',
];;

export const LEAD_COLORS = {
  RINGING: '#4A90E2',
  PENDING: '#F5A623',
  NON_CONTACTABLE: '#E0E0E0',
  LOW_FOLLOWUP: '#B3E5FC',
  MED_FOLLOWUP: '#29B6F6',
  HIGH_FOLLOWUP: '#0288D1',
  REGISTRATION_DONE: '#00C853',
  MEETING_SCHEDULED: '#9575CD',
  DEMO_SCHEDULED: '#81C784',
  DEMO_FINISHED: '#66BB6A',
  NOT_INTERESTED: '#FF7043',
  REJECTED: '#F44336',
  DUPLICATE: '#9E9E9E',
  WRONG_NO: '#BDBDBD',
  CONVERTED: '#2E7D32',
  IN_PROCESS: '#7B61FF',
};
