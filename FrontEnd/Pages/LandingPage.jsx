import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Button from '../Components/Button';
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
   const [darkMode, setDarkMode] = useState(true);
  const [activeFramework, setActiveFramework] = useState('react');
  const [isToggling, setIsToggling] = useState(false);

  const sectionRefs = useRef([]);
  const navDotsRef = useRef([]);
  const lenisRef = useRef(null);


  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Umaar2008', icon: '🐙' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Twitter', url: 'https://x.com/Umaar2008', icon: 'X' }
  ];

  const projects = [
    {
      title: 'CHAPATTY',
      description: 'A real-time chatting platform built with React and Firebase, featuring one-on-one messaging, profile management, Chatting with A Gemini AI and persistent chat history. The Node.js backend handles profile info while Firebase powers real-time messaging and handles Authentication.',
      tags: ['React', ' Firebase (Auth + Firestore)', 'Nodejs' , 'Ai Chatting Bot'],
      media: '/Chapatty.png',
      liveLink: 'https://chapatty-jq1k.vercel.app/',
      githubLink: 'https://github.com/Umaar2008/Chapatty',
      videoLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7351905870840066048/'
    },
    {
      title: 'Business Management',
      description: 'A full-stack MERN web application designed for small to medium businesses. It features custom-built authentication (JWT), employee management, Product management and an analytics dashboard to monitor operations in real-time. Built with clean UI and robust backend logic for scalability',
      tags: ['React', 'Node.js', 'Express' , 'MongoDB', 'JWT Auth'],
      media : '/BUSINESS.png' ,
      liveLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7241868087875014657/',
      githubLink: 'https://github.com/Umaar2008/Business-Management-Project',
      videoLink: 'https://www.linkedin.com/feed/update/urn:li:activity:7241868087875014657/'
    },
    {
      title: 'AORA ',
      description: 'An AI-powered chat/talking app built in React Native with a custom backend. Designed to allow users to have interactive, human-like conversations with AI in real time.',
      tags: ['React Native', 'Node.js', 'Express', 'Ai API Integration'],
      media: '/Aora.png',
      liveLink: 'https://www.linkedin.com/posts/umar-sarfraz-675640264_hey-just-made-my-first-full-stack-mobile-activity-7253534764597428224-w1yp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDgz7kBfg7lBiVMKkvuioE3AdbfKfuOS-0',
      githubLink: 'https://github.com/Umaar2008/Aora',
      videoLink: 'https://www.linkedin.com/posts/umar-sarfraz-675640264_hey-just-made-my-first-full-stack-mobile-activity-7253534764597428224-w1yp?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDgz7kBfg7lBiVMKkvuioE3AdbfKfuOS-0'
    },
  ];

  const skills = [
   { title: "React Ecosystem", description: "Expert in hooks, context API, and performance optimization", emoji: "⚛️" },
{ title: "React Native", description: "Cross-platform mobile development with native modules", emoji: "📱" },
{ title: "State Management", description: "Zustand, Redux Toolkit, and Context API for scalable state handling", emoji: "🔄" },
{ title: "UI/UX", description: "Tailwind CSS, responsive layouts, and component-based design", emoji: "🎨" },
{ title: "Animations", description: "GSAP and React Native Reanimated for smooth UI transitions", emoji: "🎬" },
{ title: "Expo Ecosystem", description: "Expo Router, permissions, and device API integrations", emoji: "📦" },
{ title: "Firebase Integration", description: "Authentication UI, Firestore, and real-time database syncing", emoji: "🔥" },
{ title: "API Integration", description: "Connecting frontend to REST APIs, handling responses, and error states", emoji: "🌐" },
{ title: "Node.js", description: "Building server-side applications and APIs with JavaScript runtime", emoji: "🟢" },
{ title: "Express.js", description: "REST API development, middleware, and routing", emoji: "🚀" },
{ title: "MongoDB + Mongoose", description: "Schema design, CRUD operations, and database management", emoji: "🍃" },
{ title: "Authentication & Security", description: "JWT authentication, bcrypt password hashing, and secure API handling", emoji: "🔐" },
{ title: "Real-time Communication", description: "Firebase Full duplex integration for chat and live updates", emoji: "⚡" },
{ title: "Firebase (Backend)", description: "Authentication, Firestore, and cloud functions", emoji: "🔥" },
{ title: "API Development", description: "Creating, testing, and integrating REST APIs with frontend", emoji: "🔗" },
{ title: "Deployment", description: "Deploying applications to Render, Vercel and Netlify", emoji: "🌍" },
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: true,
      infinite: false,
    });

    const scrollFn = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);

    lenisRef.current.on('scroll', ScrollTrigger.update);

    return () => {
      lenisRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only keep the ScrollTrigger for navigation dots
      sectionRefs.current.forEach((section, index) => {
        if (!section || !navDotsRef.current[index]) return;
        
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: self => {
            if (navDotsRef.current[index]) {
              gsap.to(navDotsRef.current[index], {
                backgroundColor: self.isActive ? 
                  (darkMode ? '#fff' : '#000') : '#6b7280',
                scale: self.isActive ? 1.25 : 1,
                duration: 0.3
              });
            }
          }
        });
      });
    });

    return () => ctx.revert();
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

   const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section && lenisRef.current) {
      lenisRef.current.scrollTo(section, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  const ProjectCard = ({ project, darkMode }) => {
    return (
      <div className={`rounded-2xl overflow-hidden transform transition-all duration-500 group relative
        ${darkMode 
          ? 'bg-gray-700 hover:bg-gray-600' 
          : 'bg-white hover:bg-gray-100'} 
        hover:scale-[1.02] hover:shadow-2xl`}
      >
        <a 
          href={project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full h-64 relative rounded-lg overflow-hidden group"
        >
          <img 
            src={project.media}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 flex items-center justify-center pointer-events-none">
            <span className="text-black opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-xl font-bold">
              View Project
            </span>
          </div>
        </a>
        
        <div className="p-6">
          <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {project.title}
          </h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs px-3 py-1 rounded-full transition-all hover:scale-105 
                  ${darkMode 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-200 text-gray-800'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-900 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
            
            <a
              href={project.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-900 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              Demo
            </a>
          </div>
        </div>
        
        <div className={`absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          darkMode ? 'shadow-[0_0_30px_5px_rgba(236,72,153,0.3)]' : 'shadow-[0_0_30px_5px_rgba(59,130,246,0.3)]'
        }`}></div>
      </div>
    );
  };

  return (
     <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      
      
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-6">
        {['home', 'about', 'skills', 'work', 'contact'].map((section, index) => (
          <a
            key={section}
            href={`#${section}`}
            ref={el => navDotsRef.current[index] = el}
            className={`w-3 h-3 rounded-full transition-all relative group ${
              darkMode ? 'bg-gray-500' : 'bg-gray-300'
            }`}
            onClick={(e) => handleNavClick(section, e)}
          >
            <span className={`absolute left-full ml-3 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
              darkMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
            }`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
          </a>
        ))}
      </div>
      <button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full transition-all hover:scale-110 ${
          darkMode ? 'bg-gray-700 text-yellow-300 hover:shadow-lg hover:shadow-yellow-300/20' : 
          'bg-gray-200 text-gray-700 hover:shadow-lg hover:shadow-gray-700/20'
        }`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      <button
        className={`cursor-pointer rounded-full ml-2 mt-6 px-6 py-1.5 text-black bg-white hover:bg-orange-500 hover:border-black hover:scale-95 hover:shadow-[inset_0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out ${
          darkMode ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 
          'bg-gradient-to-r from-blue-500 to-indigo-600'
        }`}
      >
        Download CV
      </button>

       <section 
        id="home"
        ref={el => sectionRefs.current[0] = el}
        className="h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center px-6 max-w-4xl relative z-10">
          <h1 
            className={`text-6xl md:text-9xl font-bold mb-6 tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r ${
              darkMode ? 'hover:from-pink-500 hover:to-purple-600' : 
              'hover:from-blue-500 hover:to-indigo-600'
            } transition-all duration-500`}
          >
            UMAR KHAN
          </h1>
          <p 
            className={`text-xl md:text-3xl font-light mb-8 hover:scale-105 transition-transform ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            FULL STACK DEVELOPER
          </p>
          <div className={`mt-12 h-1 w-24 mx-auto rounded-full hover:w-32 transition-all duration-300 ${
            darkMode ? 'bg-gradient-to from-pink-500 to-purple-600' : 
            'bg-gradient-to-r from-blue-500 to-indigo-600'
          }`} />
        </div>
      </section>

       <section 
        id="about"
        ref={el => sectionRefs.current[1] = el}
        className={`py-32 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl md:text-6xl font-bold mb-16 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About <span className={`text-transparent bg-clip-text ${
              darkMode ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 
              'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}>Me</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className={`text-x font-sans mb-8 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
               Hi, I'm Umar, a Pakistani full-stack developer with a passion for taking ideas and turning them into working, real products. I prefer creating easy-to-use, modern, and useful digital experiences that people actually want to use.
I create everything from AI-enabled apps such as Aora to real-time messaging platforms such as Chappaty and business management software with React, React Native, Node.js, Express, MongoDB, and Firebase. All the projects I engage in are intended to identify simple, unique, and useful solutions to issues.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-lg font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  React
                </span>
                
                <div 
                  className="relative w-20 h-10 rounded-full p-1 cursor-pointer overflow-hidden"
                  onClick={() => setActiveFramework(activeFramework === 'react' ? 'react-native' : 'react')}
                  aria-label="Toggle framework"
                >
                  <div 
                    className={`absolute inset-0 rounded-full transition-colors ${
                      activeFramework === 'react-native' ? 
                        (darkMode ? 'bg-pink-500' : 'bg-pink-600') : 
                        (darkMode ? 'bg-blue-500' : 'bg-blue-600')
                    }`}
                  />
                  
                  <div 
                    className="relative h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-300"
                    style={{ 
                      transform: activeFramework === 'react-native' ? 
                        'translateX(100%)' : 'translateX(0)'
                    }}
                  >
                    {activeFramework === 'react-native' ? '📱' : '⚛️'}
                  </div>
                </div>
                
                <span className={`text-lg font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  React Native
                </span>
              </div>
            </div>
            
            <div className="relative h-96 group">
              <div className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-95 ${
                darkMode ? 'bg-gradient-to-br from-pink-500/20 to-purple-600/20' : 
                'bg-gradient-to-br from-blue-500/20 to-indigo-600/20'
              }`}>
                <div className="w-full h-full flex items-center justify-center">
                  <img src="AdobeExpress-file2.png" className='object-cover aspect-auto h-128 w-124' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="skills"
        ref={el => sectionRefs.current[2] = el}
        className={`py-20 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl md:text-6xl font-bold mb-16 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Tech <span className={`text-transparent bg-clip-text ${
              darkMode ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 
              'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}>Stack</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-600 hover:bg-gray-500' : 
                  'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="text-6xl mb-6 hover:scale-110 transition-transform duration-300">
                  {skill.emoji}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {skill.title}
                </h3>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="work"
        ref={el => sectionRefs.current[3] = el}
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl md:text-6xl font-bold mb-16 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Selected <span className={`text-transparent bg-clip-text ${
              darkMode ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 
              'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}>Projects</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                project={project}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      <section 
        id="contact"
        ref={el => sectionRefs.current[4] = el}
        className={`py-32 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
      >
        <div className="container mx-auto px-6 flex flex-col items-center">
          <h2 className={`text-4xl md:text-6xl font-bold mb-16 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Let's <span className={`text-transparent bg-clip-text ${
              darkMode ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 
              'bg-gradient-to-r from-blue-500 to-indigo-600'
            }`}>Connect</span>
          </h2>
          
          <button 
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=umaarkhan2008@gmail.com', '_blank')}
            className={`relative w-48 cursor-pointer h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center overflow-hidden transform transition-all duration-500 hover:scale-110 hover:shadow-xl ${
              darkMode ? 'bg-gradient-to-br from-pink-500 to-purple-600' : 
              'bg-gradient-to-br from-blue-500 to-indigo-600'
            }`}
            aria-label="Send email"
          >
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl z-10">
              Launch Email
            </span>
            <div className="absolute inset-0 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div className={`absolute w-full h-full ${
                darkMode ? 'bg-gradient-to-br from-pink-600 to-purple-700' : 
                'bg-gradient-to-br from-blue-600 to-indigo-700'
              } animate-pulse`} />
            </div>
          </button>
          
          <div className="mt-16 flex gap-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-3xl transition-all duration-300 hover:scale-125 ${
                  darkMode ? 'text-gray-400 hover:text-white' : 
                  'text-gray-500 hover:text-gray-900'
                }`}
                title={social.name}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;