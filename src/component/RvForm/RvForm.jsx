import React from 'react';
import {Form, Spin} from "antd";
import PropTypes from "prop-types";
import lodash from "lodash";
import Item from "./RvFormItem";
import "./RvForm.less";
import {messages} from "../../util/asyncValidatorMessageesCn";

const excludeProp = ['items', 'closeWrappingModal', 'form', 'onValuesChange', 'loading', 'onEditSubmit', 'onCreateSubmit','itemLayout','onActiveSubmit'];

const defaultItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
}

const defaultToolsLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};


//包装一层, 监听 Form 的 onValuesChange
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
        }
    }

    handleValuesChange = (values) => {
        this.setState({
            values
        })
        const {handleValuesChange} = this.props;
        if (handleValuesChange) {
            handleValuesChange(values);
        }
    }

    render() {
        return (
            <RvForm {...this.props} onValuesChange={this.handleValuesChange}>
                {this.props.children}
            </RvForm>
        )
    }

    getChildContext() {
        const {values: rcFormValues} = this.state;
        return {
            rcFormValues,
        }
    }

    static childContextTypes = {
        rcFormValues: PropTypes.object,
    }

    static create = (options = {}) => {
        const defualtOptions = {validateMessages: messages};
        return Form.create({...defualtOptions, ...options})
    }

    static Item = Item;
}


@Form.create(
    {
        validateMessages: messages,
        onValuesChange: (props, changed, all) => {
            if (props.onValuesChange)
                props.onValuesChange(all);
        }
    }
)
class RvForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {form, mode, onEditSubmit, onCreateSubmit,onActiveSubmit} = this.props;
        form.validateFields(
            (err, values) => {
                if (!err) {
                    if (mode === "edit") {
                        onEditSubmit(values);
                    } else if (mode === "create") {
                        onCreateSubmit(values);
                    }else if (mode === "active") {
                        onActiveSubmit(values);
                    }
                }
            }
        )
    }

    render() {
        const {footer, loading, children,itemLayout} = this.props;
        return (
            <Form onSubmit={this.handleSubmit} {...lodash.omit(this.props, excludeProp)}>
                <Spin spinning={loading}>
                    {children}
                    <Form.Item {...defaultToolsLayout} className="rc-form-tools">
                        {footer}
                    </Form.Item>
                </Spin>
            </Form>
        );
    }

    getChildContext() {
        const {form: rcForm, mode: rcFormMode, itemLayout} = this.props;
        return {
            rcForm,
            rcFormMode,
            itemLayout: {...defaultItemLayout,...itemLayout},
        }
    }


    static childContextTypes = {
        rcForm: PropTypes.any,
        itemLayout: PropTypes.object,
        rcFormMode: PropTypes.string,
    }


    static contextTypes = {}
    static propTypes = {
        closeWrappingModal: PropTypes.func,
        onValuesChange: PropTypes.func,

        /**
         *  edit: 编辑模式
         *  create: 创建模式
         *  view: 查看模式
         */
        mode: PropTypes.string,
        onEditSubmit: PropTypes.func,
        onCreateSubmit: PropTypes.func,
		onActiveSubmit:PropTypes.func,
    }
    static defaultProps = {
        mode: "edit",
    }
}
