export interface LeadResponse {
  docs: Lead[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: any;
  nextPage: number;
}

export interface Lead {
  _id: string;
  contact: string;
  __v: number;
  aboutYou: string;
  createdAt: string;
  districtManagerId: string;
  email: string;
  isActive: boolean;
  isConverted: boolean;
  leadType: string;
  message: string;
  ownerName: string;
  pincode: string;
  schoolAddress: string;
  schoolName: string;
  staffId: string;
  state: string;
  stateManagerId: string;
  status: string;
  updatedAt: string;
  whatsAppNumber: string;
  id: string;
}

export interface Followups {
  _id: string;
  title?: string;
  remark: string;
  leadId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  dateTime?: string;
}

export interface CallLogs {
  _id: string;
  remark: string;
  leadId: string;
  callStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface LeadDemo {
  _id: string;
  leadId: string;
  title: string;
  url: string;
  dateTime: string;
  time: string;
  isActive: boolean;
  isDemo: boolean;
  meetingtype: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
