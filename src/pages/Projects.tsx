import React, { useState, useEffect, useRef } from 'react';
import { type Project } from '@/types';
import { GitHubIcon, ExternalLinkIcon } from '@/components/icons/SocialIcons';
import profileImg1 from '/portafolio.png';

const projects: Project[] = [
  {
    id: 1,
    title: 'Plataforma E-commerce',
    description: 'Una plataforma de comercio electrónico completa con carrito de compras, pasarela de pago y panel de administración.',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'Stripe', 'Tailwind CSS'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'App de Gestión de Tareas',
    description: 'Una aplicación Kanban para organizar tareas con funcionalidad de arrastrar y soltar, tableros personalizables y colaboración en equipo.',
    imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
    tags: ['TypeScript', 'React', 'Firebase'],
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: 'Sitio Web de Portafolio',
    description: 'Un portafolio personal y dinámico para mostrar mis proyectos y habilidades (¡esta misma página!).',
    imageUrl: profileImg1,
    tags: ['React', 'Tailwind CSS', 'Vite'],
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'Visualizador de Datos Climáticos',
    description: 'Un dashboard interactivo que muestra datos climáticos históricos y en tiempo real utilizando D3.js para las visualizaciones.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    tags: ['D3.js', 'React', 'API REST'],
    liveUrl: '#',
    codeUrl: '#',
  },
];

const ProjectCard: React.FC<{ project: Project; isVisible: boolean; index: number }> = ({ project, isVisible, index }) => {
  return (
    <div
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`bg-white dark:bg-dark-secondary rounded-lg shadow-lg overflow-hidden group transition-all duration-700 ease-out hover:shadow-2xl hover:!opacity-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
    >
      <div className="relative overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <h3 className="text-xl font-bold text-white mb-2 font-heading">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
                <span key={tag} className="bg-primary/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                {tag}
                </span>
            ))}
            </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
             {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transform hover:scale-110 transition-all duration-300" aria-label="Live Demo">
                <ExternalLinkIcon className="h-5 w-5" />
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transform hover:scale-110 transition-all duration-300" aria-label="Source Code">
                <GitHubIcon className="h-5 w-5" />
              </a>
            )}
        </div>
      </div>
      <div className="p-6">
        <p className="text-medium dark:text-slate-400 text-sm leading-relaxed">{project.description}</p>
      </div>
    </div>
  );
};


const Projects: React.FC = () => {
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
      id="projects"
      ref={sectionRef}
      className={`py-20 bg-slate-50 dark:bg-dark`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-dark dark:text-light">Mis Proyectos</h2>
          <p className="text-lg text-medium dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Aquí hay algunos de los proyectos en los que he trabajado recientemente.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} isVisible={isVisible} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;