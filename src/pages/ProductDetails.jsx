import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    useEffect(() => {
        // Hämtar produkt detaljer
        axios.get(`http://localhost:3001/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });

        // Hämtar alla produkter och shufflar ordningen för att visa 3 slumpmässiga produkter
        axios.get("http://localhost:3001/products")
            .then(response => {
                const filteredProducts = response.data.filter(p => p.id !== parseInt(id));
                const shuffledProducts = filteredProducts.sort(() => Math.random() - 0.5);
                setSimilarProducts(shuffledProducts.slice(0, 3)); 
            })
            .catch(error => {
                console.error("Error fetching similar products:", error);
            });
    }, [id]);

    if (!product) {
        return <p>Loading product...</p>;
    }

    return (
        <div>
            <div className="product-details">
                {/* produkt bild */}
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>

                {/* produkt info */}
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="description">{product.description}</p>
                    <p className="price">{product.price} SEK</p>
                    <button className="add-to-cart">Lägg i varukorg</button>
                </div>
            </div>

            {/* liknande produkter sektion */}
            <div className="similar-products">
                <h2>Liknande produkter</h2>
                <div className="similar-grid">
                    {similarProducts.map(similarProduct => (
                        <div className="product-card" key={similarProduct.id}>
                            <img src={similarProduct.image} alt={similarProduct.name} />
                            <p>{similarProduct.name}</p>
                            <p>{similarProduct.price} SEK</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
