import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';       // <--- Importamos la página Home
import Catalog from './pages/Catalog'; // <--- Importamos la página Catalog
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* El contenido cambia según la ruta (URL) */}
      <Routes>
        
        <Route path="/" element={<Home />} />           {/* Ruta Raíz */}
        <Route path="/catalogo" element={<Catalog />} /> {/* Ruta Catálogo */}
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} /> 

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App;