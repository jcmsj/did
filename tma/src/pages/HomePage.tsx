// src/pages/HomePage.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">Event Certificates</h1>
      
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Create Event</CardTitle>
            <CardDescription>Create a new event and issue certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/create">Create Event</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Join Event</CardTitle>
            <CardDescription>Join an event and receive your certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="secondary">
              <Link to="/join">Join Event</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Certificates</CardTitle>
            <CardDescription>View and manage your certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/certificates">View Certificates</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
