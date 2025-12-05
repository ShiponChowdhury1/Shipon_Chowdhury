import { Card, CardContent } from '@/components/ui/card';
import { AnimatedCard } from '@/components/ui/animations';
import { SectionHeader } from '@/components/shared/section-header';
import { ContactInfo } from './contact-info';
import { ContactForm } from './contact-form';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Work Together"
          description="Have a project in mind? Let's discuss how I can help bring your ideas to life."
        />

        <AnimatedCard delay={0.2}>
          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <ContactInfo />
                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>
      </div>
    </section>
  );
}
