import React, { useState, useEffect, useRef } from 'react';
import profileImg from '@/../public/icons/2.jpg';
import { type Skill } from '@/types';
import { ReactIcon, TypeScriptIcon, NodeJsIcon, TailwindIcon, FigmaIcon, JavaScriptIcon, NextJsIcon, HTMLIcon, CSSIcon, GitIcon } from '@/components/icons/SkillIcons';
import { DiDocker, DiMongodb, DiPostgresql, DiPython } from 'react-icons/di';
import { FaAngular, FaPython } from 'react-icons/fa';
import { PiNotionLogo, PiNotionLogoBold } from 'react-icons/pi';
import { FaDocker, FaVuejs } from 'react-icons/fa6';
import { SiMongodb, SiPostgresql } from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';



const skills: Skill[] = [
  { name: 'React', icon: ReactIcon, className: 'text-sky-500' },
  { name: 'TypeScript', icon: TypeScriptIcon, className: 'text-blue-600' },
  { name: 'JavaScript', icon: JavaScriptIcon, className: 'text-yellow-400' },
  { name: 'Next.js', icon: NextJsIcon, className: 'text-sky' },
  { name: 'Node.js', icon: NodeJsIcon, className: 'text-green-500' },
  { name: 'Tailwind CSS', icon: TailwindIcon, className: 'text-teal-500' },
  { name: 'HTML5', icon: HTMLIcon, className: 'text-orange-600' },
  { name: 'CSS3', icon: CSSIcon, className: 'text-blue-500' },
  { name: 'Figma', icon: FigmaIcon, className: 'text-pink-500' },
  { name: 'Git', icon: GitIcon, className: 'text-red-600' },
  { name: 'Python', icon: FaPython, className: 'text-sky-600' },
  { name: 'Angular', icon: FaAngular, className: 'text-red-600' },
  { name: 'Docker', icon: FaDocker, className: 'text-sky-500' },
  { name: 'Mongodb', icon: SiMongodb, className: 'text-green-500' },
  { name: 'vscode', icon: BiLogoVisualStudio, className: 'text-blue-500' },
];

const About: React.FC = () => {
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
      id="about"
      ref={sectionRef}
      className={`py-20 bg-white dark:bg-dark-secondary transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-dark dark:text-light">Sobre Mí</h2>
          <p className="text-lg text-medium dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Un vistazo a quién soy, mis habilidades y lo que me apasiona.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 flex justify-center group">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              <div className="absolute top-0 left-0 w-full h-full bg-primary/20 rounded-lg transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={profileImg}
                  alt="Foto de perfil de Nicolas Grajales"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-4">Una breve introducción</h3>
            <p className="text-medium dark:text-slate-400 mb-4 leading-relaxed">
              Soy una persona apasionada por el fútbol, siempre en busca de nuevas experiencias que me permitan aprender y crecer. Me encanta la tecnología y cómo esta puede transformar el mundo, además de sentir un gran interés por los negocios y el emprendimiento. Me considero alguien curioso, motivado y con muchas ganas de seguir explorando nuevas oportunidades que me ayuden a desarrollarme tanto personal como profesionalmente
            </p>
            <p className="text-medium dark:text-slate-400 leading-relaxed">
              Cuando no estoy programando, me encontrarás aprendiendo cosas nuevas, compartiendo momentos con mi familia o disfrutando de una buena película. Me gusta aprovechar el tiempo para descubrir nuevas experiencias que me inspiren y me ayuden a crecer tanto personal como profesionalmente.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-12 text-center">Mis Habilidades</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white dark:hover:bg-slate-700 hover:-translate-y-2 hover:scale-105 cursor-pointer`}
                style={{ transitionDelay: `${index * 100}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}
              ><skill.icon className={`h-10 w-10 ${skill.className} transition-all duration-300`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;