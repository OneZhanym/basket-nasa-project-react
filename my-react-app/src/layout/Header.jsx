import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(){
    return (
        <header className="header">
            <h2 className="header-logo">🌌 NASA Explorer</h2>
            <nav className="nav">
                <Link to='/'>Космические снимки</Link>
                <Link to='/products'>🛍️ Магазин</Link>
                <Link to='/basket'>🛒 Корзина</Link>
                <Link to='#'>Миссии</Link>
                <Link to='#'>О NASA</Link>
            </nav>
        </header>
    )
}