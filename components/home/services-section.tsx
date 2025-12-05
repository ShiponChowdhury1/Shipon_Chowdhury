import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, AnimatedCard } from '@/components/ui/animations';
import { Code, Palette, Sparkles } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  skills: string[];
}

const services: Service[] = [
  {
    icon: Code,
    title: 'Frontend Development',
    description:
      'Building responsive, interactive web applications with React, Next.js, TypeScript, and modern CSS frameworks.',
    color: 'from-blue-500 to-cyan-500',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: Sparkles,
    title: 'Backend Development',
    description:
      'Creating RESTful APIs and server-side applications with Node.js, Express, MongoDB, and PostgreSQL databases.',
    color: 'from-green-500 to-emerald-500',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  },
  {
    icon: Palette,
    title: 'Full-Stack Projects',
    description:
      'End-to-end web applications with authentication, real-time features, payment integration, and cloud deployment.',
    color: 'from-purple-500 to-pink-500',
    skills: ['MERN Stack', 'JWT', 'Socket.io', 'Vercel'],
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Combining design thinking with technical expertise to deliver exceptional digital experiences
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedCard key={service.title} delay={index * 0.1}>
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-blue-500/20 group">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="text-white" size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {service.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
