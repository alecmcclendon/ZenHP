// refreshする -------------------------------------
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);
// refreshする -------------------------------------

// ブランド--------------------------------------------
(() => {
  const header  = document.querySelector('header');
  const panel   = document.querySelector('.brand_container');
  const openers = document.querySelectorAll('.js-open-brands');
  const closer  = panel?.querySelector('.brand_close');

  const spHamburger = document.getElementById('hamburger');
  const spMenu      = document.getElementById('sp-menu');

  if (!header || !panel) return;

  function setPanelTop(){
    const h = header.offsetHeight || 0;
    panel.style.setProperty('--brands-top', `${h}px`);
  }
  setPanelTop();
  window.addEventListener('resize', setPanelTop);

  function closeSpMenu(){
    if (!spMenu) return;
    spMenu.classList.remove('is-open');
    spHamburger?.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    spHamburger?.setAttribute('aria-expanded', 'false');
  }

  function closeStorePanelIfOpen() {
    const storePanel = document.querySelector('.store_container');
    if (!storePanel) return;

    storePanel.classList.remove('is-open');
    storePanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('store-open');

    document.querySelectorAll('.js-open-store.active')
      .forEach(el => el.classList.remove('active'));
  }

  function openPanel(){
    closeStorePanelIfOpen();

    setPanelTop();
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('brands-open');
    panel.querySelector('.brand_contents a')?.focus();
  }

  function closePanel(){
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('brands-open');

    document.querySelectorAll('.js-open-brands.active')
      .forEach(el => el.classList.remove('active'));
  }

  openers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSpMenu();
      if (panel.classList.contains('is-open')) {
        closePanel();
      } else {
        document.querySelectorAll('.js-open-brands.active')
          .forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        openPanel();
      }
    });
  });

  closer?.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      closePanel();
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('is-open')) return;
    const clickedInsidePanel = panel.contains(e.target);
    const clickedOpener = Array.from(openers).some(op => op.contains(e.target));
    if (!clickedInsidePanel && !clickedOpener) closePanel();
  });
})();
// ブランド--------------------------------------------


// ストア--------------------------------------------
(() => {
  const header  = document.querySelector('header');
  const panel   = document.querySelector('.store_container');
  const openers = document.querySelectorAll('.js-open-store');
  const closer  = panel?.querySelector('.store_close');

  const spHamburger = document.getElementById('hamburger');
  const spMenu      = document.getElementById('sp-menu');

  if (!header || !panel || !openers.length) return;

  function setPanelTop(){
    const h = header.offsetHeight || 0;
    panel.style.setProperty('--store-top', `${h}px`);
  }
  setPanelTop();
  window.addEventListener('resize', setPanelTop);

  function closeSpMenu(){
    if (!spMenu) return;
    spMenu.classList.remove('is-open');
    spHamburger?.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    spHamburger?.setAttribute('aria-expanded', 'false');
  }

  function closeBrandPanelIfOpen() {
    const brandPanel = document.querySelector('.brand_container');
    if (!brandPanel) return;

    brandPanel.classList.remove('is-open');
    brandPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('brands-open');

    document.querySelectorAll('.js-open-brands.active')
      .forEach(el => el.classList.remove('active'));
  }

  function openPanel(btn){
    closeBrandPanelIfOpen();

    setPanelTop();
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('store-open');

    document.querySelectorAll('.js-open-store.active')
      .forEach(el => el.classList.remove('active'));
    btn.classList.add('active');

    panel.querySelector('.store_contents a')?.focus();
  }

  function closePanel(){
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('store-open');

    document.querySelectorAll('.js-open-store.active')
      .forEach(el => el.classList.remove('active'));
  }

  openers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSpMenu();
      if (panel.classList.contains('is-open')) {
        closePanel();
      } else {
        openPanel(btn);
      }
    });
  });

  closer?.addEventListener('click', closePanel);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      closePanel();
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.classList.contains('is-open')) return;
    const clickedInsidePanel = panel.contains(e.target);
    const clickedOpener = Array.from(openers).some(op => op.contains(e.target));
    if (!clickedInsidePanel && !clickedOpener) closePanel();
  });
})();
// ストア--------------------------------------------



/*画像コンテンツ-------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.image_container');
  const sticky    = document.querySelector('.image_sticky');
  const frame     = document.querySelector('.image_frame');
  const images    = Array.from(document.querySelectorAll('.image_stack img'));

  if (!container || !sticky || !frame || images.length === 0) return;

  let startVH, peakVH, endVH, VH_PER;
  const fadeWidth = 0.5;

  const isSmallScreen = () => window.innerWidth <= 800;

  function applyConfig() {
    if (isSmallScreen()) {
      startVH = 30;
      peakVH  = 60;
      endVH   = 100;
      VH_PER  = 140;
    } else {
      startVH = 40;
      peakVH  = 100;
      endVH   = 40;
      VH_PER  = 140;
    }
  }

  const ease = t => t;

  const steps = Math.max(1, images.length - 1);
  function setContainerHeight() {
    container.style.height = `${100 + VH_PER * steps}vh`;
  }

  applyConfig();
  setContainerHeight();

  const clamp01 = x => Math.max(0, Math.min(1, x));

  let ticking = false;

  function update() {
    ticking = false;

    const rect = container.getBoundingClientRect();
    const totalScroll = container.offsetHeight - window.innerHeight;
    const passed = clamp01(Math.min(totalScroll, Math.max(0, -rect.top)) / totalScroll);
    const p = ease(passed);

    let currentVH;
    if (p <= 0.5) {
      const local = p / 0.5;
      currentVH = startVH + (peakVH - startVH) * local;
    } else {
      const local = (p - 0.5) / 0.5;
      currentVH = peakVH + (endVH - peakVH) * local;
    }
    frame.style.height = `${currentVH}vh`;

    const n = images.length;
    const segPos = p * (n - 1);
    const base = Math.floor(segPos);
    const local = segPos - base;

    images.forEach((img, i) => {
      let opacity = 0;

      if (i === base) {
        if (local < (1 - fadeWidth)) {
          opacity = 1;
        } else {
          const t = (local - (1 - fadeWidth)) / fadeWidth;
          opacity = 1 - t;
        }
      } else if (i === base + 1 && (base + 1) < n) {
        if (local < (1 - fadeWidth)) {
          opacity = 0;
        } else {
          const t = (local - (1 - fadeWidth)) / fadeWidth;
          opacity = t;
        }
      }

      img.style.opacity = String(opacity);
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  function onResize() {
    applyConfig();
    setContainerHeight();
    update();
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
});


/*画像コンテンツ-------------------------------------- */


/*フェードイン --------------------------------------- */
window.addEventListener('scroll', () => {
  const footer = document.querySelector('footer');
  const companyInfo = document.querySelector('.company_info');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPosition >= pageHeight - 50) {
    footer?.classList.add('visible');
    companyInfo?.classList.add('visible');
  } else {
    footer?.classList.remove('visible');
    companyInfo?.classList.remove('visible');
  }
});

// スマホ用 -----------------------------------------
window.addEventListener('scroll', () => {
  if (window.innerWidth > 600) return;

  const footer = document.querySelector('footer');
  const companyInfoSmartphone = document.querySelector('.company_info_smartphone');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPosition >= pageHeight - 50) {
    footer?.classList.add('visible');
    companyInfoSmartphone?.classList.add('visible');
  } else {
    footer?.classList.remove('visible');
    companyInfoSmartphone?.classList.remove('visible');
  }
});

function toggleFooterVisibility() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  const isBottom = scrollPosition >= pageHeight - 50;

  document.querySelectorAll('footer, .company_info, .company_info_smartphone')
    .forEach(el => el.classList.toggle('visible', isBottom));
}

['scroll', 'load', 'resize'].forEach(evt =>
  window.addEventListener(evt, toggleFooterVisibility)
);
// スマホ用 -----------------------------------------
//フェードイン ---------------------------------------


// ハンバーガーメニュー -------------------------------
(() => {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('sp-menu');
  if (!btn || !menu) return;

  const closeMenu = () => {
    btn.classList.remove('is-active');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-open');
  };

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('is-active');
    menu.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
  });

  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('click', (e) => {
    const inside = btn.contains(e.target) || menu.contains(e.target);
    if (!inside && btn.classList.contains('is-active')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.classList.contains('is-active')) closeMenu();
  });
})();
// ハンバーガーメニュー --------------------------------


document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const group = link.closest('.menu, #sp-menu');
    if (!group) return;
    if (link.classList.contains('js-open-brands') ||
        link.classList.contains('js-open-store')) return;

    if ((link.getAttribute('href') || '#') === '#') e.preventDefault();
    group.querySelectorAll('a.active').forEach(el => el.classList.remove('active'));
    link.classList.add('active');
  });
});


// ----------------------------------------------------
// URL に基づくアクティブ状態の維持（ブランド・ストア・「#」を除外）
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const BASE = document.baseURI || window.location.href;

  const normalizePath = (p) => {
    let path = (p || '/').split('#')[0].split('?')[0];
    if (!path.startsWith('/')) path = '/' + path;
    path = path.replace(/\/index\.html?$/i, '/').replace(/\/{2,}/g, '/');
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return path;
  };

  const current = normalizePath(new URL(window.location.href, BASE).pathname);

  document.querySelectorAll('.menu a.active, #sp-menu a.active, #contact_us.active')
    .forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });

  const links = Array.from(document.querySelectorAll('.menu a, #sp-menu a, #contact_us'))
    .filter(a =>
      !a.classList.contains('js-open-brands') &&
      !a.classList.contains('js-open-store')
    );

  links.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === '#' || href.startsWith('javascript:')) return;

    let u;
    try { u = new URL(href, BASE); } catch { return; }
    if (u.origin !== new URL(BASE).origin) return;

    const linkPath = normalizePath(u.pathname);
    if (linkPath === current) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });
});


// ----------------------------------------------------
// sessionStorage を用いたページ間でのアクティブ状態の保持（BASE 対応）
//  - ブランド・ストアリンクは対象外
// ----------------------------------------------------

(function(){
  const KEY  = 'navActivePath';
  const BASE = document.baseURI || window.location.href;

  const normalizePath = (p) => {
    let path = (p || '/').split('#')[0].split('?')[0];
    if (!path.startsWith('/')) path = '/' + path;
    path = path.replace(/\/index\.html?$/i, '/').replace(/\/{2,}/g, '/');
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return path;
  };

  const clearAll = () => {
    document.querySelectorAll('.menu a.active, #sp-menu a.active, [id="contact_us"].active')
      .forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
  };

  const applyForPath = (path) => {
    if (!path) return;
    clearAll();

    document.querySelectorAll(
      '.menu a:not(.js-open-brands):not(.js-open-store), ' +
      '#sp-menu a:not(.js-open-brands):not(.js-open-store)'
    ).forEach(a => {
      const href = a.getAttribute('href') || '';
      try {
        const u = new URL(href, BASE);
        if (u.origin === new URL(BASE).origin && normalizePath(u.pathname) === path) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
      } catch {}
    });

    document.querySelectorAll('[id="contact_us"]').forEach(a => {
      const href = a.getAttribute('href') || '';
      try {
        const u = new URL(href, BASE);
        if (u.origin === new URL(BASE).origin && normalizePath(u.pathname) === path) {
          a.classList.add('active');
          a.setAttribute('aria-current', 'page');
        }
      } catch {}
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const saved   = sessionStorage.getItem(KEY);
    const current = normalizePath(new URL(window.location.href, BASE).pathname);
    applyForPath(saved || current);
    sessionStorage.removeItem(KEY);
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    if (a.classList.contains('js-open-brands') ||
        a.classList.contains('js-open-store')) return;

    const inMenus  = a.closest('.menu, #sp-menu');
    const isContact = a.id === 'contact_us';
    if (!inMenus && !isContact) return;

    try {
      const u = new URL(a.getAttribute('href') || '', BASE);
      if (u.origin === new URL(BASE).origin && u.pathname) {
        sessionStorage.setItem(KEY, normalizePath(u.pathname));
      } else {
        sessionStorage.removeItem(KEY);
      }
    } catch {
      sessionStorage.removeItem(KEY);
    }

    clearAll();
    a.classList.add('active');
    a.setAttribute('aria-current', 'page');
  });
})();

// ===================================
// スクロール
// ===================================

(() => {
  const indicator = document.getElementById('scrollIndicator');
  if (!indicator) return;

  const scrollText = indicator.querySelector('.scroll-text');
  const body = document.body;

  const isOverlayOpen = () =>
    body.classList.contains('brands-open') ||
    body.classList.contains('store-open')  ||
    body.classList.contains('menu-open');

  function updateIndicator() {
    const atTop = window.scrollY === 0;
    const overlayOpen = isOverlayOpen();

    // 表示条件：ページ最上部 AND ポップアップが開いていない
    const shouldShow = atTop && !overlayOpen;

    indicator.classList.toggle('hidden', !shouldShow);

    if (scrollText) {
      scrollText.classList.toggle('blink', shouldShow);
    }
  }

  // scroll / load
  window.addEventListener('load', updateIndicator);
  window.addEventListener('scroll', updateIndicator, { passive: true });

  new MutationObserver(updateIndicator).observe(body, {
    attributes: true,
    attributeFilter: ['class']
  });

  updateIndicator();
})();
  

// ===================================
// スクロール
// ===================================