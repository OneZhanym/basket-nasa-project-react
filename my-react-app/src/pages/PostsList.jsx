import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './PostList.css';

// Данные космических снимков
const cosmicImages = [
  {
    id: 1,
    title: "Туманность Ориона",
    body: "Туманность Ориона, также известная как M42, является одной из самых ярких туманностей на ночном небе. Это область активного звездообразования, расположенная на расстоянии около 1344 световых лет от Земли.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/1200px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Галактика Андромеды",
    body: "Галактика Андромеды (M31) - ближайшая к Млечному Пути большая галактика. Она находится на расстоянии около 2,5 миллионов световых лет от нас.",
    image: "https://habrastorage.org/getpro/habr/upload_files/f2c/676/3e5/f2c6763e5f3de1db3c901ee2e56a9def.jpg",
    date: "2024-01-14"
  },
  {
    id: 3,
    title: "Кольцевая туманность",
    body: "Кольцевая туманность в созвездии Лиры - одна из наиболее известных планетарных туманностей. Образована сброшенными внешними слоями звезды.",
    image: "https://spacegid.com/wp-content/uploads/2017/08/Messier-57.jpg",
    date: "2024-01-13"
  },
  {
    id: 4,
    title: "Марсианские пейзажи",
    body: "Снимки поверхности Марса, сделанные марсоходом Curiosity. Видны горные породы и характерный красный цвет планеты.",
    image: "https://naked-science.ru/wp-content/uploads/2021/04/8901_1-PIA24543-Curiositys-Selfie-at-Mont-Mercou-main-web.jpeg",
    date: "2024-01-12"
  },
  {
    id: 5,
    title: "Солнечная корона",
    body: "Затмение Солнца, показывающее солнечную корону - внешние слои атмосферы Солнца, которые обычно не видны из-за яркого света.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Solar_eclipse_1999_4.jpg/1200px-Solar_eclipse_1999_4.jpg",
    date: "2024-01-11"
  }
];

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Имитация загрузки данных
        setTimeout(() => {
            setPosts(cosmicImages);
            setLoading(false);
        }, 500);
    }, []);

    if (loading) return <div className="loading">🛰️ Загрузка космических данных...</div>;

    return (
        <div className="posts-list-container">
            <div className="main-title-container">
                <h1 className="main-title">
                    <span className="title-text">
                        <span className="title-part left">🚀 КОСМИЧЕСКИЕ</span>
                        <span className="title-part right">СНИМКИ NASA</span>
                    </span>
                    <span className="title-glow"></span>
                    <span className="title-particles">✦ ✦ ✦</span>
                </h1>
                <div className="title-subtitle">Исследуйте Вселенную через объективы телескопов</div>
            </div>
            
            <p className="page-description">
                Откройте для себя удивительные космические объекты через объективы телескопов NASA
            </p>
            
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post cosmic-post">
                        <img src={post.image} alt={post.title} className="cosmic-image" />
                        <div className="post-content">
                            <h3>✨ {post.title}</h3>
                            <div className="post-date">📅 {post.date}</div>
                            <p className="post-preview">
                                {post.body.substring(0, 120)}...
                            </p>
                            <Link className="read-link" to={`/post/${post.id}`}>
                                🔭 Исследовать детали
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}