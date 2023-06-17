import React from 'react';

const ModulePaymentShipping = () => {
    return (
        <>
            <div className="ps-block__panel">
                <figure>
                    <small>Contact</small>
                    <p>test@gmail.com</p>

                    <a href="/checkout">Change</a>

                </figure>
                <figure>
                    <small>Ship to</small>
                    <p>2015 South Street, Midland, Texas</p>

                    <a href="/checkout">Change</a>

                </figure>
            </div>
            <h4>Shipping Method</h4>
            <div className="ps-block__panel">
                <figure>
                    <small>International Shipping</small>
                    <strong>$20.00</strong>
                </figure>
            </div>
        </>
    );
};

export default ModulePaymentShipping;
