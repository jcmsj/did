export interface EventAnalytics {
    totalEvents: number;
    totalParticipants: number;
    averageAttendance: number;
    revenueGenerated: string;
    popularCategories: { category: string; count: number }[];
    monthlyTrends: { month: string; eventCount: number; participantCount: number }[];
  }
  
  export interface OrganiserAnalytics {
    totalEventsHosted: number;
    totalRevenue: string;
    participantSatisfaction: number;
    repeatAttendees: number;
    certificatesIssued: number;
  }