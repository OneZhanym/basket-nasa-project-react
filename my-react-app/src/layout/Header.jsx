import { Link } from "react-router-dom";
import "./Header.css";

export default function Header(){
    return (
        <header className="header">
            <h2>🌌 NASA Explorer</h2>
            <nav className="nav">
                <Link to='/'>Космические снимки</Link>
                <Link to='#'>Миссии</Link>
                <Link to='#'>О NASA</Link>
                <Link to="#">Контакты</Link>
            </nav>
        </header>
    )
}