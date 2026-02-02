/* ============================================
   MONTHSARY SURPRISE - JAVASCRIPT
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts();
    
    // Add scroll animations
    initScrollAnimations();
});

/**
 * Enter the main site from welcome screen
 */
function enterSite() {
    const welcomeScreen = document.getElementById('welcome');
    const mainContent = document.getElementById('mainContent');
    
    // Hide welcome screen
    welcomeScreen.classList.add('hidden');
    
    // Show main content
    setTimeout(() => {
        mainContent.classList.add('visible');
    }, 300);
    
    // Play entrance sound (optional - uncomment if you add a sound file)
    // playSound('entrance.mp3');
}

/**
 * Create floating hearts in the background
 */
function createFloatingHearts() {
    const container = document.getElementById('hearts');
    const heartEmojis = ['💕', '💖', '💝', '💗', '💓', '💞', '❤️', '🩷'];
    const numberOfHearts = 20;
    
    for (let i = 0; i < numberOfHearts; i++) {
        createHeart(container, heartEmojis);
    }
    
    // Continuously create new hearts
    setInterval(() => {
        if (container.children.length < 30) {
            createHeart(container, heartEmojis);
        }
    }, 2000);
}

/**
 * Create a single floating heart
 */
function createHeart(container, heartEmojis) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Random positioning and timing
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 6) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
    
    container.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 15000);
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('.letter-section, .gallery-section, .reasons-section, .timeline-section, .promise-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });
    
    // Observe individual items
    const items = document.querySelectorAll('.gallery-item, .reason-card, .timeline-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

/**
 * Add sparkle cursor effect (optional enhancement)
 */
function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle-cursor';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Uncomment to enable sparkle cursor effect
// document.addEventListener('mousemove', createSparkle);

/**
 * Play background music (optional)
 * Add an audio file named 'background-music.mp3' to your folder
 */
function playBackgroundMusic() {
    const audio = new Audio('background-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Autoplay prevented'));
}

// Uncomment to enable background music
// document.getElementById('welcome').addEventListener('click', playBackgroundMusic, { once: true });

/**
 * Confetti effect for special moments
 */
function createConfetti() {
    const colors = ['#e91e63', '#ff6b9d', '#ffb6c1', '#f8bbd9', '#ffffff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation to stylesheet dynamically
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
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
    
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(confettiStyle);

// Trigger confetti when entering the site
const originalEnterSite = enterSite;
enterSite = function() {
    originalEnterSite();
    setTimeout(createConfetti, 500);
};

/**
 * Calculate and display days together (optional feature)
 * Uncomment and set your start date to use
 */
/*
function calculateDaysTogether() {
    const startDate = new Date('2024-01-01'); // Set your start date here
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Display somewhere in your HTML
    const daysElement = document.getElementById('days-together');
    if (daysElement) {
        daysElement.textContent = diffDays + ' days';
    }
}
calculateDaysTogether();
*/

console.log('💕 Made with love for someone special 💕');
