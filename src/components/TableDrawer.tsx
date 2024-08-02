import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import axios from "axios";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CircleAlert } from "lucide-react";

type Invoice = {
  _id: string;
  market: string;
  date: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
};

interface TableDrawerProps {
  selectedInvoice?: Invoice;
}

export default function TableDrawer({ selectedInvoice }: TableDrawerProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [invoice, setInvoice] = useState<Invoice>({ _id: "", market: "", date: "", products: [], total: 0 });

  useEffect(() => {
    async function getInvoice() {
      if (!selectedInvoice) return;
      try {
        const response = await axios.get(`https://nf-api-server.vercel.app/purchases/${selectedInvoice}`);
        console.log(response.data);
        setInvoice(response.data);
      } catch (error) {
        console.error("Erro buscar a compra no drawer", error);
      } finally {
        setLoading(false);
      }
    }

    getInvoice();
  }, [selectedInvoice]);

  const handleDeletePurchase = async () => {
    try {
      await axios.delete(`https://nf-api-server.vercel.app/purchases/${invoice._id}`);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir a compra", error);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger id="drawer-trigger" />
      <DrawerContent className="focus:outline-none p-2">
        <DrawerHeader>
          <DrawerTitle>Itens comprados</DrawerTitle>
          <DrawerDescription>Listagem de produtos adquiridos</DrawerDescription>
        </DrawerHeader>
        {loading ? (
          <div className="flex items-center justify-center min-h-full h-20 w-full">
            <div className="flex items-center">
              <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
              Por favor aguarde...
            </div>
          </div>
        ) : (
          <Table className="my-10 font-mono text-md">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="text-start">Qtd/KG</TableHead>
                <TableHead className="text-right">Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-start">{product.quantity}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <DrawerFooter>
          <Button className="flex gap-2" onClick={() => handleDeletePurchase()}>
            <CircleAlert />
            Excluir compra
          </Button>
          <DrawerClose>
            <Button className="flex w-full" variant="outline">
              Fechar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
