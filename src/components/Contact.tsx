import React, { useState, useEffect, useRef } from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon } from '@/components/Icons/SocialIcons.tsx';
import { CONTACT_EMAIL, EMAIL_ENTITIES } from '@/config';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedFrom = from.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedFrom || !trimmedMessage) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!EMAIL_RE.test(trimmedFrom)) {
      setError('Introduce un correo electrónico válido.');
      return;
    }

    setError('');
    const subject = encodeURIComponent(`Mensaje de portafolio de ${trimmedName}`);
    const body = encodeURIComponent(
      `Nombre: ${trimmedName}\nCorreo: ${trimmedFrom}\n\n${trimmedMessage}`
    );
    // mailto: abre el cliente de correo del visitante (sin backend ni API keys).
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-20 bg-white dark:bg-dark-secondary overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full translate-x-16 translate-y-16 blur-2xl"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-dark dark:text-light">Ponte en Contacto</h2>
        <p className="text-lg text-medium dark:text-slate-400 mt-4 mb-8 max-w-xl mx-auto">
          ¿Interesado en colaborar o simplemente quieres saludar? No dudes en contactarme. ¡Siempre estoy abierto a nuevas oportunidades!
        </p>
        <div className="flex justify-center items-center gap-8 mb-10">
          <a href="https://github.com/nicolasgrajaleshoyos" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
            <GitHubIcon className="h-9 w-9" />
          </a>
          <a href="https://www.linkedin.com/in/nicolas-grajales-hoyos-12182a353/" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1">
            <LinkedInIcon className="h-9 w-9" />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 dark:text-slate-400 hover:text-primary transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
          >
            <EmailIcon className="h-9 w-9" />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left bg-slate-50 dark:bg-slate-800/50 rounded-xl shadow-md p-6 sm:p-8 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark dark:text-light mb-1">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label htmlFor="from" className="block text-sm font-medium text-dark dark:text-light mb-1">Correo electrónico</label>
            <input
              id="from"
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-dark dark:text-light mb-1">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-2.5 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="Escribe tu mensaje..."
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400" role="alert">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-hover transform hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            Enviar mensaje
          </button>
        </form>

        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-primary text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-primary-hover transform hover:-translate-y-1 transition-all duration-300 text-lg"
        >
          {/* El email se inyecta como entidad HTML: el navegador lo decodifica,
              pero nunca aparece como texto legible en el código fuente. */}
          Envíame un Email a <span dangerouslySetInnerHTML={{ __html: EMAIL_ENTITIES }} />
        </a>

      </div>
    </section>
  );
};

export default Contact;
