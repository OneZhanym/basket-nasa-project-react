import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        
        if (password.length < 6) {
            alert('Пароль должен быть не менее 6 символов');
            return;
        }
        
        const user = { email, password };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Регистрация успешна! Теперь войдите в аккаунт.');
        navigate('/login');
    };
    
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h1>Регистрация</h1>
                
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
                        minLength="6"
                    />
                    <div className="password-strength">
                        <div className="strength-bar">
                            <div className="strength-fill" style={{
                                width: `${Math.min(100, password.length * 20)}%`,
                                background: password.length >= 6 ? '#27ae60' : '#e74c3c'
                            }}></div>
                        </div>
                        <span>{password.length >= 6 ? '✓ Надежный' : 'Слишком короткий'}</span>
                    </div>
                </div>
                
                <button className="register-button" type="submit">Зарегистрироваться</button>
                
                <div className="login-link">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </form>
        </div>
    );
}