import React, { useEffect } from "react";
import { CookiesProvider } from 'react-cookie';
import './App.scss';
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
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
import CheckoutPage from "./pages/checkout/checkout";
import ShippingPage from "./pages/shipping/shipping";
import PaymentPage from "./pages/payment/payment";
import PaymentSuccessPage from "./pages/payment/payment-success";
import OtpPage from "./pages/otpPage/otp";
import UserInformationPage from "./pages/user-information/userInformation";
import OrdersPage from "./pages/orders/order";
import OrderTrakingPage from "./pages/order-traking/orderTraking";
import OrdersHistoryPage from "./pages/orderHistory/orderHistory";
import ProductDeliveryHistoryPage from "./pages/orderHistory/productDeliveryistory";
import './static/fonts/Linearicons/Font/demo-files/demo.css';
import './static/fonts/font-awesome/css/font-awesome.min.css';
import './static/fonts/font-awesome/css/font-awesome.css';
import './static/fonts/font-awesome/css/font-awesome.css.map';
import './static/css/bootstrap.min.css';
import './static/css/slick.min.css';
import './scss/style.scss';
import './scss/home-default.scss';
import './scss/market-place-1.scss';
import './scss/market-place-2.scss';
import './scss/market-place-3.scss';
import './scss/market-place-4.scss';
import './scss/electronic.scss';
import './scss/furniture.scss';
import './scss/organic.scss';
import './scss/technology.scss';
import './scss/autopart.scss';

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
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/payment-success' element={<PaymentSuccessPage />} />
            <Route path='/verify' element={<OtpPage />} />
            <Route path='/delivery-history/:id' element={<ProductDeliveryHistoryPage />} />


            <Route element={<RequireAuth />}>
              <Route path='/user-information' element={<UserInformationPage />} />
              <Route path='/orders' element={<OrdersPage />} />
              <Route path='/order-tracking/:id' element={<OrderTrakingPage />} />
              <Route path='/order-history' element={<OrdersHistoryPage />} />
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