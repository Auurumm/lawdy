import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContractForm from '@/components/contract/ContractForm';

export default function ContractPage() {
  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />
      <ContractForm />
      <Footer />
    </main>
  );
}