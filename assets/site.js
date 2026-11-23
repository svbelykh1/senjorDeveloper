/* Общая логика сайта: тема, чекбоксы, счётчики. */
(function () {
  var THEME_KEY = 'senior-backend-plan-v1-theme';
  var STATE_KEY = 'senior-backend-plan-v1';
  var root = document.documentElement;

  /* ---------- Тема ---------- */
  var btn = document.getElementById('themeToggle');
  var icon = document.getElementById('themeIcon');
  var label = document.getElementById('themeLabel');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '☾' : '☀';
    if (label) label.textContent = theme === 'dark' ? 'Тёмная' : 'Светлая';
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  applyTheme(savedTheme === 'light' ? 'light' : 'dark');

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
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
      applyTheme(e.newValue === 'light' ? 'light' : 'dark');
    }
  });

  /* Доступ для главной страницы и других сценариев. */
  window.SeniorPlan = {
    store: store,
    save: save,
    updateCounters: updateCounters
  };
})();
