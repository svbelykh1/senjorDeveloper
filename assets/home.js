/* Главная страница: прогресс, карта курса, фильтр материалов. */
(function () {
  var KEY = 'senior-backend-plan-v1';

  var weekTitles = [
    'Жизненный цикл ПО',
    'Обеспечение качества',
    'Качество + ИИ + алгоритмы',
    'Алгоритмы + паттерны',
    'Паттерны + архитектура',
    'Архитектура',
    'Архитектура + инфраструктура',
    'Инфраструктура и Cloud + Kafka',
    'Протоколы, API',
    'Безопасность',
    'Базы данных',
    'Mock-интервью'
  ];

  var materialIds = {
    jira: ['jq1', 'jq2', 'jq3', 'jq4', 'jq5', 'jq6'],
    scrum: ['sk1', 'sk2', 'sk3', 'sk4', 'sk5'],
    deploy: ['ds1', 'ds2', 'ds3', 'ds4', 'ds5'],
    git: ['gt1', 'gt2', 'gt3', 'gt4', 'gt5'],
    gitlab: ['gl1', 'gl2', 'gl3', 'gl4', 'gl5'],
    docs: ['doc1', 'doc2', 'doc3', 'doc4', 'doc5'],
    quality: ['qa1', 'qa2', 'qa3', 'qa4', 'qa5'],
    algorithms: ['alg1', 'alg2', 'alg3', 'alg4', 'alg5'],
    patterns: ['pat1', 'pat2', 'pat3', 'pat4', 'pat5']
  };

  var groups = [
    { key: 'weeks', label: 'Недели плана', ids: weekTitles.map(function (_, i) { return 'w' + (i + 1); }) },
    { key: 'materials', label: 'Материалы', ids: Object.keys(materialIds).reduce(function (acc, k) { return acc.concat(materialIds[k]); }, []) },
    { key: 'skip', label: 'Что не учить', ids: ['s1', 's2', 's3', 's4', 's5'] },
    { key: 'artifacts', label: 'Артефакты', ids: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'] }
  ];

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function count(store, ids) {
    var done = 0;
    for (var i = 0; i < ids.length; i++) {
      if (store[ids[i]]) done++;
    }
    return done;
  }

  function percent(done, total) {
    return total ? Math.round((done / total) * 100) : 0;
  }

  function setBar(el, value) {
    if (!el) return;
    el.style.width = Math.max(0, Math.min(100, value)) + '%';
  }

  function render() {
    var store = read();

    /* Общий прогресс */
    var total = 0;
    var doneAll = 0;
    groups.forEach(function (g) {
      total += g.ids.length;
      doneAll += count(store, g.ids);
    });

    var overallPercent = document.getElementById('overallPercent');
    var overallCount = document.getElementById('overallCount');
    var overallBar = document.querySelector('#overallBar i');
    if (overallPercent) overallPercent.textContent = percent(doneAll, total) + '%';
    if (overallCount) overallCount.textContent = doneAll + ' из ' + total + ' пунктов';
    setBar(overallBar, percent(doneAll, total));

    /* Прогресс по группам */
    document.querySelectorAll('.prow[data-group]').forEach(function (row) {
      var group = groups.filter(function (g) { return g.key === row.getAttribute('data-group'); })[0];
      if (!group) return;
      var done = count(store, group.ids);
      var val = row.querySelector('.val');
      var bar = row.querySelector('.track i');
      if (val) val.textContent = done + ' / ' + group.ids.length;
      setBar(bar, percent(done, group.ids.length));
    });

    /* Карточки материалов */
    document.querySelectorAll('.mat-card[data-key]').forEach(function (card) {
      var ids = materialIds[card.getAttribute('data-key')] || [];
      var done = count(store, ids);
      var val = card.querySelector('.val');
      var bar = card.querySelector('.track i');
      if (val) val.textContent = done + ' / ' + ids.length;
      setBar(bar, percent(done, ids.length));
      card.classList.toggle('is-done', ids.length > 0 && done === ids.length);
    });

    /* Карта недель */
    var weeksDone = count(store, groups[0].ids);
    var doneEl = document.getElementById('weeksDone');
    if (doneEl) doneEl.textContent = weeksDone + ' / ' + weekTitles.length;

    document.querySelectorAll('.week-item[data-week]').forEach(function (item) {
      var n = parseInt(item.getAttribute('data-week'), 10);
      var isDone = !!store['w' + n];
      item.classList.toggle('is-done', isDone);
      var status = item.querySelector('.status');
      if (status) status.textContent = isDone ? 'готово' : 'в плане';
    });

    /* Следующий шаг */
    var next = 1;
    while (next <= weekTitles.length && store['w' + next]) next++;

    var title = document.getElementById('continueTitle');
    var text = document.getElementById('continueText');
    var link = document.getElementById('continueLink');

    if (next > weekTitles.length) {
      if (title) title.textContent = 'Все 12 недель отмечены';
      if (text) text.textContent = 'Можно повторить сложные темы или перейти к mock-интервью.';
      if (link) {
        link.textContent = 'К mock-интервью';
        link.setAttribute('href', 'planSenjor.html#mocks');
      }
    } else {
      if (title) title.textContent = 'Неделя ' + next;
      if (text) text.textContent = weekTitles[next - 1];
      if (link) {
        link.textContent = 'Открыть неделю в плане';
        link.setAttribute('href', 'planSenjor.html#weeks');
      }
    }
  }

  /* Фильтр материалов */
  var input = document.getElementById('topicSearch');
  var grid = document.getElementById('materialGrid');
  var empty = document.getElementById('materialsEmpty');
  var searchCount = document.getElementById('searchCount');

  function filterMaterials() {
    if (!input || !grid) return;
    var q = input.value.trim().toLowerCase();
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.mat-card'));
    var visible = 0;

    cards.forEach(function (card) {
      var show = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    if (searchCount) {
      searchCount.textContent = q ? visible + ' из ' + cards.length : '';
    }
    if (empty) empty.classList.toggle('show', visible === 0);
  }

  if (input) input.addEventListener('input', filterMaterials);

  render();

  window.addEventListener('seniorplan:change', render);
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) render();
  });
})();
