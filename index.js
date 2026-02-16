// ==================== NAVBAR FUNCTIONALITY ====================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.links');
const navLinkItems = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');

// Dark mode toggle
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getTheme());

// Theme toggle button
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active nav link on scroll - IMPROVED VERSION
const sections = document.querySelectorAll('section');

function updateActiveNavLink() {
    const scrollPos = window.scrollY + 150; // Adjusted offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Handle top of page - ensure Home is active
    if (window.scrollY < 100) {
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#hero') {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveNavLink);

// Call on page load to set initial state
updateActiveNavLink();

// ==================== TYPING EFFECT ====================
const typedTextSpan = document.querySelector('.typed-text');
const texts = [
    'scalable cloud solutions',
    'intelligent AI systems',
    'beautiful web experiences',
    'mobile applications',
    'the future of tech'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingDelay = 500;
    }
    
    setTimeout(type, typingDelay);
}

// Start typing effect
setTimeout(type, 1000);

// ==================== ANIMATED COUNTERS ====================
const statNumbers = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;
    
    const aboutSection = document.querySelector('.about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (aboutPosition < screenPosition) {
        counterAnimated = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 30);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ==================== CARD TILT EFFECT ====================
const cards = document.querySelectorAll('[data-tilt]');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and projects
const animatedElements = document.querySelectorAll('.card, .project-card, .info-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== PARALLAX EFFECT ====================
// Parallax effect disabled - causes unwanted movement of hero section
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
*/

// ==================== PROJECT CARD ANIMATIONS ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ==================== SOCIAL LINKS HOVER EFFECTS ====================
const socialLinks = document.querySelectorAll('.social-link');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        const platform = this.getAttribute('data-platform');
        this.style.transform = 'translateY(-10px) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// ==================== CURSOR TRAIL EFFECT (Optional) ====================
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 968) { // Only on desktop
        cursorTrail.push({
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    }
});

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Log welcome message
    console.log('%c👋 Welcome to Bryson Mabilo\'s Portfolio!', 'color: #0066ff; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #00a8ff; font-size: 14px;');
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateNav = debounce(updateActiveNavLink, 10);
const debouncedAnimateCounters = debounce(animateCounters, 10);

window.addEventListener('scroll', debouncedUpdateNav);
window.addEventListener('scroll', debouncedAnimateCounters);

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation to styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);