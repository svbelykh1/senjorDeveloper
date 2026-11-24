/* Тема применяется до отрисовки страницы, чтобы не было вспышки другого фона. */
(function () {
  var allowed = ['dark', 'light', 'sepia', 'ocean', 'contrast'];
  try {
    var saved = localStorage.getItem('senior-backend-plan-v1-theme');
    if (allowed.indexOf(saved) !== -1) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch (e) {}
})();
