/**
 * BMJC Devs - Script Principal de Interacciones y Experiencia de Usuario
 * - Gestión de tema Dark / Light con persistencia
 * - Menú responsive móvil
 * - Pestañas interactivas de la consola del estudio
 * - Filtros de proyectos
 * - Copiado rápido de email al portapapeles con toast
 * - Scroll spy para navegación activa
 */

(function () {
  'use strict';

  const root = document.documentElement;
  const toggleBtn = document.getElementById('tg');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const STORAGE_KEY = 'bmjc-theme';

  /* ==========================================================================
     1. Gestión de Tema (Dark / Light)
     ========================================================================== */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'
      );
    }
  }

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      console.warn('No se pudo acceder a localStorage:', e);
    }

    // Por defecto oscuro para un perfil de tech studio moderno, o preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  // Inicializar tema inmediatamente
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);

      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {
        console.warn('Error al guardar preferencia de tema:', e);
      }
    });
  }

  /* ==========================================================================
     2. Menú de Navegación Móvil
     ========================================================================== */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     3. Consola Interactiva del Hero (Tabs)
     ========================================================================== */
  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalBodies = document.querySelectorAll('.terminal-body');

  terminalTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetTabId = 'tab-' + tab.getAttribute('data-tab');

      terminalTabs.forEach(function (t) { t.classList.remove('active'); });
      terminalBodies.forEach(function (b) { b.classList.remove('active'); });

      tab.classList.add('active');
      const targetBody = document.getElementById(targetTabId);
      if (targetBody) {
        targetBody.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     4. Filtros de Proyectos
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. Notificación Toast Flotante
     ========================================================================== */
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ==========================================================================
     6. Copiado de Email al Portapapeles
     ========================================================================== */
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const email = 'contactobmjc@gmail.com';
      const textSpan = copyBtn.querySelector('.copy-text');

      navigator.clipboard.writeText(email).then(
        function () {
          copyBtn.classList.add('copied');
          if (textSpan) textSpan.textContent = '¡Copiado!';
          showToast('✓ Correo copiado al portapapeles: ' + email);

          setTimeout(function () {
            copyBtn.classList.remove('copied');
            if (textSpan) textSpan.textContent = 'Copiar correo';
          }, 2400);
        },
        function () {
          // Fallback en caso de bloqueo de clipboard
          showToast('Escríbenos a: ' + email);
        }
      );
    });
  }

  /* ==========================================================================
     7. Scroll Spy (Navegación Activa al Desplazarse)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(function (section) {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(function (item) {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + sectionId) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
})();
