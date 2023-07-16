import React, { useEffect, useState } from 'react';
const ProductDetailDescription = ({ product, callBackFn }) => {
    const [stockData, setStockData] = useState([]);


    useEffect(() => {
        if (product?.stock_data?.length) {
            setStockData(product.stock_data);
        }
    }, []);


    return (<>
        <div className="ps-product__desc">
            <p>
                Sold By:

                <a href="/shop">
                    <strong> {product.vendor}</strong>
                </a>

            </p>
            <ul className="ps-list--dot">
                <li>{product.description}</li>
                <li>{product.description}</li>
                <li>{product.description}</li>
                <li>{product.description}</li>

            </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
                style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>Color :</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {
                        stockData.map((s, i) =>
                            <div onClick={() => callBackFn(s)} style={{ cursor: 'pointer', height: "3rem", width: "3rem", borderRadius: "50%", background: `${s.color}` }}>

                            </div>
                        )
                    }



                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: "18px" }}>Size :</div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {stockData.map((s, i) =>
                        <div onClick={() => callBackFn(s)} style={{
                            display: "flex", cursor: 'pointer', height: "3rem", width: "3rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", background: "#f1f1f1"
                        }}>
                            {s.size}
                        </div>
                    )}
                </div>
            </div>

        </div>

    </>);

};

export default ProductDetailDescription;
