"use client";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function QrReader() {
  const [result, setResult] = useState<any>("");
  const devices = useDevices();


  const handleScan = (result: any) => {
    setResult(result[0].rawValue);
  }

  return (
    <>
      <Scanner
        constraints={{
          facingMode: "environment",
          deviceId: devices[3]?.deviceId,
          frameRate: { ideal: 30, max: 60 },
        }}
        onScan={(result) => handleScan(result)}
      />
    </>
  );
}
