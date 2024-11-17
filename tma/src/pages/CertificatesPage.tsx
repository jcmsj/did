// src/pages/CertificatesPage.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFromStorage, saveToStorage } from "@/lib/utils";

export default function CertificatesPage() {
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [viewFee, setViewFee] = useState("");
  
  const certificates = getFromStorage('certificates') || [];

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
