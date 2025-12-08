document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. GESTION DES ONGLETS COMPÉTENCES
    // ==========================================
    const filterBtns = document.querySelectorAll('.btn-filter');
    const techSkills = document.getElementById('tech-skills');
    const humanSkills = document.getElementById('human-skills');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            if (filterValue === 'tech') {
                techSkills.classList.remove('hidden');
                humanSkills.classList.add('hidden');
            } else {
                techSkills.classList.add('hidden');
                humanSkills.classList.remove('hidden');
            }
        });
    });

    // ==========================================
    // 2. ANIMATION AU SCROLL
    // ==========================================
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const glassElements = document.querySelectorAll('.glass');
    glassElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ==========================================
    // 3. GESTION DU PANNEAU LATÉRAL (Formations & Projets)
    // ==========================================
    
    // --- DONNÉES FORMATIONS ---
    const formationsData = {
        "iut": {
            title: "BUT Réseaux & Télécoms",
            date: "Septembre 2025 - Présent",
            location: "IUT Clermont Auvergne - Site d'Aubière",
            content: `
                <h4>Objectif de la Formation</h4>
                <p>Le BUT Réseaux et Télécommunications est une formation en 3 ans, accessible après le baccalauréat. Cette formation vise à former des techniciens supérieurs compétents dans les domaines des réseaux informatiques, des télécommunications et de la cybersécurité.</p>
                <h4>Pourquoi l'IUT d'Aubière ?</h4>
                <p>J'ai choisi cette formation pour apprendre les concepts fondamentaux des réseaux, de la sécurité et des télécommunications à travers des cours, des travaux dirigés (TD) et des projets tutorés.</p>
                <h4>Et maintenant ?</h4>
                <p>Je suis actuellement en première année, avec un rythme d'un mois en entreprise et un mois en formation à l'ITSRA.</p>
            `
        },
        "bac": {
            title: "Baccalauréat Général",
            date: "2024 - 2025",
            location: "Lycée François Mauriac",
            content: `
                <h4>Spécialités</h4>
                <p>Mathématiques et Numérique et Sciences de l'Informatique (NSI).<br>Mention Assez Bien.</p>
                <h4>Compétences acquises</h4>
                <p>Bases solides en Python, compréhension du web (HTML/CSS), algorithmique avancée et gestion de bases de données.</p>
            `
        },
        "om": {
            title: "Scolarité en Outre-mer",
            date: "2015 - 2024",
            location: "Tahiti - Nouvelle-Calédonie ",
            content: `
                <h4>Contexte</h4>
                <p>J'ai vécu et étudié pendant près de 10 ans en Nouvelle-Calédonie et Tahiti, où j'ai effectué l'intégralité de mon collège et la majorité de mon lycée et de mon école primaire.</p>
                <h4>Apports personnels</h4>
                <p>Cette expérience m'a apporté une grande ouverture d'esprit et une capacité d'adaptation importante.</p>
            `
        }
    };

    // --- DONNÉES PROJETS ---
    const projectsData = {
        "whitesentinel": {
            title: "WhiteSentinel",
            subtitle: "Cybersécurité & Système",
            description: `
                <h4>Description</h4>
                <p>Station blanche de sécurité (kiosque de décontamination) pour analyser les périphériques USB.</p>
                <h4>Technologies</h4>
                <ul><li>Python</li><li>Bash / Linux</li><li>ClamAV</li></ul>
            `
        },
        "autotech": {
            title: "Map.NC",
            subtitle: "Web & Database",
            description: `
                <h4>Description</h4>
                <p>Site web sous forme de carte pour localisé des zones sinistrés pendant les émeutes en Nouvelle-Calédonie.</p>
                <h4>Technologies</h4>
                <ul><li>HTML / CSS / JS</li><li>PHP & MySQL</li></ul>
            `
        },
        "portfolio": {
            title: "Portfolio V1",
            subtitle: "Développement Front-End",
            description: `
                <h4>Description</h4>
                <p>Création de ce site personnel pour présenter mon parcours.</p>
                <h4>Technologies</h4>
                <ul><li>HTML5 / CSS3</li><li>JavaScript (Vanilla)</li></ul>
            `
        },
        "config_cisco": {
            title: "Projet Intégratif",
            subtitle: "Réseaux - Routing & Switching",
            description: `
                <h4>Objectif</h4>
                <p>Mise en place d'une architecture réseau d'entreprise complète dans le cadre d'un projet de fin d'année</p>
                <h4>Configuration</h4>
                <ul><li>Mise en place de réseaux</li><li>Routage Inter-VLAN</li><li>Sécurité</li></ul>
            `
        }
    };

    // --- LOGIQUE D'OUVERTURE DU PANNEAU ---
    const sidePanel = document.getElementById('side-panel');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');
    
    // Éléments internes
    const pTitle = document.getElementById('panel-title');
    const pDate = document.getElementById('panel-date');
    const pLocation = document.getElementById('panel-location');
    const pBody = document.getElementById('panel-body');
    
    // Sélection du pied de page du panneau (où se trouve le bouton)
    const pFooter = document.querySelector('.panel-footer');

    // Fonction unifiée pour ouvrir Formation OU Projet
    function openPanel(type, id) {
        let data;

        if (type === 'formation') {
            data = formationsData[id];
            if(!data) return;
            
            pTitle.textContent = data.title;
            pDate.textContent = data.date;
            pLocation.style.display = 'block';
            pLocation.textContent = data.location;
            pBody.innerHTML = data.content;

            // CACHER le bouton pour les formations (BUT, Scolarité, Bac)
            if(pFooter) pFooter.style.display = 'none';

        } else if (type === 'project') {
            data = projectsData[id];
            if(!data) return;

            pTitle.textContent = data.title;
            pDate.textContent = data.subtitle;
            pLocation.style.display = 'none';
            pBody.innerHTML = data.description;

            // AFFICHER le bouton pour les projets
            if(pFooter) pFooter.style.display = 'block';
        }

        sidePanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        sidePanel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Clic sur les Formations
    document.querySelectorAll('.timeline-item .clickable').forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.closest('.timeline-item');
            const id = parent.getAttribute('data-id');
            openPanel('formation', id);
        });
    });

    // Clic sur les Projets
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            openPanel('project', id);
        });
    });

    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // ==========================================
    // 4. LOGIQUE CARROUSEL
    // ==========================================
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    if (track && cards.length > 0) {
        let currentIndex = 0;

        const getCardWidth = () => {
            return cards[0].offsetWidth + 30; 
        };

        const updateCarousel = () => {
            const amountToMove = getCardWidth() * currentIndex;
            track.style.transform = `translateX(-${amountToMove}px)`;
        };

        nextButton.addEventListener('click', () => {
            const containerWidth = document.querySelector('.carousel-container').offsetWidth;
            const visibleCards = Math.floor(containerWidth / cards[0].offsetWidth);
            
            if (currentIndex < (cards.length - visibleCards)) {
                currentIndex++;
                updateCarousel();
            } else {
                currentIndex = 0;
                updateCarousel();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        window.addEventListener('resize', updateCarousel);
    }
});