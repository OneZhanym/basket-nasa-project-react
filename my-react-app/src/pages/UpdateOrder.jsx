import { useState } from 'react';

export default function UpdateOrder() {
  const [order, setOrder] = useState({
    id: 1,
    customer: 'Иван Иванов',
    total: 110000,
    status: 'В обработке',
    address: 'Москва, ул. Примерная, 1'
  });

  const handleDelete = () => {
    if (window.confirm('Удалить этот заказ?')) {
      alert('Заказ удален!');
      window.location.href = '/';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>✏️ Редактирование заказа #{order.id}</h1>
      
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Статус заказа:</label>
          <select 
            value={order.status}
            onChange={(e) => setOrder({...order, status: e.target.value})}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="Новый">Новый</option>
            <option value="В обработке">В обработке</option>
            <option value="Отправлен">Отправлен</option>
            <option value="Доставлен">Доставлен</option>
            <option value="Отменен">Отменен</option>
          </select>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Адрес доставки:</label>
          <textarea 
            value={order.address}
            onChange={(e) => setOrder({...order, address: e.target.value})}
            style={{ width: '100%', padding: '8px', height: '60px' }}
          />
        </div>
        
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
          <p><strong>Клиент:</strong> {order.customer}</p>
          <p><strong>Сумма:</strong> {order.total} ₽</p>
          <p><strong>Текущий статус:</strong> {order.status}</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={{
          flex: 1,
          background: '#007bff',
          color: 'white',
          padding: '12px',
          border: 'none',
          cursor: 'pointer'
        }}>
          Сохранить изменения
        </button>
        
        <button 
          onClick={handleDelete}
          style={{
            flex: 1,
            background: '#dc3545',
            color: 'white',
            padding: '12px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Удалить заказ
        </button>
      </div>
      
      <a href="/" style={{ 
        display: 'block', 
        textAlign: 'center', 
        marginTop: '20px',
        textDecoration: 'none'
      }}>
        ← Вернуться на главную
      </a>
    </div>
  );
}