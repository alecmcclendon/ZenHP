// ====================================================
// リロード時は常にページ最上部から表示
// ====================================================
window.history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// ====================================================
// ブランドポップアップ
// ====================================================
(() => {
  const header  = document.querySelector('header');
  const panel   = document.querySelector('.brand_container');
  const openers = document.querySelectorAll('.js-open-brands');
  const closer  = panel?.querySelector('.brand_close');

  const spHamburger = document.getElementById('hamburger');
  const spMenu      = document.getElementById('sp-menu');

  if (!header || !panel || !openers.length) return;

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

  function openPanel(btn){
    closeStorePanelIfOpen();

    setPanelTop();
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('brands-open');

    panel.scrollTop = 0;

    document.querySelectorAll('.js-open-brands.active')
      .forEach(el => el.classList.remove('active'));
    btn.classList.add('active');

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

// ====================================================
// ストアポップアップ
// ====================================================
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

    panel.scrollTop = 0;

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


// ====================================================
// フッター フェードイン (スマホ用 + 共通トグル)
// ====================================================
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

// ====================================================
// ハンバーガーメニュー
// ====================================================
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

// ====================================================
// メニュー内リンククリック時のアクティブ表示
// （ブランド／ストアはポップアップ側で制御）
// ====================================================
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

// ====================================================
// URL によるアクティブ状態（ブランド／ストア除外）
// ====================================================
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

// ====================================================
// sessionStorage によるアクティブ状態のページ間維持（ブランド／ストア除外）
// ====================================================
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


// ====================================================
// 経営理念モーダル
// ====================================================
// (function () {
//   const openButtons = document.querySelectorAll(
//     '.js-open-philosophy, .js-open-philosophy-top, #open-philosophy'
//   );
//   const modal       = document.getElementById('philo-modal');
//   if (!openButtons.length || !modal) return;

//   const dialog   = modal.querySelector('.modal__dialog');
//   const closeBtn = modal.querySelector('.modal__close');
//   let lastActive = null;

//   const open = (trigger) => {
//     // 保存しておくことで閉じたあとにフォーカスを戻す
//     lastActive = trigger || document.activeElement;
//     modal.classList.add('is-open');
//     modal.setAttribute('aria-hidden', 'false');
//     document.body.classList.add('modal-open');
//     closeBtn.focus({ preventScroll: true });
//   };

//   const close = () => {
//     modal.classList.remove('is-open');
//     modal.setAttribute('aria-hidden', 'true');
//     document.body.classList.remove('modal-open');
//     if (lastActive && typeof lastActive.focus === 'function') {
//       lastActive.focus({ preventScroll: true });
//     }
//   };

//   openButtons.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       open(btn);
//     });
//   });

//   closeBtn.addEventListener('click', close);

//   modal.addEventListener('click', (e) => {
//     if (e.target.closest('.modal__dialog')) return;
//     close();
//   });

//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && modal.classList.contains('is-open')) {
//       close();
//     }
//   });
// })();
