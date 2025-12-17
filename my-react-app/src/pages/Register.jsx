import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/u;
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Имя обязательно';
        } else if (formData.firstName.length < 2) {
            newErrors.firstName = 'Имя должно содержать минимум 2 символа';
        } else if (!nameRegex.test(formData.firstName)) {
            newErrors.firstName = 'Имя содержит недопустимые символы';
        }
        
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Фамилия обязательна';
        } else if (formData.lastName.length < 2) {
            newErrors.lastName = 'Фамилия должна содержать минимум 2 символа';
        } else if (!nameRegex.test(formData.lastName)) {
            newErrors.lastName = 'Фамилия содержит недопустимые символы';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Введите корректный email';
        }
        
        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Подтвердите пароль';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        
        return newErrors;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        const user = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            registrationDate: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        alert('Регистрация успешна! Теперь войдите в аккаунт.');
        navigate('/login');
    };
    
    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h1>🚀 Регистрация в NASA Explorer</h1>
                
                <div className="form-row">
                    <div className="input-group half">
                        <label htmlFor="firstName">Имя *</label>
                        <input 
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Имя"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName ? 'error' : ''}
                        />
                        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>
                    
                    <div className="input-group half">
                        <label htmlFor="lastName">Фамилия *</label>
                        <input 
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Фамилия"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName ? 'error' : ''}
                        />
                        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>
                </div>
                
                <div className="input-group">
                    <label htmlFor="email">Email *</label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                
                <div className="form-row">
                    <div className="input-group half">
                        <label htmlFor="password">Пароль *</label>
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Минимум 6 символов"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                        />
                        <div className="password-strength">
                            <div className="strength-bar">
                                <div className="strength-fill" style={{
                                    width: `${Math.min(100, formData.password.length * 20)}%`,
                                    background: formData.password.length >= 6 ? '#27ae60' : 
                                               formData.password.length >= 4 ? '#f39c12' : '#e74c3c'
                                }}></div>
                            </div>
                            <span>
                                {formData.password.length >= 6 ? '✓ Надежный' : 
                                 formData.password.length >= 4 ? '⚠️ Средний' : '✗ Слабый'}
                            </span>
                        </div>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    
                    <div className="input-group half">
                        <label htmlFor="confirmPassword">Подтверждение пароля *</label>
                        <input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Повторите пароль"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                            <span className="success-text">✓ Пароли совпадают</span>
                        )}
                    </div>
                </div>
                
                <div className="form-terms">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                        Я согласен с <a href="#">условиями использования</a> и <a href="#">политикой конфиденциальности</a> NASA Explorer
                    </label>
                </div>
                
                <button className="register-button" type="submit">
                    🚀 Зарегистрироваться
                </button>
                
                <div className="login-link">
                    Уже есть аккаунт? <Link to="/login">Войти в систему</Link>
                </div>
            </form>
        </div>
    );
}