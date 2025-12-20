import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateOrder.css';

export default function CreateOrder() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: ''
  });

  const [cartItems, setCartItems] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем товары из корзины
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Ошибка при чтении корзины:', error);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Создаем объект заказа
    const order = {
      id: Date.now(),
      items: cartItems,
      customer: form,
      total: totalAmount,
      date: new Date().toISOString(),
      status: 'pending'
    };

    // Имитация отправки заказа
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Сохраняем заказ в localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    // Очищаем корзину
    localStorage.removeItem('cart');
    
    setIsSubmitting(false);
    
    // Перенаправляем на страницу подтверждения
    navigate('/order/success', { 
      state: { 
        orderId: order.id,
        orderTotal: totalAmount,
        customerName: form.name 
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.totalPrice || item.price), 0);

  const deliveryOptions = [
    { value: 'courier', label: '🚚 Курьерская доставка', price: 300 },
    { value: 'pickup', label: '🏪 Самовывоз', price: 0 },
    { value: 'post', label: '📮 Почта России', price: 200 },
    { value: 'express', label: '⚡ Экспресс-доставка (1-2 дня)', price: 500 }
  ];

  const paymentOptions = [
    { value: 'card', label: '💳 Банковская карта онлайн' },
    { value: 'cash', label: '💵 Наличные при получении' },
    { value: 'sbp', label: '📱 СБП (Сбербанк Онлайн)' },
    { value: 'crypto', label: '₿ Криптовалюта (Bitcoin)' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="order-empty-container">
        <div className="order-empty-content">
          <div className="empty-icon">🛒</div>
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте товары, чтобы оформить заказ</p>
          <Link to="/products" className="browse-products-btn">
            Перейти в магазин
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="create-order-container">
      <div className="order-header">
        <h1 className="order-title">🚀 Оформление заказа</h1>
        <p className="order-subtitle">Заполните форму для завершения покупки</p>
      </div>

      <div className="order-content">
        <div className="order-form-section">
          <form onSubmit={handleSubmit} className="order-form">
            
            {/* Личная информация */}
            <div className="form-section">
              <h3 className="section-title">👤 Контактная информация</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">ФИО *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Илон Маск"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (900) 123-45-67"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="elon@spacex.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Адрес доставки */}
            <div className="form-section">
              <h3 className="section-title">📍 Адрес доставки</h3>
              <div className="form-group">
                <label htmlFor="address">Полный адрес *</label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="ул. Космонавтов, д. 42, кв. 108"
                  rows="3"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Способ доставки */}
            <div className="form-section">
              <h3 className="section-title">🚚 Способ доставки</h3>
              <div className="delivery-options">
                {deliveryOptions.map(option => (
                  <label key={option.value} className="delivery-option">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value={option.value}
                      checked={form.deliveryMethod === option.value}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <div className="option-content">
                      <span className="option-label">{option.label}</span>
                      {option.price > 0 && (
                        <span className="option-price">+{option.price} ₽</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Способ оплаты */}
            <div className="form-section">
              <h3 className="section-title">💳 Способ оплаты</h3>
              <div className="payment-options">
                {paymentOptions.map(option => (
                  <label key={option.value} className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={form.paymentMethod === option.value}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    <span className="option-label">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Комментарий к заказу */}
            <div className="form-section">
              <h3 className="section-title">📝 Комментарий к заказу</h3>
              <div className="form-group">
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Дополнительные пожелания, время доставки и т.д."
                  rows="4"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-actions">
              <Link to="/basket" className="back-to-cart-btn">
                ← Вернуться в корзину
              </Link>
              <button 
                type="submit" 
                className="submit-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Оформление...
                  </>
                ) : (
                  '🚀 Подтвердить заказ'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Боковая панель с информацией о заказе */}
        <div className="order-summary-section">
          <div className="order-summary-card">
            <h3 className="summary-title">📋 Ваш заказ</h3>
            
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image-small">{item.image}</div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-quantity">× {item.quantity || 1}</div>
                  </div>
                  <div className="item-price">
                    {(item.totalPrice || item.price).toLocaleString()} ₽
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Товаров ({totalItems} шт.):</span>
                <span>{cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toLocaleString()} ₽</span>
              </div>
              
              <div className="total-row">
                <span>Доставка:</span>
                <span>
                  {deliveryOptions.find(d => d.value === form.deliveryMethod)?.price || 0} ₽
                </span>
              </div>
              
              <div className="total-row final-total">
                <span>Итого к оплате:</span>
                <span>
                  {(totalAmount + (deliveryOptions.find(d => d.value === form.deliveryMethod)?.price || 0)).toLocaleString()} ₽
                </span>
              </div>
            </div>

            <div className="order-help">
              <p>📞 После оформления заказа с вами свяжется наш менеджер для подтверждения</p>
              <p>⏱️ Время обработки заказа: 1-2 часа</p>
              <p>🔄 Возврат товара возможен в течение 14 дней</p>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="order-info-card">
            <h4>ℹ️ Информация о заказе</h4>
            <div className="info-item">
              <span className="info-label">Номер заказа:</span>
              <span className="info-value">#{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Дата заказа:</span>
              <span className="info-value">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Статус:</span>
              <span className="info-value status-pending">Ожидает подтверждения</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}