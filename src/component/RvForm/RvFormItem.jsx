import React from 'react';
import PropTypes from "prop-types";
import {Form, Input} from "antd";
import lodash from "lodash";
import {getEnumDesc} from "../../util/enumHelp";
import {connect} from "react-redux";

@connect(
    state => ({
        enums: state.enums,
    })
)
export default class RvFormItem extends React.Component {

    constructor(props) {
        super(props);
    }

    //将传入的组件覆盖掉一些属性, 比如placeholder
    hoc = (props) => {
        return (fieldElem) => {
            return React.cloneElement(fieldElem, {
                ...props,
            });
        }
    }

    render() {
        const {rcForm: {getFieldDecorator}, itemLayout, rcFormMode} = this.context;
        // let {
        //     label, extra, width, formData, formFieldName, formFieldOption, dataIndex, displayDataIndex,
        //     placeholder, comp,
        //     displayRender, dataRender, enumType, enums: {data: enumsData}
        // } = this.props;
		let {label, extra, width, formData, formFieldName, formFieldOption, dataIndex, displayDataIndex,placeholder, comp, displayRender, dataRender, enumType, enums} = this.props;

        if (lodash.isFunction(comp)) {
            const {rcFormValues, rcForm} = this.context;
            comp = comp(rcFormValues, rcForm);
        }

        if (!comp)
            return null;

        let style = {}
        if (width) {
            style = {style: {width}};
        }

        const hocComponent = this.hoc({placeholder, ...{style}})(comp);


        let defaultValue = formData ? lodash.get(formData, dataIndex || formFieldName) : null
        const defaultDisplayValue = formData && displayDataIndex ? lodash.get(formData, displayDataIndex) : defaultValue;

        const displayValue = enumType ? getEnumDesc(enumsData, enumType, defaultValue) : (defaultDisplayValue || defaultValue)


        return (
            <Form.Item
                {...itemLayout}
                label={label}
                extra={extra}
            >
                {
                    rcFormMode === "view" ?
                        (
                            displayRender ?
                                displayRender(defaultValue, displayValue, formData)
                                :
                                displayValue
                        )
                        :
                        getFieldDecorator((formFieldName || dataIndex), {
                            initialValue: dataRender ? dataRender(defaultValue, formData) : defaultValue,
                            ...formFieldOption

                        })(
                            hocComponent
                        )
                }
            </Form.Item>
        );
    }

    static contextTypes = {
        rcForm: PropTypes.any,
        rcFormValues: PropTypes.object,
        itemLayout: PropTypes.object,
        rcFormMode: PropTypes.string,
    }


    static propTypes = {
        label: PropTypes.string,    //显示lable
        formFieldName: PropTypes.string,  //提交时的参数名称
        formFieldOption: PropTypes.any,  //提交时的参数名称
        defaultValue: PropTypes.any,  //作用于控件的初始值
        defaultDisplayValue: PropTypes.any,  //作用于控件的初始显示值
        placeholder: PropTypes.string,
        formData: PropTypes.object,
        width: PropTypes.any,

        /**
         *  自定义表单组件, 默认<Input/>.
         *
         *  支持func方式,如: (formValues, form)=><Input/>
         *      formValues:   为RvTableSearchBar的表单值 (监听)
         *      form:         RvTableSearchBar表单
         *  可以利用formValues 和 form 来做多个RvTableSearchBarItem之间的联动
         *  ps: 修改表单字段的值使用 form.setFieldsValue(...)
         */
        comp: PropTypes.any,
    }
    static defaultProps = {
        comp: <Input/>,
        width: "auto",
    }


    /**
     * 把 Object 配置 转换为 RvFormItem
     * @param fields
     *  [{
     *      label: '水系',
            name: 'riverSystemId',
            dataPath: 'riverSystem.id',  //填了:取FormData[dataPath], 没填取:将取FormData[name]
            dataDisplayPath: 'riverSystem.name',  //填了:取FormData[dataPath], 没填取:将取FormData[name]
            enumType: "RiverLevel",   //仅在formMode 为view 时生效, 枚举转换, 如果填写了将进行 value 变换
            option: {
                rules: [{
                    required: true,
                    message: '请选择水系!',
                },]
            },
            mode: ["create","view"],    //白名单, 应用模式(编辑,创建,查看), 默认不填就是所有
            comp: <RvRiverSystemSelect/>
     *  },...]
     *
     * @param mode 模式(不同模式先需要过滤的字段)
     * @param formData 初始数据集
     * @returns RvFormItem[]
     */
    static transform = (fields, formMode, formData) => {
        let transformFields = fields;
        const isArray = lodash.isArray(fields);
        if (!isArray) {
            transformFields = [fields]
        }
        const result =
            transformFields.filter((field) => {
                const {mode = ["create", "view", "edit","active"]} = field;
                return lodash.includes(mode, formMode) && !field.hide;
            }).map((field, index) => {
                const {label, name, option, mode, ...rest} = field;
                return <RvFormItem key={`${name}${index}`}
                                   label={`${label}`}
                                   formFieldName={`${name}`}
                                   formFieldOption={{...option}}
                                   {...rest}
                                   formData={formData}/>

            });

        return isArray ? result : result.find;
    }


}
