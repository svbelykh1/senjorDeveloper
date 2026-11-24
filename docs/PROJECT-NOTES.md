# PROJECT-NOTES.md — проект «Подготовка к ассесменту Senior Backend»

Справочник по проекту. **Не подгружается автоматически** — агент читает его, когда
пользователь об этом попросит или когда возвращается к доработке материалов.
Задача файла: не переспрашивать то, что уже решено, и не ломать договорённости.

## О проекте

- **Пользователь:** Сергей Белых, middle backend-разработчик (PHP), МТС, домен видео и телеком.
- **Цель:** ассесмент на **Senior** по «Общим компетенциям» разработчика. Формат — **интервью**, не тест.
- **Бюджет:** **8 часов в неделю**, горизонт — **12 недель** (96 часов).
- **Стек:** PHP, PostgreSQL, Kafka, микросервисы, GitLab, Jira.
- **Матрица:** Confluence «Developer: Общие Компетенции», статус Q1 2026.
  Для Backend Senior целевой уровень — **3 («Уровень опыта») по всем 10 компетенциям**, итого 30 баллов.
  Уровень 4 (Staff) не нужен: KPI команды, аудит процессов, оценка целого продукта.

### 10 компетенций матрицы

1. Жизненный цикл разработки ПО
2. Обеспечение качества
3. Работа с инструментами ИИ
4. Структуры данных и алгоритмы
5. Паттерны разработки
6. Архитектура
7. Инфраструктура и Cloud
8. Протоколы, API
9. Безопасность
10. Базы данных

Уровни: 0 Trainee, 1 Junior, 2 Middle, 3 Senior, 4 Staff, 5 Tech Lead.

## Структура проекта

```
SenjorDeveloper/
├── index.html              главная: прогресс, карта курса, материалы
├── planSenjor.html         план на 12 недель
├── JiraWorkflow.html       материалы недели 1
├── ScrumKanban.html
├── DeployStrategies.html
├── GitOperations.html
├── GitLabWorkflow.html
├── TechDocumentation.html
├── QualityAssurance.html   материалы недели 2
├── Algorithms.html         компетенция 4: структуры и алгоритмы
├── Patterns.html           компетенция 5: паттерны, ООП vs ФП, DI
├── LegacyScenarios.html    неделя 3: legacy и сложные сценарии
├── AIQuality.html          неделя 3: ИИ в процессах качества
├── RAGPrompting.html       неделя 3: RAG и Chain-of-Thought
├── PrivacyGDPR.html        неделя 3: GDPR и приватность
├── DDDCleanArchitecture.html  неделя 5: DDD и Clean Architecture
├── ArchitectureStyles.html    неделя 5: MVC, CQRS, Saga, Event Sourcing
├── Resilience.html         неделя 6: отказоустойчивость и согласованность
├── Observability.html      неделя 6: метрики, логи, трейсы
├── ArchitectureDocs.html   неделя 7: C4, ADR, диаграммы
├── DistributedSystems.html неделя 7: LB, sidecar, 2PC
├── DistributedDebugging.html  неделя 7: отладка распределённых систем
├── CDNEdge.html            неделя 8: CDN и edge
├── ContainersKubernetes.html  неделя 8: Docker и Kubernetes
├── KafkaCaching.html       неделя 8: Kafka и кэширование
├── ApiProtocols.html       неделя 9: HTTP/2, WebSocket, SSE, API
├── ApiReliability.html     неделя 9: идемпотентность и пулинг
├── AuthOIDC.html           неделя 10: OAuth, OIDC, PKCE, доступ
├── WebSecurity.html        неделя 10: OWASP, хеши, CORS
├── DatabaseTransactions.html  неделя 11: транзакции и SQL
├── DatabaseScaling.html    неделя 11: индексы и шардирование
├── MockInterviews.html     неделя 12: mock-интервью
├── PostgresInternals.html  доп.: MVCC, vacuum, блокировки
├── EventDrivenKafka.html   доп.: outbox, контракты, DLQ
├── assets/
│   ├── site.css            общий дизайн всех страниц
│   ├── theme.js            тема до отрисовки (без вспышки)
│   ├── site.js             тема, чекбоксы, счётчики
│   └── home.js             прогресс и фильтр на главной
└── docs/
    ├── PROJECT-NOTES.md    этот справочник
    ├── PROGRESS.md         журнал статуса
    ├── planConflu.txt      исходная матрица, только чтение
    └── Как вернуться к работе.txt
```

Все HTML-страницы лежат в корне — ссылки между ними короткие, прогресс в браузере
привязан к тем же путям. Служебные файлы — в `docs/`, чтобы не мешались рядом с сайтом.

## Файлы

| Файл | Роль |
|---|---|
| `index.html` | **Главная сайта.** Общий прогресс, следующая неделя, карта курса, карточки материалов, поиск |
| `planSenjor.html` | **Главный план.** 12 недель, бюджет времени, банк вопросов, mock-интервью, артефакты, чекбоксы прогресса |
| `JiraWorkflow.html` | Компетенция 1: Jira workflow, категории оценки трудозатрат, Scrum-планирование |
| `ScrumKanban.html` | Компетенция 1, подтема: определения Scrum и Kanban, устройство, различия, ответ для интервью |
| `DeployStrategies.html` | Компетенция 1, подтема: blue-green, canary, rolling — простыми словами, с аналогиями и правилами выбора |
| `GitOperations.html` | Компетенция 1, подтема: `cherry-pick`, `stash`, interactive rebase, `bisect` — простыми словами, с командами и ответами для интервью |
| `GitLabWorkflow.html` | Компетенция 1, подтема: protected branches, MR approvals, CI pipelines — процесс, настройки, пример `.gitlab-ci.yml` |
| `TechDocumentation.html` | Компетенция 1, подтема: виды документации (README, ADR, runbook, API), правила понятного текста, шаблон ADR, OpenAPI и Mermaid, docs-as-code |
| `QualityAssurance.html` | Компетенция 2: пирамида тестов, integration-тесты с Postgres и Kafka, нагрузочные тесты и метрики, JMeter/Gatling, SonarQube и Quality Gate, рефакторинг, CI/CD и метрики процесса |
| `Algorithms.html` | Компетенция 4: сложность O(n), структуры данных, сортировка и поиск, rate limiter, профилирование PHP, LRU-кэш |
| `Patterns.html` | Компетенция 5: ООП vs ФП, паттерны GoF, IoC/DI, feature toggles, баланс переиспользования и сложности |
| `LegacyScenarios.html` | Компетенция 2, неделя 3: оценка legacy, characterization-тесты, швы, Strangler Fig, конкурентность и частичные сбои |
| `AIQuality.html` | Компетенция 3: ИИ в тестах, ревью и разборе инцидентов, встраивание в CI, риски и метрики |
| `RAGPrompting.html` | Компетенция 3: RAG-пайплайн, метрики поиска, Chain-of-Thought, структура промптов |
| `PrivacyGDPR.html` | Компетенция 3: принципы GDPR, права субъекта, retention и удаление, PII в LLM, действия при утечке |
| `DDDCleanArchitecture.html` | Компетенция 6: bounded contexts, строительные блоки DDD, Clean Architecture, порты и адаптеры, домен видео |
| `ArchitectureStyles.html` | Компетенция 6: MVC/MVP/MVVM, CQRS, Event Sourcing, Pub-Sub, Saga, Microkernel, сравнение стилей |
| `Resilience.html` | Компетенция 6: timeout, retry, circuit breaker, fallback, bulkhead, конкурентность, Saga vs 2PC, видео-пайплайн |
| `Observability.html` | Компетенция 6: метрики, логи, трейсы, golden signals, SLO, требования к логам и безопасность |
| `ArchitectureDocs.html` | Компетенция 6: C4, ADR, diagrams-as-code, процесс поддержки документации |
| `DistributedSystems.html` | Компетенция 6: L4/L7, алгоритмы LB, sidecar, 2PC vs Saga, разделение запросов |
| `DistributedDebugging.html` | Компетенция 6: трейсы, correlation id, clock skew, порядок отладки, безопасность в проде |
| `CDNEdge.html` | Компетенция 6: content routing, origin shield, TTL и инвалидация, edge computing, HLS/DASH |
| `ContainersKubernetes.html` | Компетенция 6: Docker, объекты K8s, probes, requests/limits, HPA, релизы |
| `KafkaCaching.html` | Компетенция 6: партиции, consumer groups, at-least-once, DLQ, стратегии кэширования |
| `ApiProtocols.html` | Компетенция 6: HTTP/1.1–3, WebSocket, SSE, REST/gRPC/GraphQL, выбор API |
| `ApiReliability.html` | Компетенция 6: идемпотентность, дубли, пулинг соединений, whitelist/blacklist |
| `AuthOIDC.html` | Компетенция 9: OAuth 2.0, OIDC, PKCE, токены, JWT, ACL/RBAC/ABAC |
| `WebSecurity.html` | Компетенция 9: OWASP Top 10, SQLi/XSS/CSRF, хеширование, SAST/DAST, CORS |
| `DatabaseTransactions.html` | Компетенция 10: изоляция, транзакции, дедлоки, сложный SQL, процедуры |
| `DatabaseScaling.html` | Компетенция 10: индексы, NoSQL, масштабирование, репликация, партиции, шарды |
| `MockInterviews.html` | Неделя 12: формат прогона, system design, code review, STAR, scorecard |
| `PostgresInternals.html` | Доп. тема: MVCC, vacuum и bloat, блокировки, планировщик, PgBouncer, WAL и репликация |
| `EventDrivenKafka.html` | Доп. тема: события vs команды, outbox, контракты, идемпотентность, DLQ, Streams |
| `assets/site.css` | Общая дизайн-система: палитра, каркас, компоненты страниц и главной |
| `assets/theme.js` | Ранняя установка темы из localStorage |
| `assets/site.js` | Переключатель темы, сохранение чекбоксов, счётчики `0 / N` |
| `assets/home.js` | Прогресс на главной, «следующий шаг», карта недель, фильтр материалов |
| `docs/planConflu.txt` | Исходная HTML-выгрузка матрицы из Confluence. Только чтение, не редактировать |
| `docs/PROGRESS.md` | Журнал: что сделано, какие решения приняты, что дальше |

Копия плана в `C:\Users\svbelykh\.opencode\plan\senior-backend-plan.html` — **устаревшая**.
Рабочая версия только в этой папке.

## Дизайн-система

**Общий каркас:** HTML-страницы в корне, стили и скрипты — в `assets/`.
Каждая страница подключает:

```html
<script src="assets/theme.js"></script>
<link rel="stylesheet" href="assets/site.css">
...
<script src="assets/site.js"></script>
```

**Никаких CDN и внешних зависимостей.** Страницы открываются двойным кликом,
работают офлайн и печатаются в PDF. Правишь `assets/site.css` — меняется вид сразу
на всех страницах.

### Палитра и темы

Темы задаются атрибутом `data-theme` на `<html>` и набором CSS-переменных.
По умолчанию — тёмная.

| Тема | `data-theme` | Характер |
|---|---|---|
| Тёмная | `dark` | графит, нейтральная, по умолчанию |
| Светлая | `light` | белая, дневная |
| Сепия | `sepia` | тёплая бумага для чтения |
| Синяя | `ocean` | тёмно-синяя, «ночная» |
| Контраст | `contrast` | чёрный фон, белый текст, жёлтый акцент |

```css
/* тёмная тема (по умолчанию) */
--bg:#0e1013; --surface:#15181d; --surface-2:#1b1f25;
--line:#282d35; --line-soft:#20242b;
--ink:#e7eaef; --ink-2:#c2c8d2; --muted:#98a0ac;
--accent:#b9c2cf; --accent-ink:#12151a; --accent-soft:#1f242b;
--ok:#7fa08c; --warn:#8a7d63;

/* светлая тема — [data-theme="light"] */
--bg:#fbfbfc; --surface:#ffffff; --surface-2:#f4f5f7;
--line:#e1e4e9; --line-soft:#eceef2;
--ink:#14171c; --ink-2:#2c313a; --muted:#5c6470;
--accent:#2b313b; --accent-ink:#ffffff; --accent-soft:#eef0f3;
--ok:#3f6b52; --warn:#7a6746;
```

- Шрифт — системный стек (`-apple-system, "Segoe UI", Roboto, …`).
- Переключатель темы — кнопка в навигации, открывает меню с пятью вариантами.
- Выбор хранится в localStorage и синхронизируется между вкладками.
- Печать: `@media print` принудительно включает светлую схему, скрывает навигацию
  и меню тем.

### Обязательные элементы страницы

1. `<html lang="ru" data-theme="dark">` и `<meta charset="utf-8">`.
2. В `<head>` — `<script src="assets/theme.js"></script>` и `<link rel="stylesheet" href="assets/site.css">`.
3. Hero: eyebrow (компетенция и уровень), `h1`, лид-абзац.
4. Липкая навигация: иконка **⌂** на `index.html`, ссылка **← К плану**, якоря разделов,
   кнопка темы.
5. Секции с номером в круге: `<h2><span class="badge">1</span> Название</h2>`.
6. Футер со ссылками на главную, план и смежные материалы.
7. В конце — `<script src="assets/site.js"></script>`.

Страница не содержит `<style>` и инлайновых скриптов: только общие файлы из `assets/`.

### Компоненты

| Класс | Назначение |
|---|---|
| `.table-wrap` | Обёртка таблицы с горизонтальным скроллом |
| `.callout` / `.callout.warn` | Акцентная плашка / предупреждение |
| `.formula` | Формула или короткий тезис моноширинным шрифтом |
| `.flow` + `.node` + `.arrow` | Схема из «пилюль» (статусы, стратегии деплоя) |
| `.qa` + `.a` + `.own` + `.own-tag` | Вопрос, модельный ответ, ответ «своими словами» |
| `.checklist` | Чек-лист с сохранением состояния |
| `.progress` | Счётчик вида `0 / 5` |
| `a.topic.noarrow` | Ссылка-тема в таблице плана: пунктирное подчёркивание |
| `.home` | Квадратная иконка **⌂** на главную в навигации |
| `.theme-picker` / `.theme-menu` / `.theme-option` | Меню выбора одной из пяти тем |
| `.btn` / `.btn.primary` | Кнопки-ссылки на главной |
| `.dash` / `.dash-card` / `.prow` | Блок прогресса на главной |
| `.mat-card` + `.tag` | Карточка материала с тегами и прогрессом |
| `.week-item` | Карточка недели в карте курса |

### Хранилище в браузере

| Ключ | Содержимое |
|---|---|
| `senior-backend-plan-v1-theme` | `dark`, `light`, `sepia`, `ocean` или `contrast`, общий для всех страниц |
| `senior-backend-plan-v1` | JSON с состоянием чекбоксов по `data-id` |

ID чекбоксов уникальны по страницам: `w1…w12`, `s1…s5`, `a1…a8` в плане, `jq1…jq6`,
`sk1…sk5`, `ds1…ds5`, `gt1…gt5`, `gl1…gl5`, `doc1…doc5`, `qa1…qa5`, `alg1…alg5`,
`pat1…pat5`, `lg1…lg5`, `aiq1…aiq5`, `rag1…rag5`, `gdpr1…gdpr5`, `ddd1…ddd5`,
`style1…style5`, `res1…res5`, `obs1…obs5`, `archdoc1…archdoc5`, `dist1…dist5`,
`dbg1…dbg5`, `cdn1…cdn5`, `k8s1…k8s5`, `kafka1…kafka5`, `proto1…proto5`,
`apirel1…apirel5`, `auth1…auth5`, `sec1…sec5`, `dbtx1…dbtx5`, `dbs1…dbs5`,
`mock1…mock5`, `pg1…pg5`, `evt1…evt5` в материалах. Новые страницы продолжают
эту схему своим префиксом.

## Правила работы

1. **Новая тема — новая страница.** Не раздувать существующие: `JiraWorkflow.html` уже
   разделён, когда в нём появились Scrum и Kanban.
2. **Ссылка из плана — только на то, что страница реально покрывает.** Оформлять
   `<a class="topic noarrow" href="…">точная фраза</a>`. Не делать кликабельным весь блок
   компетенции.
3. **Не добавлять ссылки на Confluence.** Упоминание источника текстом допустимо, URL — нет.
4. **Тон:** по-русски, по делу, без канцелярита. У каждого вопроса — модельный ответ и вариант
   «своими словами». Сложные темы объяснять «для новичка»: аналогия → шаги → плюсы/минусы →
   когда применять. Термины вводить после того, как смысл уже понятен.
5. **Примеры — на стеке пользователя:** PHP, PostgreSQL, Kafka, микросервисы, видео-домен
   (live/VOD, HLS/DASH, CDN, DRM, транскодинг).
6. **Не обещать уровень 4.** Всё, что в матрице Staff, помечать как «не требуется».
7. Перед удалением или переименованием файла — проверить, нет ли на него ссылок в других
   страницах (`grep` по имени файла).

## Чек-лист новой страницы

1. Взять каркас с последней страницы: `<head>`, hero, навигацию, футер. Не копировать
   стили — они уже в `assets/site.css`.
2. Собрать секции по схеме: определения → устройство → различия → когда применять →
   ошибки → вопрос для интервью → самопроверка → что почитать.
3. Добавить чекбоксы самопроверки (5 штук) с префиксом страницы и счётчиком.
4. Добавить карточку в `index.html`: `data-key`, ссылка, теги, количество чекбоксов.
   Если появился новый префикс — обновить `materialIds` в `assets/home.js`.
5. Добавить страницу в таблицу файлов этого документа и в `docs/PROGRESS.md`.
6. В `planSenjor.html` обернуть точную фразу темы в `a.topic.noarrow`.
7. Проверить (PowerShell + Node):

```powershell
# баланс тегов
$t=[System.Text.Encoding]::UTF8.GetString([System.IO.File]::ReadAllBytes('PAGE.html'))
"section: " + ([regex]::Matches($t,'<section')).Count + "/" + ([regex]::Matches($t,'</section>')).Count
"div: " + ([regex]::Matches($t,'<div')).Count + "/" + ([regex]::Matches($t,'</div>')).Count

# синтаксис общих скриптов
node --check assets\site.js
node --check assets\home.js
```

Отдельно проверить, что нет инлайновых `<style>` и скриптов без `src`, и что все
ссылки и `src` ведут на существующие файлы.

8. Открыть `index.html` и страницу через локальный сервер или `file://`, проверить
   тёмную и светлую темы, консоль и отсутствие горизонтальной прокрутки.

> **Важно:** не переносить HTML-страницы в подпапки без необходимости. Браузерный
> прогресс привязан к путям и источнику, а ссылки придётся править во всех файлах.

## Следующие шаги

- Пройти материалы недель 1–12: устные ответы, чекбоксы, закрытие пробелов.
- Проработать дополнительные темы `PostgresInternals.html` и `EventDrivenKafka.html`.
- Провести три mock-интервью по `MockInterviews.html`, заполнить scorecard.
- Закрыть топ-3 пробела и повторить полный прогон.
- По запросу — добавить темы вне матрицы или углубить любой раздел.

## Открытые вопросы к пользователю

- Дата ассесмента (сколько недель реально осталось).
- PHP-фреймворк: Laravel, Symfony или собственный.
- Какие микросервисы в зоне ответственности.
