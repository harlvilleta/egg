'use client';

import { useEffect, useState } from 'react';

export default function QRCode() {
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    // Generate QR code using the current URL
    const currentUrl = window.location.href;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`;
    setQrCode(qrCodeUrl);
  }, []);

  return (
    <div className="bg-white bg-opacity-95 rounded-lg p-4 text-center">
      <h3 className="text-lg font-medium text-gray-900 mb-2">Scan to Open in Mobile</h3>
      {qrCode && (
        <img
          src={qrCode}
          alt="QR Code"
          className="mx-auto mb-2"
          width={150}
          height={150}
        />
      )}
      <p className="text-sm text-gray-500">Scan with Expo Go app</p>
    </div>
  );
} 