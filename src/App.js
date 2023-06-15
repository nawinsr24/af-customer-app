import React, { useEffect } from "react";
import { CookiesProvider } from 'react-cookie';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import MissingPage from "./pages/MissingPage";
import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/HomePage";
import LoadingScreen from "./components/loadingScreen";
import { useAuthContext } from "./context/AuthContext";
import MasterLayout from "./components/layouts/MasterLayout";
import Login from './pages/LoginPage';
import Register from './pages/Register';
import ProductDetailPage from "./pages/product/product";
import ShoppingCart from "./pages/shoping-cart/shoping-cart";
import ShopPage from "./pages/shop/shop";


function App() {

  useEffect(() => {
    setTimeout(function () {
      document.getElementById('root').classList.add('loaded');
    }, 100);
  });

  const { loading } = useAuthContext();
  return (
    <>
      <CookiesProvider>
        <MasterLayout>
          {loading && <LoadingScreen />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:pid" element={<ProductDetailPage />} />
            <Route path="/shoping-cart" element={<ShoppingCart />} />
            {/* <Route path="/shop" element={<ShopPage />} /> */}


            <Route element={<RequireAuth allowedRoles={['sa']} />}>
              <Route path="/sa" element={<Layout />}>

              </Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={['staff']} />}>
              <Route path="/bo" element={<Layout />}>


              </Route>
            </Route>


            {/* catch all */}
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </MasterLayout>
      </CookiesProvider>
    </>

  );
}

export default App;