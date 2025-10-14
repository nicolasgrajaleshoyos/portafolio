import React, { useState, useEffect } from 'react';

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


const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors duration-300 font-medium px-3 py-2 rounded-md text-sm group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ease-out"></span>
  </a>
);

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}


const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (!targetId) return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = 64; // h-16 = 4rem = 64px
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    closeMenu();
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md dark:bg-dark/80' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" onClick={handleNavClick} className="text-2xl font-extrabold font-heading text-dark dark:text-light inline-block transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-3">
              nicolas Grajales<span className="text-primary">.</span>
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <nav className="ml-10 flex items-baseline space-x-4">
              <NavLink href="#home" onClick={handleNavClick}>Inicio</NavLink>
              <NavLink href="#about" onClick={handleNavClick}>Sobre mí</NavLink>
              <NavLink href="#projects" onClick={handleNavClick}>Proyectos</NavLink>
              <NavLink href="#contact" onClick={handleNavClick}>Contacto</NavLink>
            </nav>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-dark dark:hover:text-light hover:bg-slate-100 dark:hover:bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
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
            <NavLink href="#home" onClick={handleNavClick}>Inicio</NavLink>
            <NavLink href="#about" onClick={handleNavClick}>Sobre mí</NavLink>
            <NavLink href="#projects" onClick={handleNavClick}>Proyectos</NavLink>
            <NavLink href="#contact" onClick={handleNavClick}>Contacto</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;