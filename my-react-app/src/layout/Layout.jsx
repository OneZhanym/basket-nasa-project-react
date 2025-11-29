import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import './Layout.css';

export default function Layout(){
    return(
        <>
        
        <Header />
        <main className="main">
            <Outlet/>
        </main>
        <Footer/>
        
        </>
    )
}