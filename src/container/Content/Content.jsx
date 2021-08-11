import React from 'react';
import {connect} from "react-redux";
import {Avatar, Breadcrumb, Dropdown, Icon, Layout, Menu} from "antd";
import classnames from 'classnames';
import PropTypes from "prop-types";
import {navigationMetaData} from "../../config/modulesMetadata";
import lodash from "lodash";
import {Link} from "react-router-dom";
import "./Content.less"


@connect(
    state => ({
        router: state.router,
    })
)
export default class Content extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className={classnames("rv-module-content-wrap")}>
                <div className="rv-module-content">
                    <div className="rv-module-content-inner">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

    static contextTypes = {}
    static propTypes = {

    }
    static defaultProps = {

    }
}
