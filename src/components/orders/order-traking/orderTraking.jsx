import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from '../accountMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { trackOrder } from '../../../services/checkout-service';

const OrderTrakingDetails = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Access query parameters
    const data = queryParams.get('data');
    const [trackData, setTrackData] = useState(null);
    const [Tracking, setTracking] = useState(null);
    const Router = useNavigate();

    const getTrackData = async () => {
        const res = await trackOrder(trackData.awb);
        setTracking(res);
    };
    useEffect(() => {
        if (data) {
            const decrypt = JSON.parse(atob(data));
            setTrackData(decrypt);
        } else {
            Router('/orders');
            return;
        }
        if (trackData?.awb) {
            getTrackData();
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
                                <div className="ps-section__content" style={{ marginBottom: '4rem' }} >
                                    <div>
                                        <div >
                                            <h4 style={{ color: 'green' }}>

                                                <strong>{Tracking?.delivered
                                                    ? `Delivered on ${Tracking?.delivered_on || ''}`
                                                    : `Arriving on ${Tracking?.est_delivery_date || ''}`}</strong>
                                            </h4>
                                        </div>
                                        {/* <div className="col-md-4 col-12">
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
                                        </div> */}
                                        {/* {trackData?.order_stock?.map(
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
                                                </>





                                            )
                                        )} */}
                                    </div>
                                    <>
                                        <div style={{ margin: "10px 0px" }} className='order-traker'>
                                            <div class="wrapper">
                                                <ul class="StepProgress">
                                                    <li class="StepProgress-item is-done"><strong>Order Placed</strong>
                                                        {trackData?.order_date || ''}</li>
                                                    <li class={Tracking?.shipped ? 'StepProgress-item is-done' : 'StepProgress-item'}><strong>Order Shipped</strong>
                                                        {Tracking?.shipped_on || ''}
                                                    </li>
                                                    <li class={Tracking?.transist ? 'StepProgress-item is-done' : 'StepProgress-item'}><strong>Order in Transist</strong>
                                                        {Tracking?.transisted_on || ''}</li>
                                                    <li class={Tracking?.delivered ? 'StepProgress-item is-done' : 'StepProgress-item'}><strong>Order Delivered</strong>{Tracking?.delivered_on || ''}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="ps-block__tab" style={{ marginTop: "3rem" }}>
                                            <button
                                                className="ps-btn"
                                                onClick={(e) => Router('/orders')}>
                                                Back

                                            </button>
                                        </div>
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
        </section >
    );
};


export default OrderTrakingDetails;
