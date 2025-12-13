import { useState } from 'react';

export default function BasketList() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Ноутбук', price: 50000, quantity: 1 },
    { id: 2, name: 'Телефон', price: 30000, quantity: 2 }
  ]);

  const addToCart = () => {
    const newItem = {
      id: Date.now(),
      name: `Товар ${cart.length + 1}`,
      price: Math.floor(Math.random() * 10000) + 1000,
      quantity: 1
    };
    setCart([...cart, newItem]);
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛒 Корзина</h1>
      <button onClick={addToCart} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        + Добавить товар
      </button>
      
      <div style={{ display: 'grid', gap: '10px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0 }}>{item.name}</h3>
              <p>Цена: {item.price} ₽ × {item.quantity} = {item.price * item.quantity} ₽</p>
            </div>
            <button 
              onClick={() => removeItem(item.id)}
              style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa' }}>
        <h3>Итого: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)} ₽</h3>
        <a href="/order/new" style={{
          display: 'inline-block',
          background: '#28a745',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          marginTop: '10px'
        }}>
          Оформить заказ
        </a>
      </div>
    </div>
  );
}