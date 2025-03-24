import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react"; // ✅ Import useState
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddProduct from "./pages/AddProduct";

function Layout({ children, searchTerm, setSearchTerm }) {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <div className="app-container">
            {!isAdminPage && <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            {children}
            {!isAdminPage && <Footer />}
        </div>
    );
}

function App() {
    const [searchTerm, setSearchTerm] = useState(""); // ✅ State for search

    return (
        <Router>
            <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList searchTerm={searchTerm} />} /> {/* ✅ Pass searchTerm */}
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/admin/*" element={<Admin />} />
                    <Route path="/admin/products/new" element={<AddProduct />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
