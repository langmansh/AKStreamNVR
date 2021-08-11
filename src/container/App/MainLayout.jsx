import React from 'react';
import {connect} from "react-redux";
import {Layout, Menu} from "antd";
import "./MainLayout.less"
import Navigation from "../Navigation/Navigation";
import {Link} from "react-router-dom";
import {navigationMetaData} from "../../config/modulesMetadata";
import lodash from "lodash";
import RvIcon from "../../component/RvIcon/RvIcon";
import SiderMenu from "../Navigation/SiderMenu";


@connect(
    state => ({
        enums: state.enums,
        userAuth: state.userAuth,
        router: state.router,
    })
)
export default class MainLayout extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            topMenuData: null,
        }
    }

    componentDidMount() {
        const topMenuData = this.generateMenu(navigationMetaData);
        this.setState({
            topMenuData
        })
    }

    /**
     * 通过模块元数据,递归,生成菜单
     */
    _generateMenu = (node, hiddenIcon, expand) => {

        const {path, onclick, external,fullpath, name, icon, target, routerInnerComponent} = node.model;
        const hasChildren = node.hasChildren();
        const childrenMenus = hasChildren ? node.children.filter(this.filterInvaildData) : [];

        const menuIcon = (!hiddenIcon && icon ? <RvIcon type={icon} className="rv-nav-menu-icon"/> : null);

        if (childrenMenus && childrenMenus.length > 0 && expand) {
            return (
                <Menu.SubMenu key={fullpath} className="rv-navigation-menu-subment" title={
                    <div>
                        {menuIcon}
                        <span>{name}</span>
                    </div>
                }>
                    {childrenMenus.map(child => this._generateMenu(child, hiddenIcon, expand))}
                </Menu.SubMenu>
            )
        } else {
            let realPath = fullpath;
            let hasChildren = childrenMenus && childrenMenus.length > 0;
            //查找子菜单中第一个有路由的
            if (hasChildren) {
                const target = childrenMenus.find((m) => m.model.routerInnerComponent);
                if (target) {
                    realPath = target.model.fullpath;
                }
            }


            return !external ?
                <Menu.Item key={fullpath}>
                    <Link to={realPath}>
                        {menuIcon}
                        <span className="nav-text">{name}</span>
                    </Link>
                </Menu.Item> :

                <Menu.Item key={fullpath}>
                    <a href={lodash.isFunction(path) ? path() : path} target={target} onClick={onclick}>
                        {menuIcon}
                        <span className="nav-text">{name}</span>
                    </a>
                </Menu.Item>
        }
    }

    generateMenu(node, hiddenIcon = true, expand = false) {
        if (!node)
            return [];
        return node.children.filter(this.filterInvaildData).map(child => this._generateMenu(child, hiddenIcon, expand));
    }

    /**
     * 过滤掉无效的数据
     * 1, 元数据节点不是菜单
     * 2, 元数据节点是菜单,但当前用户无权限访问
     */
    filterInvaildData = (node) => {
        return node.model.type === "menu" ;
    }


    getMainNavigationMenuSelected = () => {
        const that = this;
        //根据当前的 location.pathname 从元数据中找到节点, 通过 节点的路径 确定菜单高亮(选中)范围
        const {location} = this.props.router;

        const targetMetaNode = navigationMetaData.first({strategy: 'post'}, function (node) {
            if (node.model.routerExact) {
                return node.model.fullpath === location.pathname;
            } else {
                //如果不是严格匹配, 用 startsWith 做判断(节点必须是叶子菜单)
                const hasVaildChildren = node.hasChildren() && node.children.filter(that.filterInvaildData).length > 0;
                return node.model.fullpath == "/" || hasVaildChildren ? false : lodash.startsWith(location.pathname, node.model.fullpath);
            }
        });


        let mainNavigationMenuSelected = [];
        if (targetMetaNode) {
            const fullpathNodeArr = targetMetaNode.getPath().filter(n => !n.isRoot());
            //切掉无效的的菜单路径. ps: 菜单中只有"用户列表: /user" ,当地址是"用户创建: /user/create" , 切掉后保证菜单"用户列表"仍然选中高亮
            mainNavigationMenuSelected = lodash.dropRightWhile(fullpathNodeArr, (n) => !this.filterInvaildData(n)).map(n => n)
        }
        return mainNavigationMenuSelected;
    }

    render() {
        const {topMenuData} = this.state;

        const mainNavigationMenuSelected = this.getMainNavigationMenuSelected();
        const [sFirst, ...sMiddle] = mainNavigationMenuSelected;
        const siderMenuData = this.generateMenu(sFirst, false, true);

        const sider = siderMenuData && siderMenuData.length > 0 ? (
            <Layout.Sider collapsible={true}>
                <SiderMenu menuData={siderMenuData} selectedKeys={sMiddle.map(n => n.model.fullpath)}/>
            </Layout.Sider>
        ) : null

        const [navigationClassName, topMenuSelectedKeys] = sFirst && sFirst.model ? [sFirst.model.navClass, [sFirst.model.fullpath]] : [null, []];


        return (
            <Layout className="rv-ant-layout">
                <Layout.Header className="ant-layout-header">
                    <Navigation className={navigationClassName} topMenuData={topMenuData} topMenuSelectedKeys={topMenuSelectedKeys}/>
                </Layout.Header>
                <Layout>
                    {sider}
                    <Layout.Content className="ant-layout-content">
                        {this.props.children}
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
