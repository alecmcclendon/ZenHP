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
// メニュー内リンクのクリック時にアクティブ状態を付与
// （ブランド・ストアはポップアップ側で制御）
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
// URL に基づくアクティブ状態（ブランド・ストアを除外）
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
// sessionStorage を使ったページ間のアクティブ状態保持（ブランド・ストア除外）
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
// 沿革（PC）
// ====================================================
(() => {
  const historyData = [
    {
      label: '1986',
      heading: '1986',
      title: 'リストブティック ルイ / 苦楽園',
      text: 'Wrist Boutique LOUIS / Kurakuen'
    },
    {
      label: '1988',
      heading: '1988',
      title: 'リストブティック ルイ / 苦楽園',
      text: 'Wrist Boutique LOUIS / Kurakuen',
      image: 'assets/media/indi1.jpg',
      alt: '1988の店舗写真'
    },
    {
      label: '1990',
      heading: '1990',
      title: '会員制シャンパンバー ミグニョンヌ / 苦楽園',
      text: 'Membership Champagne Bar MIGNONNE',
      image: 'assets/media/indi2.jpg',
      alt: '1990の店舗写真'
    },
    {
      label: '1991',
      heading: '1991',
      title: 'ジ・エンド / 苦楽園',
      text: 'THE END / Kurakuen',
      image: 'assets/media/indi3.jpg',
      alt: '1991の店舗写真'
    },
    {
      label: '1994',
      heading: '1994',
      title: 'ラグビークラブ / 苦楽園',
      text: 'Rugby club / Kurakuen',
      image: 'assets/media/indi4.jpg',
      alt: '1994の写真'
    },
    {
      label: '1995',
      heading: '1995',
      title: '1/17　阪神淡路大震災',
      text: 'Hanshin-Awaji Earthquake'
    },
    {
      label: '1996',
      heading: '1996',
      title: 'リストブティック ルイOAPタワー / 帝国ホテル大阪',
      text: 'Wrist Boutique LOUIS',
      image: 'assets/media/indi5.jpg',
      alt: '1996の写真'
    },
    {
      label: '1997',
      heading: '1997',
      title: 'リストブティック ルイ クリスタ長堀',
      text: 'Wrist Boutique LOUIS Crysta-Nagahori',
      image: 'assets/media/indi6.jpg',
      alt: '2002年3月の写真'
    },
    {
      label: '',
      heading: '1997',
      title: '（有）ルイ コレクション設立',
      text: 'LOUIS COLLECTION Ltd. Est.'
    },
    {
      label: '',
      heading: '1997',
      title: 'リストブティック ルイ ランドマーク',
      text: 'Wrist Boutique LOUIS Landmark',
      image: 'assets/media/indi7.jpg',
      alt: '1997の写真'
    },
    {
      label: '1998',
      heading: '1998',
      title: 'Founded in 1998, Establish 2002.（有）ルイコレクション沖縄 1998創立,2002設立',
      text: 'LOUIS Collection Okinawa Ltd'
    },
    {
      label: '1999',
      heading: '1999',
      title: 'コロニー宮古',
      text: 'COLONY Miyako'
    },
    {
      label: '',
      heading: '1999',
      title: 'ルイコレクション / 福岡',
      text: 'LOUIS COLLECTION / Fukuoka'
    },
    {
      label: '2000',
      heading: '2000',
      title: 'ルイコレクション京都 河原町OPA',
      text: 'LOUIS COLLECTIONKyoto Kawaramachi'
    },
    {
      label: '2002',
      heading: '2002',
      title: 'ルイコレクション / 六甲',
      text: 'LOUIS COLLECTION / Rokkou'
    },
    {
      label: '',
      heading: '2002',
      title: 'ルイコレクション / 丸の内',
      text: 'LOUIS COLLECTION / Marunouchi',
      image: 'assets/media/indi8.jpg',
      alt: '2002の写真'
    },
    {
      label: '2004',
      heading: '2004',
      title: 'COLONY / 高知',
      text: 'COLONY / Kochi'
    },
    {
      label: '',
      heading: '2004',
      title: 'コロニー / 苦楽園',
      text: 'COLONY / Kurakuen',
      image: 'assets/media/indi9.jpg',
      alt: '2004の写真'
    },
    {
      label: '2005',
      heading: '2005',
      title: 'コロニー / 福岡',
      text: 'COLONY / Fukuoka'
    },
    {
      label: '2006',
      heading: '2006',
      title: 'コロニー / 沖縄 プラザハウス',
      text: 'COLONY / Okinawa Plaza House',
      image: 'assets/media/indi10.jpg',
      alt: '2006の写真'
    },
    {
      label: '',
      heading: '2006',
      title: 'リトモラティーノ / 大阪 ハービスプラザ',
      text: 'RITMO LATINO / Osaka Herbis Plaza',
      image: 'assets/media/indi11.jpg',
      alt: '2006の写真'
    },
    {
      label: '2007',
      heading: '2007',
      title: 'コロニー / 大阪 ハービスプラザ',
      text: 'COLONY / Osaka Herbis Plaza'
    },
    {
      label: '',
      heading: '2007',
      title: 'コロニー / 京都 北山',
      text: 'COLONY / Kyoto Kitayama ( Franchise )',
      image: 'assets/media/indi12.jpg',
      alt: '2007の写真'
    },
    {
      label: '2009',
      heading: '2009',
      title: 'Rakuten / 楽天',
      text: 'LOUIS COLLECTION ONLINE'
    },
    {
      label: '',
      heading: '2009',
      title: 'コロニー＆ルイコレクション（合併） / 福岡キャナルOPA',
      text: 'COLONY＆LOUIS COLLECTION ( Merger )Fukuoka Canal City OPA',
      image: 'assets/media/indi13.jpg',
      alt: '2009の写真'
    },
    {
      label: '2010',
      heading: '2010',
      title: 'コロニープラス / 苦楽園',
      text: 'COLONY Plus / Kurakuen'
    },
    {
      label: '',
      heading: '2010',
      title: 'ルイコレクション / 苦楽園',
      text: 'LOUIS COLLECTION / Kurakuen'
    },
    {
      label: '',
      heading: '2010',
      title: 'スイス・バーゼルにて行われる世界最大の宝飾と時計の見本市。',
      text: 'BASELWORLD 出展',
      image: 'assets/media/indi14.jpg',
      alt: '2010の写真'
    },
    {
      label: '',
      heading: '2010',
      title: 'ルイコレクション / 心斎橋',
      text: 'LOUIS COLLECTION / Shinsaibashi',
      image: 'assets/media/indi15.jpg',
      alt: '2010の写真'
    },
    {
      label: '2011',
      heading: '2011',
      title: 'ルイコレクション / あしびなー',
      text: 'LOUIS COLLECTION / Ashibinaa',
      image: 'assets/media/indi16.jpg',
      alt: '2011の写真'
    },
    {
      label: '',
      heading: '2011',
      title: 'コロニー / あしびなー',
      text: 'COLONY / Ashibinaa',
      image: 'assets/media/indi17.jpg',
      alt: '2011の写真'
    },
    {
      label: '2012',
      heading: '2012',
      title: 'ルイコレクション / 大阪 ハービスプラザ',
      text: 'LOUIS COLLECTION / Osaka Herbis Plaza',
      image: 'assets/media/indi18.jpg',
      alt: '2012の写真'
    },
    {
      label: '2015',
      heading: '2015',
      title: 'セーブマイバッグ / 大阪 ハービスプラザ',
      text: 'SAVE MY BAG / Osaka Herbis Plaza',
      image: 'assets/media/indi19.jpg',
      alt: '2015の写真'
    },
    {
      label: '',
      heading: '2015',
      title: 'シーティースクーデリア / 心斎橋',
      text: 'CT SCUDERIA SHOP / Shinsaibashi',
      image: 'assets/media/indi20.jpg',
      alt: '2015の写真'
    },
    {
      label: '2016',
      heading: '2016',
      title: 'セーブマイバッグ / 心斎橋',
      text: 'SAVE MY BAG / Shinsaibashi',
      image: 'assets/media/indi21.jpg',
      alt: '2016の写真'
    },
    {
      label: '',
      heading: '2016',
      title: 'セーブマイバッグ / 東急プラザ銀座',
      text: 'SAVE MY BAG / Tokyu Plaza Ginza',
      image: 'assets/media/indi22.jpg',
      alt: '2016の写真'
    },
    {
      label: '',
      heading: '2016',
      title: 'シーティースクーデリア / 大阪 ハービスプラザ',
      text: 'CT SCUDERIA SHOP / Osaka Herbis Plaza',
      image: 'assets/media/indi23.jpg',
      alt: '2016の写真'
    },
    {
      label: '2018',
      heading: '2018',
      title: 'MAZUCATO取り扱い開始',
      text: 'Started carrying MAZUCATO',
      image: 'assets/media/indi24.JPG',
      alt: '2018の写真'
    },
    {
      label: '2019',
      heading: '2019',
      title: 'Riccard Marzi取り扱い開始',
      text: 'Started carrying Riccard Marzi',
      image: 'assets/media/indi25.JPG',
      alt: '2019の写真'
    },
    {
      label: '2020',
      heading: '2020',
      title: '本社機能を兵庫県西宮市南越木岩町7-2に移転',
      text: 'Relocation of head office',
    },
    {
      label: '',
      heading: '2020',
      title: 'Riccard Marzi　ショップオープン',
      text: 'Riccard Marzi SHOP OPEN',
    },
    {
      label: '',
      heading: '2020',
      title: 'L4K3取り扱い開始',
      text: 'Started carrying L4K3',
    },
    {
      label: '2021',
      heading: '2021',
      title: 'L4K3大丸神戸店OPEN',
      text: 'L4K3 Daimaru Kobe Store OPEN',
      image: 'assets/media/indi26.JPG',
      alt: '2021の写真'
    },
    {
      label: '2022',
      heading: '2022',
      title: '代表取締役社長に西野礼雄が就任',
      text: 'Reo Nishino was appointed President & CEO',
    },
    {
      label: '2023',
      heading: '2023',
      title: '韓国市場へ進出',
      text: 'Expanded into the Korean market',
      image: 'assets/media/indi27.JPG',
      alt: '2023の写真'
    },
    {
      label: '',
      heading: '2023',
      title: 'L4K3 Ginza Novo店OPEN （旧東急プラザ銀座)',
      text: 'L4K3 Ginza Novo Store OPEN (formerly Tokyu Plaza Ginza)',
    },
    {
      label: '',
      heading: '2023',
      title: 'DA ZERO OPEN',
      text: 'in SHOP DA ZERO',
      image: 'assets/media/indi28.JPG',
      alt: '2023の写真'
    }
  ];

  // 要素取得 -----------------------------------
  const imgEl    = document.getElementById('history-image');
  const yearEl   = document.getElementById('history-year');
  const titleEl  = document.getElementById('history-title');
  const bodyEl   = document.getElementById('history-body');
  const track    = document.getElementById('history-timeline-track');
  const prevBtn  = document.querySelector('.history-arrow--prev');
  const nextBtn  = document.querySelector('.history-arrow--next');
  const contentWrap = document.querySelector('.history-content');

  if (!imgEl || !yearEl || !titleEl || !bodyEl || !track || !prevBtn || !nextBtn) {
    return;
  }

  let currentIndex = 0;
  let fadeTimer = null;
  const FADE_DURATION = 700;

  let timelineOffset = 0;
  let minOffset = 0;
  let maxOffset = 0;

  // タイムラインのドットを生成 ------------------
  function buildTimeline() {
    track.innerHTML = '';
  
    historyData.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'history-timeline-item';
      btn.setAttribute('data-index', index);
  
      const dot = document.createElement('span');
      dot.className = 'history-timeline-dot';
      dot.setAttribute('aria-hidden', 'true');
  
      const label = document.createElement('span');
      label.className = 'history-timeline-label';
  
      if (item.label && item.label.trim() !== '') {
        label.textContent = item.label;
      } else {
        label.classList.add('history-timeline-label--empty');
        label.textContent = '\u00A0\u00A0\u00A0\u00A0';
      }
  
      btn.appendChild(dot);
      btn.appendChild(label);
  
      btn.addEventListener('click', () => goTo(index));
      track.appendChild(btn);
    });
  }

  function applyTimelineOffset(offset) {
    timelineOffset = Math.max(minOffset, Math.min(maxOffset, offset));
    track.style.transform = `translateX(${timelineOffset}px)`;
  }

  function recalcTimelineBounds() {
    const container = track.parentElement;
    const dots = track.querySelectorAll('.history-timeline-item');
    if (!container || !dots.length) return;

    const containerCenter = container.clientWidth / 2;
    const first = dots[0];
    const last  = dots[dots.length - 1];

    const firstCenter = first.offsetLeft + first.offsetWidth / 2;
    const lastCenter  = last.offsetLeft  + last.offsetWidth  / 2;

    maxOffset = containerCenter - firstCenter;
    minOffset = containerCenter - lastCenter;
  }

  // 上のメイン表示を更新 ------------------------
  function updateMain() {
    const item = historyData[currentIndex];

    if (item.image) {
      imgEl.src = item.image;
      imgEl.alt = item.alt || '';
      imgEl.style.display = '';
    } else {
      imgEl.removeAttribute('src');
      imgEl.alt = '';
      imgEl.style.display = 'none';
    }

    yearEl.textContent  = item.heading;
    titleEl.textContent = item.title;
    bodyEl.textContent  = item.text || '';

    const dots = track.querySelectorAll('.history-timeline-item');
    dots.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === currentIndex);
      btn.classList.toggle('is-past',   i < currentIndex);
      btn.classList.toggle('is-future', i > currentIndex);
    });

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === historyData.length - 1;

    scrollTimelineToCurrent();
  }

  function scrollTimelineToCurrent() {
    const container = track.parentElement;
    const dots = track.querySelectorAll('.history-timeline-item');
    const active = dots[currentIndex];
    if (!container || !active) return;

    const containerCenter = container.clientWidth / 2;
    const targetCenter = active.offsetLeft + active.offsetWidth / 2;

    const desiredOffset = containerCenter - targetCenter;
    applyTimelineOffset(desiredOffset);
  }

  // インデックス移動（★フェード付き） ----------
  function goTo(index) {
    if (index < 0 || index >= historyData.length) return;
    if (index === currentIndex) return;

    if (!contentWrap) {
      currentIndex = index;
      updateMain();
      return;
    }

    if (fadeTimer) {
      clearTimeout(fadeTimer);
      fadeTimer = null;
    }

    contentWrap.classList.add('is-fading');

    fadeTimer = setTimeout(() => {
      currentIndex = index;
      updateMain();
      contentWrap.classList.remove('is-fading');
      fadeTimer = null;
    }, FADE_DURATION * 0.85);
  }

  // ボタンイベント ----------------------------
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // マウスホイールで横スクロール風に動かす ----------
  const timelineInner = document.querySelector('.history-timeline-inner');
  if (timelineInner) {
    timelineInner.addEventListener('wheel', (e) => {
      const dots = track.querySelectorAll('.history-timeline-item');
      if (dots.length <= 1) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        const nextOffset = timelineOffset - e.deltaY;
        applyTimelineOffset(nextOffset);
      }
    }, { passive: false });
  }

  window.addEventListener('resize', () => {
    recalcTimelineBounds();
    scrollTimelineToCurrent();
  });

  // 初期化 ------------------------------------
  buildTimeline();
  recalcTimelineBounds();
  updateMain();
})();


// ====================================================
// 沿革（スマホ）
// ====================================================
(() => {
  const data = [
    {
      label: '1986',
      heading: '1986',
      title: 'リストブティック ルイ / 苦楽園',
      text: 'Wrist Boutique LOUIS / Kurakuen'
    },
    {
      label: '1988',
      heading: '1988',
      title: 'リストブティック ルイ / 苦楽園',
      text: 'Wrist Boutique LOUIS / Kurakuen',
      image: 'assets/media/indi1.jpg',
      alt: '1988の店舗写真'
    },
    {
      label: '1990',
      heading: '1990',
      title: '会員制シャンパンバー ミグニョンヌ / 苦楽園',
      text: 'Membership Champagne Bar MIGNONNE',
      image: 'assets/media/indi2.jpg',
      alt: '1990の店舗写真'
    },
    {
      label: '1991',
      heading: '1991',
      title: 'ジ・エンド / 苦楽園',
      text: 'THE END / Kurakuen',
      image: 'assets/media/indi3.jpg',
      alt: '1991の店舗写真'
    },
    {
      label: '1994',
      heading: '1994',
      title: 'ラグビークラブ / 苦楽園',
      text: 'Rugby club / Kurakuen',
      image: 'assets/media/indi4.jpg',
      alt: '1994の写真'
    },
    {
      label: '1995',
      heading: '1995',
      title: '1/17　阪神淡路大震災',
      text: 'Hanshin-Awaji Earthquake'
    },
    {
      label: '1996',
      heading: '1996',
      title: 'リストブティック ルイOAPタワー / 帝国ホテル大阪',
      text: 'Wrist Boutique LOUIS',
      image: 'assets/media/indi5.jpg',
      alt: '1996の写真'
    },
    {
      label: '1997',
      heading: '1997',
      title: 'リストブティック ルイ クリスタ長堀',
      text: 'Wrist Boutique LOUIS Crysta-Nagahori',
      image: 'assets/media/indi6.jpg',
      alt: '2002年3月の写真'
    },
    {
      label: '1997',
      heading: '1997',
      title: '（有）ルイ コレクション設立',
      text: 'LOUIS COLLECTION Ltd. Est.'
    },
    {
      label: '1997',
      heading: '1997',
      title: 'リストブティック ルイ ランドマーク',
      text: 'Wrist Boutique LOUIS Landmark',
      image: 'assets/media/indi7.jpg',
      alt: '1997の写真'
    },
    {
      label: '1998',
      heading: '1998',
      title: 'Founded in 1998, Establish 2002.（有）ルイコレクション沖縄 1998創立,2002設立',
      text: 'LOUIS Collection Okinawa Ltd'
    },
    {
      label: '1999',
      heading: '1999',
      title: 'コロニー宮古',
      text: 'COLONY Miyako'
    },
    {
      label: '1999',
      heading: '1999',
      title: 'ルイコレクション / 福岡',
      text: 'LOUIS COLLECTION / Fukuoka'
    },
    {
      label: '2000',
      heading: '2000',
      title: 'ルイコレクション京都 河原町OPA',
      text: 'LOUIS COLLECTIONKyoto Kawaramachi'
    },
    {
      label: '2002',
      heading: '2002',
      title: 'ルイコレクション / 六甲',
      text: 'LOUIS COLLECTION / Rokkou'
    },
    {
      label: '2002',
      heading: '2002',
      title: 'ルイコレクション / 丸の内',
      text: 'LOUIS COLLECTION / Marunouchi',
      image: 'assets/media/indi8.jpg',
      alt: '2002の写真'
    },
    {
      label: '2004',
      heading: '2004',
      title: 'COLONY / 高知',
      text: 'COLONY / Kochi'
    },
    {
      label: '2004',
      heading: '2004',
      title: 'コロニー / 苦楽園',
      text: 'COLONY / Kurakuen',
      image: 'assets/media/indi9.jpg',
      alt: '2004の写真'
    },
    {
      label: '2005',
      heading: '2005',
      title: 'コロニー / 福岡',
      text: 'COLONY / Fukuoka'
    },
    {
      label: '2006',
      heading: '2006',
      title: 'コロニー / 沖縄 プラザハウス',
      text: 'COLONY / Okinawa Plaza House',
      image: 'assets/media/indi10.jpg',
      alt: '2006の写真'
    },
    {
      label: '2006',
      heading: '2006',
      title: 'リトモラティーノ / 大阪 ハービスプラザ',
      text: 'RITMO LATINO / Osaka Herbis Plaza',
      image: 'assets/media/indi11.jpg',
      alt: '2006の写真'
    },
    {
      label: '2007',
      heading: '2007',
      title: 'コロニー / 大阪 ハービスプラザ',
      text: 'COLONY / Osaka Herbis Plaza'
    },
    {
      label: '2007',
      heading: '2007',
      title: 'コロニー / 京都 北山',
      text: 'COLONY / Kyoto Kitayama ( Franchise )',
      image: 'assets/media/indi12.jpg',
      alt: '2007の写真'
    },
    {
      label: '2009',
      heading: '2009',
      title: 'Rakuten / 楽天',
      text: 'LOUIS COLLECTION ONLINE'
    },
    {
      label: '2009',
      heading: '2009',
      title: 'コロニー＆ルイコレクション（合併） / 福岡キャナルOPA',
      text: 'COLONY＆LOUIS COLLECTION ( Merger )Fukuoka Canal City OPA',
      image: 'assets/media/indi13.jpg',
      alt: '2009の写真'
    },
    {
      label: '2010',
      heading: '2010',
      title: 'コロニープラス / 苦楽園',
      text: 'COLONY Plus / Kurakuen'
    },
    {
      label: '2010',
      heading: '2010',
      title: 'ルイコレクション / 苦楽園',
      text: 'LOUIS COLLECTION / Kurakuen'
    },
    {
      label: '2010',
      heading: '2010',
      title: 'スイス・バーゼルにて行われる世界最大の宝飾と時計の見本市。',
      text: 'BASELWORLD 出展',
      image: 'assets/media/indi14.jpg',
      alt: '2010の写真'
    },
    {
      label: '2010',
      heading: '2010',
      title: 'ルイコレクション / 心斎橋',
      text: 'LOUIS COLLECTION / Shinsaibashi',
      image: 'assets/media/indi15.jpg',
      alt: '2010の写真'
    },
    {
      label: '2011',
      heading: '2011',
      title: 'ルイコレクション / あしびなー',
      text: 'LOUIS COLLECTION / Ashibinaa',
      image: 'assets/media/indi16.jpg',
      alt: '2011の写真'
    },
    {
      label: '2011',
      heading: '2011',
      title: 'コロニー / あしびなー',
      text: 'COLONY / Ashibinaa',
      image: 'assets/media/indi17.jpg',
      alt: '2011の写真'
    },
    {
      label: '2012',
      heading: '2012',
      title: 'ルイコレクション / 大阪 ハービスプラザ',
      text: 'LOUIS COLLECTION / Osaka Herbis Plaza',
      image: 'assets/media/indi18.jpg',
      alt: '2012の写真'
    },
    {
      label: '2015',
      heading: '2015',
      title: 'セーブマイバッグ / 大阪 ハービスプラザ',
      text: 'SAVE MY BAG / Osaka Herbis Plaza',
      image: 'assets/media/indi19.jpg',
      alt: '2015の写真'
    },
    {
      label: '2015',
      heading: '2015',
      title: 'シーティースクーデリア / 心斎橋',
      text: 'CT SCUDERIA SHOP / Shinsaibashi',
      image: 'assets/media/indi20.jpg',
      alt: '2015の写真'
    },
    {
      label: '2016',
      heading: '2016',
      title: 'セーブマイバッグ / 心斎橋',
      text: 'SAVE MY BAG / Shinsaibashi',
      image: 'assets/media/indi21.jpg',
      alt: '2016の写真'
    },
    {
      label: '2016',
      heading: '2016',
      title: 'セーブマイバッグ / 東急プラザ銀座',
      text: 'SAVE MY BAG / Tokyu Plaza Ginza',
      image: 'assets/media/indi22.jpg',
      alt: '2016の写真'
    },
    {
      label: '2016',
      heading: '2016',
      title: 'シーティースクーデリア / 大阪 ハービスプラザ',
      text: 'CT SCUDERIA SHOP / Osaka Herbis Plaza',
      image: 'assets/media/indi23.jpg',
      alt: '2016の写真'
    }
  ];

  const track = document.getElementById('history-sp-track');
  if (!track) return;

  function setActive(index) {
    const items = track.querySelectorAll('.history-sp-item');
    const target = items[index];
    if (!target) return;

    const already = target.classList.contains('is-active');

    items.forEach(item => item.classList.remove('is-active'));

    if (!already) {
      target.classList.add('is-active');
    }
  }

  function build() {
    track.innerHTML = '';

    data.forEach((item, index) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'history-sp-item';

      el.innerHTML = `
        <span class="history-sp-dot" aria-hidden="true"></span>
        <p class="history-sp-label">${item.heading}</p>
        <div class="history-sp-content">
          ${item.image ? `
            <figure class="history-sp-figure">
              <img class="history-sp-image"
                   src="${item.image}"
                   alt="${item.alt || ''}"
                   loading="lazy">
            </figure>
          ` : ''}
          ${item.title ? `<p class="history-sp-title">${item.title}</p>` : ''}
          ${item.text ? `<p class="history-sp-body">${item.text}</p>` : ''}
        </div>
      `;

      el.addEventListener('click', () => setActive(index));
      track.appendChild(el);
    });

    if (data.length) setActive(0);
  }

  build();
})();

// ====================================================
// 沿革------------------------------------------------
// ====================================================
