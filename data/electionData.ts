import { Candidate, Election } from '../types/election';

export const sponsoredCandidates: Candidate[] = [
  {
    name: 'George Denis Mavo',
    position: 'SRC PRESIDENT (Hopeful)',
    image: '/assets/candidate1.png'
  },
  {
    name: 'Sarah Ann Wilson',
    position: 'GEN. SECRETARY (Hopeful)',
    image: '/assets/candidate2.png'
  },
  {
    name: 'Paul Simon Avera',
    position: 'SRC PRESIDENT (Hopeful)',
    image: '/assets/candidate6.png'
  },
  {
    name: 'John Van Pelt',
    position: 'SRC TREASURER (Hopeful)',
    image: '/assets/candidate4.png'
  }
];

export const electionData: Election[] = [
  {
    id: 'gctu-src-2023',
    type: 'GCTU GENERAL SRC ELECTIONS',
    date: '07 Oct, 2023',
    status: 'ENDED',
    pollingStation: 'Main Campus',
    startTime: '2023-10-07',
    endTime: '2023-10-07',
    candidate: {
      name: 'Robert Mercer',
      image: '/assets/flyer.jpg'
    }
  },
  {
    id: 'bsc-cs-course-rep-2023',
    type: 'BSC COMPUTER SCIENCE COURSE REP ELECTION',
    date: '14 Oct, 2023',
    status: 'ACTIVE',
    pollingStation: 'Main Campus',
    startTime: '2023-10-14',
    endTime: '2023-10-14',
    candidate: {
      name: 'Sarah Wilson',
      image: '/assets/campaign.jpeg'
    }
  },
  {
    id: 'gesa-general-2023',
    type: 'GESA GENERAL ELECTIONS',
    date: '07 Oct, 2023',
    status: 'PENDING',
    pollingStation: 'Main Campus',
    startTime: '2023-10-07',
    endTime: '2023-10-07',
    candidate: {
      name: 'Robert Mercer',
      image: '/assets/election.jpeg'
    }
  }
];

export const pollingStations = ['Main Campus', 'Science Block', 'Engineering Block', 'Business School'];
export const electionTypes = ['SRC Elections', 'Department Elections', 'Course Rep Elections'];