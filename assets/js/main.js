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
    'sk.db': 'Cơ sở dữ liệu &amp; Caching',
    'sk.arch': 'Kiến trúc &amp; Bảo mật',
    'sk.tools': 'Công cụ &amp; DevOps',

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
    metaTheme.setAttribute('content', t === 'dark' ? '#0f0f0e' : '#f4f2ed');
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
     Header: scrolled state + hide on scroll down + 2.5D progress rail
     ------------------------------------------------------- */
  const header = $('#header');
  const scrollProgress = $('#scrollProgress');
  const scrollProgressVal = $('#scrollProgressVal');
  let lastY = scrollY;
  let scrollIdleTimer = 0;
  const onHeaderScroll = () => {
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
      const vel = Math.max(-8, Math.min(8, -dy * 0.18));
      scrollProgress.style.setProperty('--scroll-p', p.toFixed(4));
      scrollProgress.style.setProperty('--vel', `${vel.toFixed(1)}px`);
      scrollProgress.style.setProperty('--val-o', y > 20 ? '1' : '0');
      if (scrollProgressVal) {
        scrollProgressVal.textContent = `${String(Math.round(p * 100)).padStart(2, '0')}%`;
      }
      clearTimeout(scrollIdleTimer);
      scrollIdleTimer = setTimeout(() => {
        scrollProgress.style.setProperty('--vel', '0px');
        scrollProgress.style.setProperty('--val-o', '0');
      }, 650);
    }
  };

  if (finePointer && !reduceMotion && scrollProgress) {
    addEventListener('pointermove', (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      scrollProgress.style.setProperty('--tilt-x', `${(-ny * 14).toFixed(2)}deg`);
      scrollProgress.style.setProperty('--tilt-y', `${(12 + nx * 14).toFixed(2)}deg`);
    }, { passive: true });
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

  /* Active nav link */
  const navLinks = $$('.nav__link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${en.target.id}`));
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
        tx = Math.sin(t / 2600) * 0.35;
        ty = Math.cos(t / 3400) * 0.25;
      }
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const sp = Math.min(scrollY / (hero.offsetHeight || innerHeight), 1);
      const rx = -cy * 14 + sp * 16 + 4;
      const ry = cx * 20 - 8;
      sceneInner.style.transform =
        `translate3d(0, ${(sp * 40).toFixed(1)}px, ${(-sp * 160).toFixed(1)}px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      depthEls.forEach((el) => {
        const d = +el.dataset.depth;
        el.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d - sp * 60).toFixed(2)}px`;
      });
    }
    requestAnimationFrame(heroLoop);
  };
  requestAnimationFrame(heroLoop);

  /* -------------------------------------------------------
     Project cards — 3D tilt with glare
     ------------------------------------------------------- */
  if (finePointer && !reduceMotion) {
    $$('.tilt').forEach((card) => {
      let raf = 0;
      card.addEventListener('pointerenter', () => card.classList.add('is-hover'));
      card.addEventListener('pointermove', (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          const k = r.width > 700 ? 0.5 : 1; // softer tilt on wide cards
          card.style.setProperty('--rx', `${((0.5 - y) * 8 * k).toFixed(2)}deg`);
          card.style.setProperty('--ry', `${((x - 0.5) * 10 * k).toFixed(2)}deg`);
          card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
          card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
        });
      });
      card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        card.classList.remove('is-hover');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

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
    };
    resizeBubbles();
    addEventListener('resize', resizeBubbles, { passive: true });

    let lastScrollForBubbles = scrollY;
    let smoothScrollBoost = 0;
    const drawBubbles = () => {
      ctx.clearRect(0, 0, bw, bh);
      const isDark = root.dataset.theme === 'dark';
      const scrollDelta = scrollY - lastScrollForBubbles;
      lastScrollForBubbles = scrollY;
      smoothScrollBoost += (Math.max(-2.5, Math.min(4, scrollDelta * 0.08)) - smoothScrollBoost) * 0.12;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.phase += b.freq;
        b.pulsePhase += b.pulseSpeed;
        b.y -= b.vy + smoothScrollBoost * (0.4 + b.depth * 0.7);
        b.x += Math.sin(b.phase) * b.amp;

        if (b.y < -b.r - 24) {
          Object.assign(b, makeBubble(false));
        } else if (b.y > bh + b.r + 90) {
          b.y = -b.r;
        }

        // Smooth fade near top & bottom viewport edges + gentle breathing
        const edgeFade = Math.min(1, Math.max(0, Math.min(b.y / 110, (bh - b.y) / 110)));
        const breathe = 0.82 + 0.18 * Math.sin(b.pulsePhase);
        const a = b.alpha * edgeFade * breathe;
        if (a <= 0.004) continue;

        const rgb = b.accent
          ? (isDark ? '255, 118, 76' : '217, 84, 42')
          : (isDark ? '228, 224, 214' : '120, 114, 102');

        if (b.isBokeh) {
          // Soft out-of-focus depth halo
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
          g.addColorStop(0, `rgba(${rgb}, ${(a * 0.9).toFixed(3)})`);
          g.addColorStop(0.6, `rgba(${rgb}, ${(a * 0.35).toFixed(3)})`);
          g.addColorStop(1, `rgba(${rgb}, 0)`);
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        } else {
          // Crisp champagne micro-bubble: hollow center, delicate rim & crescent glint
          const g = ctx.createRadialGradient(b.x, b.y, b.r * 0.15, b.x, b.y, b.r);
          g.addColorStop(0, `rgba(${rgb}, 0)`);
          g.addColorStop(0.72, `rgba(${rgb}, ${(a * 0.18).toFixed(3)})`);
          g.addColorStop(1, `rgba(${rgb}, ${(a * 0.55).toFixed(3)})`);

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          ctx.lineWidth = 0.65;
          ctx.strokeStyle = `rgba(${rgb}, ${(a * 0.75).toFixed(3)})`;
          ctx.stroke();

          // Tiny upper-left crescent highlight
          if (b.r > 2.2) {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r * 0.72, -Math.PI * 0.88, -Math.PI * 0.42);
            ctx.lineWidth = 0.75;
            ctx.strokeStyle = isDark
              ? `rgba(255, 255, 255, ${(a * 0.85).toFixed(3)})`
              : `rgba(255, 255, 255, ${Math.min(1, a * 1.6).toFixed(3)})`;
            ctx.stroke();
          }
        }
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
    const MAX_HEAD_TILT = 18;   // Degrees for 2.5D perspective tilt
    const LERP = 0.1;           // Smooth 60fps linear interpolation factor

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
