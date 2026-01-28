document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Configuration
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('lowkey-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            localStorage.setItem('lowkey-theme', next);
        });
    }

    // 2. Mobile Navigation
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');

    if (menuBtn && mobileMenu && overlay) {
        const toggleMenu = () => {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        };
        menuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        document.querySelectorAll('#mobile-menu a').forEach(a => a.addEventListener('click', toggleMenu));
    }

    // 3. Simple Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Enable animations after load
    setTimeout(() => {
        html.classList.add('js-active');
    }, 100);

    // 4. Accordion Logic
    document.querySelectorAll('.accordion-header').forEach(h => {
        h.addEventListener('click', () => {
            const item = h.parentElement;
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.toggle('open');

            if (content) {
                content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
            }

            const icon = h.querySelector('span');
            if (icon) icon.textContent = isOpen ? '-' : '+';
        });
    });

    // 5. Header Visual Feedback
    window.addEventListener('scroll', () => {
        const s = window.pageYOffset;
        const header = document.getElementById('header');
        if (header) {
            header.style.height = s > 50 ? '80px' : '100px';
            header.style.boxShadow = s > 50 ? '0 10px 40px rgba(0,0,0,0.05)' : 'none';
        }
    });

    // 6. Smooth Section Navigation
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (id === '#' || !id.startsWith('#')) return;
            e.preventDefault();
            const target = document.querySelector(id);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 85,
                    behavior: 'smooth'
                });
            }
        });
    });
});
