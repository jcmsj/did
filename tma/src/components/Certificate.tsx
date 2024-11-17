// src/components/Certificate.tsx
interface CertificateProps {
    eventName: string;
    dateIssued: string;
    issuer: string;
    certificateId: string;
    imageUrl?: string;
  }

  export function Certificate({ eventName, dateIssued, issuer, certificateId, imageUrl }: CertificateProps) {
    return (
      <div className="border rounded-lg p-4 shadow-sm">
        {imageUrl && (
          <div className="mb-4">
            <img src={imageUrl} alt={eventName} className="w-full h-48 object-cover rounded" />
          </div>
        )}
        <h3 className="font-bold text-lg">{eventName}</h3>
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <p>Issued: {new Date(dateIssued).toLocaleDateString()}</p>
          <p>Issuer: {issuer}</p>
          <p>ID: {certificateId.slice(0, 8)}...</p>
        </div>
      </div>
    );
  }
