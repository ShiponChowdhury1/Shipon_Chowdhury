import { SectionHeader } from '@/components/shared/section-header';
import { FadeIn } from '@/components/ui/animations';

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="Who I Am"
          description="Passionate about creating exceptional web experiences"
        />

        <FadeIn>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              I'm <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#AD86FF] to-[#789AFF]">Shipon</span>, a passionate Junior Full-Stack Developer with a strong command of modern web technologies and a keen eye for detail. With expertise in <span className="font-semibold text-gray-900 dark:text-white">HTML, CSS, JavaScript</span>, and front-end frameworks like <span className="font-semibold text-gray-900 dark:text-white">React.js and Redux</span>, I bring user interfaces to life with clean, responsive, and dynamic designs.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-6">
              On the back-end, I harness the power of <span className="font-semibold text-gray-900 dark:text-white">Node.js, Express.js, and TypeScript</span> to build robust, scalable applications. My experience with <span className="font-semibold text-gray-900 dark:text-white">Next.js</span> enhances my ability to deliver fast, SEO-optimized solutions, while my proficiency in <span className="font-semibold text-gray-900 dark:text-white">Git and version control</span> ensures smooth collaboration in any team environment.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-6">
              I thrive on problem-solving, continuously learning, and staying up-to-date with the latest trends in web development to create innovative solutions that meet both user needs and business goals. <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#AD86FF] to-[#789AFF]">Let's build something exceptional together!</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
