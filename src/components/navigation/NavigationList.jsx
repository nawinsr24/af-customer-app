import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import PanelMenu from './panel/PanelMenu';
import PanelCartMobile from './panel/PanelCartMobile';
import PanelSearch from './panel/PanelSearch';
import PanelCategories from './panel/PanelCategories';

class NavigationList extends Component {
    temp = true;
    constructor(props) {
        super(props);
        this.state = {
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        };
    }

    redirect() {
        console.log("Hii");
        // let Router = useNavigate();
        window.location.href = "/";
        // Router('/');
    };
    handleDrawerClose = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });

    };

    handleShowMenuDrawer = () => {
        this.setState({
            menuDrawer: !this.state.menuDrawer,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    handleShowCartDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: !this.state.cartDrawer,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };
    handleShowSearchDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: !this.state.searchDrawer,
            categoriesDrawer: false,
        });
    };
    handleShowCategoriesDrawer = () => {
        this.setState({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: !this.state.categoriesDrawer,
        });
    };

    render() {
        const {
            menuDrawer,
            searchDrawer,
            cartDrawer,
            categoriesDrawer,
        } = this.state;

        return (
            <div className="navigation--list">
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.menuDrawer}
                >
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Home</h3>
                            <span
                                className="ps-panel__close"
                                onClick={() => {
                                    this.redirect();
                                }}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelMenu />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.cartDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Shopping Cart</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCartMobile reFresh={!this.state.cartDrawer} />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.searchDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Search</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelSearch closeSearchDraw={this.handleDrawerClose} />
                        </div>
                    </div>
                </Drawer>
                <Drawer
                    className="ps-panel--mobile"
                    placement="right"
                    closable={false}
                    onClose={this.handleDrawerClose}
                    visible={this.state.categoriesDrawer}>
                    <div className="ps-panel--wrapper">
                        <div className="ps-panel__header">
                            <h3>Categories</h3>
                            <span
                                className="ps-panel__close"
                                onClick={this.handleDrawerClose}>
                                <i className="icon-cross"></i>
                            </span>
                        </div>
                        <div className="ps-panel__content">
                            <PanelCategories />
                        </div>
                    </div>
                </Drawer>
                <div className="navigation__content">
                    <a style={{ cursor: "pointer" }}
                        className={`navigation__item ${menuDrawer === true ? 'active' : ''
                            }`}
                        onClick={() => { this.redirect(); }}>
                        <i className="icon-menu"></i>
                        <span> Home</span>
                    </a>
                    <a style={{ cursor: "pointer" }}
                        className={`navigation__item ${categoriesDrawer === true ? 'active' : ''
                            }`}
                        onClick={this.handleShowCategoriesDrawer}>
                        <i className="icon-list4"></i>
                        <span> Categories</span>
                    </a>
                    <a style={{ cursor: "pointer" }}
                        className={`navigation__item ${searchDrawer === true ? 'active' : ''
                            }`}
                        onClick={this.handleShowSearchDrawer}>
                        <i className="icon-magnifier"></i>
                        <span> Search</span>
                    </a>
                    <a style={{ cursor: "pointer" }}
                        className={`navigation__item ${cartDrawer === true ? 'active' : ''
                            }`}
                        onClick={this.handleShowCartDrawer}>
                        <i className="icon-bag2"></i>
                        <span> Cart</span>
                    </a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};
export default NavigationList;
