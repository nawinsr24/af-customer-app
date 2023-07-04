import React from 'react';

const CustomPagination = () => {
    return (
        <div className="ps-pagination">
            <ul className="pagination">
                <li className="active">
                    <a>1</a>
                </li>
                <li>
                    <a>2</a>
                </li>
                <li>
                    <a>3</a>
                </li>
                <li>
                    <a>
                        Next Page
                        <i className="icon-chevron-right"></i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default CustomPagination;
