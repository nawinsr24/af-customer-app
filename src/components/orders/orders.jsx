import React, { Component } from 'react';
import AccountMenuSidebar from './accountMenu';
import LazyLoad from 'react-lazyload';


class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/user-information',
                icon: 'icon-user',
            },
            {
                text: 'Your Orders',
                url: '/orders',
                icon: 'icon-store',
                active: true
            },
            {
                text: 'Order History',
                url: '/order-history',
                icon: 'icon-history',
            },
            {
                text: 'Invoices',
                url: '/invoices',
                icon: 'icon-papers',

            },
            // {
            //     text: 'Address',
            //     url: '/account/addresses',
            //     icon: 'icon-papers',
            // },
            // {
            //     text: 'Recent Viewed Product',
            //     url: '/account/recent-viewed-product',
            //     icon: 'icon-papers',
            // },
            // {
            //     text: 'Wishlist',
            //     url: '/account/wishlist',
            //     icon: 'icon-papers',
            // },
        ];
        const invoiceProducts = [
            {
                id: '6',
                thumbnail: 'https://beta.apinouthemes.com/uploads/e98492a0c2b24ae5892641009bf21056.jpg',
                title: 'Grand Slam Indoor Of Show Jumping Novel',
                vendor: "Robert's Store",
                sale: true,
                status: 'Today',
                price: '32.99',
                salePrice: '41.00',
                rating: true,
                ratingCount: '4',
                badge: [
                    {
                        type: 'sale',
                        value: '-37%',
                    },
                ],
            },
            {
                id: '7',
                thumbnail: 'https://reactstorefronts.com/static/img/categories/7.jpg',
                title: 'Sound Intone I65 Earphone White Version',
                vendor: 'Youngshop',
                sale: true,
                status: 'Tommorrow',
                price: '100.99',
                salePrice: '106.00',
                rating: true,
                ratingCount: '5',
                badge: [
                    {
                        type: 'sale',
                        value: '-5%',
                    },
                ],
            },
            {
                id: '7',
                thumbnail: 'https://beta.apinouthemes.com/uploads/feaeaa8c5d24474e943f57a7df55e921.jpg',
                title: 'Marshall Kilburn Portable Wireless Speaker',
                vendor: 'Youngshop',
                sale: true,
                status: '20 june 2023',
                price: '100.99',
                salePrice: '106.00',
                rating: true,
                ratingCount: '5',
                badge: [
                    {
                        type: 'sale',
                        value: '-5%',
                    },
                ],
            },
        ];
        return (
            <section style={{
                minHeight: '76vh', paddingTop: '10px'
            }
            } className="ps-my-account ps-page--account" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ps-page__left">
                                <AccountMenuSidebar data={accountLinks} />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-page__content">
                                <div className="ps-section--account-setting">
                                    <div className="ps-section__header">
                                        <h3>

                                            <strong>Your Orders</strong>
                                        </h3>
                                    </div>
                                    <div className="ps-section__content">
                                        {/* <div className="row">
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Address
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <strong>
                                                            John Walker
                                                        </strong>
                                                        <p>
                                                            Address: 3481 Poe
                                                            Lane, Westphalia,
                                                            Kansas
                                                        </p>
                                                        <p>
                                                            Phone: 913-489-1853
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Shipping Fee
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <p>
                                                            Shipping Fee: Free
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <figure className="ps-block--invoice">
                                                    <figcaption>
                                                        Payment
                                                    </figcaption>
                                                    <div className="ps-block__content">
                                                        <p>
                                                            Payment Method: Visa
                                                        </p>
                                                    </div>
                                                </figure>
                                            </div>
                                        </div> */}
                                        <div className="table-responsive">
                                            <table className="table ps-table--shopping-cart">
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {invoiceProducts.map(
                                                        product => (
                                                            <tr
                                                                key={
                                                                    product.id
                                                                }>
                                                                <td>
                                                                    <div className="ps-product--cart">
                                                                        <div className="ps-product__thumbnail">


                                                                            <a href={`/order-tracking/${product?.id}`}>
                                                                                <LazyLoad>
                                                                                    <img
                                                                                        src={product.thumbnail}
                                                                                        alt={product.thumbnail}
                                                                                    />
                                                                                </LazyLoad>
                                                                            </a>

                                                                        </div>
                                                                        <div className="ps-product__content">{
                                                                            <a href={`/order-tracking/${product.id}`} className="ps-product__title">{product.title}</a>
                                                                        }</div>
                                                                    </div>
                                                                    <div style={{ color: 'green' }}>
                                                                        <strong>Arriving {product.status}</strong>
                                                                    </div>
                                                                </td>
                                                                <td className="price">
                                                                    $
                                                                    {
                                                                        product.price
                                                                    }
                                                                </td>

                                                                <td>1</td>
                                                                <td className="price">
                                                                    $
                                                                    {
                                                                        product.price
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <a href="/invoices" className="ps-btn ps-btn--sm ">
                                            Back to invoices
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

export default OrderDetails;
