document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Custom Cursor tracking
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Instant update for dot
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth trailing cursor animation
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for cursor
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .logo-wrapper');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
            cursor.style.borderColor = 'rgba(6, 182, 212, 0.8)';
            cursor.style.backgroundColor = 'rgba(6, 182, 212, 0.05)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(139, 92, 246, 0.4)';
            cursor.style.backgroundColor = 'transparent';
        });
    });

    // Particle Background for Splash Screen
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles-canvas');
    if (container) {
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let width = canvas.width = container.offsetWidth;
        let height = canvas.height = container.offsetHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
        });

        const particles = [];
        const particleCount = 65;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > width) this.speedX *= -1;
                if (this.y < 0 || this.y > height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // Portal transition on clicking the Enter button
    const enterBtn = document.getElementById('enter-btn');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    if (enterBtn && splashScreen && mainContent) {
        enterBtn.addEventListener('click', () => {
            // Step 1: Add exit styling to splash screen (scale up, blur out, fade)
            splashScreen.classList.add('exit-transition');

            // Step 2: Make main content visible in DOM (still invisible to viewer)
            mainContent.classList.remove('hidden');

            // Step 3: Trigger cinematic reveal animation on main container
            setTimeout(() => {
                mainContent.classList.add('reveal');
            }, 80);

            // Step 4: Totally remove the splash screen from DOM once transition completes
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 1600); // matches the 1.6s transition time in CSS
        });
    }
});
