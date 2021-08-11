import React, {Fragment} from 'react';
import DocumentTitle from 'react-document-title';
import './UserLayout.less';
import {Link, Route, Switch} from "react-router-dom";
import {dynamicWrapper, getPageTitle} from "../../util/routerHelp";
import logo64 from '../../style/image/login/logo64.png'
import GlobalFooter from "../../component/GlobalFooter/GlobalFooter";
import {Alert, Icon} from "antd";

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright"/> AKStreamNVR 版权所有
    </Fragment>
);

export default class UserLayout extends React.PureComponent {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {routerData, location} = this.props;
        return (
            <DocumentTitle title={getPageTitle(routerData, location)}>
                <div className={"user-layout-container"}>
                    <div className={"user-layout-content"}>
                        <div className={"user-layout-top"}>
                            <div className={"user-layout-header"}>
                                <Link to="/">
                                    <img alt="logo" className={"user-layout-logo"} src={logo64}/>
                                    <span className={"user-layout-title"}>AKStreamNVR</span>
                                </Link>
                            </div>
                            <div className={"user-layout-desc"}>高性能运营级流媒体服务</div>
                        </div>
                        <Switch>
                            <Route exact path="/login" component={dynamicWrapper( () => import(`@/view/login/Login`))}/>
                        </Switch>
                    </div>
                    <Alert
                        message="支持现代浏览器和IE11及以上"
                        className={"user-layout-content-alert"}
                        description={
                            <span>推荐使用：
                                <ul>
                                    <li>
                                        <a rel="noopener noreferrer" href="https://pc.qq.com/detail/1/detail_2661.html" target="_blank">
                                            <Icon type="chrome"/>
                                            {" 谷歌(Google Chrome)浏览器"}
                                        </a>
                                    </li>
                                </ul>
                            </span>
                        }
                        type="info"
                        showIcon
                    />
                    <div className={"user-layout-content-blank"}></div>
                   {/* <GlobalFooter links={[]} copyright={copyright}/>*/}
                </div>
            </DocumentTitle>
        );
    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
