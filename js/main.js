

/* ==========================================================
   NAVBAR
========================================================== */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const desktopLinks = document.querySelectorAll(".nav-link");
const mobileLinks = document.querySelectorAll(".mobile-link");



/* ==========================================================
   HEADER SCROLL
========================================================== */

function handleHeaderScroll() {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

handleHeaderScroll();

window.addEventListener("scroll", handleHeaderScroll);





/* ==========================================================
   MOBILE MENU
========================================================== */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        const expanded =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", !expanded);

        document.body.classList.toggle("menu-open");

    });

}





/* ==========================================================
   FECHAR MENU AO CLICAR EM UM LINK
========================================================== */

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

    });

});





/* ==========================================================
   SCROLL SUAVE
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});




/* ==========================================================
   FECHAR MENU AO REDIMENSIONAR
========================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 991) {

        mobileMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");

    }

});

/* ==========================================================
   HERO
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initHeroParallax();
    initHeroTilt();
    initScrollIndicator();

});


/* ==========================================================
   PARALLAX
========================================================== */

function initHeroParallax(){

    const hero = document.querySelector(".hero");

    const blur1 = document.querySelector(".blur-1");
    const blur2 = document.querySelector(".blur-2");
    const grid = document.querySelector(".grid-overlay");

    if(!hero) return;

    window.addEventListener("scroll", () => {

        const offset = window.scrollY;

        blur1.style.transform =
            `translateY(${offset * .12}px)`;

        blur2.style.transform =
            `translateY(${offset * -.10}px)`;

        grid.style.transform =
            `translateY(${offset * .05}px)`;

    });

}



/* ==========================================================
   HERO IMAGE TILT
========================================================== */

function initHeroTilt(){

    const frame = document.querySelector(".image-frame");

    if(!frame) return;

    frame.addEventListener("mousemove", e=>{

        const rect = frame.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - .5) * 8;

        const rotateX =
            ((y / rect.height) - .5) * -8;

        frame.style.transform =

        `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-8px)
        `;

    });


    frame.addEventListener("mouseleave", ()=>{

        frame.style.transform =

        `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0px)
        `;

    });

}



/* ==========================================================
   SCROLL INDICATOR
========================================================== */

function initScrollIndicator(){

    const indicator =
        document.querySelector(".scroll-indicator");

    if(!indicator) return;

    window.addEventListener("scroll", ()=>{

        if(window.scrollY > 120){

            indicator.style.opacity = "0";
            indicator.style.pointerEvents = "none";

        }

        else{

            indicator.style.opacity = "1";
            indicator.style.pointerEvents = "all";

        }

    });

}




/* ==========================================================
   ESTATÍSTICAS
========================================================== */
const statsSection = document.querySelector(".stats");
const statNumbers = document.querySelectorAll(".stat-number");

function animateStats() {
    statNumbers.forEach((number) => {
        const target = Number(number.dataset.target);
        let current = 0;
        const duration = 1800;
        const increment = target / (duration / 16);

        function updateCounter() {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                number.textContent = target;
            }
        }

        updateCounter();
    });
}

if (statsSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                 console.log("intersecting:", entry.isIntersecting, entry.target);
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(statsSection);
}



/* ==========================================================
   TRABALHOS
========================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* Remove o ativo */

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        workCards.forEach((card) => {

            const category = card.dataset.category;

            if (filter === "all" || filter === category) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});

/* =================  CARD HOVER (EFEITO 3D LEVE)========================================= */

workCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 6;
        const rotateX = ((y / rect.height) - 0.5) * -6;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});



// ==========================================
// COMPETÊNCIAS
// ==========================================

const skillCards = document.querySelectorAll(".skill-card");

if (skillCards.length) {

    const skillsObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100);

                skillsObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    skillCards.forEach(card => skillsObserver.observe(card));

}

// ==========================================
// EFEITO 3D SUAVE
// ==========================================

skillCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 25;
        const rotateX = -(y - rect.height / 2) / 25;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});




// ==========================================
// BASTIDORES
// ==========================================

const backstageCards = document.querySelectorAll(".backstage-card");
const backstageLightbox = document.querySelector(".backstage-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

// ============== ANIMAÇÃO NO SCROLL===============================

if (backstageCards.length) {

    const backstageObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 80);

                backstageObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    backstageCards.forEach(card => backstageObserver.observe(card));

}

// ================ LIGHTBOX===================================

backstageCards.forEach(card => {

    card.addEventListener("click", () => {

        const image = card.querySelector("img");
        const title = card.querySelector("h3");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = title.textContent;

        backstageLightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

// ================ FECHAR LIGHTBOX===================================

function closeLightbox() {

    backstageLightbox.classList.remove("active");

    document.body.style.overflow = "";

}

lightboxClose.addEventListener("click", closeLightbox);

// Fecha clicando no fundo

backstageLightbox.addEventListener("click", (e) => {

    if (e.target === backstageLightbox) {
        closeLightbox();
    }

});

// Fecha com ESC

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && backstageLightbox.classList.contains("active")) {
        closeLightbox();
    }

});

// =========== EFEITO 3D SUAVE===================================

backstageCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 25) / 20;
        const rotateX = -(y - rect.height / 25) / 20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});


// ==========================================
// FERRAMENTAS
// ==========================================

const toolCards = document.querySelectorAll(".tool-card");

if (toolCards.length) {

    const toolsObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 80);

                toolsObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    toolCards.forEach(card => toolsObserver.observe(card));

}

// == EFEITO 3D SUAVE=========================================

toolCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x - rect.width / 2) / 28;
        const rotateX = -(y - rect.height / 2) / 28;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});

// ==========================================
// FOOTER
// ==========================================

const footerItems = document.querySelectorAll(".footer-content > *");

if (footerItems.length) {

    const footerObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {

                    entry.target.classList.add("visible");

                }, index * 150);

                footerObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    footerItems.forEach(item => footerObserver.observe(item));

}

// =================== HOVER NAS REDES SOCIAIS=====================================

document.querySelectorAll(".footer-social a").forEach(link => {

    link.addEventListener("mousemove", (e) => {

        const rect = link.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        link.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px) translateY(-6px)`;

    });

    link.addEventListener("mouseleave", () => {

        link.style.transform = "";

    });

});




/* ============================================================================================================
   MODAL DE VIDEO
=========================================================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const featuredBtn = document.getElementById('openFeaturedVideo');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeVideoBtn');
    const overlay = document.getElementById('closeVideoOverlay');
    const iframe = document.getElementById('youtubeIframe');
    const featuredVideoId = 'Oc2_utq1Eoo';

    function openFeaturedVideo() {
        iframe.src = `https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&rel=0&enablejsapi=1`;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    if (featuredBtn) {
        featuredBtn.addEventListener('click', openFeaturedVideo);
    }

    function openModal(videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        iframe.src = '';
    }

    // Seleciona todos os cards
    const cards = document.querySelectorAll('.work-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video');
            if (videoId) {
                openModal(videoId);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});



/* ========  ESC  ========================================================== */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        videoModal.classList.contains("active")
    ) {

        closeFeaturedVideo();

    }

});


/* ==========================================================
   MODAL DE AUDIO
========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const audioModal = document.getElementById('audioModal');
    const closeBtn = document.getElementById('closeAudioBtn');
    const overlay = document.getElementById('closeAudioOverlay');
    const audioPlayer = document.getElementById('audioPlayer');

    function openAudioModal(audioPath) {
        audioPlayer.querySelector('source').src = audioPath;
        audioPlayer.load(); // força recarregar o arquivo
        audioPlayer.play(); // inicia automaticamente
        audioModal.classList.add('active');
        audioModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeAudioModal() {
        audioModal.classList.remove('active');
        audioModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // reseta
    }

    // Exemplo: cada card com data-audio
    const audioCards = document.querySelectorAll('.work-card[data-audio]');
    audioCards.forEach(card => {
        card.addEventListener('click', () => {
            const audioPath = card.getAttribute('data-audio');
            if (audioPath) {
                openAudioModal(audioPath);
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeAudioModal);
    if (overlay) overlay.addEventListener('click', closeAudioModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && audioModal.classList.contains('active')) {
            closeAudioModal();
        }
    });
});






/* ==========================================================
   EVENTOS
========================================================== */

if (openVideoButton) {

    openVideoButton.addEventListener("click", openFeaturedVideo);

}

if (watchFeaturedButton) {

    watchFeaturedButton.addEventListener("click", openFeaturedVideo);

}

if (closeVideoButton) {

    closeVideoButton.addEventListener("click", closeFeaturedVideo);

}

if (modalOverlay) {

    modalOverlay.addEventListener("click", closeFeaturedVideo);

}