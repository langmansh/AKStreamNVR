import React from 'react';
import PropTypes from 'prop-types';
import {Breadcrumb, Layout} from "antd";
import lodash from 'lodash'
import {getPageName} from "../../util/routerHelp";
import "./RvPage.less"
import classnames from "classnames";
import RvDrawerLayoutSider from "./RvDrawerLayoutSider";


const HeaderTitle = (text) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item>{text}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default class RvPage extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            siderCollapsed: false,
            secondSiderCollapsed: false,
        }
    }

    toggleSiderCollapsed = () => {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        })
    }

    toggleSecondSiderCollapsed = () => {
        this.setState({
            secondSiderCollapsed: !this.state.secondSiderCollapsed,
        })
    }

    componentDidMount() {

    }

    render() {
        const {headerTitle, headerContent, headerTools, noHeader, siderContent, siderProps, siderCollapsible, secondSiderContent, secondSiderProps, secondSiderCollapsible, pageInnerDomId, pageInnerStyle} = this.props;

        const {siderCollapsed, secondSiderCollapsed} = this.state;

        const {routerData, location} = this.context;
        const defaultHeaderTitle = HeaderTitle(getPageName(routerData, location))

        let rvHeaderTitle = lodash.isUndefined(headerTitle) ? defaultHeaderTitle : headerTitle;
        if (lodash.isString(rvHeaderTitle)) {
            rvHeaderTitle = HeaderTitle(rvHeaderTitle)
        }

        const LayoutHeader = (
            <Layout.Header className="rv-page-header">
                <div className="rv-page-header-wrapper">
                    <div className="rv-page-header-title">
                        {rvHeaderTitle}
                    </div>
                    <div className="rv-page-header-content">
                        {headerContent}
                    </div>
                    <div className="rv-page-header-tools">
                        {headerTools}
                    </div>
                </div>
            </Layout.Header>
        )


        const sider = siderContent ? (
                <RvDrawerLayoutSider
                    collapsedWidth={0}
                    siderCollapsible={siderCollapsible}
                    siderCollapsed={siderCollapsed}
                    onCollapse={this.toggleSiderCollapsed}
                    {...siderProps}>
                    {siderContent}
                </RvDrawerLayoutSider>)
            : null

        const secondSider = secondSiderContent ? (
                <RvDrawerLayoutSider
                    collapsedWidth={0}
                    siderCollapsible={secondSiderCollapsible}
                    siderCollapsed={secondSiderCollapsed}
                    onCollapse={this.toggleSecondSiderCollapsed}
                    {...secondSiderProps}>
                    {secondSiderContent}
                </RvDrawerLayoutSider>)
            : null

        return (
            <Layout className={classnames("rv-page", this.props.className)}>
                {
                    noHeader ? null : LayoutHeader
                }
                <Layout.Content className="rv-page-content">
                    <Layout className="rv-page-sider-drawer-layout">
                        {sider}
                        {secondSider}
                        <Layout.Content>
                            <div className="rv-page-content-inner" style={pageInnerStyle} id={pageInnerDomId}>
                                {this.props.children}
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Layout>
        );
    }


    getChildContext() {
        return {
            pageInnerDomId: this.props.pageInnerDomId,
        }
    }


    static childContextTypes = {
        pageInnerDomId: PropTypes.string,
    }


    static contextTypes = {
        routerData: PropTypes.object,
        location: PropTypes.object,
    }

    static propTypes = {
        headerTitle: PropTypes.any,
        headerContent: PropTypes.object,
        headerTools: PropTypes.object,
        pageInnerStyle: PropTypes.object,

        noHeader: PropTypes.bool,
        siderContent: PropTypes.any,
        siderCollapsible: PropTypes.bool,
        siderProps: PropTypes.object,


        secondSiderContent: PropTypes.any,
        secondSiderCollapsible: PropTypes.bool,
        secondSiderProps: PropTypes.object,


        pageInnerDomId: PropTypes.string,
    }
    static defaultProps = {
        noHeader: false,
        siderStyle: {},
        siderCollapsible: true,

        secondSiderStyle: {},
        secondSiderCollapsible: true,


        pageInnerDomId: "rv_rsadfasdf4tpi_1",
    }
}

