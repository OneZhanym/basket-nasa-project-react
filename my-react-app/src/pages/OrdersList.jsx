import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrdersList.css';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { text: '⏳ Ожидает', color: '#ff9800' },
      'processing': { text: '🔄 В обработке', color: '#2196f3' },
      'shipped': { text: '🚚 Отправлен', color: '#9c27b0' },
      'delivered': { text: '✅ Доставлен', color: '#4caf50' },
      'cancelled': { text: '❌ Отменен', color: '#f44336' }
    };
    
    const config = statusConfig[status] || { text: status, color: '#9e9e9e' };
    return (
      <span className="status-badge" style={{ backgroundColor: config.color }}>
        {config.text}
      </span>
    );
  };

  const getFilteredOrders = () => {
    if (filter === 'all') return orders;
    return orders.filter(order => order.status === filter);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Вы уверены, что хотите отменить этот заказ?')) {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="orders-list-container">
      <div className="orders-header">
        <h1>📋 Мои заказы</h1>
        <p>Здесь вы можете управлять своими заказами и отслеживать их статус</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-icon">🛒</div>
          <h3>У вас пока нет заказов</h3>
          <p>Совершите покупку в нашем магазине</p>
          <Link to="/products" className="browse-products-btn">
            Перейти в магазин
          </Link>
        </div>
      ) : (
        <>
          <div className="orders-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все ({orders.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Ожидает ({orders.filter(o => o.status === 'pending').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'processing' ? 'active' : ''}`}
              onClick={() => setFilter('processing')}
            >
              В обработке ({orders.filter(o => o.status === 'processing').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Доставлен ({orders.filter(o => o.status === 'delivered').length})
            </button>
            <button 
              className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
              onClick={() => setFilter('cancelled')}
            >
              Отменен ({orders.filter(o => o.status === 'cancelled').length})
            </button>
          </div>

          <div className="orders-grid">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-id">Заказ #{order.id.toString().slice(-6)}</div>
                  {getStatusBadge(order.status)}
                </div>
                
                <div className="order-date">
                  📅 {formatDate(order.date)}
                </div>
                
                <div className="order-items-preview">
                  <strong>Товары:</strong>
                  <div className="items-list">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="order-item-preview">
                        <span className="item-emoji">{item.image}</span>
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">× {item.quantity || 1}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="more-items">и ещё {order.items.length - 3} товаров...</div>
                    )}
                  </div>
                </div>
                
                <div className="order-customer">
                  <div className="customer-info">
                    <strong>👤 {order.customer.name}</strong>
                    <div className="customer-phone">📱 {order.customer.phone}</div>
                    {order.customer.email && (
                      <div className="customer-email">📧 {order.customer.email}</div>
                    )}
                  </div>
                </div>
                
                <div className="order-total">
                  <strong>Итого:</strong>
                  <span className="total-amount">{order.total.toLocaleString()} ₽</span>
                </div>
                
                <div className="order-actions">
                  <Link 
                    to={`/order/${order.id}/edit`} 
                    className="edit-order-btn"
                    state={{ order }}
                  >
                    ✎ Редактировать
                  </Link>
                  
                  <Link 
                    to={`/order/${order.id}`} 
                    className="view-order-btn"
                  >
                    👁️ Подробнее
                  </Link>
                  
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id)}
                      className="cancel-order-btn"
                    >
                      ❌ Отменить
                    </button>
                  )}
                  
                  {(order.status === 'delivered' || order.status === 'shipped') && (
                    <button className="track-order-btn">
                      🚚 Отследить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}