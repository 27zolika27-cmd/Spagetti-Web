// Amikor az oldal teljesen betöltődik, ez a függvény lefut
document.addEventListener('DOMContentLoaded', function() {
    console.log("A Spagetti Világa weboldal interaktív funkciói betöltődtek.");

    // ---------------------------------------------
    // 1. Hamburger Menü váltó funkció (Mobilon)
    // ---------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navUl = document.getElementById('nav-ul');

    hamburgerBtn.addEventListener('click', function() {
        navUl.classList.toggle('active');
    });

    // ---------------------------------------------
    // 2. Vissza a tetejére (Scroll to Top) funkció
    // ---------------------------------------------
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        // Ha a görgetési pozíció több, mint 300 pixel, jelenítsd meg a gombot
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    // Gomb kattintásakor görgess az oldal tetejére
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Finom, animált görgetés
        });
    });

    // ---------------------------------------------
    // 3. Sötét/Világos Téma Váltó
    // ---------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Betöltés: Ellenőrizzük, mi van a localStorage-ban, és állítsuk be a témát
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙'; // Hold ikon sötét módban
    } else {
        themeToggle.textContent = '☀️'; // Nap ikon világos módban
    }

    // Kattintás: Váltás és mentés a localStorage-ba
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        // Ikon és beállítás mentése
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
});