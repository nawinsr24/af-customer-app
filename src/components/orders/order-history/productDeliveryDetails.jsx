import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';
import AccountMenuSidebar from '../accountMenu';
import ModulePaymentOrderSummary from '../../payment/paymentOrderSummary';

class ProductDeliveryDetails extends Component {
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

            },
            {
                text: 'Order History',
                url: '/order-history',
                icon: 'icon-history',
                active: true
            }
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

                                            <strong>Delivery Details</strong>
                                        </h3>
                                    </div>
                                    <div className="ps-section__content">

                                        <div style={{ marginBottom: '3rem' }}>
                                            <div>
                                                <div style={{ color: 'black' }}>
                                                    <strong>Delivered on {invoiceProducts[0].status}</strong>
                                                </div>

                                                <div className="ps-product--cart">
                                                    <div className="ps-product__thumbnail">


                                                        <a href={`/product/$11`}>
                                                            <LazyLoad>
                                                                <img
                                                                    src={invoiceProducts[0].thumbnail}
                                                                    alt={invoiceProducts[0].thumbnail}
                                                                />
                                                            </LazyLoad>
                                                        </a>

                                                    </div>
                                                    <div className="ps-product__content">{
                                                        <a href={`/product/${invoiceProducts[0].id}`} className="ps-product__title">{invoiceProducts[0].title}</a>
                                                    }</div>
                                                </div>


                                            </div>
                                        </div>

                                        <div className="row">
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
                                        </div>

                                        <div className='order-traker'>
                                            <div class="wrapper">
                                                <ul class="StepProgress">
                                                    <li class="StepProgress-item is-done"><strong>Order Received</strong>
                                                        11 june 2023</li>
                                                    {/* <li class="StepProgress-item is-done"><strong>Order Processed</strong>
                                                        12 june 2023
                                                    </li>
                                                    <li class="StepProgress-item is-done"><strong>Order Dispatched</strong>
                                                        13 june 2023</li> */}
                                                    <li style={{ height: '15px' }} class="StepProgress-item is-done"> <strong>Order Deliverd</strong> 13 june 2023</li>
                                                    {/* <li class="StepProgress-item"><strong>Provide feedback</strong></li> */}
                                                </ul>
                                            </div>
                                        </div>

                                        <div style={{ marginTop: '6rem' }}>
                                            < ModulePaymentOrderSummary />
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

export default ProductDeliveryDetails;
