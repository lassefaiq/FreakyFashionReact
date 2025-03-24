import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <>
            {/* Hero Section with Two Images */}
            <header className="hero-section">
            {/* Left Side - Image with Text */}
            <div className="hero-left">
                <div className="hero-text">
                </div>
            </div>
  
            {/* Right Side - Image Only */}
            <div className="hero-right"></div>
            </header>

            <div className="promo-section">
                <img src="/src/assets/image1.jpeg" alt="Promo 1" className="promo-image" />
                <img src="/src/assets/image2.webp" alt="Promo 2" className="promo-image" />
                <img src="/src/assets/image3.jpeg" alt="Promo 3" className="promo-image" />
            </div>


            {/* Home Container for the Rest of the Page */}
            <div className="home-container">
                <section className="categories">
                    <h2>Våra T-shirts</h2>
                    <div className="category-grid">
                        {products.map(product => (
                            <Link to={`/products/${product.id}`} key={product.id} className="category">
                                <img src={product.image} alt={product.name} className="category-image" />
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">199 SEK</p>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
        
  
 