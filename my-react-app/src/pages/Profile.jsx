import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './Profile.css';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth');
        if (!isAuth){
            navigate('/login');
        }
    }, [navigate])
    
    const logout = () => {
        localStorage.removeItem('isAuth');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
    }
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1 className="profile-title">Профиль пользователя</h1>
                <div className="success-message">
                    <p>✅ Авторизация прошла успешно</p>
                </div>
                <button className="logout-button" onClick={logout}>Выйти из аккаунта</button>
            </div>
        </div>
    )
}