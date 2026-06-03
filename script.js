const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 220;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 2.2 + 0.4;
        this.speed = Math.random() * 0.35 + 0.05;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.phase = Math.random() * Math.PI;
    }
    update() {
        this.y -= this.speed;
        this.phase += 0.007;
        if (this.y < 0) {
            this.reset();
        }
    }
    draw() {
        const currentAlpha = Math.abs(this.alpha * Math.sin(this.phase));
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    requestAnimationFrame(animate);
}
animate();

const langData = {
    en: {
        hero: "FlareSpace - Various stars of space, similar to various FlareSpace projects.",
        vpnDesc: "This is an adapter for our Flare projects. I think you're already familiar with flareVpn, and this site really should be awesome!",
        findDesc: "This is a search bot that searches for a beautiful username in telegram.",
        settings: "Settings",
        github: "GitHub Repository",
        tgChannel: "Telegram Channel (FlareApp)"
    },
    ru: {
        hero: "FlareSpace - Различные звезды космоса, подобные различным проектам FlareSpace.",
        vpnDesc: "Это адаптер для наших проектов Flare. Думаю, вы уже знакомы с flareVpn, и этот сайт действительно должен быть потрясающим!",
        findDesc: "Это поисковый бот, который ищет красивое имя пользователя в Telegram.",
        settings: "Настройки",
        github: "Репозиторий GitHub",
        tgChannel: "Telegram Канал (FlareApp)"
    }
};

function selectLanguage(lang) {
    document.getElementById('hero-headline').innerText = langData[lang].hero;
    document.getElementById('desc-vpn').innerText = langData[lang].vpnDesc;
    document.getElementById('desc-find').innerText = langData[lang].findDesc;
    document.getElementById('label-settings').innerText = langData[lang].settings;
    document.getElementById('link-github').innerText = langData[lang].github;
    document.getElementById('link-telegram').innerText = langData[lang].tgChannel;
    
    const preloader = document.getElementById('language-preloader');
    preloader.style.opacity = '0';
    preloader.style.transform = 'translateY(-40px) scale(0.98)';
    setTimeout(() => preloader.style.display = 'none', 600);
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const headline = document.getElementById('hero-headline');
    
    const opacity = Math.max(0, 1 - scrolled / 550);
    const blurValue = Math.min(25, scrolled / 20);
    const translation = scrolled * 0.45;
    
    headline.style.opacity = opacity;
    headline.style.filter = `blur(${blurValue}px)`;
    headline.style.transform = `translateY(${translation}px)`;

    const p1 = document.querySelector('.planet-main');
    const p2 = document.querySelector('.planet-secondary');
    
    p1.style.transform = `translateY(${scrolled * 0.18}px)`;
    p2.style.transform = `translateY(${scrolled * -0.15}px)`;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-trigger').forEach(el => observer.observe(el));

function setSpaceTheme(theme, btn) {
    const buttons = btn.parentElement.querySelectorAll('.tab-item');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (theme === 'eclipse') {
        document.documentElement.setAttribute('data-theme', 'eclipse');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}
