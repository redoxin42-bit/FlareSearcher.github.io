const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 200;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5;
        this.speed = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'light' 
            ? 'rgba(0, 120, 255, 0.6)' 
            : 'rgba(255, 255, 255, 0.8)';
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

function setLang(lang) {
    document.getElementById('hero-text').innerText = langData[lang].hero;
    document.getElementById('vpn-desc').innerText = langData[lang].vpnDesc;
    document.getElementById('find-desc').innerText = langData[lang].findDesc;
    document.getElementById('nav-settings').innerText = langData[lang].settings;
    document.getElementById('vpn-gh').innerText = langData[lang].github;
    document.getElementById('vpn-tg').innerText = langData[lang].tgChannel;
    
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    loader.style.transform = 'scale(0.95) blur(10px)';
    setTimeout(() => loader.style.display = 'none', 600);
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroText = document.getElementById('hero-text');
    const opacity = Math.max(0, 1 - scrolled / 500);
    const blur = Math.min(15, scrolled / 30);
    const translate = scrolled * 0.4;
    
    heroText.style.opacity = opacity;
    heroText.style.filter = `blur(${blur}px)`;
    heroText.style.transform = `translateY(${translate}px)`;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
