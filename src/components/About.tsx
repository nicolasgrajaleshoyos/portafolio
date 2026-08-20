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
import { GraduationCapIcon, AwardIcon } from '@/components/Icons/SocialIcons.tsx';
import { FaPython, FaDocker, FaVuejs, FaAngular } from 'react-icons/fa6';
import { SiMongodb, SiPostgresql } from 'react-icons/si';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { PiNotionLogoBold } from 'react-icons/pi';

const skills: Skill[] = [
  { name: 'React', icon: ReactIcon, className: 'text-sky-500' },
  { name: 'TypeScript', icon: TypeScriptIcon, className: 'text-blue-600' },
  { name: 'JavaScript', icon: JavaScriptIcon, className: 'text-yellow-400' },
  { name: 'Next.js', icon: NextJsIcon, className: 'text-slate-800 dark:text-white' },
  { name: 'Node.js', icon: NodeJsIcon, className: 'text-green-500' },
  { name: 'Tailwind CSS', icon: TailwindIcon, className: 'text-teal-500' },
  { name: 'HTML5', icon: HTMLIcon, className: 'text-orange-600' },
  { name: 'CSS3', icon: CSSIcon, className: 'text-blue-500' },
  { name: 'PostgreSQL', icon: SiPostgresql, className: 'text-blue-700' },
  { name: 'MongoDB', icon: SiMongodb, className: 'text-green-500' },
  { name: 'Python', icon: FaPython, className: 'text-sky-600' },
  { name: 'Angular', icon: FaAngular, className: 'text-red-600' },
  { name: 'Vue.js', icon: FaVuejs, className: 'text-emerald-500' },
  { name: 'Docker', icon: FaDocker, className: 'text-sky-500' },
  { name: 'Git', icon: GitIcon, className: 'text-red-600' },
  { name: 'Figma', icon: FigmaIcon, className: 'text-pink-500' },
  { name: 'VS Code', icon: BiLogoVisualStudio, className: 'text-blue-500' },
  { name: 'Notion', icon: PiNotionLogoBold, className: 'text-black dark:text-white' },
];

const stats = [
  { value: '+3', label: 'Años de Experiencia & Código' },
  { value: '10+', label: 'Proyectos & Soluciones Creadas' },
  { value: '18+', label: 'Tecnologías & Herramientas' },
  { value: '100%', label: 'Enfoque en Calidad & Buenas Prácticas' },
];

const education = [
  {
    title: 'Ingeniería / Tecnología en Sistemas & Software',
    institution: 'Educación Superior',
    period: 'En curso / Graduado',
    description: 'Enfoque en arquitectura de software, bases de datos, algoritmos y desarrollo de aplicaciones web full stack.',
  },
  {
    title: 'Desarrollo Web Full Stack & Arquitectura',
    institution: 'Especialización & Aprendizaje Autónomo Continuo',
    period: '2022 - Presente',
    description: 'Profundización en React, TypeScript, Node.js, Spring Boot, microservicios y despliegues en la nube.',
  },
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
      className={`py-24 bg-white dark:bg-dark-secondary transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Conóceme</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-dark dark:text-light">Sobre Mí</h2>
          <p className="text-base sm:text-lg text-medium dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Desarrollador enfocado en construir experiencias digitales intuitivas, escalables y con alto impacto.
          </p>
        </Reveal>

        {/* 👤 Bio + Foto */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
          <Reveal className="lg:col-span-2 flex justify-center group" delay={100}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 animate-float motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              <div className="absolute top-0 left-0 w-full h-full bg-primary/20 rounded-2xl transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-100 dark:border-slate-700">
                <img
                  src="/icons/2.jpg"
                  alt="Nicolas Grajales"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={200}>
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-4">
              Impulsando soluciones digitales con pasión y dedicación
            </h3>
            <p className="text-medium dark:text-slate-300 mb-4 leading-relaxed text-base">
              Soy un desarrollador comprometido con el aprendizaje continuo y la innovación. Me apasiona el desarrollo full stack y la resolución de problemas mediante tecnologías modernas como React, TypeScript, Node.js, Spring Boot y Laravel.
            </p>
            <p className="text-medium dark:text-slate-300 leading-relaxed text-base">
              Disfruto el trabajo en equipo, la optimización de procesos de negocio y el diseño de código limpio y mantenible. Fuera del código, me gusta el fútbol, el constante aprendizaje y explorar oportunidades en negocios y ciberseguridad.
            </p>
          </Reveal>
        </div>

        {/* 📊 Métricas de Impacto */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-16">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 100}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 text-center shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 dark:to-cyan-300 mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>

        {/* 🎓 Formación & Certificaciones */}
        <div className="my-20">
          <Reveal className="text-center mb-10">
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light flex items-center justify-center gap-2">
              <GraduationCapIcon className="w-7 h-7 text-primary" />
              Educación & Formación
            </h3>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {education.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 120}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                      {item.period}
                    </span>
                    <AwardIcon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="text-lg font-bold text-dark dark:text-light mb-1">{item.title}</h4>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">{item.institution}</p>
                  <p className="text-xs sm:text-sm text-medium dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 🛠 Habilidades */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-12 text-center">
              Stack Tecnológico & Habilidades
            </h3>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <Reveal
                key={skill.name}
                delay={index * 50}
                className="group flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40 hover:bg-white dark:hover:bg-slate-700 hover:-translate-y-1.5 cursor-pointer"
              >
                <skill.icon className={`h-9 w-9 sm:h-10 sm:w-10 ${skill.className} transition-transform duration-300 group-hover:scale-110`} />
                <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 text-center">{skill.name}</span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ⏳ Trayectoria (Timeline corregido) */}
        <div className="mt-24">
          <Reveal>
            <h3 className="text-2xl font-bold font-heading text-dark dark:text-light mb-12 text-center">Mi Trayectoria</h3>
          </Reveal>
          <ol className="relative mx-auto ml-6 max-w-2xl border-l-2 border-primary/30 md:ml-auto md:mr-auto">
            {[
              { year: '2024', title: 'Desarrollador Full Stack', desc: 'Construcción de aplicaciones web interactivas y escalables con React, TypeScript y Node.js, integrando APIs RESTful y bases de datos.' },
              { year: '2023', title: 'Proyectos Académicos & Sistemas DSS', desc: 'Desarrollo de sistemas de soporte a decisiones y comparadores de métricas internacionales con Spring Boot, Java y PostgreSQL.' },
              { year: '2022', title: 'Emprendimiento & Software de Gestión', desc: 'Diseño e implementación de sistema de gestión a medida para empresa familiar (Laravel), optimizando tiempos de inventario y pedidos.' },
            ].map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 120} className="relative mb-10 pl-6 last:mb-0">
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-white dark:ring-dark-secondary"></span>
                <time className="mb-1 block text-sm font-bold text-primary">{item.year}</time>
                <h4 className="text-lg font-bold font-heading text-dark dark:text-light">{item.title}</h4>
                <p className="text-medium dark:text-slate-400 text-sm leading-relaxed mt-1">{item.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
};

export default About;