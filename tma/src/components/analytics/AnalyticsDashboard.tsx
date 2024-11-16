import React, { useEffect } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Icon } from '@iconify/react';

export const AnalyticsDashboard: React.FC = () => {
  const { eventAnalytics, organiserAnalytics, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (!eventAnalytics || !organiserAnalytics) {
    return (
      <div className="flex justify-center items-center h-64">
        <Icon icon="heroicons:arrow-path" className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon icon="heroicons:calendar" className="w-5 h-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{eventAnalytics.totalEvents}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon icon="heroicons:users" className="w-5 h-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{eventAnalytics.totalParticipants}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon icon="heroicons:currency-dollar" className="w-5 h-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{eventAnalytics.revenueGenerated} TON</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              Certificates Issued
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Icon icon="heroicons:academic-cap" className="w-5 h-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{organiserAnalytics.certificatesIssued}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventAnalytics.popularCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.category}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">{category.count} events</span>
                    <div 
                      className="ml-2 h-2 bg-primary rounded"
                      style={{ 
                        width: `${(category.count / eventAnalytics.totalEvents) * 100}px`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventAnalytics.monthlyTrends.map((trend, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{trend.month}</span>
                    <span>{trend.eventCount} events</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Participants</span>
                    <span>{trend.participantCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;