import { Routes, Route } from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import Layout from "./layout/Layout";


export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Layout/>} >

      <Route  index  element={<PostsList />} />
      <Route path="/post/:id" element={<PostDetail />} />

      </Route>


    </Routes>
  );
}