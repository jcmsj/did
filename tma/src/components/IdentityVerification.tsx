import React, { useState } from 'react';
import { useIdentityVerification } from '../hooks/useIdentityVerification';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Icon } from '@iconify/react';
import { Progress } from './ui/progress';

export const IdentityVerification: React.FC = () => {
  const { t } = useTranslation();
  const { verifyIdentity, verificationStatus } = useIdentityVerification();
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentFile(file);
      simulateUploadProgress();
    }
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleVerification = async () => {
    if (!documentFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const documentData = e.target?.result;
      if (documentData) {
        await verifyIdentity(documentData);
      }
    };
    reader.readAsArrayBuffer(documentFile);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon icon="heroicons:shield-check" className="w-6 h-6 text-primary" />
          {t('identity.verification.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center gap-2">
              <Icon icon="heroicons:document" className="w-5 h-5" />
              {t('identity.verification.uploadDocument')}
            </div>
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="document-upload"
              accept="image/*,.pdf"
            />
            <label
              htmlFor="document-upload"
              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon icon="heroicons:cloud-arrow-up" className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {documentFile ? documentFile.name : t('identity.verification.dragAndDrop')}
                </span>
              </div>
            </label>
          </div>
        </div>

        {documentFile && (
          <div className="space-y-2">
            <Progress value={uploadProgress} />
            <p className="text-sm text-gray-500 text-center">{uploadProgress}% uploaded</p>
          </div>
        )}

        <button
          onClick={handleVerification}
          disabled={!documentFile || verificationStatus === 'pending'}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon 
            icon={verificationStatus === 'pending' ? 'heroicons:arrow-path' : 'heroicons:finger-print'} 
            className={`w-5 h-5 ${verificationStatus === 'pending' ? 'animate-spin' : ''}`} 
          />
          {verificationStatus === 'pending' 
            ? t('identity.verification.verifying')
            : t('identity.verification.verify')}
        </button>

        {verificationStatus === 'verified' && (
          <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-md">
            <Icon icon="heroicons:check-circle" className="w-5 h-5" />
            {t('identity.verification.success')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IdentityVerification;