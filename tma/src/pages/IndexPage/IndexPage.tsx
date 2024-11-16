import { Section, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, Users, Award } from 'lucide-react';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">Spark</h1>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Join Event
              </CardTitle>
              <CardDescription>
                Join an existing event to receive your certificate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/join">Join Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarPlus className="h-5 w-5" />
                Organize Event
              </CardTitle>
              <CardDescription>
                Create and manage your own event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/organize">Create Event</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                My Certificates
              </CardTitle>
              <CardDescription>
                View all your earned certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="secondary">
                <Link to="/certs">View Certificates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};
