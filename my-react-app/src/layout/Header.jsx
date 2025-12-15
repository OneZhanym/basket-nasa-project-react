import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuth');
        setIsAuth(!!authStatus);
        
        const handleStorageChange = () => {
            const authStatus = localStorage.getItem('isAuth');
            setIsAuth(!!authStatus);
        };
        
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuth');
        setIsAuth(false);
        navigate('/login');
    };

    return (
        <header className="header">
            <h2 className="header-logo">🌌 NASA Explorer</h2>
            <nav className="nav">
                <Link to='/'>Космические снимки</Link>
                <Link to='/products'>🛍️ Магазин</Link>
                <Link to='/basket'>🛒 Корзина</Link>
                <Link to='#'>Миссии</Link>
                <Link to='#'>О NASA</Link>
                
                {isAuth ? (
                    <>
                        <Link to='/profile' className="profile-link">👤 Профиль</Link>
                        <button onClick={handleLogout} className="logout-btn-header">
                            🔓 Выйти
                        </button>
                    </>
                ) : (
                    <>
                        <Link to='/login' className="login-link">🔑 Войти</Link>
                        <Link to='/register' className="register-link">📝 Регистрация</Link>
                    </>
                )}
            </nav>
        </header>
    );
}