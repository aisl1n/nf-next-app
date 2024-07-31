"use client";
import axios from "axios";
import { useState } from "react";
import { Scanner, useDevices, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import TableResults from "@/components/TableResults";
import { Button } from "@/components/ui/button";

export default function QrReaderPage() {
  const [scannedData, setScannedData] = useState<any>(null);
  const devices = useDevices();

  const handleScan = async (url: any) => {
    console.log("Scanned URL:", url);
    try {
      const response = await axios.get("http://localhost:3333/proxy", {
        params: { url },
      });
      console.log("Data fetched:", response.data);
      setScannedData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    console.log("Salvando compra...");
    const { produtos, valorTotalNumber, nomeLoja, dataCompra } = scannedData;
    try {
      axios.post("http://localhost:3333/products", produtos).then((response) => {
        axios
          .post("http://localhost:3333/purchases", {
            nomeLoja,
            dataCompra,
            produtos: response.data,
            valorTotalNumber,
          })
          .then((response) => {
            console.log("Compra salva:", response.data);
            setScannedData(null);
          });
      });
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const drawFrame = (detectedCodes: IDetectedBarcode[], ctx: CanvasRenderingContext2D) => {
    detectedCodes.forEach((code) => {
      const { x, y, width, height } = code.boundingBox;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
    });
  };

  const handleCancel = () => {
    setScannedData(null);
  };

  return (
    <>
      {scannedData ? (
        <div>
          <div className="flex flex-col p-4 m-2 rounded-lg text-center bg-emerald-500">
            <h1>Deu bom na leitura dos dados!</h1>
          </div>
          <TableResults scannedData={scannedData} />
          <div className="flex flex-row justify-end gap-2 p-4">
            <Button className="bg-rose-600 font-bold text-inherit hover:bg-rose-800" onClick={() => handleCancel()}>
              Cancelar
            </Button>
            <Button className="bg-emerald-500 font-bold text-inherit hover:bg-emerald-800" onClick={() => handleSave()}>
              Salvar compra
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-[400px] border-2 border-rose-600 rounded-md mt-16 mx-2 p-2">
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
            components={{ tracker: drawFrame }}
          />
        </div>
      )}
    </>
  );
}
