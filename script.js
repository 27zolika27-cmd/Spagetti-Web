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

    // ---------------------------------------------
    // 4. "Lássuk a recepteket!" gomb görgető funkció
    // ---------------------------------------------
    const recipesButton = document.querySelector('.main-button');
    const recipesSection = document.getElementById('receptek');

    recipesButton.addEventListener('click', function() {
        if (recipesSection) {
            window.scrollTo({
                top: recipesSection.offsetTop,
                behavior: 'smooth' // Finom görgetés
            });
        }
    });

    // ---------------------------------------------
    // 5. Részletes Recept Modal Funkció (ÚJ NAGY FRISSÍTÉS)
    // ---------------------------------------------

    // Adatszerkezet a recepteknek (EZT BŐVÍTHETI A TÖBBI RECEPT ADATÁVAL)
    const recipesData = {
        'Spagetti Bolognai': {
            ingredients: [
                '400g Spagetti', 
                '500g darált marhahús', 
                '1 nagy fej hagyma', 
                '2 gerezd fokhagyma', 
                '400g hámozott paradicsom (konzerv)',
                '1 dl vörösbor (opcionális)',
                'Oregánó, só, bors'
            ],
            instructions: [
                'Aprítsa fel a hagymát és a fokhagymát. Kevés olajon pirítsa üvegesre a hagymát.',
                'Adja hozzá a darált húst, és pirítsa barnára.',
                'Öntse hozzá a vörösbort (ha használ), és forralja fel. Adja hozzá a paradicsomot, a fokhagymát és a fűszereket.',
                'Főzze alacsony hőfokon minimum 30 percig, de minél tovább, annál jobb.',
                'Közben főzze meg a spagettit al dente-re. Tálalja parmezánnal.'
            ]
        },
        'Spagetti Carbonara': {
            ingredients: [
                '400g Spagetti', 
                '200g Guanciale (vagy pancetta)', 
                '4 db tojássárgája', 
                '100g Pecorino Romano sajt', 
                'Frissen őrölt fekete bors'
            ],
            instructions: [
                'A guanciale-t vágja kockákra, és pirítsa ropogósra zsírjában. Vegye le a tűzről, de hagyjon kevés zsírt a serpenyőben.',
                'Főzze meg a spagettit al dente-re. A főzővízből tartson meg kb. 1,5 dl-t.',
                'Közben egy tálban keverje össze a tojássárgájákat, a reszelt Pecorino-t és a borsot.',
                'Azonnal szűrje le a tésztát, és tegye a serpenyőbe. Öntse rá a tojásos keveréket.',
                'Gyorsan keverje össze a tésztát, közben adagoljon hozzá a főzővízből, amíg krémes szószt nem kap. A hő hatására a tojás besűrűsödik, de nem sül meg! Tálalja friss borssal és sajttal.'
            ]
        },
        'Spagetti Aglio e Olio': {
            ingredients: [
                '300g Spagetti', 
                '5 gerezd fokhagyma (vékonyan szeletelve)', 
                '1,5 dl extra szűz olívaolaj', 
                '1 db chili (vékonyan szeletelve, vagy szárított pehely)', 
                'Friss petrezselyem (aprítva)', 
                'Só'
            ],
            instructions: [
                'Főzze meg a spagettit sós vízben, és a főzővízből mentsen el kb. 1 dl-t.',
                'Közben egy serpenyőben, nagyon alacsony lángon, pirítsa lassan az olívaolajban a fokhagymát és a chilit. **Figyelem: a fokhagyma ne égjen meg, csak aranybarna legyen!**',
                'Szűrje le a tésztát, és tegye a fokhagymás olajhoz.',
                'Adjon hozzá a félretett főzővízből, és keverje össze, amíg emulziós, krémes bevonatot nem kap.',
                'Végül adja hozzá a friss petrezselymet, és azonnal tálalja.'
            ]
        },
        'Friss Pesto Spagetti': {
            ingredients: [
                '400g Spagetti', 
                '150g friss bazsalikomlevél', 
                '50g parmezán sajt (reszelve)', 
                '50g pecorino sajt (reszelve)', 
                '50g fenyőmag', 
                '1-2 gerezd fokhagyma', 
                '1,5 dl extra szűz olívaolaj', 
                'Só'
            ],
            instructions: [
                'Pirítsa meg enyhén a fenyőmagot egy száraz serpenyőben. Hagyja kihűlni.',
                'Tegye a bazsalikomot, a fokhagymát, a sajtokat és a fenyőmagot egy aprítógépbe (vagy mozsárba). Kezdje el aprítani.',
                'Fokozatosan öntse hozzá az olívaolajat, amíg a pesto el nem éri a kívánt állagot. Sózza ízlés szerint.',
                'Főzze meg a spagettit al dente-re. A szűrés előtt mentsen el egy keveset a főzővízből.',
                'Azonnal keverje össze a tésztát a pestóval. Ha túl sűrű, adjon hozzá egy kevés főzővizet. Tálaláskor reszelt sajtot szórhat rá.'
            ]
        },
    };

    // Modal Elemek
    const modal = document.getElementById('recipeModal');
    const closeBtn = document.querySelector('.close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalIngredients = document.getElementById('modal-ingredients');
    const modalInstructions = document.getElementById('modal-instructions');
    const recipeBoxes = document.querySelectorAll('.info-box'); // A recept kártyák

    // Modal megnyitása
    recipeBoxes.forEach(box => {
        box.addEventListener('click', function() {
            // Recept címének kinyerése
            const recipeName = this.querySelector('strong').textContent.replace(/^\d+\.\s*/, '').trim(); 
            const recipe = recipesData[recipeName];

            if (recipe) {
                // Modal Tartalom feltöltése
                modalTitle.textContent = recipeName;

                // Hozzávalók feltöltése
                modalIngredients.innerHTML = ''; // Előző tartalom törlése
                recipe.ingredients.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    modalIngredients.appendChild(li);
                });
                
                // Elkészítési lépések feltöltése
                modalInstructions.innerHTML = ''; // Előző tartalom törlése
                recipe.instructions.forEach(step => {
                    const li = document.createElement('li');
                    li.textContent = step;
                    modalInstructions.appendChild(li);
                });

                modal.style.display = 'block'; // Modal megjelenítése
            }
        });
    });

    // Modal bezárása (X gombbal)
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Modal bezárása (ablakon kívül kattintással)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
