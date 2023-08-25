import React, { useContext, useEffect, useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';
import CartItems from '../../components/shopping-cart/cartItems/cartItems';
import CartSummary from '../../components/shopping-cart/cart-summary';
import { useAuthContext } from '../../context/AuthContext';
import { addToCart, getCart } from '../../services/home-page-service';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../components/notify';
import { CartContext } from '../../context/cartContext';
const ShoppingCart = ({ ecomerce }) => {
    const { ctxtUser } = useAuthContext();
    const Router = useNavigate();
    const [cartProduts, setCartProducts] = useState([]);
    const [cartRefresh, setCartRefresh] = useState(false);
    const { addToCartContext } = useContext(CartContext);

    const getcartData = async () => {
        const cartResponse = await getCart(ctxtUser?.userId);
        cartResponse?.forEach((pro) => {
            if (pro.discount_percentage) {
                const dis_price = parseFloat(pro.base_price) - (parseFloat(pro.base_price) * (parseFloat(pro.discount_percentage) / 100));
                const final_price = Math.round(parseFloat(dis_price) + parseFloat(dis_price) * (parseFloat(pro.gst_rate) / 100));
                pro.original_base_price = pro.base_price;
                pro.base_price = final_price;
            }
        });
        setCartProducts(cartResponse);
    };

    const isCartRefresh = (isRefresh) => {
        setCartRefresh(isRefresh);
    };

    useEffect(() => {
        getcartData();
    }, [cartRefresh]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
        },
    ];



    const increaseCartCount = (data) => {
        const updateCartData = cartProduts.map((item) => {
            if (item.stock_id === data.stock_id) {
                return {
                    ...item,
                    cart_quantity: item.cart_quantity + 1
                };
            }
            return item;
        });
        setCartProducts(updateCartData);

    };
    const decreaseCartCount = (data) => {
        const updateCartData = cartProduts.map((item) => {
            if (item.stock_id === data.stock_id && item.cart_quantity > 1) {
                return {
                    ...item,
                    cart_quantity: item.cart_quantity - 1
                };
            }
            return item;
        });
        setCartProducts(updateCartData);
    };

    const handleCheckOut = async () => {
        const addCartReq = await addToCart(cartProduts);
        addToCartContext(cartProduts);
        if (addCartReq?.success) {

            Router("/checkout");
        } else {
            notify("error", "something went wrong");
        }
    };

    // View
    let contentView;
    let products = cartProduts;
    if (products && products.length > 0) {
        contentView = (
            <>
                <div className="ps-section__content">
                    <CartItems cartItems={products} callBackFn={isCartRefresh}
                        increaseCart={increaseCartCount} decreaseCart={decreaseCartCount} />
                    <div className="ps-section__cart-actions">
                        <button onClick={() => Router("/shop")} className="ps-btn">Back to Shop</button>
                    </div>
                </div>
                <div className="ps-section__footer">
                    <div className="row justify-space-between">
                        <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            {/* <div className="row">
                                    <div className="col-lg-6">
                                        <figure>
                                            <figcaption>
                                                Coupon Discount
                                            </figcaption>
                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter coupon here..."
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button className="ps-btn ps-btn--outline">
                                                    Apply
                                                </button>
                                            </div>
                                        </figure>
                                    </div>
                                </div> */}
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <CartSummary source={products} />

                            <button onClick={() => handleCheckOut()} className="ps-btn ps-btn--fullwidth">
                                Proceed to checkout
                            </button>

                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        contentView = (
            <>
                <div className="ps-section__content">
                    <div className="alert alert-info">
                        <p className="mb-0">
                            Your cart is currently empty.
                        </p>
                    </div>

                    <div className="ps-section__cart-actions">

                        <button onClick={() => Router("/shop")} className="ps-btn">Back to Shop</button>

                    </div>
                </div>
            </>
        );
    }


    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Shopping Cart">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="ps-section--shopping ps-shopping-cart">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1>Shopping Cart</h1>
                            </div>
                            {contentView}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </>
    );
};

export default ShoppingCart;
