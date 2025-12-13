import { useState } from 'react';

export default function BasketDetail() {
  const [quantity, setQuantity] = useState(1);
  
  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>📦 Детали товара</h1>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
        <h2>Ноутбук игровой</h2>
        <p>Цена: 50 000 ₽</p>
        
        <div style={{ margin: '20px 0' }}>
          <label>Количество: </label>
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span style={{ margin: '0 10px' }}>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>
        
        <p><strong>Итого: {50000 * quantity} ₽</strong></p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none' }}>
            Сохранить изменения
          </button>
          <button style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none' }}>
            Удалить товар
          </button>
          <a href="/basket" style={{ padding: '10px 20px', border: '1px solid #ddd', textDecoration: 'none' }}>
            ← Назад
          </a>
        </div>
      </div>
    </div>
  );
}