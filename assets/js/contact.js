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
// フッター フェードイン（スマホ + 共通トグル）
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
// （ブランド／ストアはポップアップJSで制御）
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
// sessionStorage によるページ間アクティブ状態の保持（ブランド／ストア除外）
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
// 問い合わせフォーム（そのまま移植）
// ====================================================
(function () {
  'use strict';

  // THANK_YOU_URL は使わない（Formspree の「ありがとう」画面に飛ばない）
  var THANK_YOU_URL = "";

  function ready(fn){ 
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    var form = document.getElementById('contactForm');
    if (!form) return;

    var resultEl = document.getElementById('formResult'); // エラー表示用

    // 既存のリスナーがあった場合に備えてクローン
    var clone = form.cloneNode(true);
    form.parentNode.replaceChild(clone, form);
    form = clone;

    // action / method の保険
    if (!form.getAttribute('action')) {
      console.warn('[contact] Missing action URL on #contactForm.');
    }
    if (!/^post$/i.test(form.getAttribute('method') || '')) {
      form.setAttribute('method', 'POST');
    }

    // 入力画面・確認画面
    var inputView   = document.getElementById('inputView');
    var confirmView = document.getElementById('confirmView');

    var backBtn  = confirmView ? confirmView.querySelector('.confirm-back') : null;
    var sendBtn  = confirmView ? confirmView.querySelector('.confirm-send') : null;

    var cName    = document.getElementById('c-name');
    var cKana    = document.getElementById('c-kana');
    var cEmail   = document.getElementById('c-email');
    var cTel     = document.getElementById('c-tel');
    var cMessage = document.getElementById('c-message');

    var nameInput    = document.getElementById('name');
    var kanaInput    = document.getElementById('kana');
    var emailInput   = document.getElementById('email');
    var telInput     = document.getElementById('tel');
    var messageInput = document.getElementById('message');

    // ★ 完了モーダル
    var thanksModal = document.getElementById('contactThanks');
    var thanksClose = thanksModal ? thanksModal.querySelector('.contact-thanks__close') : null;
    var lastFocusedBeforeThanks = null;

    function openThanksModal() {
      if (!thanksModal) return;
      lastFocusedBeforeThanks = document.activeElement;

      thanksModal.classList.add('is-open');
      thanksModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      thanksClose && thanksClose.focus();
    }

    function closeThanksModal() {
      if (!thanksModal) return;

      thanksModal.classList.remove('is-open');
      thanksModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');

      if (lastFocusedBeforeThanks && typeof lastFocusedBeforeThanks.focus === 'function') {
        lastFocusedBeforeThanks.focus();
      }
    }

    if (thanksClose) {
      thanksClose.addEventListener('click', closeThanksModal);
    }
    if (thanksModal) {
      thanksModal.addEventListener('click', function(e){
        if (!e.target.closest('.contact-thanks__dialog')) {
          closeThanksModal();
        }
      });
    }
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && thanksModal && thanksModal.classList.contains('is-open')) {
        closeThanksModal();
      }
    });

    if (!confirmView || !inputView) {
      console.warn('[contact] confirm view not found – confirmation disabled.');
      return;
    }

    // ① 最初の「送信する」で確認画面に切り替える
    form.addEventListener('submit', function(e){
      // すでに確認モード or 送信済みならここでは何もしない
      if (form.dataset.mode === 'confirm' || form.dataset.mode === 'sent') {
        return;
      }

      e.preventDefault();

      if (cName)    cName.textContent    = nameInput?.value    || '－';
      if (cKana)    cKana.textContent    = kanaInput?.value    || '－';
      if (cEmail)   cEmail.textContent   = emailInput?.value   || '－';
      if (cTel)     cTel.textContent     = telInput?.value     || '－';
      if (cMessage) cMessage.textContent = messageInput?.value || '－';

      inputView.hidden   = true;
      confirmView.hidden = false;

      form.dataset.mode = 'confirm';

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // ② 「戻る」ボタン：入力画面に戻す
    backBtn && backBtn.addEventListener('click', function(){
      confirmView.hidden = true;
      inputView.hidden   = false;
      form.dataset.mode  = '';
    });

    // ③ 確認画面の「送信する」ボタン：Formspree へ fetch で送信
    sendBtn && sendBtn.addEventListener('click', async function(){
      if (form.dataset.mode === 'sent') return; // 二重送信ガード

      var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');

      if (resultEl) {
        resultEl.textContent = '';
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }
      sendBtn.disabled = true;
      sendBtn.setAttribute('aria-busy', 'true');

      form.dataset.mode = 'sent';

      try {
        var formData = new FormData(form);

        var response = await fetch(form.action, {
          method: form.method || 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          // ★ 送信成功 → モーダル表示
          openThanksModal();

          // フォームをリセットして入力画面に戻しておく
          form.reset();
          inputView.hidden   = false;
          confirmView.hidden = true;
          form.dataset.mode  = '';
        } else {
          if (resultEl) {
            resultEl.textContent = '送信に失敗しました。お手数ですが、時間をおいて再度お試しください。';
          }
          form.dataset.mode = 'confirm'; // 確認画面のまま
        }
      } catch (err) {
        if (resultEl) {
          resultEl.textContent = '通信エラーが発生しました。ネットワーク環境をご確認のうえ、再度お試しください。';
        }
        form.dataset.mode = 'confirm';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
        }
        sendBtn.disabled = false;
        sendBtn.removeAttribute('aria-busy');
      }
    });

    if (location.protocol === 'file:') {
      console.warn('[contact] Running from file:// — use a local server for realistic testing.');
    }
  });
})();
