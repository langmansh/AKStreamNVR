import React from 'react';
import {Button, message} from "antd";
import RvForm from "../../component/RvForm/RvForm";
import {findChannels, saveChannels} from "../../service/channel";
import RvJsonCodeMirror from "../../component/RvCodeMirror/RvJsonCodeMirror";
import "./BatchChannelForm.less"
import {isJsonArray} from "../../util/globalHelp";


@RvForm.create()
export default class BatchChannelForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            formData: {},
            fields: [
                {
                    label: 'data',
                    name: 'data',
                    option: {
                        //validateTrigger: 'onFocusout',
                        rules: [
                            {required: true},
                            {validator: this.checkJson},
                        ]
                    },
                    comp: <RvJsonCodeMirror height={500}/>,
                }
            ]
        }
    }

    checkJson=(rule, value, callback)=>{
        if(isJsonArray(value)){
            callback();
            return;
        }else{
            callback("无效的JSON Array");
        }
    }

    componentDidMount() {

        this.setState({
            loading: true,
        })
        findChannels({
            page: 1,
            pageSize: 99999,
        }).then((res) => {
            this.setState({
                formData: {
                    data: JSON.stringify(res.data,null, 4),
                },
            })
        }).finally(() => {
            this.setState({
                loading: false,
            })
        })

    }


    handleEditSubmit = (values) => {

        saveChannels(JSON.parse(values.data)).then((res) => {
            if (res.code == 0) {
                message.info("批量配置成功!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.msg);
            }
        })

    }

    closeModalIfExist = (args) => {
        if (this.props.closeWrappingModal)
            this.props.closeWrappingModal(args);
    }

    render() {
        const {fields, loading, formData} = this.state;
        if(loading)
            return null;
        const items = RvForm.Item.transform(fields, "edit", formData);


        return (
            <RvForm
                className={"batch-channel-form"}
                footer={<div>
                    <Button type="primary" htmlType="submit">保存</Button>
                    <Button onClick={this.closeModalIfExist}>放弃</Button>
                </div>}
                loading={loading}
                onEditSubmit={this.handleEditSubmit}
                onCreateSubmit={this.handleEditSubmit}
                itemLayout={{
                    labelCol: {
                        xs: {span: 0},
                        sm: {span: 0},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 24},
                    },
                }}
                {...this.props}>

                {items}
            </RvForm>
        );
    }


}
