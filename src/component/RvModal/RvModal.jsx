import React from 'react';
import {Input, message, Modal} from "antd";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "../../Root";
import lodash from "lodash";

const RvModal = {};

RvModal.batchDeleteConfirm = (selectedItemsLength, props) => {
    if (selectedItemsLength > 0) {
        const config = {
            title: '您确定要删除选中行吗?',
            content: <div>当前共选择了 <span className="inactive-text">{selectedItemsLength}</span> 行</div>,
            type: 'confirm',
            okText: '确定',
            okType: 'danger',
            cancelText: '放弃',
            okCancel: true,
            ...props,
        };
        return Modal.confirm(config);
    } else {
        message.info('您当前还没有勾选行,请选择后再进行此操作!');
        return null;
    }
}

RvModal.deleteConfirm = (label, props) => {
    const config = {
        title: '您确定要删除吗?',
        content: <div><span className="inactive-text">{label}</span></div>,
        type: 'confirm',
        okText: '确定',
        okType: 'danger',
        cancelText: '放弃',
        okCancel: true,
        ...props,
    };
    return Modal.confirm(config);
}


RvModal.prompt = (title, label, props) => {
    let inputVal = "";
    const {onOk, autosize={minRows: 2, maxRows: 6},...rest} = props;
    const config = {
        title: title,
        content: <div><Input.TextArea onChange={(evt) => { inputVal=evt.target.value }}  placeholder={label} autosize={autosize}/></div>,
        type: 'confirm',
        okText: '确定',
        okType: 'info',
        cancelText: '放弃',
        okCancel: true,
        onOk: () => {
            return onOk(inputVal);
        },
        ...rest,
    };
    return Modal.confirm(config);
}


const IS_REACT_16 = !!ReactDOM.createPortal;


RvModal.open = (config, content) => {

    let div = document.createElement('div');
    document.body.appendChild(div);


    function close(...args) {
        if (IS_REACT_16) {
            render({...config, close, visible: false, afterClose: destroy.bind(this, ...args)});
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

        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
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
            <Modal
                {...props}
            >
                {hocContent}
            </Modal>
        </Provider>, div);
    }

    render({...config, visible: true, onCancel: close});
    return {
        destroy: close,
    };

}


export default RvModal;
