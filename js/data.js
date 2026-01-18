// Данные уроков и тестов
// Данные уроков и тестов
const lessonsData = [
    {
        id: 1,
        title: "Введение и базовые слова",
        description: "Основные понятия языка, приветствия и базовые слова",
        completed: false,
        testScore: 0,
        theory: `
            <div class="content-section">
                <h3>Что такое Токи Пона?</h3>
                <p>Токи пона — искусственный язык, созданный канадским лингвистом и переводчиком Соней Ланг в 2001 году. Название языка переводится как «хороший язык» или «простой язык».</p>
                <p>В языке всего около 120-137 слов, что делает его одним из самых простых для изучения. Грамматика также максимально упрощена.</p>
            </div>
            
            <div class="content-section">
                <h3>Основные приветствия</h3>
                <div class="word-list">
                    <div class="word-card">
                        <div class="word-toki">toki</div>
                        <div class="word-translation">привет, язык, общение</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">pona</div>
                        <div class="word-translation">хороший, простой, исправлять</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">sina</div>
                        <div class="word-translation">ты, вы</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">mi</div>
                        <div class="word-translation">я, мы</div>
                    </div>
                </div>
                <p>Фраза <strong>"toki!"</strong> означает "Привет!", а <strong>"toki pona!"</strong> — "Добрый день!" или буквально "Хорошее общение!".</p>
            </div>
            
            <div class="content-section">
                <h3>Базовые фразы</h3>
                <p><strong>sina pona</strong> — Ты хороший / Всё хорошо</p>
                <p><strong>mi pona</strong> — Я в порядке</p>
                <p><strong>pona tawa sina</strong> — Спасибо (досл. "хорошее к тебе")</p>
                <p><strong>tawa pona</strong> — Пока (досл. "иди хорошо")</p>
            </div>
        `,
        test: {
            timeLimit: 300,
            questions: [
                {
                    id: 1,
                    text: "Что означает слово 'toki'?",
                    options: [
                        { text: "Хороший", correct: false },
                        { text: "Привет/язык", correct: true },
                        { text: "Я", correct: false },
                        { text: "Ты", correct: false }
					]
				},
                {
                    id: 2,
                    text: "Как переводится фраза 'pona tawa sina'?",
                    options: [
                        { text: "Добрый день", correct: false },
                        { text: "До свидания", correct: false },
                        { text: "Спасибо", correct: true },
                        { text: "Как дела?", correct: false }
                    ]
                },
                {
                    id: 3,
                    text: "Что означает слово 'pona'?",
                    options: [
                        { text: "Привет", correct: false },
                        { text: "Язык", correct: false },
                        { text: "Хороший/простой", correct: true },
                        { text: "Общение", correct: false }
                    ]
                },
                {
                    id: 4,
                    text: "Как сказать 'Я в порядке' на Токи Пона?",
                    options: [
                        { text: "sina pona", correct: false },
                        { text: "toki pona", correct: false },
                        { text: "mi pona", correct: true },
                        { text: "pona tawa sina", correct: false }
                    ]
                },
                {
                    id: 5,
                    text: "Что означает слово 'sina'?",
                    options: [
                        { text: "Я", correct: false },
                        { text: "Ты/вы", correct: true },
                        { text: "Хороший", correct: false },
                        { text: "Привет", correct: false }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        title: "Существительные и основные понятия",
        description: "Изучение существительных и основных понятий Токи Пона",
        completed: false,
        testScore: 0,
        theory: `
            <div class="content-section">
                <h3>Основные существительные</h3>
                <p>В Токи Пона нет разделения на части речи в традиционном понимании. Любое слово может быть существительным, прилагательным или глаголом в зависимости от контекста.</p>
                
                <div class="word-list">
                    <div class="word-card">
                        <div class="word-toki">jan</div>
                        <div class="word-translation">человек, люди, кто-то</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">ijo</div>
                        <div class="word-translation">вещь, объект, нечто</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">ma</div>
                        <div class="word-translation">земля, страна, место</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">kili</div>
                        <div class="word-translation">фрукт, овощ, растение</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">telo</div>
                        <div class="word-translation">вода, жидкость, напиток</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">moku</div>
                        <div class="word-translation">еда, пища, кушать</div>
                    </div>
                </div>
            </div>
            
            <div class="content-section">
                <h3>Составные слова</h3>
                <p>В Токи Пона можно создавать новые понятия, комбинируя слова:</p>
                <p><strong>jan pona</strong> — друг (досл. "хороший человек")</p>
                <p><strong>tomo tawa</strong> — транспорт, машина (досл. "движущееся здание")</p>
                <p><strong>telo nasa</strong> — алкоголь (досл. "странная жидкость")</p>
                <p><strong>ma tomo</strong> — город (досл. "здание-земля")</p>
            </div>
        `,
        test: {
            timeLimit: 300,
            questions: [
                {
                    id: 1,
                    text: "Что означает слово 'jan'?",
                    options: [
                        { text: "Вещь", correct: false },
                        { text: "Человек", correct: true },
                        { text: "Земля", correct: false },
                        { text: "Вода", correct: false }
                    ]
                },
                {
                    id: 2,
                    text: "Как сказать 'друг' на Токи Пона?",
                    options: [
                        { text: "jan pona", correct: true },
                        { text: "tomo tawa", correct: false },
                        { text: "telo nasa", correct: false },
                        { text: "ma tomo", correct: false }
                    ]
                },
                {
                    id: 3,
                    text: "Что означает слово 'moku'?",
                    options: [
                        { text: "Еда/кушать", correct: true },
                        { text: "Вода", correct: false },
                        { text: "Фрукт", correct: false },
                        { text: "Вещь", correct: false }
                    ]
                },
                {
                    id: 4,
                    text: "Как переводится 'telo nasa'?",
                    options: [
                        { text: "Минеральная вода", correct: false },
                        { text: "Алкоголь", correct: true },
                        { text: "Фруктовый сок", correct: false },
                        { text: "Горячий напиток", correct: false }
                    ]
                },
                {
                    id: 5,
                    text: "Что означает 'ma tomo'?",
                    options: [
                        { text: "Деревня", correct: false },
                        { text: "Страна", correct: false },
                        { text: "Город", correct: true },
                        { text: "Остров", correct: false }
                    ]
                }
            ]
        }
    },
    {
        id: 3,
        title: "Глаголы и действия",
        description: "Изучение глаголов и выражение действий в Токи Пона",
        completed: false,
        testScore: null,
        theory: `
            <div class="content-section">
                <h3>Основные глаголы</h3>
                <p>В Токи Пона глаголы не спрягаются и не изменяются по временам. Время действия обычно понятно из контекста или указывается отдельными словами.</p>
                
                <div class="word-list">
                    <div class="word-card">
                        <div class="word-toki">lukin</div>
                        <div class="word-translation">видеть, смотреть, глаз</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">kute</div>
                        <div class="word-translation">слышать, слушать, ухо</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">toki</div>
                        <div class="word-translation">говорить, общаться, язык</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">pali</div>
                        <div class="word-translation">делать, работать, деятельность</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">tawa</div>
                        <div class="word-translation">идти, двигаться, к, для</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">sona</div>
                        <div class="word-translation">знать, уметь, понимать, знание</div>
                    </div>
                </div>
            </div>
            
            <div class="content-section">
                <h3>Построение предложений с глаголами</h3>
                <p>Порядок слов в предложении: Подлежащее + li + Сказуемое + Дополнение</p>
                <p><strong>mi moku</strong> — Я ем / Я еда</p>
                <p><strong>sina lukin</strong> — Ты смотришь</p>
                <p><strong>jan li toki</strong> — Человек говорит</p>
                <p><strong>mi sona e toki pona</strong> — Я знаю токи пону</p>
                <p>Частица <strong>li</strong> отделяет подлежащее от сказуемого, но не используется после <strong>mi</strong> или <strong>sina</strong>.</p>
            </div>
        `,
        test: {
            timeLimit: 300,
            questions: [
                {
                    id: 1,
                    text: "Что означает слово 'lukin'?",
                    options: [
                        { text: "Слышать", correct: false },
                        { text: "Видеть/смотреть", correct: true },
                        { text: "Говорить", correct: false },
                        { text: "Знать", correct: false }
                    ]
                },
                {
                    id: 2,
                    text: "Как сказать 'Я работаю' на Токи Пона?",
                    options: [
                        { text: "mi pali", correct: true },
                        { text: "mi toki", correct: false },
                        { text: "mi lukin", correct: false },
                        { text: "mi kute", correct: false }
                    ]
                },
                {
                    id: 3,
                    text: "Что означает слово 'sona'?",
                    options: [
                        { text: "Делать", correct: false },
                        { text: "Знать/уметь", correct: true },
                        { text: "Идти", correct: false },
                        { text: "Смотреть", correct: false }
                    ]
                },
                {
                    id: 4,
                    text: "Как переводится 'jan li toki'?",
                    options: [
                        { text: "Человек идёт", correct: false },
                        { text: "Человек говорит", correct: true },
                        { text: "Человек видит", correct: false },
                        { text: "Человек знает", correct: false }
                    ]
                },
                {
                    id: 5,
                    text: "Какая частица используется между подлежащим и сказуемым (кроме mi/sina)?",
                    options: [
                        { text: "e", correct: false },
                        { text: "li", correct: true },
                        { text: "tawa", correct: false },
                        { text: "pona", correct: false }
                    ]
                }
            ]
        }
    },
    {
        id: 4,
        title: "Прилагательные и описание",
        description: "Использование прилагательных для описания предметов и людей",
        completed: false,
        testScore: null,
        theory: `
            <div class="content-section">
                <h3>Основные прилагательные</h3>
                <p>В Токи Пона прилагательные следуют после существительных, которые они описывают.</p>
                
                <div class="word-list">
                    <div class="word-card">
                        <div class="word-toki">pona</div>
                        <div class="word-translation">хороший, простой, полезный</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">ike</div>
                        <div class="word-translation">плохой, злой, вредный</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">suli</div>
                        <div class="word-translation">большой, важный, высокий</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">lili</div>
                        <div class="word-translation">маленький, молодой, незначительный</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">nasa</div>
                        <div class="word-translation">странный, глупый, пьяный</div>
                    </div>
                    <div class="word-card">
                        <div class="word-toki">sin</div>
                        <div class="word-translation">новый, свежий, другой</div>
                    </div>
                </div>
            </div>
            
            <div class="content-section">
                <h3>Примеры использования прилагательных</h3>
                <p><strong>jan pona</strong> — хороший человек (друг)</p>
                <p><strong>tomo suli</strong> — большой дом</p>
                <p><strong>kili sin</strong> — свежий фрукт</p>
                <p><strong>telo nasa</strong> — странная жидкость (алкоголь)</p>
                <p><strong>ijo lili</strong> — маленькая вещь</p>
                <p>Несколько прилагательных могут следовать друг за другом: <strong>jan pona suli</strong> — большой хороший человек.</p>
            </div>
        `,
        test: {
            timeLimit: 300,
            questions: [
                {
                    id: 1,
                    text: "Что означает слово 'ike'?",
                    options: [
                        { text: "Хороший", correct: false },
                        { text: "Плохой", correct: true },
                        { text: "Большой", correct: false },
                        { text: "Новый", correct: false }
                    ]
                },
                {
                    id: 2,
                    text: "Как сказать 'большой дом' на Токи Пона?",
                    options: [
                        { text: "tomo suli", correct: true },
                        { text: "tomo pona", correct: false },
                        { text: "tomo lili", correct: false },
                        { text: "tomo nasa", correct: false }
                    ]
                },
                {
                    id: 3,
                    text: "Что означает 'kili sin'?",
                    options: [
                        { text: "Свежий фрукт", correct: true },
                        { text: "Вкусный фрукт", correct: false },
                        { text: "Маленький фрукт", correct: false },
                        { text: "Странный фрукт", correct: false }
                    ]
                },
                {
                    id: 4,
                    text: "Как переводится слово 'lili'?",
                    options: [
                        { text: "Большой", correct: false },
                        { text: "Маленький", correct: true },
                        { text: "Новый", correct: false },
                        { text: "Странный", correct: false }
                    ]
                },
                {
                    id: 5,
                    text: "Где в предложении стоят прилагательные в Токи Пона?",
                    options: [
                        { text: "Перед существительным", correct: false },
                        { text: "После существительного", correct: true },
                        { text: "Место не фиксировано", correct: false },
                        { text: "В начале предложения", correct: false }
                    ]
                }
            ]
        }
    }
];

const progressHistory = [
];

// ВАЖНО: Экспортируем в глобальную область видимости
window.lessonsData = lessonsData;
window.progressHistory = progressHistory;

console.log('Данные уроков загружены:', window.lessonsData.length, 'урока');