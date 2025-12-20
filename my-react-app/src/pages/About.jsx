import './About.css';

export default function About() {
    return (
        <div className="about-container">
            <div className="about-hero">
                <h1 className="about-title">🚀 О NASA Explorer</h1>
                <p className="about-subtitle">Образовательная платформа для исследования космоса</p>
            </div>
            
            <div className="about-content">
                <section className="project-section">
                    <div className="project-card">
                        <div className="project-icon">🌠</div>
                        <h2>О проекте</h2>
                        <p className="project-description">
                            NASA Explorer — это индивидуальный образовательный проект, созданный для демонстрации 
                            возможностей веб-разработки. Платформа представляет собой интерактивный ресурс с космической 
                            тематикой, использующий статические данные о космических объектах для образовательных целей.
                        </p>
                    </div>
                </section>
                
                <section className="creator-section">
                    <h2 className="section-title">👨‍💻 Создатель проекта - Каряка Никита</h2>
                    <div className="creator-card">
                        <div className="creator-avatar">👨‍🚀</div>
                        <div className="creator-info">
                            <h3>Индивидуальный проект</h3>
                            <p className="creator-bio">
                                Этот проект был разработан самостоятельно для демонстрации навыков веб-разработки. 
                                NASA Explorer включает в себя полный набор функций современного веб-приложения: 
                                систему регистрации, личный кабинет, интерактивный контент и адаптивный дизайн.
                            </p>
                            <div className="creator-skills">
                                <span className="skill-badge">React</span>
                                <span className="skill-badge">JavaScript</span>
                                <span className="skill-badge">CSS3</span>
                                <span className="skill-badge">HTML5</span>
                                <span className="skill-badge">React Router</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="features-section">
                    <h2 className="section-title">✨ Особенности платформы</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🛰️</div>
                            <h3>Космические снимки</h3>
                            <p>Галерея статических изображений космических объектов с описаниями</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>Образовательный контент</h3>
                            <p>Информационные материалы о планетах и космических явлениях</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🛍️</div>
                            <h3>Виртуальный магазин</h3>
                            <p>Демонстрационная система корзины и заказов</p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🔐</div>
                            <h3>Личный кабинет</h3>
                            <p>Полноценная система регистрации и авторизации пользователей</p>
                        </div>
                    </div>
                </section>
                
                <section className="technologies-section">
                    <h2 className="section-title">⚙️ Используемые технологии</h2>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <div className="tech-icon">⚛️</div>
                            <h4>React</h4>
                            <p>Библиотека для построения пользовательского интерфейса</p>
                        </div>
                        
                        <div className="tech-item">
                            <div className="tech-icon">🎨</div>
                            <h4>CSS3 + Анимации</h4>
                            <p>Современные стили, градиенты и CSS-анимации</p>
                        </div>
                        
                        <div className="tech-item">
                            <div className="tech-icon">🔄</div>
                            <h4>React Router</h4>
                            <p>Навигация между страницами приложения</p>
                        </div>
                        
                        <div className="tech-item">
                            <div className="tech-icon">📱</div>
                            <h4>Адаптивный дизайн</h4>
                            <p>Оптимизация для мобильных устройств и планшетов</p>
                        </div>
                    </div>
                </section>
                
                <section className="data-section">
                    <div className="data-card">
                        <h2>📊 Источники данных</h2>
                        <p>
                            Проект использует статические образовательные данные о космических объектах. 
                            Все изображения и описания представлены в демонстрационных целях.
                        </p>
                        <div className="data-sources">
                            <div className="source-item">
                                <span className="source-icon">📷</span>
                                <span>Изображения: Открытые образовательные ресурсы</span>
                            </div>
                            <div className="source-item">
                                <span className="source-icon">📖</span>
                                <span>Описания: Образовательная информация о космосе</span>
                            </div>
                            <div className="source-item">
                                <span className="source-icon">🎯</span>
                                <span>Проект создан в образовательных целях</span>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="purpose-section">
                    <div className="purpose-card">
                        <h2>🎯 Цели проекта</h2>
                        <div className="purpose-list">
                            <div className="purpose-item">
                                <span className="purpose-check">✅</span>
                                <span>Создать полнофункциональное веб-приложение на React</span>
                            </div>
                            <div className="purpose-item">
                                <span className="purpose-check">✅</span>
                                <span>Реализовать систему регистрации и авторизации</span>
                            </div>
                            <div className="purpose-item">
                                <span className="purpose-check">✅</span>
                                <span>Разработать адаптивный дизайн с космической тематикой</span>
                            </div>
                            <div className="purpose-item">
                                <span className="purpose-check">✅</span>
                                <span>Создать демонстрационную систему корзины и заказов</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}