import TopBar from '@/components/layout/topbar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CategoryBar from '@/components/sections/category-bar';
import TickerBar from '@/components/sections/ticker-bar';
import SearchBar from '@/components/sections/search-bar';
import HeroBanner from '@/components/sections/hero-banner';
import ServiceCards from '@/components/sections/service-cards';
import FeatureCards from '@/components/sections/feature-cards';
import Resources from '@/components/sections/resources';
import PartnershipForm from '@/components/sections/partnership-form';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <TopBar />
      <Header />
      <CategoryBar />
      <TickerBar />
      <SearchBar />
      <HeroBanner />
      <ServiceCards />
      <FeatureCards />
      {/* New sections will go here */}
      <Resources />
      <PartnershipForm />
      <Footer />
    </div>
  );
}

