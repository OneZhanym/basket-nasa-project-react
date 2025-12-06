import "./Footer.css";

export default function Footer(){
    return(
        <footer className="footer">
            <p className="footer-text">🚀 2025 NASA Explorer. Разработано в образовательных целях. Данные предоставлены NASA</p>
            <div className="footer-links">
                <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer">Официальный сайт NASA</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Политика конфиденциальности</a>
                <a href="#" target="_blank" rel="noopener noreferrer">Условия использования</a>
            </div>
        </footer>
    )
}