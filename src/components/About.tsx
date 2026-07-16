import React, { useState, useEffect, useRef } from 'react';
import { type Skill } from '@/types';
import Reveal from '@/components/Reveal';
import {
   
  ReactIcon, 
    TypeScriptIcon, 
    NodeJsIcon, 
    TailwindIcon, 
    FigmaIcon, 
    JavaScriptIcon, 
    NextJsIcon, 
    HTMLIcon, 
    CSSIcon, 
    GitIcon 
} from '@/components/Icons/SkillIcons';
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
  { name: 'Postgresql', icon: SiPostgresql, className: 'text-blue-700' },
  { name: 'Notion', icon: PiNotionLogoBold, className: 'text-black dark:text-white' },
  { name: 'Vue.js', icon: FaVuejs, className: 'text-green-500' },
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
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-dark dark:text-light">Sobre Mí</h2>
          <p className="text-lg text-medium dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Un vistazo a quién soy, mis habilidades y lo que me apasiona.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <Reveal className="lg:col-span-2 flex justify-center group" delay={100}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              <div className="absolute top-0 left-0 w-full h-full bg-primary/20 rounded-lg transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="/icons/2.jpg"
                  alt="Foto de perfil de Nicolas Grajales"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={200}>
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-4">Una breve introducción</h3>
            <p className="text-medium dark:text-slate-400 mb-4 leading-relaxed">
              Soy una persona apasionada por el fútbol, siempre en busca de nuevas experiencias que me permitan aprender y crecer. Me encanta la tecnología y cómo esta puede transformar el mundo, además de sentir un gran interés por los negocios y el emprendimiento. Me considero alguien curioso, motivado y con muchas ganas de seguir explorando nuevas oportunidades que me ayuden a desarrollarme tanto personal como profesionalmente
            </p>
            <p className="text-medium dark:text-slate-400 leading-relaxed">
              Cuando no estoy programando, me encontrarás aprendiendo cosas nuevas, compartiendo momentos con mi familia o disfrutando de una buena película. Me gusta aprovechar el tiempo para descubrir nuevas experiencias que me inspiren y me ayuden a crecer tanto personal como profesionalmente.
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-12 text-center">Mis Habilidades</h3>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <Reveal
                key={skill.name}
                delay={index * 80}
                className="group flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:bg-white dark:hover:bg-slate-700 hover:-translate-y-2 hover:scale-105 cursor-pointer"
              >
                <skill.icon className={`h-10 w-10 ${skill.className} transition-all duration-300`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-10 text-center">Mi Trayectoria</h3>
          </Reveal>
          <ol className="relative border-l-2 border-primary/30 ml-4 md:mx-auto max-w-2xl">
            {[
              { year: '2024', title: 'Desarrollador Full Stack', desc: 'Construcción de aplicaciones web con React, TypeScript y Node.js, integrando APIs RESTful.' },
              { year: '2023', title: 'Proyectos académicos & DSS', desc: 'Sistemas de soporte a decisiones y comparadores de datos con Spring Boot y PostgreSQL.' },
              { year: '2022', title: 'Emprendimiento & Arepas', desc: 'Sistema de gestión para empresa familiar (Laravel), optimizando procesos internos.' },
            ].map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 120} className="mb-10 ml-6">
                <span className="absolute -left-[9px] flex h-4 w-4 rounded-full bg-primary ring-4 ring-white dark:ring-dark-secondary"></span>
                <time className="mb-1 text-sm font-semibold text-primary">{item.year}</time>
                <h4 className="text-lg font-bold font-heading text-dark dark:text-light">{item.title}</h4>
                <p className="text-medium dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
};

export default About;