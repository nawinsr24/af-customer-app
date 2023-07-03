import React, { Component } from 'react';
import AccountMenuSidebar from '../accountMenu';
import LazyLoad from 'react-lazyload';


class OrdersHistoryDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const accountLinks = [
            {
                text: 'Information',
                url: '/user-information',
                icon: 'icon-user',
            },
            {
                text: 'Your Orders',
                url: '/orders',
                icon: 'icon-store',

            },
            {
                text: 'Order History',
                url: '/order-history',
                icon: 'icon-history',
                active: true
            }
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
                status: '11 june 2023',
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

                                            <strong>Orders History</strong>
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
                                                                    <div style={{ color: 'black' }}>
                                                                        <strong>Delivered on {product.status}</strong>
                                                                    </div>
                                                                    <div className="ps-product--cart">
                                                                        <div className="ps-product__thumbnail">


                                                                            <a href={`/delivery-history/${product?.id}`}>
                                                                                <LazyLoad>
                                                                                    <img
                                                                                        src={product.thumbnail}
                                                                                        alt={product.thumbnail}
                                                                                    />
                                                                                </LazyLoad>
                                                                            </a>

                                                                        </div>
                                                                        <div className="ps-product__content">{
                                                                            <a href={`/delivery-history/${product.id}`} className="ps-product__title">{product.title}</a>
                                                                        }</div>
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
            </section>
        );
    }
}

export default OrdersHistoryDetails;
