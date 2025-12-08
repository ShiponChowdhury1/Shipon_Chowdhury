import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/ui/animations';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#101828]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="Who I Am"
          description="Passionate about creating exceptional web experiences"
        />

        <FadeIn>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  I&apos;m <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#AD86FF] to-[#789AFF]">Shipon</span>, a passionate Junior Full-Stack Developer with a strong command of modern web technologies and a keen eye for detail. With expertise in <span className="font-semibold text-gray-900 dark:text-white"> JavaScript</span>, and front-end frameworks like <span className="font-semibold text-gray-900 dark:text-white">React.js, Next.js, Astro.js  & Redux</span>, I bring user interfaces to life with clean, responsive, and dynamic designs.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  On the back-end, I harness the power of <span className="font-semibold text-gray-900 dark:text-white">Node.js, Express.js, and TypeScript</span> to build robust, scalable applications. My experience with <span className="font-semibold text-gray-900 dark:text-white">Next.js</span> enhances my ability to deliver fast, SEO-optimized solutions, while my proficiency in <span className="font-semibold text-gray-900 dark:text-white">Git and version control</span> ensures smooth collaboration in any team environment.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  I thrive on problem-solving, continuously learning, and staying up-to-date with the latest trends in web development to create innovative solutions that meet both user needs and business goals. <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-[#AD86FF] to-[#789AFF]">Let&apos;s build something exceptional together!</span>
                </p>
              </div>

              {/* Code Style Info Box */}
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl p-8 md:p-10 h-[350px] md:h-[400px] flex flex-col justify-center font-mono text-sm md:text-base border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[#ff6b9d]">function</span>{' '}
                      <span className="text-[#4ade80]">getAboutMe</span>
                      <span className="text-gray-900 dark:text-white">{'()'}</span>
                      <span className="text-gray-900 dark:text-white">{'{'}</span>
                    </div>
                    
                    <div className="pl-8 space-y-3">
                      <div className="relative group/item hover:bg-gray-100 dark:hover:bg-gray-800/50 px-2 py-1 rounded transition-colors cursor-pointer">
                        <span className="text-[#ff6b9d]">const</span>{' '}
                        <span className="text-gray-900 dark:text-white">Full_Name = </span>
                        <span className="text-[#ffa500]">&quot;Shipon Mia&quot;</span>
                        <span className="text-gray-900 dark:text-white">;</span>
                        <div className="absolute left-0 -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          My Name
                        </div>
                      </div>
                      
                      <div className="relative group/item hover:bg-gray-100 dark:hover:bg-gray-800/50 px-2 py-1 rounded transition-colors cursor-pointer">
                        <span className="text-[#ff6b9d]">let</span>{' '}
                        <span className="text-gray-900 dark:text-white">Occupation = </span>
                        <span className="text-[#ffa500]">&quot;</span>
                        <span className="text-[#ffa500]">Frontend</span>
                        <span className="text-gray-900 dark:text-white"> and Backend </span>
                        <span className="text-[#ffa500]">JavaScript Engineer</span>
                        <span className="text-[#ffa500]">&quot;</span>
                        <span className="text-gray-900 dark:text-white">;</span>
                        <div className="absolute left-0 -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          My Role
                        </div>
                      </div>
                      
                      <div className="relative group/item hover:bg-gray-100 dark:hover:bg-gray-800/50 px-2 py-1 rounded transition-colors cursor-pointer">
                        <span className="text-[#ff6b9d]">const</span>{' '}
                        <span className="text-gray-900 dark:text-white">Email = </span>
                        <span className="text-[#ffa500]">&quot;nxshipon@gmail.com&quot;</span>
                        <span className="text-gray-900 dark:text-white">;</span>
                        <div className="absolute left-0 -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          Contact Email
                        </div>
                      </div>
                      
                      <div className="relative group/item hover:bg-gray-100 dark:hover:bg-gray-800/50 px-2 py-1 rounded transition-colors cursor-pointer">
                        <span className="text-[#ff6b9d]">const</span>{' '}
                        <span className="text-gray-900 dark:text-white">Phone_Number = </span>
                        <span className="text-[#ffa500]">&quot;+8801619079402&quot;</span>
                        <span className="text-gray-900 dark:text-white">;</span>
                        <div className="absolute left-0 -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          Phone Number
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-900 dark:text-white">{'}'}</span>
                    </div>
                    
                    <div className="pt-2">
                      <span className="text-[#4ade80]">getAboutMe</span>
                      <span className="text-gray-900 dark:text-white">()</span>
                    </div>
                  </div>
                </div>
                {/* Decorative gradient background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#AD86FF] to-[#789AFF] rounded-2xl opacity-20 blur-2xl -z-10 group-hover:opacity-30 transition-opacity"></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
