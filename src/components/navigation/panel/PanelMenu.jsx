import React, { Component } from 'react';

import { Menu } from 'antd';
import menu_data from '../../../static/data/menu.json';
const { SubMenu } = Menu;

class PanelMenu extends Component {
    constructor(props) {
        super(props);
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                className="menu--mobile-2">
                {menu_data.menuPrimary.menu_1.map((item) => {
                    if (item.subMenu) {
                        return (
                            <SubMenu
                                key={item.text}
                                title={
                                    
                                        <a href={item.url}>{item.text}</a>
                                   
                                }>
                                {item.subMenu.map((subItem) => (
                                    <Menu.Item key={subItem.text}>
                                       
                                            <a href={subItem.url}>{subItem.text}</a>
                                        
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    } else if (item.megaContent) {
                        return (
                            <SubMenu
                                key={item.text}
                                title={
                                   
                                        <a href={item.url}> {item.text}</a>
                                    
                                }>
                                {item.megaContent.map((megaItem) => (
                                    <SubMenu
                                        key={megaItem.heading}
                                        title={<span>{megaItem.heading}</span>}>
                                        {megaItem.megaItems.map(
                                            (megaSubItem) => (
                                                <Menu.Item
                                                    key={megaSubItem.text}>
                                                    
                                                        <a href={item.url}>
                                                            {megaSubItem.text}
                                                        </a>
                                                   
                                                </Menu.Item>
                                            )
                                        )}
                                    </SubMenu>
                                ))}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={item.text}>
                                {item.type === 'dynamic' ? (
                                    <a
                                        href={`${item.url}/`}
                                        as={`${item.url}/${item.endPoint}`}>
                                        l<span>{item.text}</span>
                                    </a>
                                ) : (
                                   
                                        <a href={item.url} as={item.alias}>{item.text}</a>
                                   
                                )}
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default PanelMenu;
