import { PurchasesClientComponent } from '@/components/PurchasesClientComponent';

async function getPurchases() {
  const res = await fetch('https://nf-api-server.vercel.app/purchases', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch purchases');
  }
  return res.json();
}

export default async function PurchasesPage() {
  const initialInvoices = await getPurchases();

  return <PurchasesClientComponent initialInvoices={initialInvoices} />;
}
