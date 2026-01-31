(() => {
  const toggle = document.querySelector('[data-k-nav-toggle]');
  const nav = document.querySelector('[data-k-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
    });
  }

  const themeToggle = document.querySelector('[data-k-theme-toggle]');
  const themeIcon = document.querySelector('[data-k-theme-icon]');
  const body = document.body;

  const applyTheme = (mode) => {
    if (!body) return;
    body.classList.toggle('k-theme--dark', mode === 'dark');
    body.classList.toggle('k-theme--light', mode === 'light');
    if (themeIcon) {
      themeIcon.textContent = mode === 'dark' ? '◑' : '◐';
    }
  };

  if (body) {
    const saved = localStorage.getItem('k-theme-palette');
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('k-theme--dark');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('k-theme-palette', next);
    });
  }

  // Inject Font Awesome 7 icons (webtrees 2.2.5 uses FA7 and solid style only)
  const navIconMap = {
    'Family tree': 'fa-house',
    'Charts': 'fa-chart-simple',
    'Lists': 'fa-list',
    'Calendar': 'fa-calendar-days',
    'Reports': 'fa-clipboard-list',
    'Clippings cart': 'fa-scissors',
    'Search': 'fa-magnifying-glass',
  };

  document.querySelectorAll('.k-nav a').forEach((link) => {
    const label = link.textContent.trim();
    const icon = navIconMap[label];
    if (icon && !link.querySelector('.k-nav__icon')) {
      const i = document.createElement('i');
      i.className = `fa-solid ${icon} k-nav__icon`;
      i.setAttribute('aria-hidden', 'true');
      link.prepend(i);
    }
  });

  const blockIconMap = {
    wt-block-header: 'fa-square',
    'wt-block-header-todays_events': 'fa-calendar-day',
    'wt-block-header-user_messages': 'fa-envelope',
    'wt-block-header-user_favorites': 'fa-star',
    'wt-block-header-logged_in': 'fa-user',
    'wt-block-header-upcoming_events': 'fa-calendar-days',
    'wt-block-header-random_media': 'fa-photo-film',
  };

  const addBlockIcon = (header) => {
    if (!header || header.querySelector('.k-block-icon')) return;
    const match = Object.keys(blockIconMap).find((cls) =>
      header.classList.contains(cls)
    );
    const icon = match ? blockIconMap[match] : blockIconMap['wt-block-header'];
    const i = document.createElement('i');
    i.className = `fa-solid ${icon} k-block-icon`;
    i.setAttribute('aria-hidden', 'true');
    header.prepend(i);
    header.classList.add('k-has-icon');
  };

  // Run once on existing headers.
  document.querySelectorAll('.wt-block-header').forEach(addBlockIcon);

  // Also handle blocks injected later via AJAX.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        if (node.classList?.contains('wt-block-header')) {
          addBlockIcon(node);
        }
        // If a whole block was added, find headers inside it.
        node.querySelectorAll?.('.wt-block-header').forEach(addBlockIcon);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
