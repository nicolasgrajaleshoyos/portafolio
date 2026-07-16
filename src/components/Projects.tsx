import React, { useState } from 'react';
import { type Project } from '@/types';
import { GitHubIcon, ExternalLinkIcon } from '@/components/Icons/SocialIcons.tsx';
import Reveal from '@/components/Reveal';


const projects: Project[] = [
  {
    id: 1,
    title: 'DSS Comparador de Países Backend',
    description: 'Backend del sistema de soporte a decisiones (DSS) para comparar países, proporcionando una API RESTful para gestionar y servir datos.',
    imageUrl: '/icons/backend.webp', // ✅ Ruta correcta para producción
    tags: ['Spring Boot', 'Java', 'PostgreSQL'],
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/DSS-Comparador-de-Pa-ses-Backend',
  },
  {
    id: 2,
    title: 'DSS Comparador de Países Frontend',
    description: 'Un sistema de soporte a decisiones (DSS) que permite comparar países utilizando análisis de datos y visualizaciones interactivas.',
    imageUrl: '/icons/frontend.webp',
    tags: ['TypeScript', 'Tailwind CSS', 'JavaScript'],
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/DSS-Comparador-de-Pa-ses-Frontend',
  },
  {
    id: 3,
    title: 'Sitio Web de Portafolio',
    description: 'Un portafolio personal y dinámico para mostrar mis proyectos y habilidades (¡esta misma página!).',
    imageUrl: '/icons/portafolio.png',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/portafolio',
  },
  {
    id: 4,
    title: 'Sistema para Empresa de Arepas',
    description: 'Proyecto desarrollado para una empresa familiar productora de arepas en Popayán, diseñado para optimizar sus procesos.',
    imageUrl: '/icons/arepas.png',
    tags: ['Laravel', 'Laravel Native', 'App de Escritorio'],
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/arpas_el_buen_sabor',
  },
];


const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg overflow-hidden group transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="relative overflow-hidden">
        {/* 🖼 Imagen con efecto de carga */}
        <div className="w-full h-56 bg-gray-200 dark:bg-slate-700 animate-pulse absolute inset-0" style={{ display: loaded ? 'none' : 'block' }}></div>
        <img
          src={project.imageUrl}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'
            }`}
        />

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
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transform hover:scale-110 transition-all duration-300"
              aria-label="Live Demo"
            >
              <ExternalLinkIcon className="h-5 w-5" />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-sm transform hover:scale-110 transition-all duration-300"
              aria-label="Source Code"
            >
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

// 🧱 Componente principal de proyectos
const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-dark dark:text-light">Mis Proyectos</h2>
          <p className="text-lg text-medium dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Aquí hay algunos de los proyectos en los que he trabajado recientemente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 120}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
