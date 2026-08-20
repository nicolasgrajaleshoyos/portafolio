import React, { useState, useEffect, useRef } from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon, DownloadIcon, ArrowDownIcon } from '@/components/Icons/SocialIcons.tsx';
import { CONTACT_EMAIL } from '@/config';

const useTypingEffect = (words: string[], typeSpeed = 150, deleteSpeed = 100, delay = 1000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const updatedText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentWord) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

  return text;
};


const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const typedText = useTypingEffect(
    ['Desarrollador Full Stack', 'Creador de experiencias digitales', 'Entusiasta de la tecnología y el hacking ético'],
    100, 50, 2000
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
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
      id="home" 
      ref={sectionRef}
      className={`relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 transition-all duration-1000 ease-out md:pt-24 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-blue-100 dark:from-slate-900 dark:via-dark dark:to-slate-800 bg-[length:200%_200%] animate-gradient-shift"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-2xl animate-float motion-reduce:animate-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-2xl animate-float motion-reduce:animate-none" style={{ animationDelay: '-3s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          <div className={`md:w-1/2 text-center md:text-left transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* 🟢 Badge de Disponibilidad */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-sm shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Disponible para nuevos proyectos & empleo
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-dark dark:text-light leading-tight mb-4">
              Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-cyan-300">Nicolas Grajales</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-medium dark:text-slate-300 mb-8 min-h-[3.5rem] flex items-center justify-center md:justify-start">
              <span className="font-semibold">{typedText}</span>
              <span className="inline-block w-0.5 h-6 sm:h-7 ml-1 bg-primary animate-blink"></span>
            </p>

            {/* 🔘 Botones de Acción (CTAs) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 text-base"
              >
                Ver Proyectos
              </a>

              <a
                href="/cv.pdf"
                download="CV_Nicolas_Grajales.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-dark dark:text-light font-bold border border-slate-200 dark:border-slate-700 shadow-md hover:bg-slate-50 dark:hover:bg-slate-700/80 hover:border-primary/50 transform hover:-translate-y-0.5 transition-all duration-300 text-base"
              >
                <DownloadIcon className="w-5 h-5 text-primary" />
                Descargar CV
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl text-primary dark:text-cyan-400 font-semibold hover:bg-primary/10 transition-all duration-300 text-base"
              >
                Contáctame →
              </a>
            </div>

            {/* 🌐 Redes Sociales Rápidas */}
            <div className="flex items-center justify-center md:justify-start gap-5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">Sígueme:</span>
              <a
                href="https://github.com/nicolasgrajaleshoyos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nicolas-grajales-hoyos-12182a353/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              >
                <EmailIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out delay-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
             <div className="relative group animate-float motion-reduce:animate-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700 bg-slate-900">
                  <img
                    src="https://avatars.githubusercontent.com/u/130097149?v=4?s=400"
                    alt="Nicolas Grajales"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
