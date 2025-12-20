import { useLocation, Link } from 'react-router-dom';
import './OrderSuccess.css';

export default function OrderSuccess() {
  const location = useLocation();
  const { orderId, orderTotal, customerName } = location.state || {
    orderId: '12345678',
    orderTotal: 0,
    customerName: 'Клиент'
  };

  const orderDetails = [
    { label: 'Номер заказа', value: `#${orderId}` },
    { label: 'Сумма заказа', value: `${orderTotal.toLocaleString()} ₽` },
    { label: 'Статус', value: '✅ Принят в обработку' },
    { label: 'Дата оформления', value: new Date().toLocaleDateString() },
    { label: 'Примерное время доставки', value: '1-3 рабочих дня' }
  ];

  return (
    <div className="order-success-container">
      <div className="success-content">
        <div className="success-icon">🚀</div>
        
        <h1 className="success-title">Заказ успешно оформлен!</h1>
        
        <p className="success-message">
          Спасибо, {customerName}! Ваш заказ принят в обработку.
          Информация о заказе отправлена на указанный email.
        </p>
        
        <div className="order-details">
          <h3>Детали заказа:</h3>
          {orderDetails.map((detail, index) => (
            <div key={index} className="detail-row">
              <span className="detail-label">{detail.label}:</span>
              <span className="detail-value">{detail.value}</span>
            </div>
          ))}
        </div>
        
        <div className="next-steps">
          <h3>Что дальше?</h3>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <p>Наш менеджер свяжется с вами для подтверждения заказа</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>Вы получите уведомление об отправке заказа</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>Трек-номер для отслеживания будет отправлен на email</p>
            </div>
          </div>
        </div>
        
        <div className="success-actions">
          <Link to="/products" className="continue-shopping-btn">
            🛒 Продолжить покупки
          </Link>
          <Link to="/profile/orders" className="view-orders-btn">
            📋 Мои заказы
          </Link>
        </div>
        
        <div className="success-help">
          <p>📞 По любым вопросам: <strong>+7 (800) NASA-EXP</strong></p>
          <p>📧 Или напишите нам: <strong>support@nasa-explorer.space</strong></p>
        </div>
      </div>
    </div>
  );
}