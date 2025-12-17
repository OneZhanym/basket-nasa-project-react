import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');
        if (!isAuth) {
            navigate('/login');
        } else {
            const savedUser = JSON.parse(localStorage.getItem('user'));
            setUser(savedUser);
        }
    }, [navigate]);
    
    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
    };
    
    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <div className="loading">Загрузка профиля...</div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">Профиль космического исследователя</h1>
                
                <div className="user-avatar">
                    <span>{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</span>
                </div>
                
                <div className="user-info">
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">👤 Полное имя</span>
                            <span className="info-value">{user.firstName} {user.lastName}</span>
                        </div>
                        
                        <div className="info-item">
                            <span className="info-label">📧 Email</span>
                            <span className="info-value">{user.email}</span>
                        </div>
                        
                        <div className="info-item">
                            <span className="info-label">🚀 Статус</span>
                            <span className="info-value">
                                <span className="badge">Космический исследователь</span>
                            </span>
                        </div>
                        
                        <div className="info-item">
                            <span className="info-label">📅 Дата регистрации</span>
                            <span className="info-value">
                                {user.registrationDate ? 
                                    new Date(user.registrationDate).toLocaleDateString('ru-RU') : 
                                    new Date().toLocaleDateString('ru-RU')}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="success-message">
                    <p>Авторизация прошла успешно! Добро пожаловать в NASA Explorer</p>
                </div>
                
                <button className="logout-button" onClick={logout}>
                    Выйти из аккаунта
                </button>
            </div>
        </div>
    );
}