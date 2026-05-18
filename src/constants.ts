import { User, Policy, Claim, WellnessChallenge } from './types';

export const MOCK_USER: User = {
  name: "Alexandra Sterling",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  points: 4250,
  streak: 12
};

export const MOCK_POLICIES: Policy[] = [
  {
    id: "P1",
    type: "Motor",
    policyNumber: "POL-MT-7721",
    status: "Active",
    expiryDate: "2026-12-15",
    coverage: 75000,
    premium: 1200
  },
  {
    id: "P2",
    type: "Health",
    policyNumber: "POL-HL-9934",
    status: "Expiring Soon",
    expiryDate: "2026-06-20",
    coverage: 250000,
    premium: 2400
  },
  {
    id: "P3",
    type: "Home",
    policyNumber: "POL-HM-1102",
    status: "Active",
    expiryDate: "2027-01-10",
    coverage: 500000,
    premium: 850
  }
];

export const MOCK_CLAIMS: Claim[] = [
  {
    id: "CLM2024001",
    type: "Motor",
    category: "Accident Claim",
    status: "Under Review",
    date: "Oct 15, 2024",
    amount: 12850,
    progress: 60,
    timeline: {
      received: true,
      review: true,
      approved: false,
      paid: false
    },
    description: "Your claim is currently being reviewed. You'll receive an update within 2-3 business days."
  },
  {
    id: "CLM2024002",
    type: "Health",
    category: "Medical Reimbursement",
    status: "Paid",
    date: "Sep 22, 2024",
    amount: 3120,
    progress: 100,
    timeline: {
      received: true,
      review: true,
      approved: true,
      paid: true
    },
    description: "Your claim has been fully processed and paid."
  },
  {
    id: "CLM2024003",
    type: "Travel",
    category: "Trip Cancellation",
    status: "Approved",
    date: "Aug 10, 2024",
    amount: 2750,
    progress: 85,
    timeline: {
      received: true,
      review: true,
      approved: true,
      paid: false
    }
  },
  {
    id: "CLM2024004",
    type: "Home",
    category: "Water Damage",
    status: "Submitted",
    date: "Nov 05, 2024",
    amount: 8500,
    progress: 25,
    timeline: {
      received: true,
      review: false,
      approved: false,
      paid: false
    }
  }
];

export const MOCK_CHALLENGES: WellnessChallenge[] = [
  {
    id: "CH1",
    title: "10k Daily Steps",
    type: "Steps",
    goal: "10,000 steps",
    progress: 7200,
    reward: 50
  },
  {
    id: "CH2",
    title: "Hydration Master",
    type: "Diet",
    goal: "3L Water",
    progress: 2100,
    reward: 30
  }
];
