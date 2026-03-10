import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import RecipeGenerator from '@/components/generator/RecipeGenerator';
import BenefitsSection from '@/components/home/BenefitsSection';
import SampleRecipes from '@/components/home/SampleRecipes';
import PartnersSection from '@/components/home/PartnersSection';
import SocialProofSection from '@/components/home/SocialProofSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />

      {/* Generator Section */}
      <section className="py-20 bg-gradient-to-b from-white to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecipeGenerator />
        </div>
      </section>

      <BenefitsSection />
      <SampleRecipes />
      <PartnersSection />
      <SocialProofSection />
    </>
  );
}
