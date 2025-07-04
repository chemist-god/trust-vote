export interface Candidate {
    name: string;
    position?: string;
    image: string;
}

export interface Election {
    id: string;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'ENDED' | 'ACTIVE' | 'PENDING';
    pollingStation: string;
    candidate: Candidate;
}
