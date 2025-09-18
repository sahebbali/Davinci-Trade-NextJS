import CallToActionSection from "@/components/landing/CallToActionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Layout from "@/components/landing/Layout";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import { Metadata } from "next";
const PAGE_TITLE = "Davinci Trade";
export const metadata: Metadata = {
  title: PAGE_TITLE,
  icons: {
    icon: "/logo.jpg", // path to your favicon
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
export default function Home() {
  return (
    <Layout>
      {/* <Head>
        <title>DaVinci-Trade | Intelligent Trading Platform</title>
        <meta name="description" content="Revolutionary platform for intelligent trading, empowering you with advanced tools and insights." />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
      {/* Footer is already included in Layout, so no need to put it here directly */}
    </Layout>
  );
}
