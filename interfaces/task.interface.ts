export interface TaskResponse {
  docs: Task[];
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

export interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: AssignedTo;
  dueDate: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface AssignedTo {
  _id: string;
  name: string;
  isActive: boolean;
  contact: string;
  role: string;
  email: string;
  whatsapp: string;
  state: string;
  district: string;
  area: string;
  address: string;
  profession: string;
  knowFrom: string;
  type: string;
  isLoginOtp: boolean;
  fcmTokens: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
