import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
        const userInfo = {
            isAuth: true,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('isAuth', 'true');
        window.dispatchEvent(new Event('storage'));
        navigate('/profile');
    } else {
        setError('Неверный email или пароль');
    }
};
    
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1>Авторизация</h1>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="input-group">
                    <input 
                        type="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="input-group">
                    <input 
                        type="password"
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                
                <button className="login-button" type="submit">Войти</button>
                
                <div className="register-link">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </div>
            </form>
        </div>
    );
}