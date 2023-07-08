import React, { useEffect, useState } from 'react';
import { Slider, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'next/router';

const WidgetShopFilterByPriceRange = ({ priceChange }) => {
    const Router = useNavigate();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10000);
    function handleChangeRange(value) {
        setMin(value[0]);
        setMax(value[1]);
        priceChange({
            price_from: value[0], price_to: value[1]
        });

        // Router(`/shop?price_from=${value[0]}&price_to=${value[1]}`);
    }
    useEffect(() => {
        handleChangeRange([min, max]);
    }, []);

    return (
        <aside className="widget widget_shop">
            <figure>
                <h4 className="widget-title">By Price</h4>
                <Slider
                    range
                    defaultValue={[0, 10000]}
                    max={10000}
                    onAfterChange={(e) => handleChangeRange(e)}
                />
                <p>
                    Price: ₹{min} - ₹ {max}
                </p>
            </figure>
        </aside>
    );
};

export default WidgetShopFilterByPriceRange;
