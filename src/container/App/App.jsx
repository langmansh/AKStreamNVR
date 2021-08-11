import React from 'react';
import {connect} from "react-redux";
import {fetchEnums} from "../../redux/modules/global/action";
import MainRoutes from "./MainRoutes";
import MainLayout from "./MainLayout";
import DocumentTitle from "react-document-title";
import {getPageTitle} from "../../util/routerHelp";
import PropTypes from "prop-types";
// import axios from "axios";

@connect(
    state => ({
        enums: state.enums,
        userAuth: state.userAuth,
    }),
    {fetchEnums},

)
export default class App extends React.PureComponent {

    constructor(props) {
        super(props);
		// axios.defaults.headers['AccessKey'] = 'saddsaasdsadsadsda'
        this.state = {}
    }

    componentDidMount() {
        const {userAuth, enums} = this.props;
        //如果没有,尝试获取全局枚举
        if (userAuth.isAuthenticated && !(enums && enums.data)) {
            this.props.fetchEnums();
        }
    }

    render() {
        const {routerData, location} = this.props;
        return (
            <DocumentTitle title={getPageTitle(routerData, location)}>
                <MainLayout>
                    <MainRoutes/>
                </MainLayout>
            </DocumentTitle>
        );
    }

    getChildContext() {
        const {routerData, location} = this.props;
        return {
            routerData: routerData,
            location: location,
        }
    }

    static childContextTypes = {
        routerData: PropTypes.object,
        location: PropTypes.object,
    }

    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
