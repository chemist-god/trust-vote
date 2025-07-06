export interface Candidate {
  name: string;
  position: string;
  image: string;
  flag: string;
  votes: number;
  percentage: number;
}

export interface Election {
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'ENDED' | 'ACTIVE' | 'PENDING';
  pollingStation: string;
  candidate: {
    name: string;
    image: string;
  };
}