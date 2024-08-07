'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableDrawer from '@/components/TableDrawer';
import { ShoppingCart } from 'lucide-react';

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

interface PurchasesClientComponentProps {
  initialInvoices: Invoice[];
}

export function PurchasesClientComponent({
  initialInvoices,
}: PurchasesClientComponentProps) {
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<string>("");

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice._id);
    const triggerButton = document.getElementById('drawer-trigger');
    if (triggerButton) {
      triggerButton.click();
    }
  };

  const formatTotalValue = (invoices: Invoice[]) => {
    return (
      'R$' +
      invoices.reduce((acc, invoice) => acc + invoice.total, 0).toFixed(2)
    );
  };

  return (
    <div className='p-2 mt-8 max-w-4xl mx-auto pb-16'>
      <div className='shadow-md rounded-md px-2'>
        <h1 className='flex flex-row justify-center text-center pb-2 font-black text-xl gap-4'>
          <ShoppingCart />
          Minhas compras
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Compra</TableHead>
              <TableHead className='text-start'>Data</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice._id}
                onClick={() => handleRowClick(invoice)}
              >
                <TableCell className='font-medium'>{invoice.market}</TableCell>
                <TableCell className='text-start'>{invoice.date}</TableCell>
                <TableCell className='text-right'>{invoice.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className='text-right'>
                {formatTotalValue(invoices)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <TableDrawer selectedInvoice={selectedInvoice} />
      </div>
    </div>
  );
}
