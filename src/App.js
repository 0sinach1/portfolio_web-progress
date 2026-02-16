import React, { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, Twitter, Youtube, ExternalLink, Star, GitFork, Code, ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const githubUsername = '0sinach1';
  
  const pinnedProjects = [
    {
      name: 'fraud-detection-project',
      description: 'Machine learning model to detect fraudulent transactions using classification algorithms. Built with Python, scikit-learn, and data visualization libraries.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter']
    },
    {
      name: 'house-price-model',
      description: 'Predictive model for Nigerian housing market using regression analysis. Analyzes property features to estimate market values.',
      tech: ['Python', 'NumPy', 'Matplotlib', 'Machine Learning']
    },
    {
      name: 'data-and-ai-portfolio',
      description: 'Comprehensive collection of data science and AI projects. Showcases end-to-end workflows from data cleaning to model deployment.',
      tech: ['Python', 'Jupyter', 'Data Analysis', 'ML']
    },
    {
      name: 'laptop-sleep-timer',
      description: 'Automated solution for managing laptop power settings. Python script that schedules sleep mode to optimize battery life and system performance.',
      tech: ['Python', 'Automation', 'System Programming']
    }
  ];

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
        const userData = await userResponse.json();
        setStats(userData);

        const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();
        
        const pinnedRepos = reposData.filter(repo => 
          pinnedProjects.some(p => p.name === repo.name)
        );
        
        setRepos(pinnedRepos);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 100);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const ProjectCard = ({ repo, pinnedInfo, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="project-card fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="project-header">
          <div className="project-number">
            {String(index + 1).padStart(2, '0')}
          </div>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-link"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>
        
        <h3>{repo.name.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')}</h3>
        
        <p>{pinnedInfo.description}</p>
        
        <div className="project-meta">
          {repo.stargazers_count > 0 && (
            <span className="meta-item">
              <Star size={14} />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="meta-item">
              <GitFork size={14} />
              {repo.forks_count}
            </span>
          )}
          {repo.language && (
            <span className="meta-item">
              <Code size={14} />
              {repo.language}
            </span>
          )}
        </div>
        
        <div className="project-tags">
          {pinnedInfo.tech.map((tech, i) => (
            <span key={i} className="tag">{tech}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="portfolio">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --paper: #faf8f3;
          --paper-dark: #f5f1e8;
          --sepia: #8b7355;
          --sepia-dark: #6b5943;
          --text: #3d3326;
          --text-light: #7a6f5d;
          --accent: #d4a574;
          --border: #e8e1d3;
        }

        .portfolio {
          font-family: 'Crimson Pro', serif;
          background: linear-gradient(135deg, #faf8f3 0%, #f5f1e8 50%, #f0ebe0 100%);
          color: var(--text);
          min-height: 100vh;
          line-height: 1.7;
          position: relative;
        }

        /* Paper texture overlay */
        .portfolio::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.03"/></svg>');
          pointer-events: none;
          opacity: 0.5;
          z-index: 1;
        }

        /* Grain texture */
        .portfolio::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="grain"><feTurbulence baseFrequency="0.8" numOctaves="4"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(%23grain)" opacity="0.02"/></svg>');
          pointer-events: none;
          z-index: 1;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 3rem;
          position: relative;
          z-index: 2;
        }

        /* Navigation */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 2rem 0;
          z-index: 1000;
          background: linear-gradient(to bottom, var(--paper) 0%, transparent 100%);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          animation: fadeInDown 0.8s ease-out;
        }

        nav .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.08em;
          color: var(--sepia-dark);
          text-transform: uppercase;
        }

        nav ul {
          display: flex;
          gap: 3rem;
          list-style: none;
        }

        nav a {
          color: var(--text-light);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.3s;
          position: relative;
        }

        nav a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--sepia);
          transition: width 0.3s;
        }

        nav a:hover {
          color: var(--sepia-dark);
        }

        nav a:hover::after {
          width: 100%;
        }

        /* Hero */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 6rem;
        }

        .hero-ornament {
          position: absolute;
          top: 15%;
          right: 5%;
          width: 300px;
          height: 300px;
          border: 1px solid var(--border);
          border-radius: 50%;
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .hero-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--sepia);
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .hero h1 {
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 2rem;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .hero h1 .line {
          display: block;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hero h1 .line:nth-child(1) { animation-delay: 0.3s; }
        .hero h1 .line:nth-child(2) { animation-delay: 0.4s; }
        .hero h1 .line:nth-child(3) { 
          animation-delay: 0.5s;
          font-style: italic;
          color: var(--sepia-dark);
        }

        .hero-description {
          max-width: 600px;
          font-size: 1.25rem;
          color: var(--text-light);
          font-weight: 400;
          line-height: 1.8;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
        }

        .social-links {
          margin-top: 3rem;
          display: flex;
          gap: 1rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.7s forwards;
        }

        .social-link {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          background: var(--paper);
          color: var(--text-light);
          text-decoration: none;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
        }

        .social-link:hover {
          border-color: var(--sepia);
          color: var(--sepia-dark);
          transform: translateY(-3px);
          box-shadow: 0 4px 16px rgba(139, 115, 85, 0.15);
        }

        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 4rem;
          opacity: 0;
          animation: fadeInUp 0.8s ease-out 0.8s forwards;
        }

        .stat-item {
          text-align: center;
          padding: 2rem 1.5rem;
          background: var(--paper);
          border: 1px solid var(--border);
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
        }

        .stat-item:hover {
          border-color: var(--sepia);
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(139, 115, 85, 0.12);
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 600;
          color: var(--sepia-dark);
          display: block;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 0.75rem;
        }

        /* Sections */
        section {
          padding: 8rem 0;
          position: relative;
        }

        .section-header {
          max-width: 800px;
          margin-bottom: 5rem;
        }

        .section-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--sepia);
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 600;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          color: var(--text);
          line-height: 1.15;
        }

        .section-description {
          font-size: 1.15rem;
          color: var(--text-light);
          line-height: 1.8;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Projects */
        .projects-grid {
          display: grid;
          gap: 2.5rem;
        }

        .project-card {
          background: var(--paper);
          border: 1px solid var(--border);
          padding: 3rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 12px rgba(139, 115, 85, 0.08);
        }

        .project-card:hover {
          border-color: var(--sepia);
          transform: translateY(-8px);
          box-shadow: 0 8px 32px rgba(139, 115, 85, 0.15);
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .project-number {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          color: var(--sepia);
          letter-spacing: 0.15em;
          font-weight: 600;
        }

        .project-link {
          color: var(--text-light);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-card:hover .project-link {
          color: var(--sepia-dark);
          transform: translate(4px, -4px);
        }

        .project-card h3 {
          font-size: 1.85rem;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.3;
        }

        .project-card p {
          color: var(--text-light);
          margin-bottom: 1.5rem;
          line-height: 1.75;
          font-size: 1.05rem;
        }

        .project-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          padding: 0.5rem 1rem;
          background: var(--paper-dark);
          border: 1px solid var(--border);
          color: var(--text-light);
          letter-spacing: 0.05em;
          transition: all 0.3s;
        }

        .project-card:hover .tag {
          border-color: var(--sepia);
          color: var(--sepia-dark);
          background: var(--paper);
        }

        /* Skills */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .skill-category {
          padding: 2.5rem;
          background: var(--paper);
          border: 1px solid var(--border);
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
        }

        .skill-category:hover {
          border-color: var(--sepia);
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(139, 115, 85, 0.12);
        }

        .skill-category h3 {
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--sepia-dark);
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border);
          font-weight: 600;
        }

        .skill-category ul {
          list-style: none;
        }

        .skill-category li {
          padding: 0.6rem 0;
          color: var(--text-light);
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s;
        }

        .skill-category li:hover {
          color: var(--text);
          padding-left: 0.5rem;
        }

        .skill-category li::before {
          content: '—';
          color: var(--sepia);
        }

        /* Contact */
        .contact {
          background: var(--paper-dark);
          border-top: 1px solid var(--border);
        }

        .contact-content {
          max-width: 700px;
          margin: 0 auto;
          text-align: center;
        }

        .contact h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-bottom: 2rem;
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }

        .contact p {
          color: var(--text-light);
          margin-bottom: 3rem;
          line-height: 1.8;
          font-size: 1.15rem;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 3rem;
        }

        .contact-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1.25rem 2rem;
          color: var(--text);
          text-decoration: none;
          border: 1px solid var(--border);
          background: var(--paper);
          transition: all 0.3s;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(139, 115, 85, 0.08);
        }

        .contact-link:hover {
          border-color: var(--sepia);
          color: var(--sepia-dark);
          transform: translateX(8px);
          box-shadow: 0 4px 16px rgba(139, 115, 85, 0.15);
        }

        /* Footer */
        footer {
          padding: 3rem 0;
          border-top: 1px solid var(--border);
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-light);
          background: var(--paper);
        }

        footer p {
          font-style: italic;
        }

        /* Decorative elements */
        .decorative-line {
          width: 60px;
          height: 1px;
          background: var(--sepia);
          margin: 2rem 0;
          opacity: 0.6;
        }

        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Loading */
        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
          font-size: 1.2rem;
          color: var(--text-light);
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          nav ul {
            gap: 1.5rem;
            font-size: 0.9rem;
          }

          .hero {
            padding-top: 8rem;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero-description {
            font-size: 1.1rem;
          }

          .stats-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .social-links {
            justify-content: center;
            flex-wrap: wrap;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            margin-bottom: 3rem;
          }
        }

        /* Print-like depth */
        @media (prefers-color-scheme: light) {
          .project-card,
          .skill-category,
          .stat-item,
          .contact-link {
            box-shadow: 
              0 1px 2px rgba(139, 115, 85, 0.06),
              0 2px 4px rgba(139, 115, 85, 0.06),
              0 4px 8px rgba(139, 115, 85, 0.06);
          }
        }
      `}</style>

      <nav>
        <div className="container">
          <div className="logo">Ifeanyi Osinachi</div>
          <ul>
            <li><a href="#work">Work</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-ornament" />
          <div className="hero-label">Data Analyst · Aspiring Data Scientist</div>
          <h1>
            <span className="line">Turning data</span>
            <span className="line">into insights,</span>
            <span className="line">one story at a time.</span>
          </h1>
          <p className="hero-description">
            Computer Science student passionate about extracting meaning from complexity. 
            I build machine learning models, analyze datasets, and create solutions 
            that transform information into understanding.
          </p>
          
          <div className="social-links">
            <a 
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/osinachi-ifeanyi"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://x.com/IfeanyiOs1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://www.youtube.com/@DataDrivenDev-d5u"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="YouTube"
            >
              <Youtube size={20} />
            </a>
            <a 
              href="mailto:osimachifeanyi@gmail.com"
              className="social-link"
              title="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {stats && (
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-value">{stats.public_repos}</span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4+</span>
                <span className="stat-label">Featured Projects</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="work">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">Featured Projects</div>
            <h2 className="section-title">Selected Work</h2>
            <div className="decorative-line" />
            <p className="section-description">
              A collection of data-driven projects that demonstrate analytical thinking, 
              technical execution, and practical problem-solving.
            </p>
          </div>
          
          {loading ? (
            <div className="loading">Loading projects from GitHub...</div>
          ) : (
            <div className="projects-grid">
              {repos.map((repo, index) => {
                const pinnedInfo = pinnedProjects.find(p => p.name === repo.name);
                return pinnedInfo ? (
                  <ProjectCard key={repo.id} repo={repo} pinnedInfo={pinnedInfo} index={index} />
                ) : null;
              })}
            </div>
          )}
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <div className="section-header fade-in">
            <div className="section-label">Technical Expertise</div>
            <h2 className="section-title">Skills & Tools</h2>
            <div className="decorative-line" />
            <p className="section-description">
              A focused toolkit for data analysis, machine learning, and building 
              solutions that scale.
            </p>
          </div>
          
          <div className="skills-grid">
            <div className="skill-category fade-in">
              <h3>Data Analysis</h3>
              <ul>
                <li>Python (Pandas, NumPy)</li>
                <li>Data Cleaning & Wrangling</li>
                <li>Statistical Analysis</li>
                <li>Excel (Advanced)</li>
                <li>SQL Databases</li>
              </ul>
            </div>

            <div className="skill-category fade-in">
              <h3>Visualization</h3>
              <ul>
                <li>Matplotlib & Seaborn</li>
                <li>Plotly & Interactive Charts</li>
                <li>Data Storytelling</li>
                <li>Dashboard Design</li>
                <li>Visual Communication</li>
              </ul>
            </div>

            <div className="skill-category fade-in">
              <h3>Machine Learning</h3>
              <ul>
                <li>Scikit-learn</li>
                <li>Classification & Regression</li>
                <li>Feature Engineering</li>
                <li>Model Evaluation</li>
                <li>Predictive Analytics</li>
              </ul>
            </div>

            <div className="skill-category fade-in">
              <h3>Development</h3>
              <ul>
                <li>Python Programming</li>
                <li>Jupyter Notebooks</li>
                <li>Git & Version Control</li>
                <li>Automation & Scripting</li>
                <li>Cloud Platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content fade-in">
            <div className="section-label">Get In Touch</div>
            <h2>Let's work together on something meaningful.</h2>
            <div className="decorative-line" style={{ margin: '2rem auto' }} />
            <p>
              Open to data analysis projects, machine learning collaborations, or opportunities 
              where analytical thinking meets real-world impact. If you're building something 
              that matters, I'd love to hear about it.
            </p>
            
            <div className="contact-links">
              <a href="mailto:osimachifeanyi@gmail.com" className="contact-link">
                <Mail size={18} />
                osimachifeanyi@gmail.com
              </a>
              <a 
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Github size={18} />
                github.com/{githubUsername}
              </a>
              <a 
                href="https://www.linkedin.com/in/osinachi-ifeanyi"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Linkedin size={18} />
                linkedin.com/in/osinachi-ifeanyi
              </a>
              <a 
                href="https://www.youtube.com/@DataDrivenDev-d5u"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <Youtube size={18} />
                Data Driven Dev
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>"Data tells stories — I help bring them to life."</p>
          <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
            © 2026 Ifeanyi Osinachi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;