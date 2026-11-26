/* =========================================================
   Nguyễn Minh Trí — Personal profile · vanilla JS
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  /* -------------------------------------------------------
     i18n — English text lives in the HTML, Vietnamese here
     ------------------------------------------------------- */
  const VI = {
    'nav.about': 'Giới thiệu',
    'nav.experience': 'Kinh nghiệm',
    'nav.projects': 'Dự án',
    'nav.skills': 'Kỹ năng',
    'nav.contact': 'Liên hệ',

    'hero.status': 'Sẵn sàng cho cơ hội mới',
    'hero.intro': 'Lập trình viên Backend với hơn 3 năm kinh nghiệm thiết kế, phát triển và tối ưu các hệ thống doanh nghiệp (ERP, HRIS) bằng hệ sinh thái .NET — mạnh về RESTful API, tối ưu truy vấn SQL Server, Clean Architecture và bảo mật JWT/RBAC.',
    'hero.based': 'Khu vực',
    'hero.location': 'TP. Hồ Chí Minh',
    'hero.time': 'Giờ địa phương',
    'hero.badge': 'Thời gian phản hồi API',
    'hero.scroll': 'Cuộn',

    'btn.cv': 'Tải CV',
    'btn.projects': 'Xem dự án',
    'btn.code': 'Mã nguồn',
    'btn.demo': 'Xem demo',
    'btn.mail': 'Gửi email',

    'stat.years': 'Năm kinh nghiệm',
    'stat.users': 'Người dùng hoạt động',
    'stat.clients': 'Khách hàng doanh nghiệp',
    'stat.api': 'Cải thiện phản hồi API',

    'about.title': 'Tôi xây dựng backend <em>vững vàng</em> dưới tải lớn.',
    'about.p1': 'Tôi là Trí — kỹ sư phần mềm tại EMSC, nơi phần lớn thời gian của tôi gắn với các hệ thống nhân sự được hàng nghìn nhân viên sử dụng mỗi ngày. Tôi tập trung vào phần người dùng ít khi nhìn thấy nhưng luôn cảm nhận được: API contract rõ ràng, truy xuất dữ liệu ổn định và những câu truy vấn vẫn nhanh khi dữ liệu ngày càng lớn.',
    'about.p2': 'Ở phía frontend, tôi làm việc với Angular và TypeScript — điều giúp tôi thiết kế API luôn đặt người sử dụng nó lên trước, và giữ cho việc phối hợp giữa đội backend và frontend luôn ngắn gọn, chính xác.',
    'info.name': 'Họ tên',
    'info.dob': 'Ngày sinh',
    'info.dobVal': '17/08/2001',
    'info.loc': 'Khu vực',
    'info.phone': 'Điện thoại',

    'exp.title': 'Hành trình <em>làm nghề</em>.',
    'exp.period': '2023 — Hiện tại',
    'exp.now': 'Đang làm việc',
    'exp.b1': 'Phát triển và bảo trì các phân hệ quản trị nhân sự (HRIS) triển khai cho các khách hàng doanh nghiệp lớn, phục vụ ổn định <strong>hơn 10.000 người dùng</strong> hoạt động.',
    'exp.b2': 'Thiết kế RESTful API, tối ưu truy vấn Entity Framework &amp; LINQ, tái cấu trúc index SQL Server giúp cải thiện thời gian phản hồi API khoảng <strong>20%</strong>.',
    'exp.b3': 'Phối hợp với đội ngũ Frontend thống nhất API contract, refactor mã nguồn cũ và quản lý source code trên Azure DevOps Server.',
    'exp.clients': 'Khách hàng',

    'proj.title': 'Dự án <em>nổi bật</em>.',
    'proj.sub': 'Các dự án cá nhân nơi tôi thử nghiệm kiến trúc doanh nghiệp từ đầu đến cuối — từ thiết kế cơ sở dữ liệu, API cho đến giao diện.',
    'proj.source': 'Mã nguồn',
    'proj.live': 'Đã triển khai',
    'proj.more': 'Xem thêm trên GitHub',
    'p1.sub': 'API ERP &amp; HRM trên .NET Core',
    'p1.desc': 'REST API dạng module cho nền tảng ERP &amp; HRM — bao gồm quản trị nhân sự, cơ cấu tổ chức và phân quyền, xây dựng theo Clean Architecture, bảo mật bằng JWT và phân quyền theo vai trò.',
    'p2.sub': 'Cổng thông tin doanh nghiệp Angular',
    'p2.desc': 'Cổng thông tin doanh nghiệp xây dựng bằng Angular, kết nối với NexusOS API — tổ chức theo module tính năng, service định kiểu chặt chẽ và giao diện nhất quán cho nghiệp vụ nhân sự hằng ngày.',
    'p3.sub': 'Từ điển &amp; Kho Flashcard',
    'p3.desc': 'Ứng dụng web gọn nhẹ để tra cứu từ vựng tiếng Anh và lưu vào bộ flashcard cá nhân để ôn tập — nhanh, đơn giản và chạy hoàn toàn trên trình duyệt.',
    'p4.sub': 'Hệ thống hoạch định nguồn lực doanh nghiệp',
    'p4.desc': 'Hệ thống ERP trên .NET 10 theo Clean Architecture, sử dụng EF Core &amp; SQL Server, xác thực JWT và gửi thông báo email qua SMTP.',
    'p5.sub': 'Hệ thống Backend API dạng module',
    'p5.desc': 'Backend API dạng module theo kiến trúc phân lớp — API, BLL, DAL và Util — xây dựng trên ASP.NET Core Web API, EF Core, SQL Server và JWT.',

    'skills.title': 'Bộ <em>công cụ</em>.',
    'sk.be': 'Backend &amp; Kiến trúc',
    'sk.db': 'Cơ sở dữ liệu &amp; Caching',
    'sk.tools': 'Công cụ &amp; DevOps',
    'tk.dotnet': 'API cốt lõi · .NET 8/9/10 &amp; Framework',
    'tk.aspnet': 'Web API, MVC &amp; Dịch vụ RESTful',
    'tk.clean': 'Phân lớp, Repository &amp; DI Pattern',
    'tk.jwt': 'Xác thực Token &amp; Phân quyền vai trò',
    'tk.sql': 'Thiết kế CSDL, Index &amp; Tối ưu truy vấn',
    'tk.ef': 'ORM, Migration &amp; Truy xuất dữ liệu',
    'tk.redis': 'Caching &amp; Lưu trữ Session',
    'tk.angular': 'Ứng dụng SPA &amp; Portal doanh nghiệp',
    'tk.ts': 'Logic Frontend định kiểu chặt chẽ',
    'tk.js': 'Tương tác Web &amp; DOM hiện đại',
    'tk.ui': 'Giao diện Responsive &amp; Bootstrap',
    'tk.azure': 'Quản lý Source &amp; Quy trình nhóm',
    'tk.docker': 'Đóng gói Container &amp; Môi trường',
    'tk.git': 'Quản lý nhánh &amp; Review mã nguồn',
    'tk.iis': 'Triển khai Web Server Windows',

    'edu.label': 'Học vấn',
    'edu.school': 'Đại học Nam Cần Thơ',
    'edu.degree': 'Kỹ sư Công nghệ Thông tin',

    'contact.title': 'Cùng xây dựng điều gì đó <em>bền vững</em>.',
    'contact.text': 'Tôi đang tìm kiếm cơ hội ở vị trí Backend hoặc Full-stack. Cách nhanh nhất để liên hệ là qua email — tôi thường phản hồi trong vòng một ngày.',

    'footer.note': 'Thiết kế &amp; xây dựng bằng HTML, CSS và JavaScript thuần.',
    'footer.top': 'Lên đầu trang',
  };
  const META = {
    en: { title: 'Nguyễn Minh Trí — Backend / Full-stack Developer', copied: 'Email copied to clipboard' },
    vi: { title: 'Nguyễn Minh Trí — Lập trình viên Backend / Full-stack', copied: 'Đã sao chép email' },
  };

  const i18nNodes = $$('[data-i18n]');
  const EN = {};
  i18nNodes.forEach((n) => { EN[n.dataset.i18n] = n.innerHTML.trim(); });
  let lang = 'en';

  function setLang(next) {
    lang = next === 'vi' ? 'vi' : 'en';
    const dict = lang === 'vi' ? VI : EN;
    i18nNodes.forEach((n) => {
      const v = dict[n.dataset.i18n];
      if (v != null) n.innerHTML = v;
    });
    root.lang = lang;
    document.title = META[lang].title;
    store.set('lang', lang);
  }

  const savedLang = store.get('lang');
  setLang(savedLang || ((navigator.language || '').toLowerCase().startsWith('vi') ? 'vi' : 'en'));

  $('#langToggle').addEventListener('click', () => {
    const next = lang === 'en' ? 'vi' : 'en';
    // soft cross-fade of translated text
    i18nNodes.forEach((n) => { n.style.transition = 'opacity .18s'; n.style.opacity = '0'; });
    setTimeout(() => {
      setLang(next);
      i18nNodes.forEach((n) => { n.style.opacity = ''; });
      setTimeout(() => i18nNodes.forEach((n) => { n.style.transition = ''; }), 220);
    }, 180);
  });

  /* -------------------------------------------------------
     Theme (with circular view-transition reveal)
     ------------------------------------------------------- */
  const metaTheme = $('meta[name="theme-color"]');
  const applyTheme = (t) => {
    root.dataset.theme = t;
    store.set('theme', t);
    metaTheme.setAttribute('content', t === 'dark' ? '#0f0f0e' : '#eef6fa');
  };
  applyTheme(root.dataset.theme || 'light');

  $('#themeToggle').addEventListener('click', (e) => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    if (!document.startViewTransition || reduceMotion) { applyTheme(next); return; }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  });

  /* -------------------------------------------------------
     Header: scrolled state + hide on scroll down + 2.5D Request/Response scroll
     ------------------------------------------------------- */
  const header = $('#header');
  const scrollProgress = $('#scrollProgress');
  const scrollProgressVal = $('#scrollProgressVal');
  const watermarks = $$('[data-parallax-num]');
  let lastY = scrollY;
  let scrollIdleTimer = 0;
  let resFired = false;
  let resClearTimer = 0;

  const updateScrollEffects = () => {
    const y = scrollY;
    const dy = y - lastY;
    header.classList.toggle('is-scrolled', y > 12);
    if (!document.body.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > lastY && y > 400);
    }
    lastY = y;

    if (scrollProgress) {
      const maxScroll = root.scrollHeight - innerHeight;
      const p = maxScroll > 0 ? Math.min(Math.max(y / maxScroll, 0), 1) : 0;
      const vel = Math.max(-7, Math.min(7, -dy * 0.16));
      const pct = Math.round(p * 100);
      scrollProgress.style.setProperty('--scroll-p', p.toFixed(4));
      scrollProgress.style.setProperty('--vel', `${vel.toFixed(1)}px`);
      scrollProgress.style.setProperty('--val-o', y > 20 ? '1' : '0');
      scrollProgress.classList.toggle('is-active', y > 20);
      scrollProgress.classList.toggle('is-done', pct >= 98);

      // Fire green Response packet from 200 -> REQ once when reaching bottom
      if (pct >= 98 && !resFired) {
        resFired = true;
        scrollProgress.classList.remove('is-responding');
        void scrollProgress.offsetWidth;
        scrollProgress.classList.add('is-responding');
        clearTimeout(resClearTimer);
        resClearTimer = setTimeout(() => {
          scrollProgress.classList.remove('is-responding');
        }, 1100);
      } else if (pct < 92) {
        resFired = false;
      }

      if (scrollProgressVal) {
        const prefix = pct >= 98 ? '200' : 'REQ';
        scrollProgressVal.textContent = `${prefix} · ${String(pct).padStart(2, '0')}%`;
      }
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        scrollProgress.style.setProperty('--vel', '0px');
        scrollProgress.style.setProperty('--val-o', '0');
      }, 650);
    }

    // Background watermark numerals depth scroll parallax (2-layer depth)
    if (!reduceMotion && watermarks.length) {
      const vh = innerHeight;
      for (let i = 0; i < watermarks.length; i++) {
        const wm = watermarks[i];
        const sec = wm.parentElement;
        if (!sec) continue;
        const r = sec.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) continue;
        const delta = (vh * 0.5 - (r.top + r.height * 0.35)) * 0.22;
        const shift = Math.max(-110, Math.min(110, delta));
        wm.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      }
    }
  };
  const onHeaderScroll = updateScrollEffects;

  if (finePointer && !reduceMotion && scrollProgress) {
    let spTx = 0, spTy = 4, spCx = 0, spCy = 4, spRaf = 0;
    const tickRail = () => {
      spCx += (spTx - spCx) * 0.09;
      spCy += (spTy - spCy) * 0.09;
      scrollProgress.style.setProperty('--tilt-x', `${spCx.toFixed(2)}deg`);
      scrollProgress.style.setProperty('--tilt-y', `${spCy.toFixed(2)}deg`);
      if (Math.abs(spTx - spCx) > 0.01 || Math.abs(spTy - spCy) > 0.01) {
        spRaf = requestAnimationFrame(tickRail);
      } else {
        spRaf = 0;
      }
    };
    addEventListener('pointermove', (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      spTx = -ny * 8;         // max ±4°
      spTy = 4 + nx * 8;      // 0° to 8°
      if (!spRaf) spRaf = requestAnimationFrame(tickRail);
    }, { passive: true });
    document.addEventListener('pointerleave', () => {
      spTx = 0; spTy = 4;
      if (!spRaf) spRaf = requestAnimationFrame(tickRail);
    });
  }

  /* Mobile menu */
  const menuBtn = $('#menuBtn');
  const mobileMenu = $('#mobileMenu');
  const toggleMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    if (open) header.classList.remove('is-hidden');
  };
  menuBtn.addEventListener('click', () => toggleMenu(!document.body.classList.contains('menu-open')));
  $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });
  matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) toggleMenu(false); });

  /* Active nav link + Sliding Glass Pill (60fps Spring Physics + Scroll-Spy) */
  const primaryNav = $('#primaryNav');
  const navPill = $('#navPill');
  const navLinks = $$('.nav__link');
  let activeNavLink = null;
  let hoveredNavLink = null;

  // Damped spring state for silky momentum-preserving glide
  let pillX = 0, pillW = 0, pillVx = 0, pillVw = 0;
  let pillTx = 0, pillTw = 0, pillVisible = false, pillRaf = 0;
  const PILL_STIFFNESS = 0.14;
  const PILL_DAMPING = 0.74;

  const renderNavPill = () => {
    const squashY = 1 - Math.min(0.055, Math.abs(pillVx) * 0.0022);
    navPill.style.width = `${pillW.toFixed(2)}px`;
    navPill.style.transform = `translate3d(${pillX.toFixed(2)}px, 0, 0) scaleY(${squashY.toFixed(4)})`;
  };

  const tickNavPill = () => {
    pillVx = (pillVx + (pillTx - pillX) * PILL_STIFFNESS) * PILL_DAMPING;
    pillVw = (pillVw + (pillTw - pillW) * PILL_STIFFNESS) * PILL_DAMPING;
    pillX += pillVx;
    pillW += pillVw;
    renderNavPill();

    const settled =
      Math.abs(pillTx - pillX) < 0.06 &&
      Math.abs(pillTw - pillW) < 0.06 &&
      Math.abs(pillVx) < 0.04 &&
      Math.abs(pillVw) < 0.04;

    if (!settled) {
      pillRaf = requestAnimationFrame(tickNavPill);
    } else {
      pillX = pillTx;
      pillW = pillTw;
      pillVx = 0;
      pillVw = 0;
      renderNavPill();
      pillRaf = 0;
    }
  };

  const moveNavPill = (target, instant = false) => {
    if (!navPill) return;
    if (!target) {
      pillVisible = false;
      navPill.classList.remove('is-visible');
      return;
    }
    pillTx = target.offsetLeft;
    pillTw = target.offsetWidth;

    // Snap immediately when blooming from hidden or on resize/reduced-motion
    if (instant || !pillVisible || reduceMotion) {
      pillX = pillTx;
      pillW = pillTw;
      pillVx = 0;
      pillVw = 0;
      renderNavPill();
      pillVisible = true;
      navPill.classList.add('is-visible');
      return;
    }

    pillVisible = true;
    navPill.classList.add('is-visible');
    if (!pillRaf) pillRaf = requestAnimationFrame(tickNavPill);
  };

  const setActiveNav = (link) => {
    activeNavLink = link || null;
    navLinks.forEach((l) => l.classList.toggle('is-active', l === activeNavLink));
    if (!hoveredNavLink) moveNavPill(activeNavLink);
  };

  if (primaryNav && navPill) {
    navLinks.forEach((link) => {
      link.addEventListener('pointerenter', () => {
        hoveredNavLink = link;
        moveNavPill(link);
      });
      link.addEventListener('click', () => {
        setActiveNav(link);
      });
    });

    primaryNav.addEventListener('pointerleave', () => {
      hoveredNavLink = null;
      moveNavPill(activeNavLink);
    });

    // Re-measure pill width/position on resize, font load & EN/VI toggle
    const syncNavPill = () => moveNavPill(hoveredNavLink || activeNavLink, true);
    addEventListener('resize', syncNavPill, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(syncNavPill);
    }
    const langBtnNav = $('#langToggle');
    if (langBtnNav) {
      langBtnNav.addEventListener('click', () => setTimeout(syncNavPill, 210));
    }
  }

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      if (en.target.id === 'hero') {
        setActiveNav(null);
        return;
      }
      const match = navLinks.find((l) => l.getAttribute('href') === `#${en.target.id}`);
      if (match) setActiveNav(match);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach((s) => navObserver.observe(s));

  /* -------------------------------------------------------
     Reveal on scroll + count up
     ------------------------------------------------------- */
  const fmt = (n, group) => (group ? n.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US') : String(n));
  const countUp = (el) => {
    const target = +el.dataset.count;
    const group = el.dataset.format === '1';
    if (reduceMotion) { el.textContent = fmt(target, group); return; }
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(Math.round(target * eased), group);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      $$('[data-count]', en.target).forEach(countUp);
      revealObserver.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, .reveal-3d').forEach((el) => revealObserver.observe(el));

  /* -------------------------------------------------------
     Hero 2.5D scene — pointer + scroll depth
     ------------------------------------------------------- */
  const hero = $('#hero');
  const sceneInner = $('#sceneInner');
  const depthEls = $$('[data-depth]');
  let heroVisible = true;
  let tx = 0, ty = 0, cx = 0, cy = 0;

  new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe(hero);

  if (finePointer) {
    addEventListener('pointermove', (e) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    }, { passive: true });
    document.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
  }

  const heroLoop = (t) => {
    if (heroVisible && !reduceMotion) {
      if (!finePointer) { // gentle idle drift on touch devices
        tx = Math.sin(t / 2600) * 0.3;
        ty = Math.cos(t / 3400) * 0.22;
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const sp = Math.min(scrollY / (hero.offsetHeight || innerHeight), 1);
      const rx = Math.max(-7.5, Math.min(7.5, -cy * 10 + sp * 4 + 1.5));
      const ry = Math.max(-7.5, Math.min(7.5, cx * 12 - 2));
      sceneInner.style.transform =
        `translate3d(0, ${(sp * 36).toFixed(1)}px, ${(-sp * 110).toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      depthEls.forEach((el) => {
        const d = +el.dataset.depth;
        el.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d - sp * 52).toFixed(2)}px`;
      });
    }
    requestAnimationFrame(heroLoop);
  };
  requestAnimationFrame(heroLoop);

  /* -------------------------------------------------------
     Hero Live Terminal — Initial Stream + Interactive Re-fetch
     ------------------------------------------------------- */
  (() => {
    const win = $('#apiTerminal');
    const reqBtn = $('#apiReqBtn');
    const statusBtn = $('#apiStatusBtn');
    const endpointEl = $('#apiEndpoint');
    const statusText = $('#apiStatusText');
    const msEl = $('#apiMs');
    const lines = $$('#apiCode .win__line');
    if (!win || !reqBtn || !statusBtn || !endpointEl || !msEl || !lines.length) return;

    const ENDPOINT = endpointEl.textContent.trim();
    let currentMs = 38;
    let busy = false;
    let timers = [];

    const clearTimers = () => {
      timers.forEach((id) => clearTimeout(id));
      timers = [];
    };

    const nextLatency = () => {
      let v = 31 + Math.floor(Math.random() * 12); // 31ms – 42ms
      if (v === currentMs) v = v >= 42 ? 31 : v + 1;
      currentMs = v;
      return v;
    };

    const triggerScan = () => {
      win.classList.remove('is-scanning');
      void win.offsetWidth;
      win.classList.add('is-scanning');
      timers.push(setTimeout(() => win.classList.remove('is-scanning'), 620));
    };

    const streamLines = (delayPerLine = 38, onDone) => {
      lines.forEach((line) => line.classList.add('is-hidden'));
      lines.forEach((line, idx) => {
        timers.push(setTimeout(() => {
          line.classList.remove('is-hidden');
          if (idx === lines.length - 1 && onDone) onDone();
        }, idx * delayPerLine));
      });
    };

    const runInitialStream = () => {
      if (reduceMotion) return;
      busy = true;
      endpointEl.textContent = '';
      lines.forEach((line) => line.classList.add('is-hidden'));
      win.classList.add('is-fetching');
      if (statusText) statusText.textContent = 'FETCH';

      // 1. Type endpoint path clearly after card fades into view (48ms/char)
      const startDelay = 420;
      const charDelay = 48;
      for (let i = 1; i <= ENDPOINT.length; i++) {
        timers.push(setTimeout(() => {
          endpointEl.textContent = ENDPOINT.slice(0, i);
        }, startDelay + i * charDelay));
      }

      // 2. Flip to 200 OK & stream JSON lines (45ms/line)
      const afterType = startDelay + ENDPOINT.length * charDelay + 140;
      timers.push(setTimeout(() => {
        win.classList.remove('is-fetching');
        if (statusText) statusText.textContent = '200 OK';
        triggerScan();
        streamLines(45, () => { busy = false; });
      }, afterType));
    };

    const refetch = () => {
      if (busy) return;
      clearTimers();
      const ms = nextLatency();

      if (reduceMotion) {
        msEl.textContent = `${ms} ms`;
        return;
      }

      busy = true;
      win.classList.add('is-fetching');
      if (statusText) statusText.textContent = 'FETCH';
      lines.forEach((line) => line.classList.add('is-hidden'));
      triggerScan();

      timers.push(setTimeout(() => {
        win.classList.remove('is-fetching');
        if (statusText) statusText.textContent = '200 OK';
        msEl.textContent = `${ms} ms`;
        msEl.classList.add('is-updated');
        timers.push(setTimeout(() => msEl.classList.remove('is-updated'), 650));
        streamLines(42, () => { busy = false; });
      }, 160));
    };

    reqBtn.addEventListener('click', refetch);
    statusBtn.addEventListener('click', refetch);
    runInitialStream();
  })();

  /* -------------------------------------------------------
     Project cards — Window Depth Effect with Lerp (0.09) in rAF
     ------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    const CARD_LERP = 0.09;
    $$('.tilt').forEach((card) => {
      let tx = 0, ty = 0, cx = 0, cy = 0;
      let tgx = 50, tgy = 50, cgx = 50, cgy = 50;
      let maxTilt = 2.5;
      let raf = 0;

      const tickCard = () => {
        cx += (tx - cx) * CARD_LERP;
        cy += (ty - cy) * CARD_LERP;
        cgx += (tgx - cgx) * CARD_LERP;
        cgy += (tgy - cgy) * CARD_LERP;

        card.style.setProperty('--rx', `${(-cy * maxTilt * 2).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(cx * maxTilt * 2).toFixed(2)}deg`);
        card.style.setProperty('--px', cx.toFixed(4));
        card.style.setProperty('--py', cy.toFixed(4));
        card.style.setProperty('--gx', `${cgx.toFixed(1)}%`);
        card.style.setProperty('--gy', `${cgy.toFixed(1)}%`);

        const settled =
          Math.abs(tx - cx) < 0.0006 &&
          Math.abs(ty - cy) < 0.0006 &&
          Math.abs(tgx - cgx) < 0.08 &&
          Math.abs(tgy - cgy) < 0.08;

        if (!settled) {
          raf = requestAnimationFrame(tickCard);
        } else {
          raf = 0;
        }
      };

      const wake = () => { if (!raf) raf = requestAnimationFrame(tickCard); };

      card.addEventListener('pointerenter', () => {
        card.classList.add('is-hover');
        maxTilt = card.offsetWidth > 700 ? 1.5 : 2.5;
      });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        tx = x - 0.5;
        ty = y - 0.5;
        tgx = x * 100;
        tgy = y * 100;
        wake();
      });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('is-hover');
        tx = 0; ty = 0;
        tgx = 50; tgy = 50;
        wake();
      });
    });

    /* Projects Grid — Linear/Vercel Spotlight 1px Border across nearby cards */
    const projectsGrid = $('.projects');
    if (projectsGrid) {
      const projectCards = $$('.project', projectsGrid);
      let spotRaf = 0;
      let lastEvt = null;

      const updateSpotlight = () => {
        spotRaf = 0;
        if (!lastEvt) return;
        const { clientX, clientY } = lastEvt;
        for (let i = 0; i < projectCards.length; i++) {
          const card = projectCards[i];
          const r = card.getBoundingClientRect();
          card.style.setProperty('--spot-x', `${(clientX - r.left).toFixed(1)}px`);
          card.style.setProperty('--spot-y', `${(clientY - r.top).toFixed(1)}px`);
        }
      };

      projectsGrid.addEventListener('pointerenter', () => {
        projectsGrid.classList.add('has-pointer');
      });
      projectsGrid.addEventListener('pointermove', (e) => {
        lastEvt = e;
        if (!spotRaf) spotRaf = requestAnimationFrame(updateSpotlight);
      }, { passive: true });
      projectsGrid.addEventListener('pointerleave', () => {
        projectsGrid.classList.remove('has-pointer');
        lastEvt = null;
      });
    }
  }

  /* -------------------------------------------------------
     Buttons — Inject Liquid Wave + Rising Bubbles layers
     ------------------------------------------------------- */
  (() => {
    const WAVE_SVG =
      '<svg class="btn__wave btn__wave--back" viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true">' +
        '<path fill="currentColor" d="M0,12 C30,2 60,22 120,12 C180,2 210,22 240,12 L240,80 L0,80 Z"/>' +
      '</svg>' +
      '<svg class="btn__wave btn__wave--front" viewBox="0 0 240 80" preserveAspectRatio="none" aria-hidden="true">' +
        '<path fill="currentColor" d="M0,16 C40,26 80,6 120,16 C160,26 200,6 240,16 L240,80 L0,80 Z"/>' +
      '</svg>';

    // 6 organic bubbles per button: [left%, sizePx, durationSec, delaySec, wobblePx]
    const BUBBLES = [
      [14, 4, 2.7, -0.4,  4],
      [29, 6, 3.6, -1.9, -5],
      [46, 3.5, 2.4, -1.1, 3],
      [62, 7, 4.0, -2.8, -4],
      [76, 4.5, 3.1, -0.7, 5],
      [88, 3, 2.5, -2.1, -3],
    ];

    const bubblesHTML = BUBBLES.map(([x, s, d, del, w]) =>
      `<i style="--bx:${x}%;--bs:${s}px;--bd:${d}s;--bdel:${del}s;--bw:${w}px"></i>`
    ).join('');

    $$('.btn').forEach((btn) => {
      if (btn.querySelector('.btn__liquid')) return;
      const liquid = document.createElement('span');
      liquid.className = 'btn__liquid';
      liquid.setAttribute('aria-hidden', 'true');
      liquid.innerHTML = WAVE_SVG;

      const bubbles = document.createElement('span');
      bubbles.className = 'btn__bubbles';
      bubbles.setAttribute('aria-hidden', 'true');
      bubbles.innerHTML = bubblesHTML;

      btn.prepend(liquid, bubbles);
    });
  })();

  /* -------------------------------------------------------
     Scroll handler (rAF-throttled)
     ------------------------------------------------------- */
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onHeaderScroll(); ticking = false; });
  }, { passive: true });
  onHeaderScroll();

  /* -------------------------------------------------------
     Copy email + toast
     ------------------------------------------------------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 2200);
  };
  $('#copyEmail').addEventListener('click', async (e) => {
    const email = e.currentTarget.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: email });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    showToast(META[lang].copied);
  });

  /* -------------------------------------------------------
     Local time (Ho Chi Minh City) + footer year
     ------------------------------------------------------- */
  const clock = $('#clock');
  const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Ho_Chi_Minh' });
  const updateClock = () => { clock.textContent = timeFmt.format(new Date()); };
  updateClock();
  setInterval(updateClock, 20000);
  $('#year').textContent = new Date().getFullYear();

  /* -------------------------------------------------------
     Ambient rising micro-effervescence background (Canvas 2D)
     ------------------------------------------------------- */
  const bubbleCanvas = $('#bgBubbles');
  if (bubbleCanvas && !reduceMotion) {
    const ctx = bubbleCanvas.getContext('2d');
    let bw = 0, bh = 0, dpr = 1;
    let bubbles = [];
    let dust = [];
    let fishes = [];

    const makeFish = (index) => {
      const near = index % 2 === 0;
      const goRight = index % 2 === 0;
      const scale = near ? 0.95 + Math.random() * 0.35 : 0.62 + Math.random() * 0.24;
      const baseSpeed = near ? 0.55 + Math.random() * 0.25 : 0.36 + Math.random() * 0.18;
      return {
        x: Math.random() * (bw || innerWidth),
        y: (0.14 + Math.random() * 0.72) * (bh || innerHeight),
        angle: goRight ? (Math.random() - 0.5) * 0.4 : Math.PI + (Math.random() - 0.5) * 0.4,
        targetAngle: goRight ? 0 : Math.PI,
        baseSpeed,
        speed: baseSpeed,
        scale,
        near,
        tailPhase: Math.random() * Math.PI * 2,
        wanderTimer: 40 + Math.random() * 140,
        accent: index % 3 === 0,
        alpha: near ? 0.19 + Math.random() * 0.06 : 0.11 + Math.random() * 0.05,
        fleeCooldown: 0,
      };
    };

    const drawFish = (f, isDark) => {
      const wag = Math.sin(f.tailPhase);
      const wag2 = Math.sin(f.tailPhase - 1.15);
      const s = f.scale;
      const a = f.alpha * (isDark ? 1 : 1.15);

      const bodyRgb = f.accent
        ? (isDark ? '255, 118, 76' : '2, 132, 199')
        : (isDark ? '220, 214, 204' : '24, 84, 122');
      const finRgb = f.accent
        ? (isDark ? '255, 168, 128' : '56, 189, 248')
        : (isDark ? '245, 240, 232' : '56, 136, 178');

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.angle);
      ctx.scale(s, s);

      // Pectoral fins (gently rowing)
      const finWave = wag * 2.2;
      ctx.fillStyle = `rgba(${finRgb}, ${(a * 0.55).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(4, -3.5);
      ctx.quadraticCurveTo(-2, -13 - finWave * 0.5, -10, -10 - finWave);
      ctx.quadraticCurveTo(-5, -5, -2, -3);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(4, 3.5);
      ctx.quadraticCurveTo(-2, 13 + finWave * 0.5, -10, 10 + finWave);
      ctx.quadraticCurveTo(-5, 5, -2, 3);
      ctx.closePath();
      ctx.fill();

      // Flowing forked tail fin (sinuous S-curve)
      const tailMidY = wag * 4.5;
      const tailEndY = wag2 * 9.5;
      ctx.fillStyle = `rgba(${finRgb}, ${(a * 0.65).toFixed(3)})`;
      ctx.beginPath();
      ctx.moveTo(-16, tailMidY * 0.55);
      ctx.quadraticCurveTo(-24, tailMidY - 5, -31, tailEndY - 8.5);
      ctx.quadraticCurveTo(-26, tailEndY * 0.85, -24, tailEndY * 0.72);
      ctx.quadraticCurveTo(-26, tailEndY * 0.85, -31, tailEndY + 8.5);
      ctx.quadraticCurveTo(-24, tailMidY + 5, -16, tailMidY * 0.55);
      ctx.closePath();
      ctx.fill();

      // Sleek tapered koi/ocean fish body with subtle longitudinal gradient
      const bg = ctx.createLinearGradient(16, 0, -20, 0);
      bg.addColorStop(0, `rgba(${bodyRgb}, ${(a * 1.15).toFixed(3)})`);
      bg.addColorStop(0.65, `rgba(${bodyRgb}, ${(a * 0.88).toFixed(3)})`);
      bg.addColorStop(1, `rgba(${finRgb}, ${(a * 0.45).toFixed(3)})`);
      ctx.fillStyle = bg;

      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.bezierCurveTo(12, -7.2, -2, -6.5 + wag * 1.4, -18, tailMidY * 0.55);
      ctx.bezierCurveTo(-2, 6.5 + wag * 1.4, 12, 7.2, 16, 0);
      ctx.closePath();
      ctx.fill();

      // Subtle dorsal spine ridge highlight
      ctx.strokeStyle = `rgba(255, 255, 255, ${(a * (isDark ? 0.35 : 0.65)).toFixed(3)})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(9, 0);
      ctx.quadraticCurveTo(-4, wag * 1.6, -15, tailMidY * 0.5);
      ctx.stroke();

      ctx.restore();
    };

    const makeDust = () => {
      // 2 depth layers: 0 = far/tiny (5-8px parallax), 1 = near/soft (10-15px parallax)
      const near = Math.random() < 0.42;
      return {
        x: Math.random() * bw,
        y: Math.random() * bh,
        r: near ? 1.4 + Math.random() * 0.9 : 0.75 + Math.random() * 0.65,
        near,
        parallax: near ? 10 + Math.random() * 5 : 5 + Math.random() * 3,
        vx: (Math.random() - 0.5) * (near ? 0.14 : 0.08),
        vy: -(0.04 + Math.random() * (near ? 0.1 : 0.05)),
        shimmerSpeed: 0.008 + Math.random() * 0.015,
        shimmerPhase: Math.random() * Math.PI * 2,
        accent: Math.random() < 0.3,
        alpha: near ? 0.16 + Math.random() * 0.14 : 0.09 + Math.random() * 0.11,
      };
    };

    const makeBubble = (randomY = false) => {
      // Depth layer: 0 = far/bokeh, 1 = mid/champagne micro, 2 = crisp delicate ring
      const depth = Math.random();
      const isBokeh = depth < 0.25;
      const r = isBokeh
        ? 6 + Math.random() * 10 // soft far bokeh (6px – 16px)
        : 1.2 + Math.pow(Math.random(), 2.2) * 4.8; // fine micro bubble (1.2px – 6px)
      return {
        x: Math.random() * bw,
        y: randomY ? Math.random() * bh : bh + r + Math.random() * 80,
        r,
        isBokeh,
        depth,
        dx: 0,
        dy: 0,
        vy: isBokeh
          ? 0.12 + Math.random() * 0.14
          : 0.22 + (7 - r) * 0.045 + Math.random() * 0.18,
        amp: isBokeh ? 0.12 + Math.random() * 0.18 : 0.15 + Math.random() * 0.35,
        freq: 0.005 + Math.random() * 0.01,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        pulsePhase: Math.random() * Math.PI * 2,
        accent: Math.random() < 0.28,
        alpha: isBokeh ? 0.055 + Math.random() * 0.05 : 0.14 + Math.random() * 0.2,
      };
    };

    const resizeBubbles = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      bw = innerWidth;
      bh = innerHeight;
      bubbleCanvas.width = bw * dpr;
      bubbleCanvas.height = bh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const targetCount = Math.max(22, Math.min(48, Math.round((bw * bh) / 34000)));
      while (bubbles.length < targetCount) bubbles.push(makeBubble(true));
      if (bubbles.length > targetCount) bubbles.length = targetCount;

      const dustCount = Math.max(20, Math.min(30, Math.round((bw * bh) / 48000)));
      while (dust.length < dustCount) dust.push(makeDust());
      if (dust.length > dustCount) dust.length = dustCount;

      const fishCount = bw < 640 ? 3 : 5;
      while (fishes.length < fishCount) fishes.push(makeFish(fishes.length));
      if (fishes.length > fishCount) fishes.length = fishCount;
    };
    resizeBubbles();
    addEventListener('resize', resizeBubbles, { passive: true });

    // Interactive Bubble Current + Deep-Water Parallax Dust
    const wakeBubbles = [];
    const CURRENT_RADIUS = 120;
    let ptrX = -999, ptrY = -999, ptrActive = false;
    let ptrVx = 0, ptrVy = 0;
    let dustTx = 0, dustTy = 0, dustCx = 0, dustCy = 0;
    let lastWakeSpawn = 0;

    const spawnWakeBubbles = (x, y, vx, vy, count) => {
      for (let k = 0; k < count; k++) {
        if (wakeBubbles.length >= 24) wakeBubbles.shift();
        const r = 1.0 + Math.random() * 1.9;
        wakeBubbles.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          r,
          vx: vx * (0.04 + Math.random() * 0.05) + (Math.random() - 0.5) * 0.45,
          vy: -(0.35 + Math.random() * 0.45) + vy * 0.03,
          age: 0,
          maxAge: 46 + Math.round(Math.random() * 24),
          accent: Math.random() < 0.42,
          alpha: 0.22 + Math.random() * 0.14,
        });
      }
    };

    if (finePointer) {
      addEventListener('pointermove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        if (ptrActive) {
          const mvx = x - ptrX;
          const mvy = y - ptrY;
          ptrVx = ptrVx * 0.45 + mvx * 0.55;
          ptrVy = ptrVy * 0.45 + mvy * 0.55;

          const speed = Math.hypot(mvx, mvy);
          const now = performance.now();
          if (speed > 18 && now - lastWakeSpawn > 55) {
            spawnWakeBubbles(x, y, mvx, mvy, speed > 42 ? 2 : 1);
            lastWakeSpawn = now;
          }
        }
        ptrX = x;
        ptrY = y;
        ptrActive = true;
        dustTx = x / (bw || 1) - 0.5;
        dustTy = y / (bh || 1) - 0.5;
      }, { passive: true });

      document.addEventListener('pointerleave', () => {
        ptrActive = false;
        ptrVx = 0;
        ptrVy = 0;
        dustTx = 0;
        dustTy = 0;
      });
    }

    let lastScrollForBubbles = scrollY;
    let smoothScrollBoost = 0;
    const drawBubbles = () => {
      ctx.clearRect(0, 0, bw, bh);
      const isDark = root.dataset.theme === 'dark';
      const scrollDelta = scrollY - lastScrollForBubbles;
      lastScrollForBubbles = scrollY;
      smoothScrollBoost += (Math.max(-2.5, Math.min(4, scrollDelta * 0.08)) - smoothScrollBoost) * 0.12;

      const ptrSpeed = Math.hypot(ptrVx, ptrVy);
      ptrVx *= 0.85;
      ptrVy *= 0.85;

      // Smooth Lerp for opposite-to-cursor deep-water parallax dust
      dustCx += (dustTx - dustCx) * 0.06;
      dustCy += (dustTy - dustCy) * 0.06;

      // 0. Render 2-layer deep-water parallax dust motes
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.shimmerPhase += d.shimmerSpeed;
        d.x += d.vx;
        d.y += d.vy - smoothScrollBoost * (d.near ? 0.35 : 0.16);

        if (d.x < -20) d.x = bw + 20;
        else if (d.x > bw + 20) d.x = -20;
        if (d.y < -20) d.y = bh + 20;
        else if (d.y > bh + 20) d.y = -20;

        // Opposite direction of cursor movement (5-15px amplitude)
        const px = d.x - dustCx * d.parallax * 2;
        const py = d.y - dustCy * d.parallax * 2;
        const shimmer = 0.65 + 0.35 * Math.sin(d.shimmerPhase);
        const a = Math.min(0.65, d.alpha * shimmer * (isDark ? 1 : 1.75));

        const rgb = d.accent
          ? (isDark ? '255, 148, 108' : '2, 132, 199')
          : (isDark ? '240, 236, 228' : '38, 102, 142');

        // Soft underwater glow halo for near-layer dust
        if (d.near) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, d.r * 2.8);
          glow.addColorStop(0, `rgba(${rgb}, ${(a * 0.55).toFixed(3)})`);
          glow.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.beginPath();
          ctx.arc(px, py, d.r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${a.toFixed(3)})`;
        ctx.fill();
      }

      // 0.5 Update & render graceful swimming fish silhouettes
      for (let i = 0; i < fishes.length; i++) {
        const f = fishes[i];
        f.wanderTimer -= 1;
        if (f.wanderTimer <= 0) {
          f.targetAngle = f.angle + (Math.random() - 0.5) * 0.75;
          f.wanderTimer = 90 + Math.random() * 170;
        }

        // Gently keep fish within comfortable vertical swimming band
        if (f.y < bh * 0.08) f.targetAngle = Math.atan2(0.35, Math.cos(f.angle) || 1);
        else if (f.y > bh * 0.92) f.targetAngle = Math.atan2(-0.35, Math.cos(f.angle) || 1);

        // Smoothly steer away if cursor approaches within 150px
        if (f.fleeCooldown > 0) f.fleeCooldown -= 1;
        if (ptrActive) {
          const fx = f.x - ptrX;
          const fy = f.y - ptrY;
          const dist = Math.hypot(fx, fy);
          if (dist > 1 && dist < 150) {
            f.targetAngle = Math.atan2(fy, fx);
            f.speed = Math.min(f.baseSpeed * 3.1, f.speed + 0.14);
            if (f.fleeCooldown === 0) {
              spawnWakeBubbles(
                f.x - Math.cos(f.angle) * 20 * f.scale,
                f.y - Math.sin(f.angle) * 20 * f.scale,
                -Math.cos(f.angle) * 8,
                -Math.sin(f.angle) * 8,
                1
              );
              f.fleeCooldown = 28;
            }
          }
        }

        // Shortest-angle turn interpolation + speed relaxation
        let diff = f.targetAngle - f.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        f.angle += diff * 0.035;
        f.speed += (f.baseSpeed - f.speed) * 0.03;

        f.tailPhase += 0.085 + f.speed * 0.11;
        f.x += Math.cos(f.angle) * f.speed;
        f.y += Math.sin(f.angle) * f.speed - smoothScrollBoost * (f.near ? 0.45 : 0.22);

        // Seamless offscreen wrap
        const pad = 70;
        if (f.x < -pad) f.x = bw + pad;
        else if (f.x > bw + pad) f.x = -pad;
        if (f.y < -pad) f.y = bh + pad;
        else if (f.y > bh + pad) f.y = -pad;

        drawFish(f, isDark);
      }

      // 1. Update & render ambient bubbles with fluid cursor parting
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.phase += b.freq;
        b.pulsePhase += b.pulseSpeed;

        if (ptrActive) {
          const rx = b.x - ptrX;
          const ry = b.y - ptrY;
          const dist = Math.hypot(rx, ry);
          if (dist > 0.5 && dist < CURRENT_RADIUS) {
            const falloff = Math.pow(1 - dist / CURRENT_RADIUS, 2);
            const depthWeight = b.isBokeh ? 0.4 : (0.55 + b.depth * 0.55);
            const repel = (0.48 + Math.min(ptrSpeed, 30) * 0.032) * falloff * depthWeight;
            b.dx += (rx / dist) * repel + ptrVx * 0.018 * falloff * depthWeight;
            b.dy += (ry / dist) * repel * 0.65 + ptrVy * 0.015 * falloff * depthWeight;
          }
        }

        // Apply buoyant rise + damped fluid displacement
        b.x += Math.sin(b.phase) * b.amp + b.dx;
        b.y -= b.vy + smoothScrollBoost * (0.4 + b.depth * 0.7) - b.dy;
        b.dx *= 0.92;
        b.dy *= 0.92;

        if (b.y < -b.r - 24) {
          Object.assign(b, makeBubble(false));
        } else if (b.y > bh + b.r + 90) {
          b.y = -b.r;
        } else if (b.x < -b.r - 30) {
          b.x = bw + b.r;
        } else if (b.x > bw + b.r + 30) {
          b.x = -b.r;
        }

        // Smooth fade near top & bottom viewport edges + gentle breathing
        const edgeFade = Math.min(1, Math.max(0, Math.min(b.y / 110, (bh - b.y) / 110)));
        const breathe = 0.82 + 0.18 * Math.sin(b.pulsePhase);
        const a = Math.min(0.75, b.alpha * edgeFade * breathe * (isDark ? 1 : 1.85));
        if (a <= 0.004) continue;

        const rgb = b.accent
          ? (isDark ? '255, 118, 76' : '2, 132, 199')
          : (isDark ? '228, 224, 214' : '38, 102, 142');

        if (b.isBokeh) {
          // Soft out-of-focus depth halo
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, `rgba(${rgb}, ${(a * (isDark ? 0.9 : 1.05)).toFixed(3)})`);
          g.addColorStop(0.6, `rgba(${rgb}, ${(a * (isDark ? 0.35 : 0.48)).toFixed(3)})`);
          g.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          // Crisp champagne micro-bubble: hollow center, delicate rim & crescent glint
          const g = ctx.createRadialGradient(b.x, b.y, b.r * 0.15, b.x, b.y, b.r);
          g.addColorStop(0, `rgba(${rgb}, 0)`);
          g.addColorStop(0.72, `rgba(${rgb}, ${(a * (isDark ? 0.18 : 0.28)).toFixed(3)})`);
          g.addColorStop(1, `rgba(${rgb}, ${(a * (isDark ? 0.55 : 0.72)).toFixed(3)})`);

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          ctx.lineWidth = isDark ? 0.65 : 1.0;
          ctx.strokeStyle = `rgba(${rgb}, ${(a * (isDark ? 0.75 : 0.95)).toFixed(3)})`;
          ctx.stroke();

          // Tiny upper-left crescent highlight
          if (b.r > 2.2) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r * 0.72, -Math.PI * 0.88, -Math.PI * 0.42);
            ctx.lineWidth = isDark ? 0.75 : 1.0;
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${(a * 0.85).toFixed(3)})`
              : `rgba(255, 255, 255, ${Math.min(1, a * 1.4).toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      // 2. Render ephemeral tiny wake-trail bubbles spawned by fast cursor movement
      for (let i = wakeBubbles.length - 1; i >= 0; i--) {
        const wb = wakeBubbles[i];
        wb.age += 1;
        if (wb.age >= wb.maxAge) {
          wakeBubbles.splice(i, 1);
          continue;
        }
        wb.x += wb.vx;
        wb.y += wb.vy;
        wb.vx *= 0.94;
        wb.vy = wb.vy * 0.96 - 0.015; // gentle upward buoyancy

        const p = wb.age / wb.maxAge;
        const fade = Math.min(1, p * 5) * Math.pow(1 - p, 1.5);
        const a = Math.min(0.8, wb.alpha * fade * (isDark ? 1 : 1.8));
        if (a <= 0.004) continue;

        const rgb = wb.accent
          ? (isDark ? '255, 118, 76' : '2, 132, 199')
          : (isDark ? '228, 224, 214' : '38, 102, 142');

        ctx.beginPath();
        ctx.arc(wb.x, wb.y, wb.r, 0, Math.PI * 2);
        ctx.lineWidth = isDark ? 0.6 : 0.95;
        ctx.strokeStyle = `rgba(${rgb}, ${(a * 0.95).toFixed(3)})`;
        ctx.stroke();
      }

      requestAnimationFrame(drawBubbles);
    };
    requestAnimationFrame(drawBubbles);
  }

  /* -------------------------------------------------------
     Interactive 2.5D Robot Companion (Isolated IIFE Module)
     ------------------------------------------------------- */
  (() => {
    const widget = document.getElementById('roboWidget');
    const btn = document.getElementById('roboBtn');
    const headTilt = document.getElementById('roboHeadTilt');
    const eyes = document.getElementById('roboEyes');
    const speech = document.getElementById('roboSpeech');
    if (!widget || !btn || !headTilt || !eyes || !speech) return;

    const MESSAGES = {
      en: [
        'Hi there! Welcome 👋',
        "I'm Tri's AI assistant 🤖",
        'Tri builds .NET & Angular apps',
        '3+ years in ERP & HRIS systems',
        'Clean Architecture & fast SQL ⚡',
        'Feel free to download his CV!',
        "Let's build something great ✨",
      ],
      vi: [
        'Xin chào! Chào mừng bạn 👋',
        'Mình là trợ lý của Trí 🤖',
        'Trí chuyên .NET & Angular',
        '3+ năm làm hệ thống ERP/HRIS',
        'Clean Architecture & tối ưu SQL ⚡',
        'Mời bạn xem dự án & tải CV nhé!',
        'Rất vui được kết nối cùng bạn ✨',
      ],
    };

    let msgIndex = 0;
    let cycleTimer = 0;
    let fadeTimer = 0;
    let happyTimer = 0;
    let cycleFinished = false;

    const showMessage = (index, animate = true) => {
      const currentLang = root.lang === 'vi' ? 'vi' : 'en';
      const list = MESSAGES[currentLang];
      msgIndex = Math.max(0, Math.min(index, list.length - 1));
      cycleFinished = false;

      if (!animate) {
        speech.textContent = list[msgIndex];
        speech.classList.add('is-visible');
        return;
      }

      speech.classList.remove('is-visible');
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        const langNow = root.lang === 'vi' ? 'vi' : 'en';
        speech.textContent = MESSAGES[langNow][msgIndex];
        speech.classList.add('is-visible');
      }, 220);
    };

    const startCycle = () => {
      clearInterval(cycleTimer);
      cycleTimer = setInterval(() => {
        const currentLang = root.lang === 'vi' ? 'vi' : 'en';
        const list = MESSAGES[currentLang];
        if (msgIndex >= list.length - 1) {
          clearInterval(cycleTimer);
          cycleFinished = true;
          speech.classList.remove('is-visible');
          return;
        }
        showMessage(msgIndex + 1, true);
      }, 3500);
    };

    // Show first message immediately and run through the sequence once (3.5s each)
    showMessage(0, false);
    startCycle();

    // Sync immediately when language changes (only if bubble is still active)
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        if (cycleFinished) return;
        setTimeout(() => showMessage(msgIndex, false), 200);
      });
    }

    // Click / Tap Interaction: Bounce + advance (or replay once if finished)
    btn.addEventListener('click', () => {
      if (cycleFinished) {
        showMessage(0, true);
      } else {
        const currentLang = root.lang === 'vi' ? 'vi' : 'en';
        if (msgIndex >= MESSAGES[currentLang].length - 1) {
          clearInterval(cycleTimer);
          cycleFinished = true;
          speech.classList.remove('is-visible');
        } else {
          showMessage(msgIndex + 1, true);
        }
      }
      if (!cycleFinished) startCycle();

      btn.classList.remove('is-bouncing');
      void btn.offsetWidth; // restart CSS keyframe
      btn.classList.add('is-bouncing');

      btn.classList.add('is-happy');
      clearTimeout(happyTimer);
      happyTimer = setTimeout(() => btn.classList.remove('is-happy'), 1200);
    });

    // Disable continuous mouse tracking on touch devices or reduced-motion
    if (!finePointer || reduceMotion) return;

    let targetEyeX = 0, targetEyeY = 0;
    let curEyeX = 0, curEyeY = 0;
    let targetRotX = 0, targetRotY = 0;
    let curRotX = 0, curRotY = 0;

    const MAX_EYE_OFFSET = 5.4; // SVG units clamp inside visor screen
    const MAX_HEAD_TILT = 8;    // Restrained ±8° 2.5D tilt
    const LERP = 0.09;          // Smooth 60fps linear interpolation factor

    addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.44;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);

      // Normalized distance falloff (0 -> 1 over 320px radius)
      const factor = Math.min(dist / 320, 1);

      targetEyeX = Math.cos(angle) * MAX_EYE_OFFSET * factor;
      targetEyeY = Math.sin(angle) * (MAX_EYE_OFFSET * 0.78) * factor;

      targetRotY = (dx / Math.max(innerWidth * 0.5, 320)) * MAX_HEAD_TILT;
      targetRotX = -(dy / Math.max(innerHeight * 0.5, 320)) * (MAX_HEAD_TILT * 0.85);
      targetRotY = Math.max(-MAX_HEAD_TILT, Math.min(MAX_HEAD_TILT, targetRotY));
      targetRotX = Math.max(-MAX_HEAD_TILT, Math.min(MAX_HEAD_TILT, targetRotX));
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      targetEyeX = 0;
      targetEyeY = 0;
      targetRotX = 0;
      targetRotY = 0;
    });

    const tickRobo = () => {
      curEyeX += (targetEyeX - curEyeX) * LERP;
      curEyeY += (targetEyeY - curEyeY) * LERP;
      curRotX += (targetRotX - curRotX) * LERP;
      curRotY += (targetRotY - curRotY) * LERP;

      eyes.setAttribute(
        'transform',
        `translate(${curEyeX.toFixed(2)} ${curEyeY.toFixed(2)})`
      );
      headTilt.style.transform =
        `perspective(520px) rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;

      requestAnimationFrame(tickRobo);
    };
    requestAnimationFrame(tickRobo);
  })();
})();
