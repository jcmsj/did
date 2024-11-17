// src/components/ShareQRCode.tsx
import { useEffect, useState } from 'react';
import {DetectedBarcode} from 'react-barcode-scanner';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface ShareQRCodeProps {
  title: string;
  owner: string;
  contractId: string;
}

export default function ShareQRCode({ title,owner, contractId }: ShareQRCodeProps) {
  const [open, setOpen] = useState(false);
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    setQrValue(JSON.stringify({ title, owner, contractId }));
  }, [title, owner]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Share</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {title}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrValue}`} alt="QR Code" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
