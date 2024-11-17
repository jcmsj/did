// src/pages/SubCollectionsPage.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {BarcodeScanner} from 'react-barcode-scanner';
import ShareQRCode from '@/components/ShareQRCode';
import { getFromStorage } from '@/lib/utils';

export default function SubCollectionsPage() {
  const [scanning, setScanning] = useState(false);
  const collections = getFromStorage('collections') || [];

  const handleScan = async (data: string | null) => {
    if (!data) return;
    
    try {
      const sharedItem = JSON.parse(data);
      // Here you would handle the TON payment and viewing logic
      console.log('Viewing shared item:', sharedItem);
    } catch (err) {
      console.error('Invalid QR code');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>My Collections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {collections.map((collection: any) => (
            <div key={collection.id} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{collection.name}</h3>
                <p className="text-sm text-gray-500">
                  Fee: {collection.viewFee} TON
                </p>
              </div>
              <ShareQRCode data={collection} title="Collection" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>View Shared Collection</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setScanning(!scanning)}
            className="w-full"
          >
            {scanning ? 'Stop Scanning' : 'Scan Collection QR Code'}
          </Button>

          {scanning && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <BarcodeScanner
                
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
