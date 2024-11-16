import { useState, useCallback } from 'react';
import { EventAnalytics, OrganiserAnalytics } from '../types/analytics';
import { useTonWallet } from '@tonconnect/ui-react';

export function useAnalytics() {
  const wallet = useTonWallet();
  const [eventAnalytics, setEventAnalytics] = useState<EventAnalytics | null>(null);
  const [organiserAnalytics, setOrganiserAnalytics] = useState<OrganiserAnalytics | null>(null);

  const fetchAnalytics = useCallback(async () => {
    if (!wallet) return;

    try {
      // Fetch analytics data from your contract
      // This is a mock implementation
      const mockEventAnalytics: EventAnalytics = {
        totalEvents: 150,
        totalParticipants: 3200,
        averageAttendance: 21.3,
        revenueGenerated: "25000",
        popularCategories: [
          { category: "Technology", count: 45 },
          { category: "Business", count: 35 },
          { category: "Education", count: 30 }
        ],
        monthlyTrends: [
          { month: "Jan", eventCount: 12, participantCount: 250 },
          { month: "Feb", eventCount: 15, participantCount: 320 }
        ]
      };

      const mockOrganiserAnalytics: OrganiserAnalytics = {
        totalEventsHosted: 45,
        totalRevenue: "12000",
        participantSatisfaction: 4.5,
        repeatAttendees: 128,
        certificatesIssued: 280
      };

      setEventAnalytics(mockEventAnalytics);
      setOrganiserAnalytics(mockOrganiserAnalytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    }
  }, [wallet]);

  return {
    eventAnalytics,
    organiserAnalytics,
    fetchAnalytics
  };
}
