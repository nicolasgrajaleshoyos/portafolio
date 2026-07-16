import React, { useState, useEffect } from 'react';

const SECTIONS = ['home', 'about', 'projects', 'contact'];

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, active }) => (
  <a
    href={href}
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    className={`relative text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors duration-300 font-medium px-3 py-2 rounded-md text-sm group ${active ? 'text-primary dark:text-primary' : ''
      }`}
  >
    {children}
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-center transition-transform duration-300 ease-out ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
  </a>
);

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);
      setShowTop(scrollY > 400);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);

      // Sección activa: la última cuya parte superior ya pasó el umbral.
      const offset = 120;
      let current = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');

    if (!targetId) return;

    if (!/^#[a-zA-Z][\w-]*$/.test(targetId)) return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 64;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    closeMenu();
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navItems = (
    <>
      <NavLink href="#home" onClick={handleNavClick} active={activeSection === 'home'}>Inicio</NavLink>
      <NavLink href="#about" onClick={handleNavClick} active={activeSection === 'about'}>Sobre mí</NavLink>
      <NavLink href="#projects" onClick={handleNavClick} active={activeSection === 'projects'}>Proyectos</NavLink>
      <NavLink href="#contact" onClick={handleNavClick} active={activeSection === 'contact'}>Contacto</NavLink>
    </>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md dark:bg-dark/80' : 'bg-transparent'}`}>
        <div className="h-1 w-full bg-transparent">
          <div
            className="h-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
            role="progressbar"
            aria-label="Progreso de scroll"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#home" onClick={handleNavClick} className="text-2xl font-extrabold font-heading text-dark dark:text-light inline-block transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-3">
                nicolas Grajales<span className="text-primary">.</span>
              </a>
            </div>
            <div className="hidden md:flex items-center">
              <nav className="ml-10 flex items-baseline space-x-4">
                {navItems}
              </nav>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            <div className="md:hidden flex items-center">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-dark dark:hover:text-light hover:bg-slate-100 dark:hover:bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-expanded={isMenuOpen}
                aria-label="Abrir menú principal"
              >
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-dark-secondary shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {navItems}
            </div>
          </div>
        )}
      </header>

      <button
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
};

export default Header;
