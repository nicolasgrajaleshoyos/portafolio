
import React, { useState, useEffect, useRef } from 'react';

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
    ['Desarrollador full stack', 'Creador de experiencias digitales', 'Soy un entusiasta de las monedas digitales y el hacking ético'],
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
      className={`relative min-h-screen flex items-center overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-blue-100 dark:from-slate-900 dark:via-dark dark:to-slate-800 bg-[length:200%_200%] animate-gradient-shift"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          <div className={`md:w-1/2 text-center md:text-left transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-dark dark:text-light leading-tight mb-4">
              Hola, soy <span className="text-primary">Nicolas Grajales</span>
            </h1>
            <p className="text-lg md:text-2xl text-medium dark:text-slate-400 mb-8 h-8">
              <span className="font-semibold">{typedText}</span>
              <span className="inline-block w-0.5 h-7 ml-1 bg-primary animate-blink"></span>
            </p>
          </div>

          <div className={`md:w-1/2 flex justify-center transition-all duration-1000 ease-out delay-200 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
             <div className="relative group animate-float motion-reduce:animate-none">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-slate-700">
                  <img
                    src="https://avatars.githubusercontent.com/u/130097149?v=4?s=400"
                    alt="Foto de perfil"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
