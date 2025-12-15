import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BasketList.css';

export default function BasketList() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    if (window.confirm('Очистить всю корзину?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="basket-container">
      <h1 className="basket-title">🛒 Космическая корзина NASA</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🌌</div>
          <h3>Ваша корзина пуста</h3>
          <p>Добавьте товары из космического магазина</p>
          <Link to="/products" className="browse-products-btn">
            Перейти в магазин
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="item-price">{item.price.toLocaleString()} ₽</div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="remove-btn"
                >
                  ✕ Удалить
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-row">
              <span>Товаров:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-row total">
              <span>Итого:</span>
              <span>{total.toLocaleString()} ₽</span>
            </div>
            
            <div className="cart-actions">
              <button onClick={clearCart} className="clear-cart-btn">
                Очистить корзину
              </button>
              <Link to="/order/new" className="checkout-btn">
                🚀 Оформить заказ
              </Link>
            </div>
            
            <Link to="/products" className="continue-shopping">
              ← Продолжить покупки
            </Link>
          </div>
        </>
      )}
    </div>
  );
}