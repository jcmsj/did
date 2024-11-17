// src/pages/JoinEventPage.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRScanner from "@/components/QRScanner";
import { getFromStorage, saveToStorage } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function JoinEventPage() {
  const { toast } = useToast();

  const handleScan = (data: string) => {
    try {
      const eventData = JSON.parse(data);
      const events = getFromStorage('events') || [];
      const event = events.find(e => e.id === eventData.id);

      if (event) {
        const certificate = {
          id: Date.now().toString(),
          eventId: event.id,
          eventName: event.name,
          dateIssued: new Date().toISOString(),
        };

        const certificates = getFromStorage('certificates') || [];
        saveToStorage('certificates', [...certificates, certificate]);
        
        toast({
          title: "Success",
          description: "Certificate received successfully!"
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid QR code"
      });
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Join Event</CardTitle>
        </CardHeader>
        <CardContent>
          <QRScanner 
            onScan={handleScan}
            onError={(error) => {
              toast({
                variant: "destructive",
                title: "Error",
                description: error
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
