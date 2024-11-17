// src/pages/CreateEventPage.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ShareQRCode from '@/components/ShareQRCode';
import { getFromStorage, saveToStorage } from '@/lib/utils';
// import { useTonClient } from '@/hooks/useTonClient';
import { useTonAddress, useTonWallet } from '@tonconnect/ui-react';
// import { useTonConnect } from '@/hooks/useTonConnect';

export default function CreateEventPage() {
  const [eventName, setEventName] = useState('');
  const [createdEvent, setCreatedEvent] = useState<any>(null);
  const [address, setAddress] = useTonAddress()
  const handleCreate = () => {
    const event = {
      contractId: Date.now().toString(),
      title: eventName,
      owner: address,
    };

    const events = getFromStorage('events') || [];
    saveToStorage('events', [...events, event]);
    setCreatedEvent(event);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Event Name</Label>
            <Input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCreate}>Create</Button>
            {createdEvent && (
              <div>
                <ShareQRCode contractId={createdEvent.contractId} title={createdEvent.title} owner={address} />
                {address}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
