// Главный модуль приложения
class TokiPonaApp {
    constructor() {
        this.currentPage = 'home';
        this.currentLessonId = null;
        console.log('Конструктор TokiPonaApp вызван');
        console.log('window.lessonsData:', window.lessonsData);
        
        this.init();
    }

    // Инициализация приложения
    init() {
        console.log('Инициализация приложения');
        
        // Проверяем загрузку данных
        this.checkDataLoaded();
        
        // Инициализация данных из localStorage
        if (window.quizManager) {
            window.quizManager.initFromLocalStorage();
        }
        
        // Настройка навигации
        this.setupNavigation();
        
        // Показываем текущую страницу
        this.showPage(this.currentPage);
    }

    // Проверка загрузки данных
    checkDataLoaded() {
        if (!window.lessonsData) {
            console.error('ОШИБКА: window.lessonsData не определен!');
            
            // Создаем временные данные для тестирования
            window.lessonsData = [
                {
                    id: 1,
                    title: "Тестовый урок",
                    description: "Тестовый урок для проверки",
                    completed: false,
                    testScore: null,
                    theory: "<p>Тестовая теория</p>",
                    test: {
                        timeLimit: 300,
                        questions: [
                            {
                                id: 1,
                                text: "Тестовый вопрос?",
                                options: [
                                    { text: "Правильный ответ", correct: true },
                                    { text: "Неправильный ответ", correct: false }
                                ]
                            }
                        ]
                    }
                }
            ];
            console.log('Созданы тестовые данные:', window.lessonsData);
        }
        
        if (!window.progressHistory) {
            window.progressHistory = [];
        }
        
        console.log('Данные проверены. Уроков:', window.lessonsData.length);
    }

    // Настройка навигации
    setupNavigation() {
        console.log('Настройка навигации');
        
        // Обработчик для всех навигационных ссылок
        document.addEventListener('click', (e) => {
            // Навигация в хедере
            if (e.target.closest('.nav-link')) {
                e.preventDefault();
                const link = e.target.closest('.nav-link');
                const page = link.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            }
            
            // Навигация в футере
            if (e.target.closest('.footer-link')) {
                e.preventDefault();
                const link = e.target.closest('.footer-link');
                const page = link.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            }
            
            // Кнопки "Назад" с data-page
            if (e.target.closest('.back-button[data-page]')) {
                e.preventDefault();
                const button = e.target.closest('.back-button[data-page]');
                const page = button.dataset.page;
                if (page) {
                    this.navigateToPage(page);
                }
            }
            
            // Кнопка "Назад из теста" (специальная)
            if (e.target.closest('#back-from-test')) {
                e.preventDefault();
                console.log('Нажата кнопка "Назад из теста"');
                // Возвращаемся на страницу текущего урока
                if (this.currentLessonId) {
                    console.log('Возвращаемся к уроку:', this.currentLessonId);
                    this.openLesson(this.currentLessonId);
                } else {
                    console.log('Текущего урока нет, возвращаемся к урокам');
                    this.navigateToPage('lessons');
                }
            }
            
            // Кнопка "Начать обучение" на главной
            if (e.target.closest('.lesson-button[data-page="lessons"]')) {
                e.preventDefault();
                this.navigateToPage('lessons');
            }
            
            // Карточки уроков (клик по карточке)
            if (e.target.closest('.lesson-card')) {
                const card = e.target.closest('.lesson-card');
                // Игнорируем клик по кнопке внутри карточки
                if (!e.target.closest('.lesson-button')) {
                    const lessonId = parseInt(card.dataset.lessonId);
                    this.openLesson(lessonId);
                }
            }
            
            // Кнопки уроков
            if (e.target.closest('.lesson-button[data-lesson-id]')) {
                e.preventDefault();
                const button = e.target.closest('.lesson-button[data-lesson-id]');
                const lessonId = parseInt(button.dataset.lessonId);
                this.openLesson(lessonId);
            }
        });
    }

    // Навигация между страницами
    navigateToPage(page) {
        console.log('Навигация на страницу:', page);
        
        // Обновляем активную ссылку в навигации
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });

        // Показываем выбранную страницу
        this.showPage(page);
        this.currentPage = page;
        this.currentLessonId = null; // Сбрасываем ID урока при навигации на другие страницы
        
        // Прокручиваем страницу вверх
        window.scrollTo(0, 0);
    }

    // Показать страницу
    showPage(page) {
        console.log('Показ страницы:', page);
        
        // Скрываем все страницы
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Показываем выбранную страницу
        const pageElement = document.getElementById(`${page}-page`);
        if (pageElement) {
            pageElement.classList.remove('hidden');
            
            // Если это страница уроков, обновляем список
            if (page === 'lessons') {
                setTimeout(() => this.renderLessonsList(), 0);
            }
            
            // Если это страница прогресса, обновляем статистику
            if (page === 'progress') {
                setTimeout(() => this.renderProgressPage(), 0);
            }
        } else {
            console.error('Страница не найдена:', page);
        }
    }

    // Рендер списка уроков
    renderLessonsList() {
        console.log('Рендер списка уроков');
        console.log('Данные для рендера:', window.lessonsData);
        
        const lessonsList = document.getElementById('lessons-list');
        if (!lessonsList) {
            console.error('Элемент #lessons-list не найден!');
            return;
        }

        // Очищаем список
        lessonsList.innerHTML = '';

        // Проверяем данные
        if (!window.lessonsData || !Array.isArray(window.lessonsData)) {
            console.error('Нет данных уроков!');
            lessonsList.innerHTML = '<p>Нет данных уроков</p>';
            return;
        }

        // Создаем карточки уроков
        window.lessonsData.forEach(lesson => {
            const lessonCard = this.createLessonCard(lesson);
            lessonsList.appendChild(lessonCard);
        });
        
        console.log('Список уроков отрендерен');
    }

    // Создание карточки урока
    createLessonCard(lesson) {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.dataset.lessonId = lesson.id;
        
        // Определяем текст и класс для кнопки
        let buttonText = 'Начать урок';
        let buttonClass = 'lesson-button';
        
        if (lesson.completed && lesson.testScore !== null) {
            buttonText = `Пройти снова (${lesson.testScore}%)`;
            buttonClass += ' completed';
        }
        
        lessonCard.innerHTML = `
            <div class="lesson-header">
                <div class="lesson-number">Урок ${lesson.id}</div>
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-desc">${lesson.description}</div>
            </div>
            <div class="lesson-body">
                <div class="lesson-stats">
                    <span>${lesson.completed ? '✓ Пройден' : 'Не пройден'}</span>
                    <span>${lesson.test ? lesson.test.questions.length : 0} вопросов</span>
                </div>
                <button class="${buttonClass}" data-lesson-id="${lesson.id}">${buttonText}</button>
            </div>
        `;
        
        return lessonCard;
    }

    // Открыть урок
    openLesson(lessonId) {
        console.log('Открытие урока:', lessonId);
        
        const lesson = window.lessonsData.find(l => l.id === lessonId);
        if (!lesson) {
            console.error('Урок не найден:', lessonId);
            return;
        }

        this.currentLessonId = lessonId;
        this.showLessonPage(lesson);
    }

    // Показать страницу урока
    showLessonPage(lesson) {
        console.log('Показ урока:', lesson.title);
        
        // Скрываем все страницы
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Показываем страницу урока
        const lessonPage = document.getElementById('lesson-page');
        if (lessonPage) {
            lessonPage.classList.remove('hidden');
            
            // Заполняем контент урока
            this.renderLessonContent(lesson);
        }
    }

    // Рендер контента урока
    renderLessonContent(lesson) {
        const contentContainer = document.getElementById('lesson-content-container');
        if (!contentContainer) return;
        
        contentContainer.innerHTML = `
            <h1 class="page-title">Урок ${lesson.id}: ${lesson.title}</h1>
            <div class="lesson-content">
                ${lesson.theory}
            </div>
            <div class="test-container">
                <h2>Тест по уроку</h2>
                <p>Проверьте свои знания, пройдя тест. На тест отводится ${Math.floor(lesson.test.timeLimit / 60)} минут.</p>
                <button class="btn btn-primary" id="start-test-btn" style="margin-top: 1rem;">
                    ${lesson.completed ? `Пройти тест заново (предыдущий результат: ${lesson.testScore}%)` : 'Начать тест'}
                </button>
            </div>
        `;

        // Добавляем обработчик для кнопки начала теста
        const startTestBtn = document.getElementById('start-test-btn');
        if (startTestBtn) {
            startTestBtn.addEventListener('click', () => {
                this.startTest(lesson.id);
            });
        }
    }

    // Начать тест
    startTest(lessonId) {
        console.log('Начало теста для урока:', lessonId);
        
        // Скрываем все страницы
        document.querySelectorAll('.page-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Показываем страницу теста
        const testPage = document.getElementById('test-page');
        if (testPage) {
            testPage.classList.remove('hidden');
            
            // Запускаем тест
            if (window.quizManager) {
                window.quizManager.startTest(lessonId);
            }
        }
    }

    // Рендер страницы прогресса
    renderProgressPage() {
        console.log('Рендер страницы прогресса');
        
        const progressHistory = document.getElementById('progress-history');
        if (!progressHistory) return;
        
        // Расчет статистики
        const completedLessons = window.lessonsData.filter(l => l.completed).length;
        const totalLessons = window.lessonsData.length;
        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        // Средний результат
        const completedWithScore = window.lessonsData.filter(l => l.completed && l.testScore !== null);
        const averageScore = completedWithScore.length > 0 
            ? Math.round(completedWithScore.reduce((sum, l) => sum + l.testScore, 0) / completedWithScore.length)
            : 0;
        
        // Обновляем прогресс в хедере
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Прогресс: ${progressPercentage}%`;
        }
        
        // Обновляем страницу прогресса
        progressHistory.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                <div class="word-card" style="text-align: center;">
                    <div style="font-size: 2rem; color: var(--primary-color); font-weight: 700;">${completedLessons}</div>
                    <div>Пройдено уроков</div>
                </div>
                <div class="word-card" style="text-align: center;">
                    <div style="font-size: 2rem; color: var(--success-color); font-weight: 700;">${averageScore}%</div>
                    <div>Средний результат</div>
                </div>
                <div class="word-card" style="text-align: center;">
                    <div style="font-size: 2rem; color: var(--secondary-color); font-weight: 700;">${window.progressHistory.length}</div>
                    <div>Пройдено тестов</div>
                </div>
            </div>
            
            <h3 style="margin-top: 2rem;">История тестов</h3>
            ${window.progressHistory.length > 0 ? 
                window.progressHistory.map(entry => `
                    <div class="word-card" style="margin-top: 1rem;">
                        <div><strong>Урок ${entry.lessonId}</strong></div>
                        <div>Дата: ${entry.date}</div>
                        <div>Результат: ${entry.score}%</div>
                        <div>Время: ${entry.timeSpent}</div>
                    </div>
                `).join('') : 
                '<p style="margin-top: 1rem; color: var(--gray-color);">Тесты еще не пройдены</p>'
            }
        `;
    }
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM полностью загружен');
    
    // Проверяем загрузку данных
    if (!window.lessonsData) {
        console.warn('Данные уроков не загружены, создаем тестовые...');
        window.lessonsData = [];
    }
    
    // Создаем и запускаем приложение
    window.tokiPonaApp = new TokiPonaApp();
    console.log('Приложение запущено');
});