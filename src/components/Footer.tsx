import React from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '@/components/Icons/SocialIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-slate-400 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center gap-6 mb-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110">
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-all duration-300 hover:scale-110">
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
        <p className="text-sm">&copy; {currentYear} Nicolas Grajales. Todos los derechos reservados.</p>
        <p className="text-xs mt-2 opacity-70">si lo puedes soñar lo puedes programar .</p>
      </div>
    </footer>
  );
};

export default Footer;