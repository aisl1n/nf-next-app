"use client";
import { useState } from "react";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/router";
import axios from "axios";

export default function QrReaderPage() {
  const [scannedData, setScannedData] = useState<any>(null);
  const devices = useDevices();

  const handleScan = async (url: any) => {
    console.log("Scanned URL:", url);
    try {
      const response = await axios.get("https://nf-api-server.vercel.app/proxy", {
        params: { url },
      });
      console.log("Data fetched:", response.data);
      setScannedData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <>
      <Scanner
        constraints={{
          facingMode: "environment",
          deviceId: devices[3]?.deviceId,
          frameRate: { ideal: 30, max: 60 },
        }}
        onScan={(result) => {
          if (result[0]?.rawValue) {
            handleScan(result[0].rawValue);
          }
        }}
      />
      {scannedData && (
        <div>
          <h1>Scanned Data</h1>
          <pre>{JSON.stringify(scannedData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
