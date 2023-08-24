import React, { Component } from 'react';
import { Menu } from 'antd';
import { getAllSubCatService } from '../../../services/category-service';
import { Link } from 'react-router-dom';

class PanelCategories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subCategories: [],
        };
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };


    async componentDidMount() {
        try {
            const res = await getAllSubCatService();
            console.log('res', res);
            this.setState({ subCategories: res });
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    }



    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
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
                onOpenChange={this.onOpenChange}>
                {this.state.subCategories.map(category => (
                    <Menu.Item key={category.id} >
                        <a href={`/shop?sub_cat=${category.id}`} style={{ width: "100%", display: "block" }}>
                            {category.category_name}
                        </a>
                    </Menu.Item>

                ))
                }
            </Menu>
        );
    }
}

export default PanelCategories;
