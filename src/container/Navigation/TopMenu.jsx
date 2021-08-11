import React from 'react';
import {Menu} from "antd";
import PropTypes from "prop-types";

export default class TopMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {menuData, selectedKeys} = this.props;
        return (
            <Menu
                theme="dark"
                defaultOpenKeys={['']}
                selectedKeys={selectedKeys}
                className="rv-navigation-menu"
                mode='horizontal'
            >
                {menuData}
            </Menu>
        );
    }

    static contextTypes = {}
    static propTypes = {
        menuData: PropTypes.array,
        selectedKeys: PropTypes.array,
    }
    static defaultProps = {}
}
