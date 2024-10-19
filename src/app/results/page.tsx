"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableDrawer from "@/components/TableDrawer";
import { ShoppingCart } from "lucide-react";
import { SelectDate } from "@/components/selectDate";
import dayjs from "dayjs";

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

export default function TableResultsPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>(undefined);

  useEffect(() => {
    async function getPurchases() {
      try {
        const response = await axios.get(`https://nf-api-server.vercel.app/purchases/month/${selectedMonth}`);
        console.log(response.data);
        setInvoices(response.data);
      } catch (error) {
        console.error("Erro buscar novas compras", error);
      } finally {
        setLoading(false);
      }
    }

    getPurchases();
  }, [selectedMonth]);

  //TODO - Implementar a lógica de loading
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-full h-96 w-full">
  //       <div className="flex items-center">
  //         <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
  //         Por favor aguarde...
  //       </div>
  //     </div>
  //   );
  // }

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    const triggerButton = document.getElementById("drawer-trigger");
    if (triggerButton) {
      triggerButton.click();
    }
  };

  const formatTotalValue = (invoices: Invoice[]) => {
    return "R$" + invoices.reduce((acc, invoice) => acc + invoice.total, 0).toFixed(2);
  };

  const formatDate = (date: string) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  return (
    <div className="p-2 mt-8 max-w-4xl mx-auto">
      <div className="shadow-md rounded-md px-2">
        <h1 className="flex flex-row justify-center text-center pb-2 font-black text-xl gap-4">
          <ShoppingCart />
          Minhas compras
        </h1>

        <div className="flex flex-col my-4 justify-center items-center">
          <h2 className="py-4 font-semibold underline first-letter:uppercase tracking-wide">seleção de compras</h2>
          <SelectDate selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </div>

        <div>
          {invoices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compra</TableHead>
                  <TableHead className="text-start">Data</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice._id} onClick={() => handleRowClick(invoice._id)}>
                    <TableCell className="py-3 font-medium truncate max-w-40 uppercase">{invoice.market}</TableCell>
                    <TableCell className="text-start">{formatDate(invoice.date)}</TableCell>
                    <TableCell className="text-right">{invoice.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">{formatTotalValue(invoices)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-80">
              <p className="text-center">Nenhuma compra encontrada</p>
            </div>
          )}
          <TableDrawer selectedInvoice={selectedInvoice} />
        </div>
      </div>
    </div>
  );
}
