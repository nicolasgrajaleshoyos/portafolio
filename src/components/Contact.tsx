import React, { useState, useEffect, useRef } from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '@/components/icons/SocialIcons';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-20 bg-white dark:bg-dark-secondary overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-16 -translate-y-16 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full translate-x-16 translate-y-16 blur-3xl"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-dark dark:text-light">Ponte en Contacto</h2>
        <p className="text-lg text-medium dark:text-slate-400 mt-4 mb-8 max-w-xl mx-auto">
          ¿Interesado en colaborar o simplemente quieres saludar? No dudes en contactarme. ¡Siempre estoy abierto a nuevas oportunidades!
        </p>
        <div className="flex justify-center items-center gap-8 mb-10">
          <a href="https://github.com/nicolasgrajaleshoyos" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
            <GitHubIcon className="h-9 w-9" />
          </a>
          <a href="https://www.linkedin.com/in/nicolas-grajales-hoyos-12182a353/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
            <LinkedInIcon className="h-9 w-9" />
          </a>
          <a href="nicolasgrajaleshoyos@gmail.com" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
            <EmailIcon className="h-9 w-9" />
          </a>
        </div>
        <a href="nicolasgrajaleshoyos@gmail.com" className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-primary-hover transform hover:-translate-y-1 transition-all duration-300 text-lg">
          Envíame un Email
        </a>
      </div>
    </section>
  );
};

export default Contact;