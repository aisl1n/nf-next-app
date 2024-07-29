import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "./ThemeToggle";

interface TabsLayoutProps {
  TableResultComponent?: React.ComponentType<any>;
  ScannerComponent?: React.ComponentType<any>;
  children: ReactNode;
}

export function TabsLayout({ TableResultComponent, ScannerComponent, children }: TabsLayoutProps) {
  return (
    <Tabs defaultValue="compras">
      <div>
        <TabsContent value="compras">{TableResultComponent && <TableResultComponent />}</TabsContent>
        <TabsContent value="scanner">{ScannerComponent && <ScannerComponent />}</TabsContent>
      </div>
      <div className="flex relative h-full">
        <div className="flex flex-col justify-end h-full">
          <TabsList className="fixed bottom-0 left-0 right-0 p-6 mx-4 my-2">
            <div className="grid grid-cols-2 gap-6 w-full">
              <TabsTrigger className="font-bold text-lg" value="compras">
                Compras
              </TabsTrigger>
              <TabsTrigger className="font-bold text-lg" value="scanner">
                Scanner
              </TabsTrigger>
            </div>
          </TabsList>
        </div>
      </div>
    </Tabs>
  );
}
