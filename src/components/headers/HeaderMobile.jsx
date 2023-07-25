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
                <div className="navigation__left">
                    {/* <Link to="/"> */}
                    <a href="/" className="ps-logo">
                        <img
                            src="/static/img/logo_light.png"
                            alt="martfury"
                        />
                    </a>
                    {/* </Link> */}
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
