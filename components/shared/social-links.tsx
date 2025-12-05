import { Github, Linkedin, Facebook, Twitter } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/shiponchowdhury',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/shiponchowdhury',
    icon: Linkedin,
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/shiponchowdhury',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/shiponchowdhury',
    icon: Twitter,
  },
];

export function SocialLinks() {
  return (
    <div className="flex gap-3 ml-2">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-[#AD86FF] to-[#789AFF] hover:from-[#9B6FFF] hover:to-[#6788FF] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            aria-label={link.name}
          >
            <Icon size={20} className="text-white" />
          </a>
        );
      })}
    </div>
  );
}
