import React from 'react';
import "./Navigation.less"
import TopMenu from "./TopMenu";
import PropTypes from "prop-types";
import LoginedUserMenu from "./LoginedUserMenu";
import classnames from 'classnames';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {topMenuData, topMenuSelectedKeys, className} = this.props;

        return (
            <nav className={classnames("navbar", className)}>
                <div className="navbar-header">
                    <a className="navbar-home"></a>
                </div>
                <div className="navbar-menu">
                    <TopMenu menuData={topMenuData} selectedKeys={topMenuSelectedKeys}/>
                </div>
                <div className="navbar-right">
                    <LoginedUserMenu/>
                </div>
            </nav>
        );
    }

    static contextTypes = {}
    static propTypes = {
        className: PropTypes.string,
        topMenuData: PropTypes.array,
        topMenuSelectedKeys: PropTypes.array,
    }
    static defaultProps = {}
}
