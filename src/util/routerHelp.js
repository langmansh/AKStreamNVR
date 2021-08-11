import Loadable from "react-loadable";
import {createElement} from "react";
import {routesMetaData} from "../config/modulesMetadata";
import Loader from "../component/Loader/Loader";
import React from "react";


const Loading = (props) => {
    console.log(props);
    return props.isLoading ? <Loader spinning={true}/> : null;
};

let _routesData = {};
routesMetaData.forEach(data => {
    _routesData[data.fullpath] = data;
})


export const pageTitleSuffix = " - AKStreamNVR";


export const dynamicWrapper = (component, routerData = _routesData) => {
    //const component = () => import(`@/${componentPath}`);

    console.log("dynamicWrapper",component)

    const loadableComp = Loadable({
        //ps: @是webpack 中定义的 src 路径别名
        loader: () => {
            return component().then(raw => {
                const Component = raw.default || raw;

                return props =>
                    createElement(Component, {
                        ...props,
                        routerData: routerData,
                    });
            });
        },
        loading: Loading,
    });


    return loadableComp;
}



export const getPageTitle = (routerData, location) => {
    return `${getPageName(routerData, location)}${pageTitleSuffix}`;
}

export const getPageName = (routerData, location) => {
    const {pathname} = location;
    let name = '';
    if (routerData[pathname] && routerData[pathname].name) {
        name = `${routerData[pathname].name}`;
    }
    return name;
}

