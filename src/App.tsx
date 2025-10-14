
import React, { useState, useEffect } from 'react';

import Header from '@/components/Header';

import Hero from '@/components/Hero';

import About from '@/components/About';

import Projects from '@/components/Projects';

import Contact from '@/components/Contact';

import Footer from '@/components/Footer';



type Theme = 'light' | 'dark';



const useTheme = (): [Theme, () => void] => {

  const [theme, setTheme] = useState<Theme>('light');



  useEffect(() => {

    const storedTheme = localStorage.getItem('theme') as Theme | null;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);

  }, []);



  useEffect(() => {

    if (theme === 'dark') {

      document.documentElement.classList.add('dark');

      localStorage.setItem('theme', 'dark');

    } else {

      document.documentElement.classList.remove('dark');

      localStorage.setItem('theme', 'light');

    }

  }, [theme]);



  const toggleTheme = () => {

    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  };



  return [theme, toggleTheme];

};





const App: React.FC = () => {

  const [theme, toggleTheme] = useTheme();



  return (

    <div className="flex flex-col min-h-screen">

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow">

        <Hero />

        <About />

        <Projects />

        <Contact />

      </main>

      <Footer />

    </div>

  );

};



export default App;
