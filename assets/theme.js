/* Тема применяется до отрисовки страницы, чтобы не было вспышки светлого фона. */
(function () {
  try {
    if (localStorage.getItem('senior-backend-plan-v1-theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
