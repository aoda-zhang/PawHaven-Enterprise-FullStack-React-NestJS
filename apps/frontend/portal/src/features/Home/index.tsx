import { useNavigate } from 'react-router-dom';

import { RescueCasesSection } from '../RescueCases/components/RescueCasesSection';

import { AdoptablePetsSection } from './components/AdoptablePetsSection';
import { Hero } from './components/Hero';
import { StrayCTA } from './components/StrayCTA';

import { useHomeData } from '@/api/home.queries';

export const Home = () => {
  const navigate = useNavigate();
  const { data: homeData } = useHomeData();
  const latestRescues = homeData?.latestRescues ?? [];
  const adoptablePets = homeData?.adoptablePets ?? [];

  const handleCaseClick = (id: string) => {
    navigate(`/rescue/detail/${id}`);
  };

  const handleSeeAll = () => {
    navigate('/rescue-cases');
  };

  const handlePetClick = (id: string) => {
    navigate(`/adopt/detail/${id}`);
  };

  const handleSeeAllPets = () => {
    navigate('/adopt');
  };

  return (
    <div className="flex flex-col">
      <Hero />
      <RescueCasesSection
        cases={latestRescues}
        onCaseClick={handleCaseClick}
        onSeeAll={handleSeeAll}
        showStatusSummary={false}
      />
      <AdoptablePetsSection
        pets={adoptablePets}
        onPetClick={handlePetClick}
        onSeeAll={handleSeeAllPets}
      />

      <StrayCTA />
    </div>
  );
};
