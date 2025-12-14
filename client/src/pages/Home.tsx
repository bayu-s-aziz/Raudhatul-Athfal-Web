import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ProgramsPreview } from "@/components/home/ProgramsPreview";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <ProgramsPreview />
      <CTASection />
    </Layout>
  );
}
