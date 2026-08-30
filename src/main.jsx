import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingRail from './components/FloatingRail.jsx';
import RouteFocusManager from './components/RouteFocusManager.jsx';
import Home from './pages/Home.jsx';
import ProductsOverview from './pages/ProductsOverview.jsx';
import GfciSeries from './pages/GfciSeries.jsx';
import LineDetail from './pages/LineDetail.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Capabilities from './pages/Capabilities.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import './styles.css';
import './styles/product-experience.css';
import './styles/catalog.css';

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <RouteFocusManager />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsOverview />} />
          <Route path="/products/gfci" element={<GfciSeries />} />
          <Route path="/products/gfci/:sku" element={<ProductDetail />} />
          <Route path="/products/:line" element={<LineDetail />} />
          <Route path="/products/:line/:sku" element={<ProductDetail />} />
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
