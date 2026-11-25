/* Фильтр по общему словарю терминов. */
(function () {
  var input = document.getElementById('glossarySearch');
  if (!input) return;

  var count = document.getElementById('glossaryCount');
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[data-glossary]')
  );
  var total = 0;

  sections.forEach(function (section) {
    total += section.querySelectorAll('tbody tr').length;
  });

  function filter() {
    var q = input.value.trim().toLowerCase();
    var visible = 0;

    sections.forEach(function (section) {
      var rows = Array.prototype.slice.call(section.querySelectorAll('tbody tr'));
      var shown = 0;

      rows.forEach(function (row) {
        var match = !q || row.textContent.toLowerCase().indexOf(q) !== -1;
        row.classList.toggle('hidden', !match);
        if (match) shown++;
      });

      section.classList.toggle('hidden', shown === 0);
      visible += shown;
    });

    if (count) {
      count.textContent = q ? visible + ' из ' + total : '';
    }
  }

  input.addEventListener('input', filter);
})();
