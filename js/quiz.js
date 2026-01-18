// Модуль для управления тестами
class QuizManager {
    constructor() {
        this.currentTest = null;
        this.currentLessonId = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timerInterval = null;
        this.timeLeft = 0;
        this.testStarted = false;
    }

    // Запуск теста
    startTest(lessonId) {
        console.log('QuizManager: Запуск теста для урока', lessonId);
        
        const lesson = window.lessonsData.find(l => l.id === lessonId);
        if (!lesson) {
            console.error('Урок не найден');
            return;
        }

        this.currentTest = lesson.test;
        this.currentLessonId = lessonId;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timeLeft = lesson.test.timeLimit;
        this.testStarted = true;

        // Обновляем интерфейс
        this.renderTest();
        this.startTimer();
    }

    // Запуск таймера
    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.finishTest();
            } else if (this.timeLeft <= 60) {
                // Меняем цвет таймера при остатке менее 1 минуты
                const timerElement = document.querySelector('.timer');
                if (timerElement) {
                    timerElement.classList.add('warning');
                }
            }
        }, 1000);
    }

    // Обновление отображения таймера
    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timerElement = document.getElementById('timer-display');
        
        if (timerElement) {
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    // Отображение текущего вопроса
    renderQuestion() {
        if (!this.currentTest || this.currentQuestionIndex >= this.currentTest.questions.length) {
            return;
        }

        const question = this.currentTest.questions[this.currentQuestionIndex];
        const questionCounter = document.getElementById('question-counter');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');

        if (questionCounter) {
            questionCounter.textContent = `Вопрос ${this.currentQuestionIndex + 1} из ${this.currentTest.questions.length}`;
        }

        if (questionText) {
            questionText.textContent = question.text;
        }

        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option.text;
                optionElement.dataset.index = index;
                
                // Проверяем, был ли уже выбран этот вариант
                const userAnswer = this.userAnswers[this.currentQuestionIndex];
                if (userAnswer !== undefined && userAnswer === index) {
                    optionElement.classList.add('selected');
                }
                
                optionElement.addEventListener('click', () => this.selectOption(index));
                optionsContainer.appendChild(optionElement);
            });
        }

        // Обновляем состояние кнопок навигации
        this.updateNavigationButtons();
    }

    // Выбор варианта ответа
    selectOption(optionIndex) {
        // Снимаем выделение со всех вариантов
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        
        // Выделяем выбранный вариант
        options[optionIndex].classList.add('selected');
        
        // Сохраняем ответ пользователя
        this.userAnswers[this.currentQuestionIndex] = optionIndex;
        
    }

    // Обновление кнопок навигации
    updateNavigationButtons() {
        const prevButton = document.getElementById('prev-question');
        const nextButton = document.getElementById('next-question');
        
        if (prevButton) {
            prevButton.disabled = this.currentQuestionIndex === 0;
        }
        
        if (nextButton) {
            const isLastQuestion = this.currentQuestionIndex === this.currentTest.questions.length - 1;
            nextButton.textContent = isLastQuestion ? 'Завершить тест' : 'Следующий вопрос';
        }
    }

    // Переход к следующему вопросу
    nextQuestion() {
        if (this.currentQuestionIndex < this.currentTest.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
        } else {
            this.finishTest();
        }
    }

    // Переход к предыдущему вопросу
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
        }
    }

    // Завершение теста
    finishTest() {
        console.log('QuizManager: Завершение теста');
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        this.calculateScore();
        this.showResults();
        
        // Сохраняем результат в localStorage
        this.saveTestResult();
    }

    // Расчет результатов
    calculateScore() {
        this.score = 0;
        
        this.currentTest.questions.forEach((question, index) => {
            const userAnswerIndex = this.userAnswers[index];
            
            if (userAnswerIndex !== undefined && question.options[userAnswerIndex].correct) {
                this.score++;
            }
        });
        
        // Перевод в проценты
        this.score = Math.round((this.score / this.currentTest.questions.length) * 100);
        console.log('Результат теста:', this.score + '%');
    }

    // Сохранение результатов теста
    saveTestResult() {
        console.log('Сохранение результатов теста для урока', this.currentLessonId);
        
        // Получаем текущий урок
        const lessonIndex = window.lessonsData.findIndex(l => l.id === this.currentLessonId);
        
        if (lessonIndex !== -1) {
            // Обновляем данные урока
            const lesson = window.lessonsData[lessonIndex];
            lesson.completed = true;
            lesson.testScore = this.score;
            
            console.log('Обновлен урок:', lesson);
            
            // Добавляем в историю
            const historyEntry = {
                lessonId: this.currentLessonId,
                date: new Date().toISOString().split('T')[0],
                score: this.score,
                timeSpent: this.formatTimeSpent(this.currentTest.timeLimit - this.timeLeft)
            };
            
            window.progressHistory.push(historyEntry);
            
            // Сохраняем в localStorage
            this.saveToLocalStorage();
            
            // Обновляем прогресс в интерфейсе
            this.updateProgress();
        }
    }

    // Форматирование времени
    formatTimeSpent(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Сохранение в localStorage
    saveToLocalStorage() {
        const userProgress = {
            lessons: window.lessonsData,
            history: window.progressHistory,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('tokiPonaProgress', JSON.stringify(userProgress));
        console.log('Прогресс сохранен в localStorage');
    }

    // Обновление прогресса в интерфейсе
    updateProgress() {
        console.log('Обновление прогресса в интерфейсе');
        
        // Обновляем прогресс в хедере
        const completedLessons = window.lessonsData.filter(l => l.completed).length;
        const totalLessons = window.lessonsData.length;
        const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Прогресс: ${progressPercentage}%`;
        }
        
        console.log('Прогресс обновлен:', progressPercentage + '%');
    }

    // Отображение результатов
    showResults() {
        console.log('Показ результатов теста');
        
        const testContainer = document.getElementById('test-container');
        if (!testContainer) return;

        testContainer.innerHTML = `
            <div class="results-container">
                <h2>Тест завершен!</h2>
                <div class="results-score">${this.score}%</div>
                <div class="results-message">
                    ${this.getResultMessage(this.score)}
                </div>
                
                <div class="results-details">
                    <h3>Детали результатов</h3>
                    ${this.generateMistakesList()}
                </div>
                
                <div class="test-controls" style="justify-content: center; gap: 1rem; margin-top: 2rem;">
                    <button class="btn btn-secondary" id="review-test">Просмотреть тест</button>
                    <button class="btn btn-primary" id="back-to-lessons">Вернуться к урокам</button>
                </div>
            </div>
        `;

        // Добавляем обработчики событий
        document.getElementById('review-test').addEventListener('click', () => {
            this.showTestReview();
        });

        document.getElementById('back-to-lessons').addEventListener('click', () => {
            console.log('Возврат к урокам из результатов');
            if (window.tokiPonaApp) {
                window.tokiPonaApp.navigateToPage('lessons');
            }
        });
    }

    // Получение сообщения в зависимости от результата
    getResultMessage(score) {
        if (score >= 90) return 'Отличный результат! Вы отлично усвоили материал.';
        if (score >= 70) return 'Хороший результат! Вы хорошо усвоили материал.';
        if (score >= 50) return 'Удовлетворительный результат. Рекомендуем повторить материал.';
        return 'Рекомендуем изучить материал еще раз и пройти тест заново.';
    }

    // Генерация списка ошибок
    generateMistakesList() {
        let mistakesHtml = '';
        
        this.currentTest.questions.forEach((question, index) => {
            const userAnswerIndex = this.userAnswers[index];
            const isCorrect = userAnswerIndex !== undefined && question.options[userAnswerIndex].correct;
            
            if (!isCorrect) {
                const correctAnswer = question.options.find(opt => opt.correct);
                const userAnswer = userAnswerIndex !== undefined ? question.options[userAnswerIndex].text : 'Нет ответа';
                
                mistakesHtml += `
                    <div class="mistake-item">
                        <p><strong>Вопрос ${index + 1}:</strong> ${question.text}</p>
                        <p><strong>Ваш ответ:</strong> ${userAnswer}</p>
                        <p><strong>Правильный ответ:</strong> <span class="correct-answer">${correctAnswer.text}</span></p>
                    </div>
                `;
            }
        });

        if (mistakesHtml === '') {
            return '<p>Поздравляем! Вы ответили правильно на все вопросы.</p>';
        }

        return mistakesHtml;
    }

    // Просмотр теста с правильными ответами
    showTestReview() {
        console.log('Показ просмотра теста');
        
        const testContainer = document.getElementById('test-container');
        if (!testContainer) return;

        let reviewHtml = `
            <div class="test-header">
                <h2>Просмотр теста</h2>
                <div class="question-counter">Правильные ответы выделены зеленым</div>
            </div>
        `;

        this.currentTest.questions.forEach((question, qIndex) => {
            const userAnswerIndex = this.userAnswers[qIndex];
            const isCorrect = userAnswerIndex !== undefined && question.options[userAnswerIndex].correct;
            
            reviewHtml += `
                <div class="question-container" style="margin-bottom: 2rem; padding: 1rem; background-color: #f8f9fa; border-radius: 8px;">
                    <div class="question-text" style="font-weight: 600; margin-bottom: 1rem;">${qIndex + 1}. ${question.text}</div>
                    <div class="options-container">
            `;

            question.options.forEach((option, oIndex) => {
                let optionClass = 'option';
                
                if (option.correct) {
                    optionClass += ' correct';
                } else if (userAnswerIndex === oIndex && !option.correct) {
                    optionClass += ' incorrect';
                } else if (userAnswerIndex === oIndex) {
                    optionClass += ' selected';
                }
                
                reviewHtml += `<div class="${optionClass}">${option.text}</div>`;
            });

            reviewHtml += `
                    </div>
                    <div style="margin-top: 1rem; padding: 0.5rem; background-color: ${isCorrect ? '#d4edda' : '#f8d7da'}; border-radius: 5px;">
                        <strong>${isCorrect ? '✓ Правильно' : '✗ Неправильно'}</strong>
                    </div>
                </div>
            `;
        });

        reviewHtml += `
            <div class="test-controls" style="justify-content: center;">
                <button class="btn btn-primary" id="back-to-results">Назад к результатам</button>
            </div>
        `;

        testContainer.innerHTML = reviewHtml;

        document.getElementById('back-to-results').addEventListener('click', () => {
            this.showResults();
        });
    }

    // Рендер всего теста
    renderTest() {
        console.log('Рендер теста');
        
        const testContainer = document.getElementById('test-container');
        if (!testContainer || !this.currentTest) return;

        testContainer.innerHTML = `
            <div class="test-header">
                <h2>Тестирование</h2>
                <div class="timer">
                    <i class="fas fa-clock"></i>
                    <span id="timer-display">${Math.floor(this.timeLeft / 60).toString().padStart(2, '0')}:${(this.timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
                <div class="question-counter" id="question-counter">Вопрос 1 из ${this.currentTest.questions.length}</div>
            </div>
            
            <div class="question-container">
                <div class="question-text" id="question-text"></div>
                <div class="options-container" id="options-container"></div>
            </div>
            
            <div class="test-controls">
                <button class="btn btn-secondary" id="prev-question">Предыдущий вопрос</button>
                <button class="btn btn-primary" id="next-question">Следующий вопрос</button>
            </div>
        `;

        this.renderQuestion();

        // Добавляем обработчики событий
        document.getElementById('prev-question').addEventListener('click', () => {
            this.prevQuestion();
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });
    }

    // Инициализация теста из localStorage
    initFromLocalStorage() {
        console.log('Инициализация из localStorage');
        
        const savedProgress = localStorage.getItem('tokiPonaProgress');
        
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                console.log('Найден сохраненный прогресс:', progress);
                
                // Обновляем данные уроков
                if (progress.lessons && Array.isArray(progress.lessons)) {
                    progress.lessons.forEach((savedLesson, index) => {
                        if (window.lessonsData[index]) {
                            window.lessonsData[index].completed = savedLesson.completed || false;
                            window.lessonsData[index].testScore = savedLesson.testScore !== undefined ? savedLesson.testScore : null;
                            console.log(`Урок ${index + 1}: completed=${window.lessonsData[index].completed}, score=${window.lessonsData[index].testScore}`);
                        }
                    });
                }
                
                // Обновляем историю
                if (progress.history && Array.isArray(progress.history)) {
                    window.progressHistory.length = 0;
                    window.progressHistory.push(...progress.history);
                }
                
                this.updateProgress();
            } catch (error) {
                console.error('Ошибка при загрузке прогресса:', error);
            }
        } else {
            console.log('Сохраненный прогресс не найден, начинаем с нуля');
        }
    }
}

// Создаем глобальный экземпляр менеджера тестов
window.quizManager = new QuizManager();

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuizManager;
}