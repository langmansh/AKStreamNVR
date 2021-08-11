import React from 'react';
import {Redirect, Route} from "react-router";
import {connect} from "react-redux";

/**
 * Router扩展, 增加验证认证信息和权限功能, 如果不通过就重定向(认证失败跳转login)
 */
@connect(
    state => ({
        userAuth: state.userAuth,
    }),
)
export default class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        const {
            component: InnerComponent,
            ...rest
        } = this.props;
        const {location} = this.props;

        const isUserAuthenticated = this.isAuthenticated();


        return (
            <Route
                {...rest}
                render={
                    props => (
                        isUserAuthenticated ?
                            <InnerComponent {...props} />
                            :
                            <Redirect to={{pathname: '/login', state: {from: location}}}/>
                    )
                }
            />
        );
    }


    //是否已认证(登录)
    isAuthenticated() {
        const {userAuth} = this.props;
        const isAuthenticated = userAuth.token && userAuth.isAuthenticated ? true : false;
        return isAuthenticated;
    }

}
