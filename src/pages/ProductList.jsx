import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-list">
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.price} SEK</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
