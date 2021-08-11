import React from 'react';
import {ConnectedRouter} from "connected-react-router";
import configureStore from "./redux/store/configureStore";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'


import history from './history'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider} from "antd";
import {LastLocationProvider} from 'react-router-last-location';

import {dynamicWrapper} from "./util/routerHelp";
import ErrorHandler from "./component/Exception/ErrorHandler"
import PrivateRoute from "./component/PrivateRoute";
import {Route, Switch} from "react-router";


export const {store, persistor} = configureStore();

export default class Root extends React.Component {

    render() {
        const UserLayout = dynamicWrapper(() => import(`@/container/App/UserLayout`) , {
            "/login": {name: "登录"},
        })

        const App = dynamicWrapper(() => import(`@/container/App/App`) )
        const ZLPlayer = dynamicWrapper(() => import(`@/view/player/ZLPlayer`) )

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <LastLocationProvider>
                            <LocaleProvider locale={zhCN}>
                                <ErrorHandler>
                                    <Switch>
                                        <Route exact path="/login" component={UserLayout}/>
                                        <Route exact path="/play" component={ZLPlayer}/>
                                        <PrivateRoute path="/" component={App}/>
                                    </Switch>
                                </ErrorHandler>
                            </LocaleProvider>
                        </LastLocationProvider>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        );
    }
}