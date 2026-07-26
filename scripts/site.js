/* ============================================================================
   Antaŭvidi — marketing site behaviour.

   Port of the client logic in `Sitio Antauvidi.dc.html` (the `DCLogic`
   component) to dependency-free DOM code: hash routing between the home page
   and the four product lines, the four-step cotizador, the simple cotizador
   variant, the agent-recruitment form, and the scroll reveal.

   The design file's three authoring props map onto query parameters so both
   variants stay reachable in the built site:
     ?hero=solido|foto        heroTreatment      (default: foto)
     ?cotizador=completo|simple  quoteMode       (default: completo)
     ?motion=on|off           revealAnimations   (default: on)
   ========================================================================= */

(function () {
  'use strict';

  /* ---- Product lines — data lifted verbatim from the design file -------- */

  var LINES = {
    vida: {
      key: 'vida', name: 'Vida', tag: 'Seguros de vida',
      bg: 'var(--azul-marino)', fg: '#ffffff', dim: 'rgba(255,255,255,0.8)',
      eyebrow: 'var(--coral)', cta: 'var(--coral)', ctaFg: '#ffffff',
      photo: 'assets/foto-vida.jpeg', pos: 'center 26%', wash: 'rgba(22,41,71,0.82)',
      flip: 'none',
      claim: 'Los tuyos, siempre respaldados.',
      claimSub: 'Antaŭvidi Vida. Lo que construiste sigue de pie.',
      head: 'Tu legado, en manos firmes.',
      sub: 'El respaldo económico que sostiene a tu familia cuando tú ya no puedas hacerlo. Beneficiarios claros, trámite acompañado y sin letras chiquitas.',
      l1: 'Edad del asegurado', p1: 'Ej. 42', l2: 'Ocupación', p2: 'Ej. Contador',
      covers: [
        { n: '01', t: 'Fallecimiento', d: 'Suma asegurada para los beneficiarios que tú designes, sin pasar por sucesión.' },
        { n: '02', t: 'Invalidez total y permanente', d: 'Anticipo de la suma asegurada si una condición te impide seguir trabajando.' },
        { n: '03', t: 'Enfermedades graves', d: 'Pago adelantado ante diagnósticos de alto impacto, para cubrir el tratamiento sin descapitalizarte.' },
        { n: '04', t: 'Gastos funerarios', d: 'Cobertura de liberación rápida para los primeros gastos, sin esperar el trámite completo.' },
        { n: '05', t: 'Beneficiarios múltiples', d: 'Reparto por porcentajes, actualizable cada vez que cambie tu familia.' }
      ]
    },
    gmm: {
      key: 'gmm', name: 'Salud', tag: 'Seguros de salud',
      bg: 'var(--azul-cielo)', fg: 'var(--azul-marino)', dim: 'rgba(22,41,71,0.75)',
      eyebrow: 'var(--coral-700)', cta: 'var(--coral)', ctaFg: '#ffffff',
      photo: 'assets/foto-1.jpeg', pos: 'center 20%', wash: 'rgba(22,41,71,0.80)',
      flip: 'scaleX(-1)',
      claim: 'Estar protegido es vivir con confianza.',
      claimSub: 'Antaŭvidi Salud. Atención sin sobresaltos.',
      head: 'Atención cuando más importa.',
      sub: 'Hospitalización, cirugía y tratamientos de alto costo con red médica amplia, y un asesor que responde el mismo día.',
      l1: 'Edad del asegurado', p1: 'Ej. 38', l2: '¿Cuántas personas incluyes?', p2: 'Ej. 3',
      covers: [
        { n: '01', t: 'Hospitalización', d: 'Habitación, insumos y servicios hospitalarios dentro de la red contratada.' },
        { n: '02', t: 'Cirugías y honorarios', d: 'Intervención, equipo quirúrgico y honorarios médicos según el tabulador de tu plan.' },
        { n: '03', t: 'Medicamentos y estudios', d: 'Estudios de diagnóstico y medicamentos derivados del padecimiento cubierto.' },
        { n: '04', t: 'Maternidad', d: 'Cobertura de embarazo y parto una vez cumplido el periodo de espera.' },
        { n: '05', t: 'Emergencia en el extranjero', d: 'Atención de urgencia fuera del país durante viajes temporales.' }
      ]
    },
    auto: {
      key: 'auto', name: 'Auto', tag: 'Seguros de auto',
      bg: 'var(--coral)', fg: '#ffffff', dim: 'rgba(255,255,255,0.88)',
      eyebrow: 'var(--azul-cielo)', cta: 'var(--azul-marino)', ctaFg: '#ffffff',
      photo: 'assets/foto-auto.jpeg', pos: 'center', wash: 'rgba(240,75,84,0.90)',
      flip: 'none',
      claim: 'Tu camino, siempre protegido.',
      claimSub: 'Antaŭvidi Autos. Maneja tranquilo, nosotros te cuidamos.',
      head: 'Cada kilómetro, cubierto.',
      sub: 'Maneja tranquilo: asistencia vial en cualquier momento, cobertura amplia y un proceso de siniestro que no te quita el día.',
      l1: 'Marca y modelo', p1: 'Ej. Mazda 3 2022', l2: 'Uso del vehículo', p2: 'Particular o comercial',
      covers: [
        { n: '01', t: 'Responsabilidad civil', d: 'Daños a personas y bienes de terceros, con defensa legal incluida.' },
        { n: '02', t: 'Daños materiales', d: 'Reparación por colisión y volcadura en talleres autorizados.' },
        { n: '03', t: 'Robo total', d: 'Indemnización por valor comercial al momento del siniestro.' },
        { n: '04', t: 'Asistencia vial', d: 'Grúa, paso de corriente, cambio de llanta y auxilio en carretera.' },
        { n: '05', t: 'Gastos médicos a ocupantes', d: 'Atención para conductor y acompañantes derivada del accidente.' }
      ]
    },
    casa: {
      key: 'casa', name: 'Casa', tag: 'Seguros de casa',
      bg: 'var(--arena)', fg: 'var(--azul-marino)', dim: 'rgba(22,41,71,0.75)',
      eyebrow: 'var(--coral-700)', cta: 'var(--coral)', ctaFg: '#ffffff',
      photo: 'assets/foto-2.jpeg', pos: '62% 72%', wash: 'rgba(22,41,71,0.78)',
      flip: 'scaleX(-1)',
      claim: 'Dormir tranquilo, cada noche.',
      claimSub: 'Antaŭvidi Casa. Tu patrimonio, resguardado.',
      head: 'Tu patrimonio, en calma.',
      sub: 'Tu inmueble y lo que hay dentro, protegidos ante lo que no se puede prever. Peritaje ágil y trato directo con quien te vendió la póliza.',
      l1: 'Tipo de inmueble', p1: 'Casa, departamento…', l2: 'Valor aproximado del inmueble', p2: 'Ej. 3,500,000',
      covers: [
        { n: '01', t: 'Incendio y explosión', d: 'Reconstrucción del inmueble y reposición del contenido afectado.' },
        { n: '02', t: 'Fenómenos hidrometeorológicos', d: 'Daños por huracán, granizo e inundación según la zona del inmueble.' },
        { n: '03', t: 'Sismo', d: 'Cobertura estructural con deducible aplicado sobre la suma asegurada.' },
        { n: '04', t: 'Robo de contenidos', d: 'Reposición de bienes y equipo del hogar con violencia comprobada.' },
        { n: '05', t: 'Responsabilidad civil familiar', d: 'Daños que tú o tu familia causen a terceros dentro o fuera del inmueble.' }
      ]
    }
  };

  var ESTADOS = [
    { value: '', label: 'Selecciona tu estado' },
    'Chihuahua', 'Coahuila', 'Nuevo León', 'Sonora', 'Sinaloa',
    'Durango', 'Tamaulipas', 'Baja California', 'Otro'
  ];

  var LINE_OPTIONS = [
    { value: '', label: 'Selecciona una línea' },
    { value: 'vida', label: 'Seguro de vida' },
    { value: 'gmm', label: 'Seguro de salud' },
    { value: 'auto', label: 'Seguro de auto' },
    { value: 'casa', label: 'Seguro de casa' }
  ];

  var SLUG_TO_KEY = { vida: 'vida', salud: 'gmm', auto: 'auto', casa: 'casa' };
  var KEY_TO_SLUG = { vida: 'vida', gmm: 'salud', auto: 'auto', casa: 'casa' };
  var SECTIONS = { cotizador: true, agentes: true };
  var HOME_TITLE = document.title;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  /* ---- Authoring props -------------------------------------------------- */

  var params = new URLSearchParams(window.location.search);
  var quoteMode = params.get('cotizador') === 'simple' ? 'simple' : 'completo';

  if (params.get('hero') === 'solido') document.documentElement.dataset.hero = 'solido';
  if (params.get('motion') === 'off') document.documentElement.dataset.motion = 'off';

  /* ---- Elements --------------------------------------------------------- */

  var homeEl = $('#page-home');
  var lineEl = $('#page-line');
  var menuEl = $('#mobile-menu');
  var burger = $('#burger');

  /* ---- Header menu ------------------------------------------------------ */

  function setMenu(open) {
    menuEl.classList.toggle('u-hidden', !open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', function () {
    setMenu(menuEl.classList.contains('u-hidden'));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 920) setMenu(false);
  });

  /* ---- Smooth scroll (same 76px offset and easing as the design) -------- */

  function scrollToId(id) {
    requestAnimationFrame(function () {
      var el = document.getElementById(id);
      if (!el) return;
      var from = window.scrollY;
      var max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      var to = Math.min(max, Math.max(0, el.getBoundingClientRect().top + from - 76));
      if (Math.abs(to - from) < 2) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, to);
        return;
      }
      var dur = 420;
      var t0 = performance.now();
      var tick = function (now) {
        var p = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, from + (to - from) * e);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---- Routing ---------------------------------------------------------- */

  function setActiveNav(slug) {
    $$('.site-nav a').forEach(function (a) {
      var target = a.getAttribute('href').slice(1);
      if (slug && target === slug) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function showHome() {
    homeEl.classList.remove('u-hidden');
    lineEl.classList.add('u-hidden');
    setActiveNav('');
    document.title = HOME_TITLE;
  }

  function showLine(key) {
    var line = LINES[key];
    renderLine(line);
    lineEl.classList.remove('u-hidden');
    homeEl.classList.add('u-hidden');
    setActiveNav(KEY_TO_SLUG[key]);
    document.title = 'Seguro de ' + line.name + ' — Antaŭvidi';
  }

  function route() {
    setMenu(false);
    var hash = window.location.hash.replace(/^#/, '');

    if (SLUG_TO_KEY[hash]) {
      showLine(SLUG_TO_KEY[hash]);
      window.scrollTo(0, 0);
      return;
    }
    if (hash === '') {
      showHome();
      window.scrollTo(0, 0);
      return;
    }
    if (SECTIONS[hash]) {
      showHome();
      scrollToId(hash);
      return;
    }
    // Any other in-page anchor (the skip link) keeps the current view and
    // lets the browser jump natively.
  }

  // Re-run the route when a link points at the hash that is already active —
  // the browser fires no hashchange in that case.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains('skip-link')) return;
    var href = a.getAttribute('href');
    var target = href === '#' ? '' : href.slice(1);
    if (window.location.hash.replace(/^#/, '') === target) {
      e.preventDefault();
      route();
    }
  });

  window.addEventListener('hashchange', route);

  /* ---- Line page rendering --------------------------------------------- */

  var lineHero = $('#line-hero');
  var linePhoto = $('#line-photo');
  var coversEl = $('#covers');
  var currentLine = null;

  function renderLine(line) {
    currentLine = line;

    lineHero.style.setProperty('--line-bg', line.bg);
    lineHero.style.setProperty('--line-fg', line.fg);
    lineHero.style.setProperty('--line-dim', line.dim);
    lineHero.style.setProperty('--line-eyebrow', line.eyebrow);
    lineHero.style.setProperty('--line-cta', line.cta);
    lineHero.style.setProperty('--line-cta-fg', line.ctaFg);
    lineHero.style.setProperty('--line-wash', line.wash);
    lineHero.style.setProperty('--line-photo-pos', line.pos);
    lineHero.style.setProperty('--line-photo-flip', line.flip);
    lineHero.style.setProperty('--line-photo-fallback', line.bg);

    // The solid brand field stays visible if the photograph is unavailable.
    linePhoto.style.backgroundImage = '';
    withImage(line.photo, function (ok) {
      if (ok && currentLine === line) {
        linePhoto.style.backgroundImage = 'url("' + line.photo + '")';
      }
    });

    $('[data-bind="tag"]', lineEl).textContent = line.tag;
    $('[data-bind="head"]', lineEl).textContent = line.head;
    $('[data-bind="sub"]', lineEl).textContent = line.sub;
    $('[data-bind="claim"]', lineEl).textContent = line.claim;
    $('[data-bind="claimSub"]', lineEl).textContent = line.claimSub;
    $('[data-bind="closer"]', lineEl).textContent =
      '¿Listo para cotizar tu seguro de ' + line.name + '?';
    $('#line-cta').textContent = 'Cotizar ' + line.name;

    coversEl.textContent = '';
    line.covers.forEach(function (c) {
      var card = document.createElement('div');
      card.className = 'cover';
      var num = document.createElement('p');
      num.className = 'cover__num';
      num.textContent = c.n;
      var title = document.createElement('h3');
      title.className = 'cover__title';
      title.textContent = c.t;
      var text = document.createElement('p');
      text.className = 'cover__text';
      text.textContent = c.d;
      card.appendChild(num);
      card.appendChild(title);
      card.appendChild(text);
      coversEl.appendChild(card);
    });
  }

  var imageCache = {};

  function withImage(src, cb) {
    if (src in imageCache) { cb(imageCache[src]); return; }
    var probe = new Image();
    probe.onload = function () { imageCache[src] = true; cb(true); };
    probe.onerror = function () { imageCache[src] = false; cb(false); };
    probe.src = src;
  }

  function quoteCurrentLine() {
    if (!currentLine) return;
    selectLine(currentLine.key);
    setStep(1);
    // Always arrives from a line route, so this triggers a hashchange.
    window.location.hash = 'cotizador';
  }

  $('#line-cta').addEventListener('click', quoteCurrentLine);
  $('#line-cta-2').addEventListener('click', quoteCurrentLine);

  /* ---- Hero photograph -------------------------------------------------- */

  var heroPhoto = $('#hero-photo');

  // Degrade to the design's `heroTreatment: solido` variant.
  var heroFallback = function () { document.documentElement.dataset.hero = 'solido'; };
  heroPhoto.addEventListener('error', heroFallback);
  if (heroPhoto.complete && heroPhoto.naturalWidth === 0) heroFallback();

  /* ---- Select population ------------------------------------------------ */

  function fillSelect(select, options) {
    options.forEach(function (opt) {
      var o = document.createElement('option');
      o.value = typeof opt === 'string' ? opt : opt.value;
      o.textContent = typeof opt === 'string' ? opt : opt.label;
      select.appendChild(o);
    });
  }

  $$('select[data-options="estados"]').forEach(function (s) { fillSelect(s, ESTADOS); });
  $$('select[data-options="lineOptions"]').forEach(function (s) { fillSelect(s, LINE_OPTIONS); });

  /* ---- Field error helpers ---------------------------------------------- */

  function clearErrors(scope) {
    $$('.ds-field', scope).forEach(function (f) {
      f.classList.remove('is-error');
      var msg = $('.ds-field__msg', f);
      if (msg) msg.textContent = '';
    });
    $$('.form-error', scope).forEach(function (p) { p.textContent = ''; });
  }

  function applyErrors(scope, errors) {
    clearErrors(scope);
    var first = null;
    Object.keys(errors).forEach(function (key) {
      var field = $('.ds-field[data-field="' + key + '"]', scope);
      if (field) {
        field.classList.add('is-error');
        $('.ds-field__msg', field).textContent = errors[key];
        var input = $('input, select', field);
        if (input) {
          input.setAttribute('aria-invalid', 'true');
          if (!first) first = input;
        }
        return;
      }
      var standalone = $('.form-error[data-error="' + key + '"]', scope);
      if (standalone) standalone.textContent = errors[key];
    });
    if (first) first.focus();
  }

  var EMAIL = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i;
  var digits = function (v) { return v.replace(/\D/g, ''); };

  /* ---- Cotizador — completo --------------------------------------------- */

  var quoteForm = $('#quote-form');
  var stepper = $('#stepper');
  var quoteNav = $('#quote-nav');
  var backBtn = $('#quote-back');
  var nextBtn = $('#quote-next');
  var step = 0;
  var selectedLine = '';

  function field(name) { return quoteForm.elements[name]; }

  function selectLine(key) {
    selectedLine = key;
    $$('.pick', quoteForm).forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.line === key));
    });
    var line = LINES[key];
    $$('[data-bind="selName"]', quoteForm).forEach(function (el) {
      el.textContent = line ? line.name : 'tu seguro';
    });
    $('[data-bind="qLabel1"]', quoteForm).textContent = line ? line.l1 : 'Dato principal';
    $('[data-bind="qLabel2"]', quoteForm).textContent = line ? line.l2 : 'Dato secundario';
    field('f1').placeholder = line ? line.p1 : '';
    field('f2').placeholder = line ? line.p2 : '';
    $('#err-line').textContent = '';
  }

  function renderStepper() {
    $$('li', stepper).forEach(function (li, i) {
      li.classList.toggle('is-done', i < step);
      li.classList.toggle('is-current', i === step);
      if (i === step) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
      var btn = $('.ds-stepper__item', li);
      btn.tabIndex = i < step ? 0 : -1;
      btn.disabled = i >= step;
    });
  }

  function setStep(n) {
    step = n;
    $$('.quote__step', quoteForm).forEach(function (el) {
      el.classList.toggle('u-hidden', Number(el.dataset.step) !== step);
    });
    quoteNav.classList.toggle('u-hidden', step >= 3);
    backBtn.classList.toggle('u-hidden', step === 0);
    nextBtn.textContent = step === 2 ? 'Enviar solicitud' : 'Continuar';
    renderStepper();
    clearErrors(quoteForm);
  }

  function validateStep() {
    var e = {};
    if (step === 1) {
      if (!field('f1').value.trim()) e.f1 = 'Este dato es necesario';
      if (!field('f2').value.trim()) e.f2 = 'Este dato es necesario';
      if (!field('f3').value) e.f3 = 'Selecciona tu estado';
    }
    if (step === 2) {
      if (field('nombre').value.trim().length < 3) e.nombre = 'Escribe tu nombre completo';
      if (!EMAIL.test(field('correo').value)) e.correo = 'Revisa tu correo';
      if (digits(field('tel').value).length < 10) e.tel = 'Necesitamos 10 dígitos';
      if (!field('ok').checked) e.ok = 'Necesitamos tu autorización para contactarte';
    }
    return e;
  }

  $$('.pick', quoteForm).forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectLine(btn.dataset.line);
      setStep(1);
    });
  });

  $$('.ds-stepper__item', stepper).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = Number(btn.dataset.step);
      if (target < step) setStep(target);
    });
  });

  quoteForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (step === 0) {
      if (!selectedLine) {
        // The design sets this error but never renders it; the site shows it
        // so "Continuar" is never a silent no-op.
        $('#err-line').textContent = 'Elige una línea';
        return;
      }
      setStep(1);
      return;
    }
    var errors = validateStep();
    if (Object.keys(errors).length) { applyErrors(quoteForm, errors); return; }
    setStep(step + 1);
    if (step === 3) {
      $('[data-bind="nombre"]', quoteForm).textContent = field('nombre').value.trim();
      $('[data-bind="correo"]', quoteForm).textContent = field('correo').value.trim();
      $('[data-bind="tel"]', quoteForm).textContent = field('tel').value.trim();
    }
    scrollToId('cotizador');
  });

  backBtn.addEventListener('click', function () { setStep(Math.max(0, step - 1)); });

  $('#quote-restart').addEventListener('click', function () {
    quoteForm.reset();
    selectLine('');
    selectedLine = '';
    setStep(0);
    scrollToId('cotizador');
  });

  $$('.ds-input, .ds-select select', quoteForm).forEach(function (input) {
    input.addEventListener('input', function () {
      var f = input.closest('.ds-field');
      if (!f || !f.classList.contains('is-error')) return;
      f.classList.remove('is-error');
      $('.ds-field__msg', f).textContent = '';
      input.removeAttribute('aria-invalid');
    });
  });

  /* ---- Cotizador — simple ----------------------------------------------- */

  var simpleForm = $('#quote-simple-form');

  if (quoteMode === 'simple') {
    $('#quote-completo').classList.add('u-hidden');
    $('#quote-simple').classList.remove('u-hidden');
  }

  simpleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = simpleForm.elements;
    var errors = {};
    if (f.nombre.value.trim().length < 3) errors.nombre = 'Escribe tu nombre completo';
    if (!EMAIL.test(f.correo.value)) errors.correo = 'Revisa tu correo';
    if (digits(f.tel.value).length < 10) errors.tel = 'Necesitamos 10 dígitos';
    if (!f.ok.checked) errors.ok = 'Necesitamos tu autorización para contactarte';
    if (Object.keys(errors).length) { applyErrors(simpleForm, errors); return; }

    $('[data-bind="nombre"]', simpleForm).textContent = f.nombre.value.trim();
    $('[data-bind="correo"]', simpleForm).textContent = f.correo.value.trim();
    $('#quote-simple-fields').classList.add('u-hidden');
    $('#quote-simple-done').classList.remove('u-hidden');
  });

  /* ---- Agentes ----------------------------------------------------------- */

  var agForm = $('#agentes-form');

  agForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = agForm.elements;
    var errors = {};
    if (f.nombre.value.trim().length < 3) errors.nombre = 'Escribe tu nombre completo';
    if (digits(f.celular.value).length < 10) errors.celular = 'Necesitamos 10 dígitos';
    if (!f.ciudad.value.trim()) errors.ciudad = '¿Desde dónde operas?';
    if (Object.keys(errors).length) { applyErrors(agForm, errors); return; }

    $('[data-bind="celular"]', agForm).textContent = f.celular.value.trim();
    $('#agentes-fields').classList.add('u-hidden');
    $('#agentes-done').classList.remove('u-hidden');
  });

  /* ---- Scroll reveal fallback ------------------------------------------- */

  if (!(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()'))) {
    var reveal = function (el) { el.classList.add('is-revealed'); };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          io.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -20% 0px' });
      $$('[data-rv]').forEach(function (el) { io.observe(el); });
    } else {
      $$('[data-rv]').forEach(reveal);
    }
  }

  /* ---- Boot -------------------------------------------------------------- */

  setStep(0);
  selectLine('');
  route();
})();
