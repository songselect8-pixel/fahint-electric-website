import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingRail from './components/FloatingRail.jsx';
import RouteFocusManager from './components/RouteFocusManager.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Capabilities from './pages/Capabilities.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import './styles.css';
import './styles/product-experience.css';
import './styles/catalog.css';
import './styles/brand-catalog.css';
import './styles/homepage.css';
import './styles/site-system.css';

const LineDetail = lazy(() => import('./pages/LineDetail.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const ProductsOverview = import.meta.env.DEV ? lazy(() => import('./pages/ProductsOverview.jsx')) : null;
const GfciSeries = lazy(() => import('./pages/GfciSeries.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const HomeNext = import.meta.env.DEV ? lazy(() => import('./pages/HomeNext.jsx')) : null;
const HomeLegacy = import.meta.env.DEV ? lazy(() => import('./pages/Home.jsx')) : null;
const HomeStudio = lazy(() => import('./pages/HomeStudio.jsx'));
const ProductsStudio = lazy(() => import('./pages/ProductsStudio.jsx'));

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="catalog-loading" role="status">Loading product details…</div>}>
          <RouteFocusManager />
          <Routes>
          <Route path="/" element={<HomeStudio />} />
          {import.meta.env.DEV && <Route path="/home-next" element={<HomeNext />} />}
          {import.meta.env.DEV && <Route path="/home-legacy" element={<HomeLegacy />} />}
          {import.meta.env.DEV && <Route path="/products-legacy" element={<ProductsOverview />} />}
          <Route path="/home-studio" element={<HomeStudio />} />
          <Route path="/products-studio" element={<ProductsStudio />} />
          <Route path="/products" element={<ProductsStudio />} />
          <Route path="/products/gfci" element={<GfciSeries />} />
          <Route path="/products/gfci/:sku" element={<ProductDetail />} />
          <Route path="/products/:line" element={<LineDetail />} />
          <Route path="/products/:line/:sku" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes></Suspense>
      </main>
      <Footer />
      <FloatingRail />
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);
