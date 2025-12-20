import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";

import BasketList from './pages/BasketList';
import CreateOrder from './pages/CreateOrder';
import Products from './pages/Products';
import OrderSuccess from './pages/OrderSuccess';

import OrdersList from './pages/OrdersList';
import EditOrder from './pages/EditOrder';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

import About from './pages/About';
import ContactsPage from './pages/ContactsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Основные страницы */}
        <Route index element={<PostsList />} />
        <Route path="post/:id" element={<PostDetail />} />
        
        {/* Магазин и корзина */}
        <Route path="products" element={<Products />} />
        <Route path="basket" element={<BasketList />} />
        
        {/* Заказы */}
        <Route path="order/new" element={<CreateOrder />} />
        <Route path="order/success" element={<OrderSuccess />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="order/:orderId/edit" element={<EditOrder />} />
        
        {/* Аутентификация */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        
        {/* О проекте */}
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<ContactsPage />} />
        
        {/* 404 страница */}
        <Route path="*" element={
          <div style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
            <h1>404 - Страница не найдена</h1>
          </div>
        } />
      </Route>
    </Routes>
  );
}