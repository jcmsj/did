// src/pages/CertificatesPage.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFromStorage, saveToStorage } from "@/lib/utils";

// Add this near the top of CertificatesPage.tsx
const sampleCertificates = [
  {
    id: "cert001",
    eventName: "Telegram Mini Apps Workshop",
    dateIssued: "2023-11-15",
    issuer: "Pavel Lesyuk - TON Foundation",
    imageUrl: "https://placeholder.co/400x300"
  },
  {
    id: "cert002",
    eventName: "No-Code Solutions Workshop",
    dateIssued: "2023-11-15",
    issuer: "Mikey Molina - Xircus",
    imageUrl: "https://placeholder.co/400x300"
  },
  {
    id: "cert003",
    eventName: "Pitch Mastery Workshop",
    dateIssued: "2023-11-16",
    issuer: "Falco Pangkey - Xircus",
    imageUrl: "https://placeholder.co/400x300"
  },
  {
    id: "cert004",
    eventName: "Telegram Wallet Masterclass",
    dateIssued: "2023-11-16",
    issuer: "Miguel Avila - Wallet in Telegram",
    imageUrl: "https://placeholder.co/400x300"
  },
  {
    id: "cert005",
    eventName: "TON Ecosystem Leadership",
    dateIssued: "2023-11-17",
    issuer: "Kate Bahajati - TON Society",
    imageUrl: "https://placeholder.co/400x300"
  }
];
// Replace the certificates constant with:

export default function CertificatesPage() {
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [viewFee, setViewFee] = useState("");
  
  // const certificates = getFromStorage('certificates') || [];
  const certificates = sampleCertificates;

  const handleCreateCollection = () => {
    const collection = {
      id: Date.now().toString(),
      name: collectionName,
      certificateIds: selectedCerts,
      viewFee: Number(viewFee),
      dateCreated: new Date().toISOString()
    };

    const collections = getFromStorage('collections') || [];
    saveToStorage('collections', [...collections, collection]);
    setShowCreateCollection(false);
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>My Certificates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificates.map((cert: any) => (
            <div key={cert.id} className="flex items-center gap-2">
              <Checkbox
                checked={selectedCerts.includes(cert.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCerts([...selectedCerts, cert.id]);
                  } else {
                    setSelectedCerts(selectedCerts.filter(id => id !== cert.id));
                  }
                }}
              />
              <div>
                <h3 className="font-medium">{cert.eventName}</h3>
                <p className="text-sm text-gray-500">
                  Issued: {new Date(cert.dateIssued).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

          <Button
            onClick={() => setShowCreateCollection(true)}
            disabled={selectedCerts.length === 0}
          >
            Create Collection
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showCreateCollection} onOpenChange={setShowCreateCollection}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Certificate Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Collection Name</Label>
              <Input
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter collection name"
              />
            </div>
            <div>
              <Label>View Fee (TON)</Label>
              <Input
                type="number"
                value={viewFee}
                onChange={(e) => setViewFee(e.target.value)}
                placeholder="Enter view fee"
              />
            </div>
            <Button onClick={handleCreateCollection}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
