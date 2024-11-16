import React from 'react';
import { useRewards } from '../../hooks/useRewards';
import { Icon } from '@iconify/react';
import { Progress } from '../ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export const RewardsDisplay: React.FC = () => {
  const { userRewards } = useRewards();

  if (!userRewards) return null;

  const progressToNextTier = (userRewards.currentPoints / userRewards.pointsToNextTier) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="game-icons:laurel-crown" className="w-6 h-6" />
          Rewards Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {userRewards.currentTier.name}
              </h3>
              <p className="text-sm text-gray-500">
                Current Points: {userRewards.currentPoints}
              </p>
            </div>
            <Badge variant="secondary">
              {userRewards.pointsToNextTier} points to next tier
            </Badge>
          </div>

          <Progress value={progressToNextTier} className="w-full" />

          <div className="grid grid-cols-2 gap-4 mt-4">
            {userRewards.currentTier.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon icon="heroicons:check-circle" className="w-5 h-5 text-green-500" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardsDisplay;