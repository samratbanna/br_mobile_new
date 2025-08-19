import {Linking} from 'react-native';

export const getFileTypeIcon = (attachmentUrl: string) => {
  const extension = attachmentUrl.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'txt':
      return 'text';
    case 'mp3':
      return 'audio';
    default:
      return attachmentUrl;
  }
};

export const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'new':
      return {textClr: 'text-blue', bgClr: 'bg-lightBlue'};
    case 'in-progrees':
      return {textClr: 'text-orange', bgClr: 'bg-orangeLight'};
    case 'pending':
      return {textClr: 'text-white', bgClr: 'bg-orange-400'};
    case 'closed':
      return {textClr: 'text-white', bgClr: 'bg-pink'};
    case 'resolved':
      return {textClr: 'text-green', bgClr: 'bg-lightGreen'};
    case 'open':
      return {textClr: 'text-purple-600', bgClr: 'bg-purple-200'};
    default:
      return {textClr: 'text-yellow-600', bgClr: 'bg-purple-200'};
  }
};

export const getSubjectStyles = (subject: string) => {
  switch (subject) {
    case 'Mathematics':
      return {icon: 'maths', bgClr: '#EF4C4C'};
    case 'Chemistry':
      return {
        icon: 'chemistry',
        bgClr: '#1BB458',
      };
    case 'History':
      return {
        icon: 'history',
        bgClr: '#450875',
      };
    case 'Physics':
      return {
        icon: 'physics',
        bgClr: '#EE5C2E',
      };
    case 'Biology':
      return {
        icon: 'biology',
        bgClr: '#2FAC2C',
      };
    case 'Hindi':
      return {
        icon: 'hindi',
        bgClr: '#0081F8',
      };
    case 'English':
      return {
        icon: 'english',
        bgClr: '#9A2EEE',
      };
    case 'Computer Science':
      return {
        icon: 'computerScience',
        bgClr: '#9A2EEE',
      };
    default:
      return {
        icon: 'history',
        bgClr: '#FAD5A5',
      };
  }
};

export const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case 'Mathematics':
      return {icon: 'mathematics'};
    case 'Chemistry':
      return {
        icon: 'chemistry2',
      };
    case 'History':
      return {
        icon: 'history2',
      };
    case 'Physics':
      return {
        icon: 'physics2',
      };
    case 'Computer Science':
      return {
        icon: 'coding',
      };
      case 'Biology':
        return {
          icon: 'biology2',
        };
    default:
      return {
        icon: 'subjects',
      };
  }
};

export const ATTENDANCE_TYPE: any = {
  0: {title: 'absent', color: '#FFE4E4'},
  1: {title: 'present', color: '#E4FFE5'},
  2: {title: 'leave', color: '#FAD5A5'},
  3: {title: 'halfDay', color: '#FFF7D9'},
  4: {title: 'holiday', color: '#ECF6FF'},
  5: {title: 'weekOff', color: '#CF9FFF'},
};

export const openUrl = (url: any) => {
  Linking.openURL(url);
};

export const fileExtension = (url: any) => {
  return url?.split('.').pop().toLowerCase();
};
