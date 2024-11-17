// src/components/QRScanner.tsx
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { BarcodeScanner} from "react-barcode-scanner"
interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
}

export default function QRScanner({ onScan, onError }: QRScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  if (hasPermission === false) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Camera permission denied. Please enable camera access.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsScanning(!isScanning)}>
        {isScanning ? 'Stop Scanning' : 'Start Scanning'}
      </Button>

      {isScanning && (
        <div className="relative aspect-square max-w-md mx-auto">
          <BarcodeScanner /> 
          {/* <Scanner
            onResult={(result) => onScan(result.getText())}
            onError={(error) => onError?.(error.message)}
            constraints={{
              facingMode: 'environment'
            }}
          /> */}
        </div>
      )}
    </div>
  );
}
