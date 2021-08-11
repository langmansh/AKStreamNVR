import React from 'react';
import {Route, Switch} from 'react-router';
import PrivateRoute from "../../component/PrivateRoute/PrivateRoute";
import {routesMetaData} from '../../config/modulesMetadata'
import NotFound from "../../view/errorPage/NotFound";
import Content from "../Content/Content";
import {dynamicWrapper} from "../../util/routerHelp";


//React HOC
const wrapping = (WrappedComponent, meta) => {
    return class extends React.Component {
        render() {
            return (
                <Content>
                    <WrappedComponent  {...this.props}/>
                </Content>
            );
        }
    }
}

/**
 * 遍历元数据并 生成 Route
 */
const routes = routesMetaData.filter(data => data.routerInnerComponent).map((data, index) => {

    const loadableComp = dynamicWrapper(data.routerInnerComponent);

    return <PrivateRoute
        exact={data.routerExact}
        path={data.fullpath}
        allowEnterAuthorities={data.authorities}
        component={
            wrapping(loadableComp, data)
        }
        key={`private-route-${index}`}/>
});


const MainRoutes = () => {

    return (
        <Switch>
            {routes}
            <Route component={NotFound}/>
        </Switch>
    );
};

export default MainRoutes;
