// src/pages/CheckAlbumPage.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/components/Certificate";

export default function CheckAlbumPage() {
  const [address, setAddress] = useState("");
  const [showCertificates, setShowCertificates] = useState(false);

  const sampleUserCertificates = [
    {
      id: "cert004",
      eventName: "TON Development Course",
      dateIssued: "2024-03-10",
      issuer: "TON Academy",
      imageUrl: "https://placeholder.co/400x300"
    },
    {
      id: "cert005",
      eventName: "Smart Contract Security",
      dateIssued: "2024-02-28",
      issuer: "Blockchain Security Institute",
      imageUrl: "https://placeholder.co/400x300"
    }
  ];

  const handleCheck = () => {
    if (address.length > 0) {
      setShowCertificates(true);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Enter TON address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button onClick={handleCheck}>Check Certificates</Button>
      </div>

      {showCertificates && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleUserCertificates.map((cert) => (
            <Certificate
              key={cert.id}
              eventName={cert.eventName}
              dateIssued={cert.dateIssued}
              issuer={cert.issuer}
              certificateId={cert.id}
              imageUrl={cert.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
