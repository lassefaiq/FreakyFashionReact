import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaRegSmile, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { useState } from "react";
import "./Navbar.css"; // Import CSS file

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <NavLink to="/">FREAKY FASHION.</NavLink>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Herr</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Dam</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Skor</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active sale" : "sale")}>Rea</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Kampanjer</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Varumärken</NavLink></li>
        <li><NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Freaky Mag.</NavLink></li>
      </ul>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Sök..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit"><FaSearch /></button>
      </form>

      {/* Icons */}
      <div className="nav-icons">
        <FaRegSmile className="icon" />
        <FaRegHeart className="icon" />
        <FaShoppingBag className="icon" />
      </div>
    </nav>
  );
};

export default Navbar;
