// Enhanced Portfolio JavaScript with Advanced Animations and Interactions

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.initializeParticles();
        this.setupSmoothScrolling();
        this.initializeTypingEffect();
        this.setupNavigation();

        this.setupContactForm();
        this.initializeCursor();
    }

    setupEventListeners() {
        window.addEventListener('load', () => this.onPageLoad());
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onResize());
        
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    onPageLoad() {
        // Remove loading class and start animations
        document.body.classList.add('loaded');
        this.animateHeroContent();
    }

    onScroll() {
        this.updateNavbar();
        this.updateActiveNavLink();
        this.parallaxEffect();
    }

    onResize() {
        this.updateParticles();
    }

    // Navigation functionality
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    this.setActiveNavLink(link);
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Animation functions
    initializeAnimations() {
        // Add stagger animation to elements
        this.staggerAnimateElements('.skill-category', 100);
        this.staggerAnimateElements('.project-card', 150);
        this.staggerAnimateElements('.timeline-item', 200);
    }

    staggerAnimateElements(selector, delay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
            element.classList.add('fade-in-up');
        });
    }

    animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (heroVisual) {
            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateY(0)';
            }, 600);
        }
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('skill-circle')) {
                        this.animateSkillCircle(entry.target);
                    }
                    
                    if (entry.target.classList.contains('section-header')) {
                        this.animateSectionHeader(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll('.fade-in-up, .section-header, .skill-circle');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    animateSkillCircle(circle) {
        const progress = circle.querySelector('.skill-progress');
        if (progress) {
            const percentage = progress.style.getPropertyValue('--progress');
            progress.style.setProperty('--progress', '0%');
            
            setTimeout(() => {
                progress.style.transition = 'all 1.5s ease-out';
                progress.style.setProperty('--progress', percentage);
            }, 200);
        }
    }

    animateSectionHeader(header) {
        const title = header.querySelector('.section-title');
        const line = header.querySelector('.section-line');
        
        if (title) {
            title.style.transform = 'translateY(30px)';
            title.style.opacity = '0';
            setTimeout(() => {
                title.style.transition = 'all 0.8s ease-out';
                title.style.transform = 'translateY(0)';
                title.style.opacity = '1';
            }, 200);
        }
        
        if (line) {
            line.style.width = '0';
            setTimeout(() => {
                line.style.transition = 'width 1s ease-out';
                line.style.width = '80px';
            }, 600);
        }
    }

    // Particle system for background
    initializeParticles() {
        this.particles = [];
        this.particleCount = window.innerWidth < 768 ? 30 : 50;
        
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);
        
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        this.resizeCanvas();
        this.createParticles();
        this.animateParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    updateParticles() {
        this.resizeCanvas();
        this.particleCount = window.innerWidth < 768 ? 30 : 50;
        this.particles = [];
        this.createParticles();
    }

    // Parallax effect
    parallaxEffect() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Typing effect
    initializeTypingEffect() {
        const typewriterElement = document.querySelector('.title-subtitle');
        if (!typewriterElement) return;
        
        const texts = [
            'Data Analytics Graduate',
            'Analyst Trainee at Cognizant'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;
        
        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let nextDelay = isDeleting ? deleteSpeed : typeSpeed;
            
            if (!isDeleting && charIndex === currentText.length) {
                nextDelay = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            setTimeout(type, nextDelay);
        };
        
        // Start typing effect after a delay
        setTimeout(type, 1000);
    }



    // Contact form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        

        
        // Add floating label effect
        const inputs = form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }





    // Custom cursor
    initializeCursor() {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(99, 102, 241, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .social-link, .project-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(6, 182, 212, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(99, 102, 241, 0.8)';
            });
        });
    }

    // Smooth scrolling setup
    setupSmoothScrolling() {
        // Add smooth scrolling behavior to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    // Magnetic effect for buttons
    initializeMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// Text reveal animation
class TextReveal {
    constructor(element) {
        this.element = element;
        this.text = element.textContent;
        this.element.innerHTML = '';
        this.createSpans();
    }
    
    createSpans() {
        this.text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px)';
            span.style.transition = `all 0.5s ease ${index * 0.05}s`;
            this.element.appendChild(span);
        });
    }
    
    reveal() {
        const spans = this.element.querySelectorAll('span');
        spans.forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    
    // Initialize text reveal for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const textReveals = [];
    
    sectionTitles.forEach(title => {
        textReveals.push(new TextReveal(title));
    });
    
    // Reveal text when sections come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && textReveals[index]) {
                textReveals[index].reveal();
            }
        });
    });
    
    sectionTitles.forEach(title => observer.observe(title));
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f0f23, #1a1a2e);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(99, 102, 241, 0.3);
        border-top: 3px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Add keyframes for spinner
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // Remove loader after page is fully loaded
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1000);
});
