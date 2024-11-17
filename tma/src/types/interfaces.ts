// types/interfaces.ts
export interface EventData {
  id: string;
  name: string;
  totalSupply: number;
  createdAt: number;
}

export interface CertificateData {
  id: string; 
  eventId: string;
  ownerAddress: string;
  timestamp: number;
}

export interface SubCollectionData {
  id: string;
  name: string;
  certificateIds: string[];
  viewPrice: number;
  ownerAddress: string;
}
