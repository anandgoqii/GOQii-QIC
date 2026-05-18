export type Screen = 'splash' | 'login' | 'dashboard' | 'policies' | 'claims' | 'wellness' | 'profile' | 'policy-details' | 'file-claim' | 'claim-details';

export interface User {
  name: string;
  avatar: string;
  points: number;
  streak: number;
}

export interface Policy {
  id: string;
  type: 'Motor' | 'Health' | 'Travel' | 'Home' | 'Commercial';
  policyNumber: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  expiryDate: string;
  coverage: number;
  premium: number;
}

export interface Claim {
  id: string;
  type: 'Motor' | 'Health' | 'Travel' | 'Home' | 'Commercial';
  category: string;
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Paid' | 'Rejected';
  date: string;
  amount: number;
  progress: number;
  timeline: {
    received: boolean;
    review: boolean;
    approved: boolean;
    paid: boolean;
  };
  description?: string;
}

export interface WellnessChallenge {
  id: string;
  title: string;
  type: 'Steps' | 'Diet' | 'Sleep';
  goal: string;
  progress: number;
  reward: number;
}
