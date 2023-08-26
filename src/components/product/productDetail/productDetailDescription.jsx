import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const ProductDetailDescription = ({ product, callBackFn }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const stock_id = queryParams.get('s_id');
    const [stockData, setStockData] = useState([]);
    const [stockColor, setstockColor] = useState([]);
    const [color_index, setColorIndex] = useState(0);
    const [size_index, setSizeIndex] = useState(0);


    useEffect(() => {
        if (product?.stock_data?.length) {
            let group_by_color = [];
            product.stock_data.forEach((d, i) => {
                const findIndex = group_by_color.findIndex((c) => c.color == d.color);
                if (findIndex != -1) {
                    group_by_color[findIndex].stock_data.push(d);
                } else {
                    group_by_color.push({ color: d.color, stock_data: [d] });
                }
            });

            group_by_color.forEach((data, colorIndex) => {
                const findIndex = data.stock_data.findIndex((stock) => stock.stock_id == stock_id);
                if (findIndex != -1) {
                    setColorIndex(colorIndex);
                    setSizeIndex(findIndex);
                    setstockColor(group_by_color[colorIndex]?.stock_data);
                }

            });
            setStockData(group_by_color);
        }
    }, []);

    const applyOutline = (product, i) => {
        setColorIndex(i);
        setstockColor(stockData[i]?.stock_data);
        callBackFn(stockData[i]?.stock_data[0]);
    };
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
                {/* <li>{product.description}</li>
                <li>{product.description}</li>
                <li>{product.description}</li> */}

            </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div
                style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "10px" }}>Color :</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {
                        stockData.map((s, i) =>
                            <div id={`p_color_${i}`} onClick={() => {
                                applyOutline(s, i);
                            }} style={{ cursor: 'pointer', height: "3rem", width: "3rem", borderRadius: "50%", background: `${s.color}`, outlineOffset: "2px", outline: color_index == i ? `1.5px solid ${s.color}` : '' }}>

                            </div>
                        )
                    }



                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: "18px" }}>Size :</div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {stockColor?.map((s, i) =>
                        <div id={`p_size_${i}`} onClick={() => { callBackFn(s); setSizeIndex(i); }} style={{
                            display: "flex", cursor: 'pointer', height: "3rem", width: "3rem", borderRadius: "50%", alignItems: "center", justifyContent: "center", background: "#f1f1f1", outlineOffset: "2px", outline: size_index == i ? `1.5px solid` : ''
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
