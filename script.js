// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');

    // Eğer bu oturumdaki ilk ziyaret ise (CSS'in gizlemediği durum)
    if (!sessionStorage.getItem('animationPlayed')) {
        // Animasyonu normal şekilde oynat.
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 1s ease-out';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }, 5000); // 5 saniyelik animasyon süresi

        // Animasyonun oynatıldığını hafızaya kaydet.
        sessionStorage.setItem('animationPlayed', 'true');
    }
});

// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }

    // Scroll to Top Button
    const scrollBtn = document.getElementById('scrollToTop');
    if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'auto';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking links
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Accordion Toggle
function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.accordion-icon');
    
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
            item.classList.add('hidden');
            item.previousElementSibling.querySelector('.accordion-icon').style.transform = 'rotate(0deg)';
        }
    });
    
    content.classList.toggle('hidden');
    icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    if (!data.name || !data.email || !data.message) {
        alert('Lütfen tüm zorunlu alanları doldurun.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Lütfen geçerli bir e-posta adresi girin.');
        return;
    }
    
    const phoneRegex = /^(\+90|0)?[0-9]{10}$/;
    if (data.phone && !phoneRegex.test(data.phone.replace(/\s|-/g, ''))) {
        alert('Lütfen geçerli bir telefon numarası girin.');
        return;
    }
    
    alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
    this.reset();
    console.log('Form Data:', data);
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section, .service-card').forEach(el => observer.observe(el));

// Active Navigation Link on Scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('text-yellow-400'));
            if (navLink) navLink.classList.add('text-yellow-400');
        }
    });
}

// Counter Animation for Stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + (element.dataset.suffix || '');
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statElement = entry.target;
            const endValue = parseInt(statElement.textContent);
            
            if (statElement.textContent.includes('+')) statElement.dataset.suffix = '+';
            else if (statElement.textContent.includes('%')) statElement.dataset.suffix = '%';
            
            animateCounter(statElement, 0, endValue, 2000);
            statElement.classList.add('animated');
            statsObserver.unobserve(statElement);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.text-3xl.font-bold.text-yellow-400').forEach(stat => statsObserver.observe(stat));

// Parallax Effect for Hero Section (optional)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-pattern');
    if (parallax) parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Form Field Animation
const formInputs = document.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur', () => { if (!input.value) input.parentElement.classList.remove('focused'); });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(setActiveNavLink, 10);
window.addEventListener('scroll', debouncedScroll);


// ----- GÜNCELLENMİŞ BÖLÜM BURASI -----
// Page Load Animations
window.addEventListener('DOMContentLoaded', function() {
    // Sadece ana yükleme animasyonu oynatıldıysa (yani bu ilk ziyaretse) 
    // bu "içerik giriş" animasyonlarını çalıştır.
    if (!sessionStorage.getItem('animationPlayed')) {
        const heroContent = document.querySelector('#home .text-white');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        const heroCard = document.querySelector('#home .glass-card');
        if (heroCard) {
            heroCard.style.opacity = '0';
            heroCard.style.transform = 'scale(0.9)';
            setTimeout(() => {
                heroCard.style.transition = 'all 1s ease';
                heroCard.style.opacity = '1';
                heroCard.style.transform = 'scale(1)';
            }, 300);
        }
    }
    // Eğer animasyon daha önce oynatıldıysa, bu blok hiçbir şey yapmaz
    // ve içerik CSS sayesinde anında görünür kalır.
});
// ----- GÜNCELLEME SONU -----


// Escape key to close mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        }
    }
});

// Console message
console.log('%cEnes Mahmut Taşdemir - Avukat', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cProfesyonel Hukuki Danışmanlık Hizmetleri', 'font-size: 14px; color: #94a3b8;');
console.log('%c📞 +90 (212) 555 00 00 | 📧 info@enesmtasdemir.com', 'font-size: 12px; color: #d4af37;');