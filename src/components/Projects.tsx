import React, { useState } from 'react';
import { type Project } from '@/types';
import { GitHubIcon, ExternalLinkIcon } from '@/components/Icons/SocialIcons.tsx';
import Reveal from '@/components/Reveal';

const projects: Project[] = [
  {
    id: 1,
    title: 'DSS Comparador de Países Backend',
    description: 'Backend del sistema de soporte a decisiones (DSS) para comparar países, proporcionando una API RESTful para gestionar y servir datos estadísticos e indicadores globales.',
    imageUrl: '/icons/backend.webp',
    tags: ['Spring Boot', 'Java', 'PostgreSQL', 'REST API'],
    category: 'backend',
    badge: '🎓 Académico & DSS',
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/DSS-Comparador-de-Pa-ses-Backend',
  },
  {
    id: 2,
    title: 'DSS Comparador de Países Frontend',
    description: 'Un sistema de soporte a decisiones (DSS) que permite comparar países utilizando análisis de datos, filtros avanzados y visualizaciones interactivas.',
    imageUrl: '/icons/frontend.webp',
    tags: ['TypeScript', 'Tailwind CSS', 'JavaScript', 'Chart.js'],
    category: 'frontend',
    badge: '🎓 Académico & DSS',
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/DSS-Comparador-de-Pa-ses-Frontend',
  },
  {
    id: 3,
    title: 'Sitio Web de Portafolio',
    description: 'Portafolio web personal, moderno y responsive diseñado con modo oscuro, animaciones fluidas y mejores prácticas de SEO.',
    imageUrl: '/icons/portafolio.png',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'],
    category: 'fullstack',
    badge: '🚀 En Producción',
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/portafolio',
  },
  {
    id: 4,
    title: 'Sistema para Empresa de Arepas',
    description: 'Sistema de software desarrollado a medida para una empresa familiar productora de arepas en Popayán, optimizando la gestión de inventario, ventas y clientes.',
    imageUrl: '/icons/arepas.png',
    tags: ['Laravel', 'Laravel Native', 'PHP', 'MySQL'],
    category: 'fullstack',
    badge: '🏢 Impacto Real en Negocio',
    codeUrl: 'https://github.com/nicolasgrajaleshoyos/arpas_el_buen_sabor',
  },
];

type CategoryFilter = 'all' | 'fullstack' | 'backend' | 'frontend';

const categories: { label: string; value: CategoryFilter }[] = [
  { label: 'Todos', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="flex flex-col h-full bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
    >
      <div className="relative overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
        {/* Badge de tipo de proyecto */}
        {project.badge && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-dark/80 dark:bg-dark-secondary/90 text-cyan-300 backdrop-blur-md shadow-md border border-cyan-500/20">
              {project.badge}
            </span>
          </div>
        )}

        {/* 🖼 Imagen con efecto de carga */}
        <div className="w-full h-full bg-gray-200 dark:bg-slate-700 animate-pulse absolute inset-0" style={{ display: loaded ? 'none' : 'block' }}></div>
        <img
          src={project.imageUrl}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute bottom-0 left-0 p-5 w-full">
          <h3 className="text-xl font-bold text-white mb-2 font-heading leading-snug">{project.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <span key={tag} className="bg-primary/85 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Acciones flotantes superiores */}
        <div className="absolute top-3 right-3 z-20 flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/30 text-white hover:bg-primary backdrop-blur-md transform hover:scale-110 transition-all duration-300 shadow-md"
              aria-label="Ver demo en vivo"
              title="Ver demo en vivo"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/30 text-white hover:bg-primary backdrop-blur-md transform hover:scale-110 transition-all duration-300 shadow-md"
              aria-label="Ver código en GitHub"
              title="Ver código en GitHub"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-grow">
        <p className="text-medium dark:text-slate-300 text-sm leading-relaxed mb-5">{project.description}</p>
        
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {project.category?.toUpperCase() || 'PROYECTO'}
          </span>
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
            >
              <GitHubIcon className="h-4 w-4" />
              Explorar Repositorio →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// 🧱 Componente principal de proyectos
const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-dark transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Portafolio</span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-dark dark:text-light">Proyectos Destacados</h2>
          <p className="text-base sm:text-lg text-medium dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Soluciones reales, aplicaciones web y arquitecturas diseñadas con código limpio y buenas prácticas.
          </p>

          {/* 🏷 Pestañas de Filtro */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
