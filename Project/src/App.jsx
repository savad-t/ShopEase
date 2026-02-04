import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { WishlistProvider } from './Context/WishlistContext'
import { AuthProvider } from './Context/AuthContext'
import { CartProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Footer from './Pages/Footer'
import Shop from './Pages/Shop'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import About from './Pages/About'
import Categories from './Pages/Category'
import NewArrivals from './Pages/NewArrivals'
import ProductDetails from './Pages/ProductDetails'
import Checkout from './Pages/Checkout'
import OrderHistory from './Pages/Order'
import { ProtectedRoute, PublicRoute } from './Components/ProtectedRoute'
import DashBoard from './Admin/DashBoard'
import Orders from './Admin/Orders'
import Users from './Admin/Users'
import Products from './Admin/Products'
import SideBar from './Components/SideBar'
import { useEffect } from 'react'
import Fakeeee from './Admin/Fakeeee'


function App() {

  const location= useLocation();
  const navigate = useNavigate();
  // Auto redirect admin after refresh
useEffect(() => {
const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (
        user.role?.toLowerCase() === "admin" &&
        (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup")
      ) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  const hideNavFooter = ["/sidebar", "/dashboard", "/users","/addproducts", "/products", "/orders", "/fakee"]
  const showNavFooter = !hideNavFooter.includes(location.pathname)

  return (
   
     <AuthProvider>
      <CartProvider>
       <WishlistProvider>
         <Toaster position="top-right" reverseOrder={false} />

        { showNavFooter && <Navbar/> }

          <Routes>
           <Route path="/" element={<Home/>}/>                              
           <Route path="/register" element={<PublicRoute> <Register/> </PublicRoute>}/>
           <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>}/>
           <Route path="/wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
           <Route path="/cart" element={ <ProtectedRoute> <Cart/> </ProtectedRoute>}/>
           <Route path="/shop" element={<Shop/>}/>
           <Route path="/about" element={<About/>}/>
           <Route path="/category" element={<Categories/>}/>
           <Route path="/newarrivals" element={<NewArrivals/>}/>
           <Route path="/product/:id" element={<ProductDetails/>}/>
           <Route path="/order-history" element={<ProtectedRoute> <OrderHistory/> </ProtectedRoute>}/>
           <Route path="/checkout" element={<ProtectedRoute> <Checkout/> </ProtectedRoute>}/>

           {/* admin side  */}

           <Route path="/sidebar" element={<ProtectedRoute><SideBar/></ProtectedRoute>}/>
           <Route path="/dashboard" element={<ProtectedRoute><DashBoard/></ProtectedRoute>}/>
           <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
           <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>}/>
           <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
           <Route path="/fakee" element={<ProtectedRoute><Fakeeee/></ProtectedRoute>}/>
          </Routes>

          { showNavFooter && <Footer/> }

        </WishlistProvider>
       </CartProvider>
      </AuthProvider>
    
  )
}

export default App