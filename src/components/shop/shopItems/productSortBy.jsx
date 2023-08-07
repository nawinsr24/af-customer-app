import React from 'react';

const ProductSortBy = ({ sortTypeFn }) => {
    return (
        <select onChange={(e) => sortTypeFn(e.target.value)}
            className="ps-select form-control"
            data-placeholder="Sort Items">
            {/* <option>Sort by latest</option>
            <option>Sort by popularity</option>
            <option>Sort by average rating</option> */}
            <option value={'low_to_high'}>Sort by price: low to high</option>
            <option value={'high_to_low'}>Sort by price: high to low</option>
        </select>
    );
};

export default ProductSortBy;
