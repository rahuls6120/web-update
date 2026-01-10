import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Download, ExternalLink, Code, Database, BarChart3, Brain, Ship, GraduationCap, Calendar, MapPin, ArrowRight, Send } from 'lucide-react';

const ModernPortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const FloatingParticles = () => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: 2 + Math.random() * 3
    }));

    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-indigo-500/20"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              bottom: '-10px'
            }}
          />
        ))}
      </div>
    );
  };

  const GlowOrbs = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '4s' }} />
    </div>
  );

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-text {
          background: linear-gradient(135deg, #6366f1, #a855f7, #06b6d4);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 5s ease infinite;
        }
        .glass {
          background: rgba(24, 24, 27, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .bento-card {
          background: rgba(39, 39, 42, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bento-card:hover {
          border-color: rgba(99, 102, 241, 0.3);
          background: rgba(39, 39, 42, 0.5);
          transform: translateY(-4px);
        }
        .custom-cursor {
          width: 20px;
          height: 20px;
          border: 2px solid #6366f1;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease;
          mix-blend-mode: difference;
        }
      `}</style>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor hidden md:block" />

      <FloatingParticles />
      <GlowOrbs />

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollToSection('home')} className="text-xl font-bold text-zinc-100 font-mono tracking-tighter hover:text-indigo-400 transition-colors">
            Rahul<span className="text-indigo-500">S.</span>
          </button>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            {['about', 'experience', 'projects', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`hover:text-white transition-colors relative ${activeSection === section ? 'text-indigo-400' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400" />
                )}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/5 px-6 py-4">
            {['about', 'experience', 'projects', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left py-2 text-zinc-400 hover:text-white transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-16 relative">
        <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Data Analytics Graduate & ETL Developer
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Transforming Data <br />
            <span className="gradient-text">Into Insights.</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Building scalable data pipelines and actionable dashboards with modern technologies. <br className="hidden md:block" />
            Currently optimizing ETL workflows at <span className="text-indigo-400 font-medium">Cognizant</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/20 w-full md:w-auto flex items-center justify-center gap-2"
            >
              View Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="Rahul_S_Resume.pdf" 
              className="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 rounded-xl font-medium transition-all flex items-center justify-center gap-2 w-full md:w-auto group"
            >
              <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              Download CV
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8 text-zinc-500">
            <a href="https://github.com/rahuls6120" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors transform hover:scale-110 duration-200">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/rahuls6120" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors transform hover:scale-110 duration-200">
              <Linkedin size={28} />
            </a>
            <a href="mailto:subbiahrahul007@gmail.com" className="hover:text-white transition-colors transform hover:scale-110 duration-200">
              <Mail size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-indigo-500 font-mono text-xl">01</span>
            <h2 className="text-3xl font-bold text-white">Expertise</h2>
            <div className="h-px bg-zinc-800 flex-grow max-w-xs"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bio Card */}
            <div className="md:col-span-2 row-span-2 bento-card rounded-3xl p-8">
              <div className="h-10 w-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6 text-indigo-400">
                <Code size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Story So Far</h3>
              <p className="text-zinc-400 leading-relaxed mb-4">
                I am a Data Analytics graduate based in <b className="text-zinc-200">Thoothukudi, TN</b>. My passion lies in engineering robust data architectures that drive decision-making with cutting-edge technologies like React, WebAssembly, and modern motion libraries.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Currently, I am an <b>Analyst Trainee at Cognizant</b>, where I design complex ETL jobs using IBM DataStage, Python, and SQL. I bridge the technical gap between raw data sources and polished business intelligence using modern frameworks and tools.
              </p>
            </div>

            {/* Core Stack */}
            <div className="bento-card rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-indigo-400" size={20} />
                <h4 className="font-bold text-white">Core Stack</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Python', 'SQL', 'MySQL', 'C++', 'JavaScript'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modern Frameworks */}
            <div className="bento-card rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-cyan-400" size={20} />
                <h4 className="font-bold text-white">Modern Web</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React', 'Svelte', 'Tailwind', 'GSAP', 'WebAssembly'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700 hover:border-cyan-500 hover:text-cyan-400 transition-colors cursor-pointer">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Tools */}
            <div className="md:col-span-3 bento-card rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Data Visualization & AI</h4>
                  <p className="text-xs text-zinc-500">Tools I use to tell stories</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {['Power BI', 'Tableau', 'Pandas', 'Scikit-learn', 'Hugging Face', 'TensorFlow'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full border border-zinc-700 hover:border-purple-500 hover:text-purple-400 transition-colors cursor-pointer">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-zinc-900/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-indigo-500 font-mono text-xl">02</span>
            <h2 className="text-3xl font-bold text-white">Experience</h2>
            <div className="h-px bg-zinc-800 flex-grow max-w-xs"></div>
          </div>

          <div className="space-y-12 border-l border-zinc-800 ml-3">
            {/* Job 1 */}
            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 group-hover:ring-8 transition-all"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Analyst Trainee</h3>
                <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded flex items-center gap-1">
                  <Calendar size={12} />
                  Jun 2025 - Present
                </span>
              </div>
              <h4 className="text-zinc-400 font-medium mb-2 flex items-center gap-2">
                <MapPin size={14} />
                Cognizant Technology Solutions
              </h4>
              <ul className="list-disc list-outside ml-4 text-zinc-400 text-sm space-y-2 leading-relaxed">
                <li>Designing and implementing ETL jobs and sequences in <b>IBM DataStage</b></li>
                <li>Trained on AWS Cloud, Linux fundamentals, and Data Warehousing architectures</li>
                <li>Creating sample datasets to test pipelines and debug logic errors in a team environment</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div className="relative pl-8 group">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-600 ring-4 ring-zinc-800 group-hover:ring-8 transition-all"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Data Analyst Intern</h3>
                <span className="font-mono text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded flex items-center gap-1">
                  <Calendar size={12} />
                  Dec 2024 - Mar 2025
                </span>
              </div>
              <h4 className="text-zinc-400 font-medium mb-2 flex items-center gap-2">
                <MapPin size={14} />
                GEP Solutions
              </h4>
              <ul className="list-disc list-outside ml-4 text-zinc-400 text-sm space-y-2 leading-relaxed">
                <li>Analyzed procurement data using <b>Excel & Power BI</b> to generate KPI reports</li>
                <li>Assisted in data cataloging to improve organizational data accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-indigo-500 font-mono text-xl">03</span>
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            <div className="h-px bg-zinc-800 flex-grow max-w-xs"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="text-indigo-400" size={32} />,
                title: 'Prompt Optimization AI',
                description: 'Developed an AI system using NLP to refine user prompts, improving the precision of text-to-image generation models like Stable Diffusion.',
                tech: ['Python', 'Hugging Face', 'NLP'],
                color: 'indigo'
              },
              {
                icon: <Ship className="text-cyan-400" size={32} />,
                title: 'Titanic Survival Prediction',
                description: 'A Logistic Regression model predicting passenger survival with 80.36% accuracy. Involved extensive feature engineering and data cleaning.',
                tech: ['Scikit-learn', 'Pandas', 'Matplotlib'],
                color: 'cyan'
              },
              {
                icon: <GraduationCap className="text-purple-400" size={32} />,
                title: 'ChatGPT Impact Analysis',
                description: 'Analyzed survey data to assess AI\'s impact on student learning and time management. Visualized trends using Python libraries.',
                tech: ['Data Viz', 'Excel', 'Python'],
                color: 'purple'
              }
            ].map((project, idx) => (
              <div key={idx} className="bento-card rounded-2xl p-6 flex flex-col h-full group">
                <div className="flex justify-between items-start mb-6">
                  <div className="group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <a href="https://github.com/rahuls6120" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                    <Github size={24} />
                  </a>
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 group-hover:text-${project.color}-400 transition-colors`}>
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <React.Fragment key={i}>
                      <span className={`text-xs font-mono text-${project.color}-300`}>{t}</span>
                      {i < project.tech.length - 1 && <span className={`text-xs font-mono text-${project.color}-300`}>•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/50 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-center text-zinc-500 text-xs font-mono mb-8 uppercase tracking-widest">Certified By</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-lg">Google</div>
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-lg">AWS</div>
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-lg">IBM</div>
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-lg">Tableau</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h2>
          <p className="text-zinc-400 mb-8 text-lg">
            I am currently looking for full-time opportunities in <b>Data Engineering</b> and <b>Analytics</b>. 
            Have a question or a project in mind?
          </p>
          <a 
            href="mailto:subbiahrahul007@gmail.com" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all hover:scale-105 shadow-xl shadow-indigo-500/25 group"
          >
            Say Hello 
            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-900 text-center text-zinc-600 text-sm relative z-10">
        <p>&copy; 2026 Rahul S. Built with React, Tailwind CSS & Modern Web Technologies.</p>
      </footer>
    </div>
  );
};

export default ModernPortfolio;