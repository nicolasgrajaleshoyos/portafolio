import React, { useState, useEffect, useRef } from 'react';
import { GitHubIcon, LinkedInIcon, EmailIcon, CopyIcon, CheckIcon } from '@/components/Icons/SocialIcons.tsx';
import { CONTACT_EMAIL } from '@/config';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
    // mailto: abre el cliente de correo del visitante
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative py-24 bg-white dark:bg-dark-secondary overflow-hidden transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full translate-x-20 translate-y-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Hablemos</span>
        <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-dark dark:text-light">Ponte en Contacto</h2>
        <p className="text-base sm:text-lg text-medium dark:text-slate-400 mt-4 mb-8 max-w-xl mx-auto">
          ¿Tienes una idea, proyecto o vacante en mente? No dudes en escribirme. ¡Siempre estoy abierto a nuevas oportunidades!
        </p>

        {/* 📋 Botón rápido para copiar email */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button
            onClick={handleCopyEmail}
            type="button"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-dark dark:text-light font-semibold border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm text-sm"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">¡Email copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-4 h-4 text-primary" />
                <span>Copiar correo ({CONTACT_EMAIL})</span>
              </>
            )}
          </button>
        </div>

        {/* 🌐 Redes Sociales */}
        <div className="flex justify-center items-center gap-6 mb-10">
          <a
            href="https://github.com/nicolasgrajaleshoyos"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-900 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-110 shadow-sm"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/nicolas-grajales-hoyos-12182a353/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-sm"
          >
            <LinkedInIcon className="h-6 w-6" />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Gmail"
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-primary dark:hover:bg-primary transition-all duration-300 transform hover:scale-110 shadow-sm"
          >
            <EmailIcon className="h-6 w-6" />
          </a>
        </div>

        {/* 📩 Formulario */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left bg-slate-50 dark:bg-slate-800/60 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/60 p-6 sm:p-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-dark dark:text-light mb-1.5">Nombre</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Tu nombre completo"
            />
          </div>
          <div>
            <label htmlFor="from" className="block text-sm font-semibold text-dark dark:text-light mb-1.5">Correo electrónico</label>
            <input
              id="from"
              type="email"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-dark dark:text-light mb-1.5">Mensaje</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="¿Cómo te puedo ayudar con tu proyecto?"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-500 dark:text-red-400" role="alert">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/25 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-300 text-base"
          >
            Enviar Mensaje
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact;
