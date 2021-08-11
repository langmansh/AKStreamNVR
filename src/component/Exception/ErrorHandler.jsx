import React from "react";
import {clearLocalCache} from "../../service/global";

export default class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true});
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
        console.debug(error);
    }

    reloadPage() {
        clearLocalCache().then(function() {
            window.location.reload()
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>出了点小问题，请尝试点击<button onClick={this.reloadPage}>清除缓存</button>，并重新登录。</h1>;
        }
        return this.props.children;
    }
}

