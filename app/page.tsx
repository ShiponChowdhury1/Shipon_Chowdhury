import { getProjects } from '@/server/actions/project.actions';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/home/hero-section';
import { ServicesSection } from '@/components/home/services-section';
import { ProjectsSection } from '@/components/projects/projects-section';
import { AboutSection } from '@/components/about/about-section';
import { ContactSection } from '@/components/contact/contact-section';
import type { Metadata } from 'next';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Shipon Chowdhury\'s portfolio - Junior Full-Stack JavaScript Developer specializing in modern web technologies',
};

export default async function Home() {
  const result = await getProjects({ status: 'published' });
  const allProjects = result.success ? result.data : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection projects={allProjects} />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
