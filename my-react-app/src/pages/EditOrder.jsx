import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './EditOrder.css';

export default function EditOrder() {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Форма редактирования
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comment: ''
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id.toString() === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
      setForm({
        name: foundOrder.customer.name,
        phone: foundOrder.customer.phone,
        email: foundOrder.customer.email || '',
        address: foundOrder.customer.address,
        deliveryMethod: foundOrder.customer.deliveryMethod || 'courier',
        paymentMethod: foundOrder.customer.paymentMethod || 'card',
        comment: foundOrder.customer.comment || ''
      });
    } else if (location.state?.order) {
      setOrder(location.state.order);
      setForm({
        name: location.state.order.customer.name,
        phone: location.state.order.customer.phone,
        email: location.state.order.customer.email || '',
        address: location.state.order.customer.address,
        deliveryMethod: location.state.order.customer.deliveryMethod || 'courier',
        paymentMethod: location.state.order.customer.paymentMethod || 'card',
        comment: location.state.order.customer.comment || ''
      });
    }
  }, [orderId, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Обновляем заказ
    const updatedOrder = {
      ...order,
      customer: form,
      updatedAt: new Date().toISOString()
    };
    
    // Сохраняем изменения
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = orders.map(o => 
      o.id === order.id ? updatedOrder : o
    );
    
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    navigate('/orders', { state: { message: 'Заказ успешно обновлен!' } });
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: '🚀 Новый товар',
      description: 'Добавленный товар',
      price: 1000,
      image: '🆕',
      quantity: 1
    };
    
    setOrder(prev => ({
      ...prev,
      items: [...prev.items, newItem],
      total: prev.total + 1000
    }));
  };

  const handleRemoveItem = (itemId) => {
    const itemToRemove = order.items.find(item => item.id === itemId);
    const updatedItems = order.items.filter(item => item.id !== itemId);
    
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      total: prev.total - (itemToRemove.price * (itemToRemove.quantity || 1))
    }));
  };

  const handleUpdateQuantity = (itemId, delta) => {
    const updatedItems = order.items.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, (item.quantity || 1) + delta);
        const priceChange = (newQuantity - (item.quantity || 1)) * item.price;
        
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: item.price * newQuantity
        };
      }
      return item;
    });
    
    const newTotal = updatedItems.reduce((sum, item) => 
      sum + (item.price * (item.quantity || 1)), 0
    );
    
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      total: newTotal
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!order) {
    return (
      <div className="order-not-found">
        <h2>Заказ не найден</h2>
        <p>Заказ с ID #{orderId} не существует или был удален.</p>
        <button onClick={() => navigate('/orders')}>Вернуться к заказам</button>
      </div>
    );
  }

  const deliveryOptions = [
    { value: 'courier', label: '🚚 Курьерская доставка', price: 300 },
    { value: 'pickup', label: '🏪 Самовывоз', price: 0 },
    { value: 'post', label: '📮 Почта России', price: 200 },
    { value: 'express', label: '⚡ Экспресс-доставка', price: 500 }
  ];

  const paymentOptions = [
    { value: 'card', label: '💳 Банковская карта' },
    { value: 'cash', label: '💵 Наличные при получении' },
    { value: 'sbp', label: '📱 СБП' },
    { value: 'crypto', label: '₿ Криптовалюта' }
  ];

  return (
    <div className="edit-order-container">
      <div className="edit-order-header">
        <h1>✎ Редактирование заказа #{order.id.toString().slice(-6)}</h1>
        <p>Обновите информацию о заказе и товарах</p>
      </div>

      <div className="edit-order-content">
        {/* Левая колонка: Форма редактирования */}
        <div className="edit-form-section">
          <form onSubmit={handleSubmit} className="edit-order-form">
            
            <div className="form-section">
              <h3 className="section-title">👤 Контактная информация</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>ФИО *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    disabled={isSaving}
                  />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    disabled={isSaving}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">📍 Адрес доставки</h3>
              <div className="form-group">
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  disabled={isSaving}
                />
              </div>
            </div>

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
                      disabled={isSaving}
                    />
                    <div className="option-content">
                      <span>{option.label}</span>
                      {option.price > 0 && (
                        <span className="option-price">+{option.price} ₽</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

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
                      disabled={isSaving}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">📝 Комментарий</h3>
              <div className="form-group">
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows="4"
                  disabled={isSaving}
                  placeholder="Дополнительные пожелания..."
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate('/orders')}
                disabled={isSaving}
              >
                Отмена
              </button>
              <button 
                type="submit" 
                className="save-btn"
                disabled={isSaving}
              >
                {isSaving ? 'Сохранение...' : '💾 Сохранить изменения'}
              </button>
            </div>
          </form>
        </div>

        {/* Правая колонка: Товары в заказе */}
        <div className="order-items-section">
          <div className="order-items-card">
            <div className="items-header">
              <h3>🛒 Товары в заказе</h3>
              <button 
                onClick={handleAddItem}
                className="add-item-btn"
                disabled={isSaving}
              >
                + Добавить товар
              </button>
            </div>
            
            <div className="order-items-list">
              {order.items.map((item, index) => (
                <div key={item.id || index} className="order-item-edit">
                  <div className="item-image-edit">{item.image}</div>
                  
                  <div className="item-details-edit">
                    <div className="item-name-edit">{item.name}</div>
                    <div className="item-description-edit">{item.description}</div>
                    
                    <div className="item-quantity-controls">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="quantity-btn"
                        disabled={isSaving}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity || 1} шт.</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="quantity-btn"
                        disabled={isSaving}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-price-edit">
                    <div className="item-price-amount">
                      {(item.price * (item.quantity || 1)).toLocaleString()} ₽
                    </div>
                    <div className="item-price-unit">
                      {item.price.toLocaleString()} ₽/шт.
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-item-btn"
                      disabled={isSaving}
                    >
                      ✕ Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary-edit">
              <div className="summary-row">
                <span>Товаров:</span>
                <span>{order.items.reduce((sum, item) => sum + (item.quantity || 1), 0)} шт.</span>
              </div>
              <div className="summary-row">
                <span>Позиций:</span>
                <span>{order.items.length}</span>
              </div>
              <div className="summary-row total-row">
                <span>Итого:</span>
                <span className="total-amount">{order.total.toLocaleString()} ₽</span>
              </div>
            </div>
            
            <div className="order-status-info">
              <div className="status-info">
                <strong>Статус:</strong> 
                <span className={`status-badge status-${order.status}`}>
                  {order.status === 'pending' ? '⏳ Ожидает' : 
                   order.status === 'processing' ? '🔄 В обработке' :
                   order.status === 'delivered' ? '✅ Доставлен' : 
                   order.status === 'cancelled' ? '❌ Отменен' : order.status}
                </span>
              </div>
              <div className="date-info">
                <strong>Дата заказа:</strong> 
                {new Date(order.date).toLocaleDateString()}
              </div>
              {order.updatedAt && (
                <div className="date-info">
                  <strong>Обновлен:</strong> 
                  {new Date(order.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}