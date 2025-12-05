'use client';

import { Button } from '@/components/ui/button';
import { SlideIn } from '@/components/ui/animations';
import Image from 'next/image';
import { SocialLinks } from '@/components/shared/social-links';
import { Stats } from './stats';
import Typewriter from 'typewriter-effect';

export function HeroSection() {
  return (
    <section
      id="home"
      className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <SlideIn direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Junior Full-Stack
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  JavaScript Developer
                </span>
              </h1>
            </SlideIn>

            <SlideIn direction="up" delay={0.2}>
              <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                <Typewriter
                  options={{
                    strings: [
                      'Building modern web applications with React, Node.js, and MongoDB',
                      'Creating responsive and dynamic user interfaces',
                      'Developing full-stack solutions with Next.js and Express',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                    deleteSpeed: 30,
                  }}
                />
              </div>
            </SlideIn>

            <SlideIn direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-3 items-center">
                <a href="/resume.pdf" download>
                  <Button
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-950 text-sm px-6 py-2.5"
                  >
                    Download Resume
                  </Button>
                </a>

                <SocialLinks />
              </div>
            </SlideIn>

            <Stats />
          </div>

          {/* Right Side - Image */}
          <SlideIn direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl animate-float">
                <Image
                  src="/shipon.jpg"
                  alt="Shipon Chowdhury"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full aspect-square"
                  priority
                />
              </div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
