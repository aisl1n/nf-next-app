import Link from "next/link";
import { Button } from "./ui/button";
import { Receipt, ScanQrCode } from "lucide-react";

export default function MenuNavigation() {
  return (
    <div className="flex flex-col justify-end h-full">
      <div className="fixed bottom-0 left-0 right-0 p-4 mx-4 my-2">
        <div className="flex flex-row justify-center gap-2 h-12 w-full">
          <Link href="/results" className="w-full">
            <Button className="w-full h-full text-lg font-bold transition-colors duration-600 hover:bg-rose-900 gap-2">
              <Receipt />
              Compras
            </Button>
          </Link>
          <Link href="/scanner" className="w-full">
            <Button className="w-full h-full text-lg font-bold transition-colors duration-300 hover:bg-rose-900 gap-2">
              <ScanQrCode />
              Scanner
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
