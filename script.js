const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
let stars = [];
const numStars = 250;

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
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.05;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.phase = Math.random() * Math.PI;
    }
    update() {
        this.y -= this.speed;
        this.phase += 0.01;
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
    
    let gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 10, canvas.width/2, canvas.height/2, canvas.width);
    if(document.documentElement.getAttribute('data-theme') === 'light') {
        gradient.addColorStop(0, '#1e1b4b');
        gradient.addColorStop(0.5, '#0f172a');
        gradient.addColorStop(1, '#020617');
    } else {
        gradient.addColorStop(0, '#070714');
        gradient.addColorStop(1, '#010103');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    loader.style.transform = 'translateY(-30px)';
    setTimeout(() => loader.style.display = 'none', 800);
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroText = document.getElementById('hero-text');
    
    const opacity = Math.max(0, 1 - scrolled / 600);
    const blur = Math.min(25, scrolled / 20);
    const translate = scrolled * 0.5;
    
    heroText.style.opacity = opacity;
    heroText.style.filter = `blur(${blur}px)`;
    heroText.style.transform = `translateY(${translate}px)`;

    const p1 = document.querySelector('.planet-1');
    const p2 = document.querySelector('.planet-2');
    p1.style.transform = `translateY(${scrolled * 0.15}px)`;
    p2.style.transform = `translateY(${scrolled * -0.1}px)`;
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

function switchTheme(theme, btn) {
    const buttons = btn.parentElement.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}
