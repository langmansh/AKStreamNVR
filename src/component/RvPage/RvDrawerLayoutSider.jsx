import React from 'react'
import {Layout, Tooltip} from "antd";
import classnames from "classnames";

const RvDrawerLayoutSider = ({siderCollapsible, className, siderCollapsed, onCollapse, children, ...siderProps}) => {
    return (<Layout.Sider className={classnames("rv-page-sider-drawer", className)} collapsedWidth={0} collapsible={siderCollapsible} collapsed={siderCollapsed} theme="light" {...siderProps}>
        <div className="rv-page-sider-drawer-inner">
            {children}
        </div>
        {
            siderCollapsible ? <Tooltip placement="right" title={siderCollapsed ? "展开" : "收起"}>
                <a className="rv-page-sider-drawer-trigger-wrapper" onClick={onCollapse}>
                    <i className="drawer-trigger"></i>
                </a>
            </Tooltip> : null
        }

    </Layout.Sider>)
}


export default RvDrawerLayoutSider
