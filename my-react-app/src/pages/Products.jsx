import { useState } from 'react';
import { Link } from 'react-router-dom';

// Космические товары NASA
const spaceProducts = [
  {
    id: 1,
    name: "Космический телескоп Хаббл",
    description: "Модель знаменитого космического телескопа NASA",
    price: 15000,
    image: "🔭",
    category: "Модели",
    rating: 4.8
  },
  {
    id: 2,
    name: "Скафандр астронавта",
    description: "Детский костюм скафандра NASA",
    price: 5000,
    image: "👨‍🚀",
    category: "Костюмы",
    rating: 4.6
  },
  {
    id: 3,
    name: "Лунный метеорит",
    description: "Фрагмент лунного метеорита в прозрачном кубе",
    price: 25000,
    image: "🌕",
    category: "Коллекции",
    rating: 4.9
  },
  {
    id: 4,
    name: "Модель ракеты Falcon 9",
    description: "Детализированная модель ракеты SpaceX",
    price: 8000,
    image: "🚀",
    category: "Модели",
    rating: 4.7
  },
  {
    id: 5,
    name: "Планетарий проектор",
    description: "Проектор звездного неба на потолок",
    price: 12000,
    image: "✨",
    category: "Электроника",
    rating: 4.5
  },
  {
    id: 6,
    name: "Набор космической еды",
    description: "Настоящая еда для астронавтов",
    price: 3000,
    image: "🍽️",
    category: "Сувениры",
    rating: 4.3
  }
];

function Products() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const addToCart = (product) => {
    setCart([...cart, product]);
    setNotification(`"${product.name}" добавлен в корзину!`);
    
    setTimeout(() => setNotification(''), 3000);
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
  };

  const cartCount = cart.length;

  return (
    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #0a0a2a 0%, #1a1a3a 100%)', minHeight: '100vh', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.8rem', color: '#4fc3f7', marginBottom: '10px' }}>
          🛍️ Космический магазин NASA
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#a5d8ff' }}>
          Приобретите уникальные космические товары и сувениры
        </p>
        
        <div style={{ marginTop: '20px' }}>
          <Link 
            to="/basket" 
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 20px',
              borderRadius: '20px',
              textDecoration: 'none',
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #4fc3f7'
            }}
          >
            🛒 Корзина 
            {cartCount > 0 && (
              <span style={{ background: '#ff4081', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#4caf50',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          {notification}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {spaceProducts.map(product => (
          <div key={product.id} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(79, 195, 247, 0.3)',
            borderRadius: '15px',
            padding: '20px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '4rem', display: 'block' }}>{product.image}</span>
            </div>
            
            <div style={{ display: 'inline-block', background: 'rgba(79, 195, 247, 0.2)', color: '#4fc3f7', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', marginBottom: '10px' }}>
              {product.category}
            </div>
            
            <h3 style={{ fontSize: '1.3rem', margin: '10px 0', color: 'white' }}>{product.name}</h3>
            
            <p style={{ color: '#b0bec5', fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.5' }}>
              {product.description}
            </p>
            
            <div style={{ color: '#ffd700', marginBottom: '15px', fontSize: '1.2rem' }}>
              {'⭐'.repeat(Math.floor(product.rating))}
              <span style={{ color: '#fff', fontSize: '0.9rem', marginLeft: '5px' }}> {product.rating}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4fc3f7' }}>
                {product.price.toLocaleString()} ₽
              </div>
              <button 
                onClick={() => addToCart(product)}
                style={{
                  background: 'linear-gradient(45deg, #4fc3f7, #2979ff)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🛒 Добавить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
        <Link 
          to="/basket" 
          style={{
            display: 'inline-block',
            background: 'linear-gradient(45deg, #ff4081, #f50057)',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        >
          Перейти в корзину ({cartCount} товаров)
        </Link>
      </div>
    </div>
  );
}

export default Products;