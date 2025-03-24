import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddProduct from "./pages/AddProduct";

function Layout({ children }) {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin"); // Hide navbar & footer for admin pages

    return (
        <div className="app-container">
            {!isAdminPage && <Navbar />} {/* Show Navbar only if not in admin */}
            {children}
            {!isAdminPage && <Footer />} {/* Show Footer only if not in admin */}
        </div>
    );
}

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/admin/*" element={<Admin />} /> {/* Admin panel */}
                    <Route path="/admin/products/new" element={<AddProduct />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;

