import React from 'react';
// Solo dejaremos react importado



const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-slate-400 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">&copy; {currentYear} Nicolas Grajales. Todos los derechos reservados.</p>
        <p className="text-xs mt-2 opacity-70">si lo puedes soñar lo puedes programar .</p>
      </div>
    </footer>
  );
};

export default Footer;