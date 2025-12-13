import { useState } from 'react';

export default function CreateOrder() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Заказ оформлен!');
    // Перенаправление на главную или страницу заказа
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h1>📝 Оформление заказа</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Имя и фамилия:</label>
          <input 
            type="text" 
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Телефон:</label>
          <input 
            type="tel" 
            value={form.phone}
            onChange={(e) => setForm({...form, phone: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Адрес доставки:</label>
          <textarea 
            value={form.address}
            onChange={(e) => setForm({...form, address: e.target.value})}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', height: '80px' }}
          />
        </div>
        
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
          <h3 style={{ marginTop: 0 }}>Ваш заказ:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>Ноутбук - 50 000 ₽ × 1</li>
            <li>Телефон - 30 000 ₽ × 2</li>
          </ul>
          <p><strong>Итого: 110 000 ₽</strong></p>
        </div>
        
        <button 
          type="submit"
          style={{
            background: '#28a745',
            color: 'white',
            padding: '12px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Подтвердить заказ
        </button>
        
        <a href="/basket" style={{ textAlign: 'center', textDecoration: 'none' }}>
          ← Вернуться в корзину
        </a>
      </form>
    </div>
  );
}