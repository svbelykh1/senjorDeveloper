/* Общая логика сайта: тема, чекбоксы, счётчики. */
(function () {
  var THEME_KEY = 'senior-backend-plan-v1-theme';
  var STATE_KEY = 'senior-backend-plan-v1';
  var root = document.documentElement;

  /* ---------- Тема ---------- */
  var btn = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');
  var label = document.getElementById('themeLabel');

  var THEMES = {
    dark:     { icon: '☾', label: 'Тёмная' },
    light:    { icon: '☀', label: 'Светлая' },
    sepia:    { icon: '◐', label: 'Сепия' },
    ocean:    { icon: '≋', label: 'Синяя' },
    contrast: { icon: '◑', label: 'Контраст' }
  };

  function isTheme(name) {
    return Object.prototype.hasOwnProperty.call(THEMES, name);
  }

  function applyTheme(theme) {
    if (!isTheme(theme)) theme = 'dark';
    root.setAttribute('data-theme', theme);
    var meta = THEMES[theme];
    if (icon) icon.textContent = meta.icon;
    if (label) label.textContent = meta.label;
    Array.prototype.forEach.call(document.querySelectorAll('.theme-option'), function (opt) {
      opt.setAttribute('aria-checked', opt.getAttribute('data-theme-value') === theme ? 'true' : 'false');
    });
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(isTheme(savedTheme) ? savedTheme : 'dark');

  if (btn) {
    var picker = document.createElement('div');
    picker.className = 'theme-picker';
    btn.parentNode.insertBefore(picker, btn);
    picker.appendChild(btn);

    var menu = document.createElement('div');
    menu.className = 'theme-menu';
    menu.id = 'themeMenu';
    menu.hidden = true;
    menu.setAttribute('role', 'menu');
    menu.setAttribute('aria-label', 'Тема оформления');

    Object.keys(THEMES).forEach(function (name) {
      var opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'theme-option';
      opt.setAttribute('role', 'menuitemradio');
      opt.setAttribute('data-theme-value', name);
      opt.setAttribute('aria-checked', 'false');
      opt.innerHTML = '<span class="swatch" aria-hidden="true"></span>' +
                      '<span class="theme-ico" aria-hidden="true">' + THEMES[name].icon + '</span>' +
                      '<span>' + THEMES[name].label + '</span>';
      opt.addEventListener('click', function () {
        applyTheme(name);
        try { localStorage.setItem(THEME_KEY, name); } catch (e) {}
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      });
      menu.appendChild(opt);
    });

    picker.appendChild(menu);
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'themeMenu');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = menu.hidden;
      if (open) {
        menu.hidden = false;
        menu.classList.remove('up');
        var rect = menu.getBoundingClientRect();
        if (rect.bottom > window.innerHeight - 8) {
          menu.classList.add('up');
        }
      } else {
        menu.hidden = true;
      }
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('click', function (e) {
      if (!picker.contains(e.target)) {
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        menu.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });

    applyTheme(root.getAttribute('data-theme'));
  }

  /* ---------- Состояние чекбоксов ---------- */
  function readStore() {
    try {
      return JSON.parse(localStorage.getItem(STATE_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  var store = readStore();

  function save() {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(store)); } catch (e) {}
  }

  function mergeStore(latest) {
    Object.keys(store).forEach(function (k) { delete store[k]; });
    Object.keys(latest).forEach(function (k) { store[k] = latest[k]; });
  }

  var boxes = Array.prototype.slice.call(
    document.querySelectorAll('input[type="checkbox"][data-id]')
  );

  function syncRow(cb) {
    var row = cb.closest('tr');
    if (row) row.classList.toggle('done', cb.checked);
  }

  boxes.forEach(function (cb) {
    var id = cb.getAttribute('data-id');
    if (store[id]) cb.checked = true;
    syncRow(cb);

    cb.addEventListener('change', function () {
      /* Другая вкладка могла сохранить свои отметки — не затираем их. */
      mergeStore(readStore());
      store[id] = cb.checked;
      save();
      syncRow(cb);
      updateCounters();
      try {
        window.dispatchEvent(new CustomEvent('seniorplan:change', { detail: { store: store } }));
      } catch (e) {}
    });
  });

  /* ---------- Счётчики страниц ---------- */
  var counters = [
    ['.wk-check', 'weekProgress'],
    ['.skip-check', 'skipProgress'],
    ['.art-check', 'artifactProgress'],
    ['.check-item', 'checkProgress']
  ];

  function updateCounters() {
    counters.forEach(function (pair) {
      var el = document.getElementById(pair[1]);
      if (!el) return;
      var list = document.querySelectorAll(pair[0]);
      var done = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].checked) done++;
      }
      el.textContent = done + ' / ' + list.length;
    });
  }

  updateCounters();

  /* Синхронизация между вкладками: чекбоксы и тема. */
  window.addEventListener('storage', function (e) {
    if (e.key === STATE_KEY) {
      mergeStore(readStore());
      boxes.forEach(function (cb) {
        var id = cb.getAttribute('data-id');
        var value = !!store[id];
        if (cb.checked !== value) {
          cb.checked = value;
          syncRow(cb);
        }
      });
      updateCounters();
    }
    if (e.key === THEME_KEY) {
      applyTheme(isTheme(e.newValue) ? e.newValue : 'dark');
    }
  });

  /* Доступ для главной страницы и других сценариев. */
  window.SeniorPlan = {
    store: store,
    save: save,
    updateCounters: updateCounters
  };
})();
