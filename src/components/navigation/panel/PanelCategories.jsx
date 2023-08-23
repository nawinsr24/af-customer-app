import React, { Component } from 'react';
import { Menu } from 'antd';
import categories from '../../../static/data/static-categories.json';
import { getAllSubCatService } from '../../../services/category-service';
// import { Router } from 'react-router-dom';

const { SubMenu } = Menu;

class PanelCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subCategories: [],
        };
        // this.Router = Router();
    }

    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    state = {
        openKeys: ['sub1'],
    };

    async componentDidMount() {
        try {
            const res = await getAllSubCatService();
            this.setState({ subCategories: res });
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
        console.log("BBBBBBBBBBBBBBBBBB", this.state.subCategories);
    }

    onSelect = (category) => {
        // const { history } = this.props;
        // history.push(`/shop/?sub_cat=${category.category_id}`);
    };

    // useEffect(() => {
    //     getData();
    // }, [])

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
                    <Menu.Item key={category.id}>
                        <a href={`/shop?sub_cat=${category.category_id}`}>
                            {category.category_name + category.category_id}
                        </a>
                    </Menu.Item>
                ))
                }
            </Menu>
        );
    }
}

export default PanelCategories;
