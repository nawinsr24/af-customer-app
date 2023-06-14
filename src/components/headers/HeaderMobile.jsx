import React, { Component } from 'react';
// import Link from 'next/link';
import { Link } from 'react-router-dom';
import MobileHeaderActions from './modules/MobileHeaderActions';

class HeaderMobile extends Component {
    constructor({ props }) {
        super(props);
    }

    render() {
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
                        method="get">
                        <div className="form-group--nest">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Search something..."
                            />
                            <button>
                                <i className="icon-magnifier"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </header>
        );
    }
}

export default HeaderMobile;
