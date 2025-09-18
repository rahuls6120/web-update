document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const header = document.querySelector('header');
    const navLinksContainer = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const animatedNavLinks = document.querySelectorAll('.animate-nav-link');
    const sections = document.querySelectorAll('.section');
    const typewriterElement = document.querySelector('.typewriter');
    const currentYearSpan = document.getElementById('current-year');
    const heroImageInteractive = document.getElementById('hero-image-interactive');

    // Hero Content Elements for animation
    const heroH1 = document.querySelector('.hero-h1');
    const heroH2 = document.querySelector('.hero-h2');
    const heroP = document.querySelector('.hero-p');
    const heroBtns = document.querySelectorAll('.hero-btn');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Nav Link Entrance Animation
    animatedNavLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1 + 0.5}s`; // Staggered delay, starts after 0.5s
    });

    // Mobile Menu Toggle
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const isExpanded = navLinksContainer.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            menuToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
                if (this.classList.contains('nav-link')) {
                    updateActiveNavLink(targetId);
                }
            }
        });
    });
    
    // Typewriter Effect & Hero Content Animation
    if (typewriterElement && heroH1) { // Ensure heroH1 exists for chaining
        const text = typewriterElement.dataset.text;
        let index = 0;
        typewriterElement.textContent = ''; 
        
        // Make H1 visible before typing starts
        heroH1.style.opacity = '1';
        heroH1.style.transform = 'translateY(0)';

        function type() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 90); // Slightly faster typing
            } else {
                // Typing finished, animate other hero elements
                animateHeroContent();
            }
        }
        setTimeout(type, 700); // Start typing after a brief delay

        function animateHeroContent() {
            let delay = 0;
            if (heroH2) {
                heroH2.style.transition = 'opacity 0.5s ease-out 0.1s, transform 0.5s ease-out 0.1s';
                heroH2.style.opacity = '1';
                heroH2.style.transform = 'translateY(0)';
                delay += 200; // 0.1s transition + 0.1s buffer
            }
            if (heroP) {
                heroP.style.transition = `opacity 0.5s ease-out ${delay/1000}s, transform 0.5s ease-out ${delay/1000}s`;
                heroP.style.opacity = '1';
                heroP.style.transform = 'translateY(0)';
                delay += 200;
            }
            heroBtns.forEach(btn => {
                btn.style.transition = `opacity 0.5s ease-out ${delay/1000}s, transform 0.5s ease-out ${delay/1000}s`;
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
                delay += 150; // Stagger buttons slightly
            });
        }

    } else if (heroH1) { // Fallback if typewriterElement is missing but hero content exists
        // Directly animate hero content if no typewriter
        heroH1.style.opacity = '1'; heroH1.style.transform = 'translateY(0)';
        if(heroH2) { heroH2.style.opacity = '1'; heroH2.style.transform = 'translateY(0)'; heroH2.style.transitionDelay = '0.2s'; }
        if(heroP) { heroP.style.opacity = '1'; heroP.style.transform = 'translateY(0)'; heroP.style.transitionDelay = '0.4s'; }
        heroBtns.forEach((btn, i) => { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; btn.style.transitionDelay = `${0.6 + i * 0.15}s`; });
    }


    // Intersection Observer for section animations and active nav link
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Lower threshold to trigger sooner
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const targetId = `#${entry.target.id}`;
                updateActiveNavLink(targetId);

                if (entry.target.classList.contains('animate-children')) {
                    const animatedChildren = entry.target.querySelectorAll('.stagger-child');
                    animatedChildren.forEach((child, idx) => {
                        child.style.transitionDelay = `${idx * 0.15}s`; // Slightly faster stagger
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    function updateActiveNavLink(targetId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) { // Increased threshold
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Dynamic Background Gradient on Scroll
    const scrollGradientStops = [
        { stop: 0,    start: '#0a0f29', mid: '#1c1642' }, // Base
        { stop: 0.33, start: '#1c1642', mid: '#3a2f72' }, // Mid point
        { stop: 0.66, start: '#3a2f72', mid: '#1c1642' }, // Towards mid-dark again
        { stop: 1,    start: '#1c1642', mid: '#0a0f29' }  // Back to darker
    ];
    let lastScrollPercent = -1;
    function interpolateColor(color1, color2, factor) { let r = color1.slice(); for (let i=0;i<3;i++) { r[i]=Math.round(r[i]+factor*(color2[i]-r[i])); } return r; }
    function hexToRgb(h) { let r=0,g=0,b=0; if(h.length==4){r="0x"+h[1]+h[1];g="0x"+h[2]+h[2];b="0x"+h[3]+h[3];}else if(h.length==7){r="0x"+h[1]+h[2];g="0x"+h[3]+h[4];b="0x"+h[5]+h[6];} return [+r,+g,+b]; }
    function rgbToHex(r) { return "#"+r.map(x=>{const h=x.toString(16);return h.length===1?"0"+h:h}).join("");}

    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight === 0 ? 0 : scrollTop / scrollHeight;

        if (Math.abs(scrollPercent - lastScrollPercent) < 0.008 && scrollHeight > 0) { return; }
        lastScrollPercent = scrollPercent;

        let startColorHex = scrollGradientStops[0].start, midColorHex = scrollGradientStops[0].mid;
        for (let i = 0; i < scrollGradientStops.length - 1; i++) {
            const s1 = scrollGradientStops[i], s2 = scrollGradientStops[i+1];
            if (scrollPercent >= s1.stop && scrollPercent <= s2.stop) {
                const factor = (scrollPercent - s1.stop) / (s2.stop - s1.stop);
                startColorHex = rgbToHex(interpolateColor(hexToRgb(s1.start), hexToRgb(s2.start), factor));
                midColorHex = rgbToHex(interpolateColor(hexToRgb(s1.mid), hexToRgb(s2.mid), factor));
                break;
            }
        }
        if (scrollPercent >= 1) {
            startColorHex = scrollGradientStops[scrollGradientStops.length - 1].start;
            midColorHex = scrollGradientStops[scrollGradientStops.length - 1].mid;
        }
        body.style.background = `linear-gradient(135deg, ${startColorHex}, ${midColorHex})`;
    }, { passive: true });
    body.style.background = `linear-gradient(135deg, ${scrollGradientStops[0].start}, ${scrollGradientStops[0].mid})`;

    // Mouse Glow Effect
    const glowEffectElement = document.querySelector('.mouse-glow-effect');
    if (glowEffectElement) {
        let lastX = 0, lastY = 0;
        let rafId;

        function updateGlowPosition(e) {
            lastX = e.clientX;
            lastY = e.clientY;
            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    glowEffectElement.style.left = `${lastX}px`;
                    glowEffectElement.style.top = `${lastY}px`;
                    rafId = null;
                });
            }
        }
        document.addEventListener('mousemove', updateGlowPosition);
        document.addEventListener('mouseleave', () => { if(rafId) cancelAnimationFrame(rafId); rafId = null; glowEffectElement.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { glowEffectElement.style.opacity = '1'; });
    }

    // Hero Image Tilt Effect (subtle)
    if (heroImageInteractive) {
        const heroSection = document.getElementById('home');
        heroSection.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = heroSection;
            let { clientX: x, clientY: y } = e;
            const rect = heroSection.getBoundingClientRect();
            x = x - rect.left; y = y - rect.top;
            const rotateY = ((x - width / 2) / width) * 10; // Max rotation 5deg
            const rotateX = ((y - height / 2) / height) * -10; // Max rotation 5deg
            requestAnimationFrame(() => {
                heroImageInteractive.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            });
        });
        heroSection.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                heroImageInteractive.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }
});