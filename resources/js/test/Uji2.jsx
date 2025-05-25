import React, { useState, useEffect } from 'react';
import { IoIosClose, IoIosAdd, IoIosRemove } from "react-icons/io";
import { FaRegTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Konfigurasi API
const API_BASE_URL = 'http://localhost:8000/api'; // Sesuaikan dengan URL Laravel Anda

// Utility function untuk API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Hanya tambahkan token untuk endpoint yang memerlukan auth
    if (token && (endpoint.includes('/user') || endpoint === '/product' && options.method === 'POST')) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        alert('Session expired. Please login again.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Login Component (hanya untuk AddMenu)
const Login = ({ onLogin, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitData = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = isRegister ? '/register' : '/auth';
      const response = await apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.token || response.access_token) {
        const token = response.token || response.access_token;
        localStorage.setItem('auth_token', token);
        onLogin(token);
      } else if (isRegister) {
        setIsRegister(false);
        alert('Registrasi berhasil! Silakan login.');
      }
    } catch (error) {
      setError('Login/Register gagal. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isRegister ? 'Register' : 'Login Required'}
          </h2>
          <button onClick={onCancel}>
            <IoIosClose className="text-2xl" />
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div>
          {isRegister && (
            <input
              type="text"
              placeholder="Nama"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border rounded mb-4"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            onClick={submitData}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </div>

        <p className="text-center mt-4">
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 ml-2 hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

// AddMenu Component
const AddMenu = ({ onClose, onMenuAdded }) => {
  const [formData, setFormData] = useState({
    product_type_id: '',
    products_name: '',
    description: '',
    price: '',
    stock: '',
    img_url: null
  });
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        await apiCall('/user');
        setIsAuthenticated(true);
        fetchProductTypes();
      } catch (error) {
        localStorage.removeItem('auth_token');
        setShowLogin(true);
      }
    } else {
      setShowLogin(true);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const response = await apiCall('/product-type');
      setProductTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  const handleLogin = () => {
    setShowLogin(false);
    setIsAuthenticated(true);
    fetchProductTypes();
  };

  const submitForm = async () => {
    if (!isAuthenticated) {
      setShowLogin(true);
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await apiCall('/product', {
        method: 'POST',
        headers: {}, // FormData akan set Content-Type sendiri
        body: formDataToSend,
      });

      alert('Menu berhasil ditambahkan!');
      onMenuAdded();
      onClose();
    } catch (error) {
      alert('Gagal menambahkan menu. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  if (showLogin) {
    return (
      <Login 
        onLogin={handleLogin} 
        onCancel={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tambah Menu Baru</h2>
          <button onClick={onClose}>
            <IoIosClose className="text-2xl" />
          </button>
        </div>

        <div className="space-y-4">
          <select
            value={formData.product_type_id}
            onChange={(e) => setFormData({...formData, product_type_id: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Kategori</option>
            {productTypes.map(type => (
              <option key={type.id} value={type.id}>{type.type_name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nama Produk"
            value={formData.products_name}
            onChange={(e) => setFormData({...formData, products_name: e.target.value})}
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Deskripsi"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-2 border rounded h-20"
          />

          <input
            type="number"
            placeholder="Harga"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Stok"
            value={formData.stock}
            onChange={(e) => setFormData({...formData, stock: e.target.value})}
            className="w-full p-2 border rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({...formData, img_url: e.target.files[0]})}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={submitForm}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Menyimpan...' : 'Simpan Menu'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ProductType Component (tidak perlu auth)
const ProductType = ({ selectedType, onTypeSelect }) => {
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await apiCall('/product-type');
      setProductTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching product types:', error);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => onTypeSelect(null)}
        className={`px-4 py-2 rounded-lg font-medium ${
          selectedType === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
      >
        Semua
      </button>
      {productTypes.map(type => (
        <button
          key={type.id}
          onClick={() => onTypeSelect(type.id)}
          className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
            selectedType === type.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {type.type_name}
        </button>
      ))}
    </div>
  );
};

// Menu Component (tidak perlu auth)
const Menu = ({ selectedType, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/product');
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedType 
    ? products.filter(product => product.product_type_id == selectedType)
    : products;

  if (loading) {
    return <div className="text-center py-8">Loading menu...</div>;
  }

  return (
    <div className="flex justify-evenly flex-wrap w-full p-5 h-auto gap-y-8 rounded-2xl bg-white">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Tidak ada menu tersedia
        </div>
      ) : (
        filteredProducts.map(product => (
          <div
            key={product.id}
            className="flex flex-col w-80 h-80 p-4 gap-5 rounded-3xl border"
          >
            <img
              src={product.img_url || "https://dummyimage.com/360x240/000/fff"}
              alt={product.products_name}
              className="rounded-3xl h-52 w-full object-cover"
            />
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="font-semibold text-xl">{product.products_name}</h1>
                <p className="text-gray-500">Rp {parseInt(product.price).toLocaleString()}</p>
                <p className="text-sm text-gray-400">Stok: {product.stock}</p>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="border-2 border-black rounded-full p-2 hover:bg-black hover:text-white"
              >
                <IoIosAdd className="text-2xl" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ItemMenu Component
const ItemMenu = ({ item, onUpdateQuantity, onRemove }) => {
  const increment = () => onUpdateQuantity(item.id, item.quantity + 1);
  const decrement = () => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1));

  return (
    <div className="flex justify-between w-full p-2 border-2 rounded-xl shadow-md border-gray-500">
      <div className="flex gap-2">
        <img
          src={item.img_url || "https://dummyimage.com/75x75/000/fff"}
          className="rounded-xl object-cover w-16 h-16"
          alt={item.products_name}
        />
        <div>
          <h1 className="text-lg font-semibold">{item.products_name}</h1>
          <p className="text-sm text-gray-500">Rp {parseInt(item.price).toLocaleString()}</p>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-300">
          <button onClick={decrement}>
            <IoIosRemove className="text-xl" />
          </button>
          <span className="px-2">{item.quantity}</span>
          <button onClick={increment}>
            <IoIosAdd className="text-xl" />
          </button>
        </div>
        <button onClick={() => onRemove(item.id)}>
          <FaRegTrashAlt className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Restaurant POS</h1>
        <div className="text-gray-600">
          Menu Management System
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [cart, setCart] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (parseInt(item.price) * item.quantity), 0);
  };

  const handleMenuAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="flex h-full bg-gray-300">
        <div className="flex flex-col gap-5 p-7 flex-1">
          {/* Categories */}
          <div className="flex flex-col h-auto w-full rounded-xl bg-white">
            <header className="flex justify-between items-center p-4">
              <h1 className="font-semibold text-xl">Foods Menu</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddMenu(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Tambah Menu
                </button>
                <div className="flex gap-2 text-gray-700 text-sm">
                  <FaArrowLeft />
                  <FaArrowRight />
                </div>
              </div>
            </header>
            <div className="overflow-x-auto overflow-y-hidden">
              <div className="flex space-x-5 w-max p-5">
                <ProductType selectedType={selectedType} onTypeSelect={setSelectedType} />
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <Menu 
            key={refreshTrigger} 
            selectedType={selectedType} 
            onAddToCart={addToCart} 
          />
        </div>

        {/* Cart */}
        <div className="flex flex-col my-7 h-auto w-80 p-5 gap-5 rounded-xl bg-white">
          <h1 className="text-2xl font-semibold">Keranjang ({cart.length})</h1>
          
          <div className="flex-1 space-y-3 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Keranjang kosong</p>
            ) : (
              cart.map(item => (
                <ItemMenu
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateCartQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">
                  Rp {getTotalPrice().toLocaleString()}
                </span>
              </div>
              <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Checkout
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Add Menu Modal */}
      {showAddMenu && (
        <AddMenu
          onClose={() => setShowAddMenu(false)}
          onMenuAdded={handleMenuAdded}
        />
      )}
    </div>
  );
};

export default App;