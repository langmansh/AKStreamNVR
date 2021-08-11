

import React from 'react';
import {Drawer} from "antd";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../Root";
import lodash from "lodash";

const RvDrawer = {};


const IS_REACT_16 = !!ReactDOM.createPortal;


RvDrawer.open = (config, content) => {

    let div = document.createElement('div');
    document.body.appendChild(div);


    function close(...args) {
        if (IS_REACT_16) {
            render({...config, close, visible: false, onClose: destroy.bind(this, ...args)});
        } else {
            destroy(...args);
        }
    }

    function destroy(...args) {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args && args.length &&
            args.some(param => param && param.triggerCancel);

        if (config.onClose && triggerCancel) {
            config.onClose(...args);
        }
    }

    function hoc(props) {
        return (fieldElem) => {
            return React.cloneElement(fieldElem, {
                ...props,
            });
        }
    }

    function render(props) {
        const hocContent = hoc({closeWrappingModal: close})(lodash.isFunction(content) ? content(close) : content)

        ReactDOM.render(<Provider store={store}>
            <Drawer
                {...props}
            >
                {hocContent}
            </Drawer>
        </Provider>, div);
    }

    render({...config, visible: true, onClose: close});
    return {
        destroy: close,
    };

}


export default RvDrawer;
