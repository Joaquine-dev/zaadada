// Navbar scroll
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');

function closeMenu() {
    if (links) links.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
    document.body.style.overflow = '';
}

function openMenu() {
    if (links) links.classList.add('active');
    if (toggle) toggle.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (toggle && links) {
    toggle.addEventListener('click', () => {
        if (links.classList.contains('active')) closeMenu();
        else openMenu();
    });
    links.addEventListener('click', (e) => {
        if (e.target === links) closeMenu();
    });
}

// Close menu on link click (one-page anchors)
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links && links.classList.contains('active')) closeMenu();
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// One-page tabs system
document.querySelectorAll('.onepage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const parent = tab.closest('.section');
        parent.querySelectorAll('.onepage-tab').forEach(t => t.classList.remove('active'));
        parent.querySelectorAll('.onepage-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById(tab.dataset.target);
        if (panel) {
            panel.classList.add('active');
            panel.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
            // Reset carousels in newly visible panel
            setTimeout(() => {
                panel.querySelectorAll('[data-carousel]').forEach(c => {
                    if (c.carouselGoTo) c.carouselGoTo(0);
                });
            }, 10);
        }
    });
});

// Service cards: switch tab then scroll
document.querySelectorAll('[data-switch-tab]').forEach(link => {
    link.addEventListener('click', (e) => {
        const tabId = link.dataset.switchTab;
        const targetTab = document.querySelector('.onepage-tab[data-target="' + tabId + '"]');
        if (targetTab) {
            e.preventDefault();
            targetTab.click();
            const section = targetTab.closest('.section');
            if (section) {
                setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            }
        }
    });
});

// Force scrolled state on subpages (no hero)
if (!document.querySelector('.hero')) {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.add('scrolled', 'always-scrolled');
}

// ============================================
// CAROUSEL + GALLERY SYSTEM
// ============================================
(function() {
    if (typeof GALERIES_DATA === 'undefined') return;
    const prefix = '';

    // Build slides inside carousel tracks
    document.querySelectorAll('.carousel-track[data-galerie]').forEach(track => {
        const key = track.dataset.galerie;
        const galerie = GALERIES_DATA[key];
        if (!galerie) return;
        const altBase = track.dataset.alt || 'Photo';

        if (galerie.type === 'ba') {
            // One slide per before/after pair
            galerie.pairs.forEach((pair, i) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML =
                    '<div class="ba-card"><img src="' + prefix + pair.avant + '" alt="' + altBase + ' avant ' + (i+1) + '"><span class="ba-label">Avant</span></div>' +
                    '<div class="ba-arrow">&rarr;</div>' +
                    '<div class="ba-card"><img src="' + prefix + pair.apres + '" alt="' + altBase + ' apres ' + (i+1) + '"><span class="ba-label">Apres</span></div>';
                track.appendChild(slide);
            });
        } else if (galerie.type === 'etapes') {
            // One slide per step — clean, one big photo with label
            galerie.steps.forEach((step, i) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide carousel-slide-step';
                slide.innerHTML =
                    '<div class="step-badge">' + (i+1) + '/' + galerie.steps.length + '</div>' +
                    '<img src="' + prefix + step.src + '" alt="' + altBase + ' ' + step.label + '" class="galerie-slide-img">' +
                    '<span class="step-label-big">' + step.label + '</span>';
                track.appendChild(slide);
            });
        } else {
            // One slide per image
            galerie.images.forEach((img, i) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML = '<img src="' + prefix + img.src + '" alt="' + altBase + ' ' + (i+1) + '" class="galerie-slide-img">';
                track.appendChild(slide);
            });
        }
    });

    // Also populate non-carousel galleries (technique panels use regular data-galerie)
    document.querySelectorAll('[data-galerie]:not(.carousel-track)').forEach(container => {
        const key = container.dataset.galerie;
        const galerie = GALERIES_DATA[key];
        if (!galerie) return;
        const altBase = container.dataset.alt || 'Photo';

        if (galerie.type === 'etapes') {
            const item = document.createElement('div');
            item.className = 'ba-item reveal';
            let html = '';
            galerie.steps.forEach((step, i) => {
                if (i > 0) html += '<div class="ba-arrow">&rarr;</div>';
                html += '<div class="ba-card"><img src="' + prefix + step.src + '" alt="' + altBase + ' ' + step.label + '" class="ba-img"><span class="ba-label">' + step.label + '</span></div>';
            });
            item.innerHTML = html;
            container.appendChild(item);
        } else if (galerie.type === 'ba') {
            galerie.pairs.forEach((pair, i) => {
                const item = document.createElement('div');
                item.className = 'ba-item reveal';
                item.innerHTML =
                    '<div class="ba-card"><img src="' + prefix + pair.avant + '" alt="' + altBase + ' avant ' + (i+1) + '" class="ba-img"><span class="ba-label">Avant</span></div>' +
                    '<div class="ba-arrow">&rarr;</div>' +
                    '<div class="ba-card"><img src="' + prefix + pair.apres + '" alt="' + altBase + ' apres ' + (i+1) + '" class="ba-img"><span class="ba-label">Apres</span></div>';
                container.appendChild(item);
            });
        } else {
            galerie.images.forEach((img, i) => {
                const item = document.createElement('div');
                item.className = 'galerie-item' + (img.large ? ' large' : '') + ' reveal';
                item.innerHTML = '<img src="' + prefix + img.src + '" alt="' + altBase + ' ' + (i+1) + '" class="galerie-img">';
                container.appendChild(item);
            });
        }
    });

    // Initialize carousels
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = track.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        let current = 0;
        const total = slides.length;

        if (total <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        }

        // Build dots
        if (dotsContainer && total > 1) {
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            }
        }

        // Add counter
        if (total > 1) {
            const counter = document.createElement('div');
            counter.className = 'carousel-counter';
            counter.textContent = '1 / ' + total;
            carousel.appendChild(counter);
        }

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
                    d.classList.toggle('active', i === current);
                });
            }
            const counter = carousel.querySelector('.carousel-counter');
            if (counter) counter.textContent = (current + 1) + ' / ' + total;
        }

        // Expose reset function on the DOM element
        carousel.carouselGoTo = goTo;

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

        // Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        carousel.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(current + 1);
                else goTo(current - 1);
            }
        }, { passive: true });
    });

    // Re-observe new elements for scroll reveal
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
})();

// Config-driven data injection from SITE_CONFIG (loaded via config-data.js)
(function() {
    if (typeof SITE_CONFIG === 'undefined') return;
    const cfg = SITE_CONFIG;

    function resolve(obj, path) {
        return path.split('.').reduce((o, k) => o && o[k], obj);
    }

    document.querySelectorAll('[data-cfg]').forEach(el => {
        const val = resolve(cfg, el.dataset.cfg);
        if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll('[data-cfg-href]').forEach(el => {
        const val = resolve(cfg, el.dataset.cfgHref);
        if (val === undefined) return;
        const pfx = el.dataset.cfgPrefix || '';
        el.href = pfx + val;
    });

    // Auto-build tarifs grid (2 columns)
    const tarifsGrid = document.querySelector('[data-cfg-tarifs-grid]');
    if (tarifsGrid && cfg.tarifs) {
        tarifsGrid.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'tarifs-grid';
        const cats = cfg.tarifs.categories;
        for (const key in cats) {
            const cat = cats[key];
            const card = document.createElement('div');
            card.className = 'tarif-card reveal';
            const title = document.createElement('h3');
            title.className = 'tarif-card-title';
            title.textContent = cat.titre;
            card.appendChild(title);
            const table = document.createElement('div');
            table.className = 'tarif-table';
            cat.prestations.forEach(p => {
                const row = document.createElement('div');
                row.className = 'tarif-row';
                row.innerHTML = '<span class="tarif-name">' + p.nom + '</span><span class="tarif-dots"></span><span class="tarif-price">' + p.prix + '</span>';
                table.appendChild(row);
            });
            card.appendChild(table);
            if (key === 'supplements' && cfg.tarifs.prixHeure) {
                const note = document.createElement('div');
                note.className = 'tarif-footer-note';
                note.innerHTML = "Prix de l'heure : <strong>" + cfg.tarifs.prixHeure + " " + cfg.tarifs.devise + "</strong>";
                card.appendChild(note);
            }
            grid.appendChild(card);
        }
        tarifsGrid.appendChild(grid);
        grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Auto-build horaires
    document.querySelectorAll('[data-cfg-horaires]').forEach(container => {
        const type = container.dataset.cfgHoraires;
        const h = cfg.horaires && cfg.horaires[type];
        if (!h) return;
        const tbody = container.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        const joursFr = ['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
        joursFr.forEach(j => {
            const info = h.jours[j];
            if (!info) return;
            const tr = document.createElement('tr');
            tr.className = info.ouvert ? 'open' : 'closed';
            const sep = info.texte.includes('/') ? info.texte.replace('/', '<span class="sep">/</span>') : info.texte;
            tr.innerHTML = '<td>' + j.charAt(0).toUpperCase() + j.slice(1) + '</td><td>' + sep + '</td>';
            tbody.appendChild(tr);
        });
    });

    // Re-observe
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
})();
