document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});

var hamburger = document.getElementById('hamburger');
var navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
        hamburger.innerHTML = '&#9776;';
    } else {
        navMenu.style.display = 'flex';
        hamburger.innerHTML = '&#10005;';
    }
});

document.querySelectorAll('.nav-menu a').forEach(function(link) {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
            hamburger.innerHTML = '&#9776;';
        }
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.navbar')) {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
            hamburger.innerHTML = '&#9776;';
        }
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'row';
    } else {
        navMenu.style.display = 'none';
    }
});

var fadeElements = document.querySelectorAll('section');
fadeElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

function checkFade() {
    var windowHeight = window.innerHeight;
    fadeElements.forEach(function(el) {
        if (el.getBoundingClientRect().top <= windowHeight * 0.95) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}
window.addEventListener('scroll', checkFade);
checkFade();

var cards = document.querySelectorAll('.project-card');
cards.forEach(function(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

function checkCards() {
    var windowHeight = window.innerHeight;
    cards.forEach(function(card, index) {
        if (card.getBoundingClientRect().top <= windowHeight * 0.98) {
            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
}
window.addEventListener('scroll', checkCards);
checkCards();

var statValues   = [6, 5, 30, 15];
var statSuffixes = ['+', '', '%', '+'];
var countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;
    if (hero.getBoundingClientRect().top <= window.innerHeight) {
        countersStarted = true;
        var stats = document.querySelectorAll('.stat-number');
        stats.forEach(function(stat, index) {
            var target = statValues[index];
            var suffix = statSuffixes[index];
            var current = 0;
            var increment = target / 50;
            stat.textContent = '0' + suffix;
            var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
    }
}
window.addEventListener('scroll', startCounters);
startCounters();

var scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollBtn.style.display = 'flex';
    } else {
        scrollBtn.style.display = 'none';
    }
});
scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.nav-menu a');
    var current = '';
    sections.forEach(function(section) {
        if (window.pageYOffset >= section.offsetTop - 120) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(function(link) {
        link.style.color = link.getAttribute('href') === '#' + current ? '#2E75B6' : '';
        link.style.fontWeight = link.getAttribute('href') === '#' + current ? 'bold' : '';
    });
});
