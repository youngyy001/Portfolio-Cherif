 // Loader logic
        let percent = 0;
        const percentEl = document.getElementById("loader-percent");
        const loader = document.getElementById("loader");
        const header = document.getElementById("header");
        const cubeLoader = document.getElementById("cube-loader");
        const cubeHeader = document.getElementById("cube-header");

        const interval = setInterval(() => {
            percent++;
            percentEl.textContent = percent + "%";
            if (percent >= 100) {
                clearInterval(interval);
                const cubeClone = cubeLoader.cloneNode(true);
                cubeClone.style.position = "fixed";
                const rect = cubeLoader.getBoundingClientRect();
                cubeClone.style.left = rect.left + "px";
                cubeClone.style.top = rect.top + "px";
                cubeClone.style.width = rect.width + "px";
                cubeClone.style.height = rect.height + "px";
                cubeClone.style.margin = 0;
                cubeClone.style.transition = "all 1s ease";
                document.body.appendChild(cubeClone);
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    header.classList.add("visible");
                    cubeHeader.style.display = "block";
                    const headerRect = cubeHeader.getBoundingClientRect();
                    cubeClone.style.left = headerRect.left + "px";
                    cubeClone.style.top = headerRect.top + "px";
                    cubeClone.style.width = headerRect.width + "px";
                    cubeClone.style.height = headerRect.height + "px";
                    setTimeout(() => {
                        cubeClone.remove();
                    }, 1000);
                }, 500);
            }
        }, 30);

        // Scroll effects
        function handleScroll() {
            document.querySelectorAll('.panel').forEach(panel => {
                const rect = panel.getBoundingClientRect();
                const ratio = rect.top / window.innerHeight;
                panel.style.backgroundPositionY = `${50 + ratio * 40}%`;
                const content = panel.querySelector('.content');
                if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
                    content.classList.add('visible');
                } else {
                    content.classList.remove('visible');
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

        // Navigation
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Effet interactif des projets amélioré
        const projectWrappers = document.querySelectorAll('.project-wrapper');
        let activeProject = null;
        let hoverTimeout = null;

        projectWrappers.forEach((wrapper, index) => {
            const projectItem = wrapper.querySelector('.project-item');
            const projectVideo = wrapper.querySelector('.project-video');

            // Gestion du hover directement sur l'item et le wrapper
            const handleMouseEnter = () => {
                // Annuler tout timeout précédent
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                
                // Délai léger pour éviter les hovers accidentels
                hoverTimeout = setTimeout(() => {
                    if (activeProject !== null && activeProject !== index) {
                        // Reset l'ancien projet actif
                        projectWrappers[activeProject].classList.remove('active');
                        projectWrappers[activeProject].querySelector('.project-video').classList.remove('visible');
                        projectWrappers[activeProject].querySelector('.project-item').style.color = '#666';
                    }
                    
                    activeProject = index;
                    
                    // Activer le projet courant
                    wrapper.classList.add('active');
                    projectVideo.classList.add('visible');
                    projectItem.style.color = '#fff';
                    
                    // Gérer les autres projets
                    projectWrappers.forEach((otherWrapper, otherIndex) => {
                        if (otherIndex !== index) {
                            if (otherIndex < index) {
                                otherWrapper.classList.add('shift-left');
                                otherWrapper.classList.remove('shift-right', 'fade-out');
                            } else {
                                otherWrapper.classList.add('shift-right');
                                otherWrapper.classList.remove('shift-left', 'fade-out');
                            }
                        } else {
                            otherWrapper.classList.remove('shift-left', 'shift-right', 'fade-out');
                        }
                    });
                }, 100); // Délai réduit
            };

            const handleMouseLeave = () => {
                // Annuler le timeout d'entrée si on sort rapidement
                if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                }
                
                // Délai avant de cacher
                setTimeout(() => {
                    // Vérifier si on n'est pas revenus sur la zone
                    if (!wrapper.matches(':hover')) {
                        activeProject = null;
                        
                        // Reset tous les projets
                        projectWrappers.forEach(otherWrapper => {
                            otherWrapper.classList.remove('active', 'shift-left', 'shift-right', 'fade-out');
                            otherWrapper.querySelector('.project-video').classList.remove('visible');
                            otherWrapper.querySelector('.project-item').style.color = '#666';
                        });
                    }
                }, 150); // Délai pour la sortie
            };

            // Appliquer les événements sur le wrapper entier
            wrapper.addEventListener('mouseenter', handleMouseEnter);
            wrapper.addEventListener('mouseleave', handleMouseLeave);
        });

        document.querySelectorAll('.project-wrapper').forEach(wrapper => {
  const video = wrapper.querySelector('.video-placeholder video');

  wrapper.addEventListener('mouseenter', () => {
    if (video) {
      video.currentTime = 0; // repart du début
      video.play();
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    if (video) {
      video.pause();
    }
  });
});


//bienvenue en plusieurs langues

  const texts = [
    "Bienvenue sur mon portfolio",        // Français
    "Welcome to my portfolio",          // Anglais
    "Bienvenido a mi portafolio",       // Espagnol
    "Willkommen in meinem Portfolio",       // Allemand
    "Benvenuti nel mio portafoglio",        // Italien
    "مرحبا بكم في محفظتي",     // Arabe
    "欢迎来到我的投资组合",             // Chinois
    "私のポートフォリオへようこそ",         // Japonais
    "Добро пожаловать в мое портфолио"  // Russe
  ];

  let index = 0;
  const el = document.getElementById("welcome-text");

  setInterval(() => {
    index = (index + 1) % texts.length;
    el.textContent = texts[index];
    el.style.color = "black";
  }, 3000); // change toutes les 2s

  document.addEventListener('DOMContentLoaded', () => {
  const link = document.querySelector('.mail .write');
  if (!link) return;

  // Lance l'animation uniquement quand le lien devient visible (après le loader, au scroll, etc.)
  const observer = new IntersectionObserver((entries, obs) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      link.classList.add('animate');
      obs.disconnect(); // on joue une seule fois
    }
  }, { threshold: 0.4 });

  observer.observe(link);
});

const eyes = [
  document.getElementById("eye-left"),
  document.getElementById("eye-right")
];

document.addEventListener("mousemove", (e) => {
  eyes.forEach(eye => {
    const pupil = eye.querySelector(".pupil");
    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const angle = Math.atan2(dy, dx);
    const radius = 6; // distance maximale de déplacement de la pupille
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;

    pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});



// a coller
document.querySelectorAll(".apropos-text .keyword").forEach(word => {
  word.addEventListener("mouseenter", () => {
    const title = word.dataset.title;
    const videoSrc = word.dataset.video;

    const pancarte = document.querySelector(".apropos-pancarte");
    const pancarteTitle = pancarte.querySelector(".pancarte-title");
    const pancarteVideo = pancarte.querySelector("video");

    pancarte.style.display = "flex";
    pancarteTitle.textContent = title;
    pancarteVideo.src = videoSrc;
    pancarteVideo.play();
  });

  word.addEventListener("mouseleave", () => {
    const pancarte = document.querySelector(".apropos-pancarte");
    const pancarteVideo = pancarte.querySelector("video");

    pancarteVideo.pause();
    pancarte.style.display = "none";
  });
});




