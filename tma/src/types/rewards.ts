export interface RewardTier {
    id: string;
    name: string;
    pointsRequired: number;
    benefits: string[];
    icon: string;
  }
  
  export interface UserRewards {
    currentPoints: number;
    currentTier: RewardTier;
    pointsToNextTier: number;
    rewardHistory: RewardTransaction[];
  }
  
  export interface RewardTransaction {
    id: string;
    timestamp: number;
    points: number;
    type: 'earned' | 'spent';
    description: string;
    eventId?: string;
  }