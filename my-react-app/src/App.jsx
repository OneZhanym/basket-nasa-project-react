import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";

import BasketList from './pages/BasketList';
import BasketDetail from './pages/BasketDetail';
import CreateOrder from './pages/CreateOrder';
import UpdateOrder from './pages/UpdateOrder';
import Products from './pages/Products';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<PostsList />} />
        <Route path="post/:id" element={<PostDetail />} />
        
        <Route path="basket" element={<BasketList />} />
        <Route path="basket/:id" element={<BasketDetail />} />
        <Route path="order/new" element={<CreateOrder />} />
        <Route path="order/edit/:id" element={<UpdateOrder />} />
        <Route path="products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}