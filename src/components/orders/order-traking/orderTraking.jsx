import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from '../accountMenu';
import LazyLoad from 'react-lazyload';
import { useLocation, useNavigate } from 'react-router-dom';
import { notify } from '../../notify';
import Constants from '../../../constants';
import { trackOrder } from '../../../services/checkout-service';

const OrderTrakingDetails = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access query parameters
    const data = queryParams.get('data');
    console.log(data);

    const [trackData, setTrackData] = useState(null);
    const [ShowTimeLine, setShowTimeLine] = useState(false);
    const [Tracking, setTracking] = useState(null);
    const Router = useNavigate();
    useEffect(async () => {
        if (data) {
            const decrypt = JSON.parse(atob(data));
            console.log(decrypt);
            setTrackData(decrypt);
        } else {
            Router('/orders');
            return;
        }
        if (trackData?.awb) {
            const res = await trackOrder(trackData.awb);
            setShowTimeLine(true);
            console.log(res);
        }
    }, [data]);


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
        }
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
                                    <h3 style={{ margin: "10px 0px" }}>

                                        <strong>Track Order</strong>
                                    </h3>
                                </div>
                                <div className="ps-section__content" >
                                    <div>
                                        <div >
                                            <h4 style={{ color: 'green' }}>

                                                <strong>Arriving {trackData?.status}</strong>
                                            </h4>
                                        </div>
                                        <div className="col-md-4 col-12">
                                            <figure className="ps-block--invoice">
                                                <figcaption>
                                                    Address
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <strong>
                                                        {trackData?.delivery_name}
                                                    </strong>

                                                    <>
                                                        {" ," + trackData?.house_flat_no}
                                                        <br />
                                                        {trackData?.area + ', ' + trackData?.city + ', ' + trackData?.state

                                                        }
                                                        <br />
                                                        {trackData?.pincode}
                                                        <br />
                                                        contact : {trackData?.delivery_mobile_1}
                                                        <br />
                                                        {/* Emergency contact : {o.delivery_mobile_2} */}
                                                        {/* <div>
                                                            <h4 style={{ color: 'green', margin: '10px 0px', }}><strong>Arriving {trackData?.order_date}</strong></h4>
                                                        </div> */}
                                                    </>

                                                </div>
                                            </figure>
                                            <figure className="ps-block--invoice">
                                                <figcaption>
                                                    Shipping Fee
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <p>
                                                        Shipping Fee: {trackData?.delivery_charge || 0}
                                                    </p>
                                                </div>
                                            </figure>
                                            {/* <figure className="ps-block--invoice">
                                                <figcaption>
                                                    Payment
                                                </figcaption>
                                                <div className="ps-block__content">
                                                    <p>
                                                        Payment Method: Visa
                                                    </p>
                                                </div>
                                            </figure> */}
                                        </div>
                                        {trackData?.order_stock?.map(
                                            product => (

                                                <>
                                                    <div >

                                                        <div className="ps-product--cart" style={{ paddingBottom: '10px' }}>
                                                            <div className="ps-product__thumbnail">


                                                                <a href={`/product/${product?.id}`}>
                                                                    <LazyLoad>
                                                                        <img
                                                                            src={`${Constants.imgUrl}${product.images?.length && product.images[0]}`}
                                                                            alt={`${Constants.imgUrl}${product.images?.length && product.images[0]}`}
                                                                        />
                                                                    </LazyLoad>
                                                                </a>

                                                            </div>
                                                            <div className="ps-product__content">{
                                                                <a href={`/product/${product.id}`} className="ps-product__title">{product.name}</a>
                                                            }</div>
                                                        </div>

                                                    </div>
                                                    <div className="row" style={{ marginTop: '10px' }}>
                                                        {/* <div className="col-md-4 col-12">
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
                                                        </div> */}
                                                        <div className="col-md-4 col-12">
                                                            {/* <figure className="ps-block--invoice">
                                                                <figcaption>
                                                                    Shipping Fee
                                                                </figcaption>
                                                                <div className="ps-block__content">
                                                                    <p>
                                                                        Shipping Fee: Free
                                                                    </p>
                                                                </div>
                                                            </figure> */}
                                                        </div>
                                                        <div className="col-md-4 col-12">
                                                            {/* <figure className="ps-block--invoice">
                                                                <figcaption>
                                                                    Payment
                                                                </figcaption>
                                                                <div className="ps-block__content">
                                                                    <p>
                                                                        Payment Method: Visa
                                                                    </p>
                                                                </div>
                                                            </figure> */}
                                                        </div>
                                                    </div>
                                                </>





                                            )
                                        )}
                                    </div>
                                    <>
                                        {ShowTimeLine ? <div style={{ margin: "10px 0px" }} className='order-traker'>
                                            <div class="wrapper">
                                                <ul class="StepProgress">
                                                    <li class="StepProgress-item is-done"><strong>Order Received</strong>
                                                        11 june 2023</li>
                                                    <li class="StepProgress-item is-done"><strong>Order Processed</strong>
                                                        12 june 2023
                                                    </li>
                                                    <li class="StepProgress-item is-done"><strong>Order Dispatched</strong>
                                                        13 june 2023</li>
                                                    <li class="StepProgress-item"><strong>Order Deliverd</strong></li>
                                                    {/* <li class="StepProgress-item"><strong>Provide feedback</strong></li> */}
                                                </ul>
                                            </div>
                                        </div> : <div>
                                            <h4 style={{ color: "green" }}>Order Placed</h4>
                                        </div>}
                                    </>


                                    {/* <div className="table-responsive">
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
                                                                    <OrderTrakingProductCart
                                                                        product={
                                                                            product
                                                                        }
                                                                    />
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
                                        </div> */}
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
};


export default OrderTrakingDetails;
