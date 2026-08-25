import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingRail from './components/FloatingRail.jsx';
import Home from './pages/Home.jsx';
import ProductsOverview from './pages/ProductsOverview.jsx';
import LineDetail from './pages/LineDetail.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Capabilities from './pages/Capabilities.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import './styles.css';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsOverview />} />
          <Route path="/products/gfci/:sku" element={<ProductDetail />} />
          <Route path="/products/:line" element={<LineDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingRail />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
