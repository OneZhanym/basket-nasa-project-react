import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactsPage.css';

const ContactsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Вопрос по проекту',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = {
    email: 'contact@nasa-explorer.space',
    phone: '+1 (555) NASA-EXP',
    address: 'Virtual Space Station, Earth Orbit',
    workingHours: 'Пн-Пт: 9:00-18:00 (UTC)'
  };

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/NASAExplorerApp', color: '#1DA1F2' },
    { name: 'GitHub', icon: '💻', url: 'https://github.com/yourusername/nasa-explorer', color: '#333' },
    { name: 'Discord', icon: '🎮', url: 'https://discord.gg/nasa-explorer', color: '#7289DA' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com/c/NASAExplorer', color: '#FF0000' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com/nasa_explorer_app', color: '#E4405F' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Очистка формы после успешной отправки
    setFormData({
      name: '',
      email: '',
      subject: 'Вопрос по проекту',
      message: ''
    });
    
    // Автоматическое скрытие сообщения об успехе через 5 секунд
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="contacts-page">
      <div className="contacts-header">
        <h1 className="contacts-title">📡 Связь с NASA Explorer</h1>
        <p className="contacts-subtitle">
          Мы всегда на связи! Задавайте вопросы, делитесь идеями или просто поздоровайтесь 👋
        </p>
      </div>

      <div className="contacts-container">
        <div className="contacts-info-card">
          <div className="info-section">
            <h3 className="info-title">📍 Наш космический адрес</h3>
            <div className="info-item">
              <span className="info-icon">🏢</span>
              <div>
                <strong>Виртуальная штаб-квартира</strong>
                <p>{contactInfo.address}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <strong>Часы связи</strong>
                <p>{contactInfo.workingHours}</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="info-title">📞 Прямые каналы связи</h3>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <strong>Электронная почта</strong>
                <a href={`mailto:${contactInfo.email}`} className="contact-link">
                  {contactInfo.email}
                </a>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📱</span>
              <div>
                <strong>Космическая связь</strong>
                <a href={`tel:${contactInfo.phone}`} className="contact-link">
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="info-title">🌐 Социальные орбиты</h3>
            <div className="social-grid">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                  style={{ '--social-color': social.color }}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-name">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="info-section emergency-section">
            <h3 className="info-title">🚨 Экстренная связь</h3>
            <p className="emergency-text">
              Для технических сбоев или критических проблем используйте:
            </p>
            <button className="emergency-btn">
              🚀 Экстренный канал связи
            </button>
          </div>
        </div>

        <div className="contacts-form-card">
          <h3 className="form-title">📝 Форма обратной связи</h3>
          
          {isSubmitted && (
            <div className="success-message">
              ✅ Сообщение успешно отправлено! Мы ответим вам в ближайшее время.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Ваше имя *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Илон Маск"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="elon@spacex.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Тема сообщения</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="Вопрос по проекту">Вопрос по проекту</option>
                <option value="Техническая проблема">Техническая проблема</option>
                <option value="Предложение сотрудничества">Предложение сотрудничества</option>
                <option value="Отзыв о приложении">Отзыв о приложении</option>
                <option value="Другое">Другое</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Сообщение *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Опишите ваш вопрос или предложение..."
                rows="6"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-footer">
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Отправка...
                  </>
                ) : (
                  '🚀 Отправить сообщение'
                )}
              </button>
              
              <p className="form-note">
                * Обязательные поля. Отвечаем в течение 24 земных часов.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="contacts-extra">
        <div className="extra-card">
          <h4>📡 Прямой радиоканал</h4>
          <p>Частота: 437.800 MHz</p>
          <small>Для радиолюбителей и экспериментаторов</small>
        </div>
        
        <div className="extra-card">
          <h4>🛰️ Статус связи</h4>
          <p className="status-online">● Онлайн</p>
          <small>Связь с ЦУПом установлена</small>
        </div>
        
        <div className="extra-card">
          <h4>🌍 Временные зоны</h4>
          <p>Основной: UTC</p>
          <small>Работаем по космическому времени</small>
        </div>
      </div>

      <div className="contacts-actions">
        <button onClick={handleBackToHome} className="back-btn">
          ← На главную
        </button>
      </div>
    </div>
  );
};

export default ContactsPage;