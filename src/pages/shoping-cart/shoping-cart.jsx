import React, { useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import PageContainer from '../../components/layouts/PageContainer';
import FooterDefault from '../../components/footers/FooterFullwidth';
import CartItems from '../../components/shopping-cart/cartItems/cartItems';
import CartSummary from '../../components/shopping-cart/cart-summary';

const ShoppingCart = ({ ecomerce }) => {
    // const { products, getProducts } = useEcomerce();

    useEffect(() => {
        // if (ecomerce.cartItems) {
        // getProducts(ecomerce.cartItems, 'cart');
        // }
    }, [ecomerce]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shopping Cart',
        },
    ];

    // View
    let contentView;
    let products = [{ id: 1, quantity: 1, price: 200, thumbnail: 'https://beta.apinouthemes.com/uploads/e98492a0c2b24ae5892641009bf21056.jpg', title: 'Sleeve Linen Blend Caro Pane Shirt' },
    { id: 2, quantity: 2, price: 200, thumbnail: 'https://beta.apinouthemes.com/uploads/e98492a0c2b24ae5892641009bf21056.jpg', title: 'Sleeve Linen Blend Caro Pane Shirt' }];
    if (products) {
        if (products.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <CartItems cartItems={products} />
                        <div className="ps-section__cart-actions">
                            <a href="/" className="ps-btn">Back to Shop</a>
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

                                <a href="/checkout" className="ps-btn ps-btn--fullwidth">
                                    Proceed to checkout
                                </a>

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

                            <a href="/" className="ps-btn">Back to Shop</a>

                        </div>
                    </div>
                </>
            );
        }
    } else {
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
