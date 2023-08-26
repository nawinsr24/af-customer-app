import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeaderActions from './modules/MobileHeaderActions';

const HeaderMobile = ({ }) => {
    const Router = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [Temp, setTemp] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (keyword !== '') {
            Router(`/shop/?keyword=${keyword}`);
            setTemp(!Temp);
        }
    }


    return (
        <header className="header header--mobile">

            <div className="navigation--mobile">
                <div className="header__left">

                    <a href='/' className="ps-logo" style={{
                        display: "flex",
                        height: "100%",
                        width: "40%",
                        filter: "drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2))"
                    }}>
                        <img src={'/static/amirtha-fashion-images/amirtha-log.png'} alt="" />
                    </a>

                </div>
                <MobileHeaderActions />
            </div>
            <div className="ps-search--mobile">
                <form
                    className="ps-form--search-mobile"
                    action="/"
                    onSubmit={(e) => handleSubmit(e)}
                    method="get">
                    <div className="form-group--nest">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Search something..."
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button>
                            <i className="icon-magnifier"></i>
                        </button>
                    </div>
                </form>
            </div>
        </header>
    );

};

export default HeaderMobile;
