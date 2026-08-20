import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 format in points (width, height)
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const colorPrimary = rgb(6 / 255, 182 / 255, 212 / 255); // #06b6d4 Cyan
  const colorDark = rgb(15 / 255, 23 / 255, 42 / 255); // #0f172a
  const colorText = rgb(51 / 255, 65 / 255, 85 / 255); // #334155
  const colorMuted = rgb(100 / 255, 116 / 255, 139 / 255); // #64748b
  const colorBgBar = rgb(241 / 255, 245 / 255, 249 / 255); // #f1f5f9
  const colorLine = rgb(226 / 255, 232 / 255, 240 / 255); // #e2e8f0

  let y = height - 40;

  // Header background bar
  page.drawRectangle({
    x: 0,
    y: height - 110,
    width: width,
    height: 110,
    color: colorBgBar,
  });

  // Top decorative colored bar
  page.drawRectangle({
    x: 0,
    y: height - 6,
    width: width,
    height: 6,
    color: colorPrimary,
  });

  // Name
  page.drawText('NICOLAS GRAJALES HOYOS', {
    x: 40,
    y: y - 10,
    size: 22,
    font: fontBold,
    color: colorDark,
  });

  // Title
  page.drawText('DESARROLLADOR FULL STACK', {
    x: 40,
    y: y - 30,
    size: 11,
    font: fontBold,
    color: colorPrimary,
  });

  // Contact Info row
  page.drawText('Email: nicolasgrajaleshoyos@gmail.com  |  GitHub: github.com/nicolasgrajaleshoyos  |  Popayan, Colombia', {
    x: 40,
    y: y - 48,
    size: 8.5,
    font: fontRegular,
    color: colorText,
  });

  y = height - 130;

  function drawSectionTitle(title) {
    page.drawText(title.toUpperCase(), {
      x: 40,
      y,
      size: 11,
      font: fontBold,
      color: colorDark,
    });

    page.drawLine({
      start: { x: 40, y: y - 4 },
      end: { x: width - 40, y: y - 4 },
      thickness: 1.5,
      color: colorPrimary,
    });

    y -= 18;
  }

  // 1. PERFIL PROFESIONAL
  drawSectionTitle('Perfil Profesional');
  const profileText =
    'Desarrollador Full Stack apasionado por la construccion de aplicaciones web modernas, intuitivas y escalables. ' +
    'Solida experiencia en el ecosistema JavaScript / TypeScript (React, Node.js, Vite) asi como en backends robustos ' +
    'con Java (Spring Boot) y PHP (Laravel). Enfoque en buenas practicas, arquitectura limpia, resolucion de problemas ' +
    'reales de negocio y aprendizaje continuo en tecnologias emergentes y ciberseguridad.';

  page.drawText(profileText, {
    x: 40,
    y,
    size: 9,
    font: fontRegular,
    color: colorText,
    maxWidth: width - 80,
    lineHeight: 13,
  });

  y -= 48;

  // 2. HABILIDADES TÉCNICAS
  drawSectionTitle('Habilidades Tecnicas');
  const skills = [
    { cat: 'Frontend:', list: 'React, TypeScript, JavaScript (ES6+), Next.js, Vue.js, Angular, Tailwind CSS, HTML5, CSS3' },
    { cat: 'Backend & APIs:', list: 'Node.js, Spring Boot (Java), Laravel (PHP), Python, RESTful APIs, Microservicios' },
    { cat: 'Bases de Datos:', list: 'PostgreSQL, MySQL, MongoDB' },
    { cat: 'Herramientas & Otros:', list: 'Git, GitHub, Docker, Figma, VS Code, Notion, Metodologias Agiles' },
  ];

  skills.forEach((s) => {
    page.drawText(s.cat, {
      x: 40,
      y,
      size: 9,
      font: fontBold,
      color: colorDark,
    });
    page.drawText(s.list, {
      x: 155,
      y,
      size: 9,
      font: fontRegular,
      color: colorText,
    });
    y -= 14;
  });

  y -= 10;

  // 3. PROYECTOS DESTACADOS & EXPERIENCIA
  drawSectionTitle('Proyectos & Experiencia');

  const projects = [
    {
      title: 'Sistema de Soporte a Decisiones (DSS) - Comparador de Paises',
      role: 'Desarrollador Full Stack  |  Spring Boot, PostgreSQL, React, TypeScript',
      period: '2023 - 2024',
      bullets: [
        'Desarrollo del Backend RESTful en Spring Boot y PostgreSQL para gestion y analisis de indicadores estadisticos.',
        'Implementacion de interfaz frontend interactiva con graficas dinamicas y filtros avanzados en TypeScript y Tailwind.',
        'Optimizacion de consultas SQL y arquitectura modular para entrega eficiente de datos analiticos.',
      ],
    },
    {
      title: 'Sistema de Gestion Comercial & Produccion - Empresa Familiar',
      role: 'Desarrollador de Software  |  Laravel, PHP, MySQL',
      period: '2022 - 2023',
      bullets: [
        'Diseno e implementacion de solucion a medida para control de inventarios, pedidos, facturacion y ventas.',
        'Optimizacion de procesos internos reduciendo tiempos operativos y errores manuales en un 70%.',
        'Modelado de base de datos relacional y panel de administracion con reportes.',
      ],
    },
    {
      title: 'Sitio Web de Portafolio Profesional',
      role: 'Desarrollador Frontend  |  React 19, TypeScript, Tailwind CSS, Vite',
      period: '2024 - 2025',
      bullets: [
        'Diseno responsive con modo oscuro dinamico, transiciones fluidas y microinteracciones.',
        'Implementacion de mejores practicas de rendimiento web, SEO tecnico y arquitectura por componentes.',
      ],
    },
  ];

  projects.forEach((proj) => {
    // Title
    page.drawText(proj.title, {
      x: 40,
      y,
      size: 10,
      font: fontBold,
      color: colorDark,
    });
    // Period
    page.drawText(proj.period, {
      x: width - 110,
      y,
      size: 8.5,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 12;

    // Role
    page.drawText(proj.role, {
      x: 40,
      y,
      size: 8.5,
      font: fontOblique,
      color: colorMuted,
    });
    y -= 12;

    // Bullets
    proj.bullets.forEach((b) => {
      page.drawText('•', {
        x: 48,
        y,
        size: 9,
        font: fontBold,
        color: colorPrimary,
      });
      page.drawText(b, {
        x: 58,
        y,
        size: 8.5,
        font: fontRegular,
        color: colorText,
        maxWidth: width - 100,
      });
      y -= 12;
    });

    y -= 4;
  });

  y -= 6;

  // 4. EDUCACIÓN & FORMACIÓN
  drawSectionTitle('Educacion & Formacion');

  const eduList = [
    {
      title: 'Ingenieria / Tecnologia en Sistemas y Software',
      institution: 'Educacion Superior  |  Popayan, Colombia',
      period: 'En curso / Graduado',
    },
    {
      title: 'Desarrollo Web Full Stack & Arquitecturas Modernas',
      institution: 'Especializacion y Aprendizaje Continuo (React, TypeScript, Spring Boot, Docker)',
      period: '2022 - Presente',
    },
  ];

  eduList.forEach((e) => {
    page.drawText(e.title, {
      x: 40,
      y,
      size: 9.5,
      font: fontBold,
      color: colorDark,
    });
    page.drawText(e.period, {
      x: width - 110,
      y,
      size: 8.5,
      font: fontBold,
      color: colorPrimary,
    });
    y -= 11;
    page.drawText(e.institution, {
      x: 40,
      y,
      size: 8.5,
      font: fontRegular,
      color: colorMuted,
    });
    y -= 14;
  });

  // Footer note
  page.drawLine({
    start: { x: 40, y: 35 },
    end: { x: width - 40, y: 35 },
    thickness: 0.5,
    color: colorLine,
  });

  page.drawText('Nicolas Grajales Hoyos - Curriculum Vitae  |  Portafolio: nicolasgrajales.dev', {
    x: 40,
    y: 22,
    size: 7.5,
    font: fontRegular,
    color: colorMuted,
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.resolve('public/cv.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log('CV generado exitosamente en:', outputPath);
}

generateCV().catch(console.error);
