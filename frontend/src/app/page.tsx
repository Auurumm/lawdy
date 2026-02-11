import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import ProcessSteps from '@/components/ProcessSteps';
import Statistics from '@/components/Statistics';
import MainFeatures from '@/components/MainFeatures';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f2f3f8]">
      <Header />
      <Hero />
      <FeatureCards />
      <ProcessSteps />
      <Statistics />
      <MainFeatures />
      <CTA />
      <Footer />
    </main>
  );
}
