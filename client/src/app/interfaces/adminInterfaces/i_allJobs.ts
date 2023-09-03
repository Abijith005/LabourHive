export interface i_allJobs {
  _id: string;
  client_id: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  experience: string;
  wage: number;
  requiredCount: number;
  startDate: Date;
  endDate: Date;
  location: string;
  jobDescription: string;
  coordinates: number[];
  currentStatus: string;
  postedJob: boolean;
  createdAt: Date;
  updatedAt: Date;
}
