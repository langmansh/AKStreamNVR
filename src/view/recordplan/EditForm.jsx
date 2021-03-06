import React,{ useContext, useState, useEffect, useRef } from 'react';
import {Button, Table,Radio, Icon, Input, InputNumber, message, Select,Popconfirm,Form,DatePicker} from "antd";
import PropTypes from "prop-types";
import RvForm from "../../component/RvForm/RvForm";
import "./EditForm.less";
import {BizRegex} from "../../util/globalHelp";
import {createChannel, findChannel, modifyChannel,ActiveVideoChannel,ModifyVideoChannel,GetVideoChannelList,AddVideoChannel,CreateRecordPlan,GetRecordPlanList} from "../../service/channel";
import RvSwitch from "../../component/RvSwitch/RvSwitch";
import UrlParse from 'url-parse'
import { FormInstance } from '../../../node_modules/antd/lib/form';
import moment from 'moment';

let timeRangeList = [];

const { MonthPicker, RangePicker } = DatePicker;


const { Option } = Select;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

function disabledDateTime() {
  return {
    disabledHours: () => range(0, 24).splice(0, 0),
    disabledMinutes: () => range(0, 0),
    disabledSeconds: () => [],
  };
}








function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {

}

function onSearch(val) {
  console.log('search:', val);
}


class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        // this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      // this.toggleEdit();

	  if(values.startTime !== undefined)
	  {
		  values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
	  }
	  if(values.endTime !== undefined)
	  {
		  values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss');
	  }

      handleSave({ ...record, ...values });
    });
  };
// (<Input ref={node => (this.input = node) } onPressEnter={this.save} onBlur={this.save} />)
  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `???????????????${title}`,
            },
          ],
          initialValue: record[dataIndex],
        })(dataIndex==='weekDay'?<Select
				// showSearch
				style={{ width: 200 }}
				// placeholder="????????????"
				optionFilterProp="children"
				onChange={onChange}
				onFocus={onFocus}
				onBlur={this.save}
				// onSearch={onSearch}
				filterOption={(input, option) =>
				  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
			  >
				<Option value="1">?????????</Option>
				<Option value="2">?????????</Option>
				<Option value="3">?????????</Option>
				<Option value="4">?????????</Option>
				<Option value="5">?????????</Option>
				<Option value="6">?????????</Option>
				<Option value="0">?????????</Option>
			  </Select>:<DatePicker
									format="HH:mm:ss"
							        // disabledDate={disabledDate}
							        disabledTime={disabledDateTime}
							        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
									onBlur={this.save}
							/>)}
		
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '??????',
        dataIndex: 'weekDay',
        width: '30%',
        editable: true,
      },
      {
        title: '??????????????????',
        dataIndex: 'startTime',
		editable: true,
      },
      {
        title: '??????????????????',
        dataIndex: 'endTime',
		editable: true,
      },
      {
        title: '??????',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="?????????????????????????" onConfirm={() => this.handleDelete(record.streamDvrPlanId)}>
              <a>??????</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      count: 0,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.streamDvrPlanId !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      streamDvrPlanId: count,
      weekDay: null,
      startTime: null,
      endTime: null,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.streamDvrPlanId === item.streamDvrPlanId);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
	
	

	timeRangeList = newData;

    this.setState({ dataSource: newData });

  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          ????????????
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

@RvForm.create()
export default class EditForm extends React.Component {

    constructor(props) {
        super(props);
		
		
        this.state = {
            loading: false,
            formData: {},
            fields: [
                {

                    label: '??????????????????',
                    name: 'name',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                }, {

                    label: '??????????????????',
                    name: 'describe',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                },{

                    label: '????????????',
					placeholder:'30',
                    name: 'limitDays',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                },{

                    label: '??????????????????(GB)',
					extra: '??????????????????(GB)',
                    name: 'limitSpace',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
                },{

                    label: '?????????????????????',
					extra: '?????????????????????????????????',
                    name: 'overStepPlan',
                    option: {
                        rules: [{
                            required: true,
                        },]
                    },
					comp: (
					    <Radio.Group buttonStyle="solid">
					        <Radio.Button value={"DeleteFile"}>????????????</Radio.Button>
							<Radio.Button value={"StopDvr"}>????????????</Radio.Button>
					    </Radio.Group>
					)
                },{

                    label: '????????????',
                    name: 'enable',
                    option: {
                        rules: [{
                            required: false,
                        },]
                    },
					comp: <RvSwitch/>,
                }
            ]
        }
    }

    componentDidMount() {
		const {mode,record} = this.props;
		if(mode == "create")
		{
			this.setState({
			    formData: {
					
			    },
			})
		}else if(mode == "edit"){
			this.setState({
			    loading: true,
			})
			GetRecordPlanList(record.name).then(res => {
				console.log(res)
				if(res._success == true && res._statusCode == 200 && res.data.length > 0)
				{
					res.data[0].limitSpace = res.data[0].limitSpace /1024/1024/1024
					res.data[0].overStepPlan = res.data[0].overStepPlan === 1 ? 'DeleteFile' : 'StopDvr'
					this.setState({
					    formData: {
					        ...res.data[0]
					    },
					})
				}else{
					this.setState({
					    formData: {
					        
					    },
					})
				}
			}).finally(() => {
			    this.setState({
			        loading: false,
			    })
			})
		}
    }


    handleEditSubmit = (values) => {
        const {channel} = this.props;
        ModifyVideoChannel(channel.mainId, values).then((res) => {
            if (res._statusCode == 200 && res._success == true) {
                message.info("??????????????????!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.data.Message);
            }
        })
    }

    handleCreateSubmit = (values) => {
		values.timeRangeList = timeRangeList
		values.limitSpace = values.limitSpace * 1024 * 1024 * 1024

		if(values.enable === 1)
		{
			values.enable = true
		}else{
			values.enable = false
		}
		console.log(values.enable)
        // this.handleSubmit(createChannel, values);
        CreateRecordPlan(values).then((res) => {
            if (res._statusCode == 200 && res._success == true) {
                message.info("????????????????????????!");
                this.closeModalIfExist({triggerCancel: true, refresh: true});
            } else {
                message.error(res.data.Message);
            }
        })
    }
	
	handleActiveSubmit = (values) => {
	    const {channel} = this.props;
	    ActiveVideoChannel(channel.mainId, values).then((res) => {
	        if (res._statusCode == 200 && res._success == true) {
	            message.info("??????????????????!");
	            this.closeModalIfExist({triggerCancel: true, refresh: true});
	        } else {
	            message.error(res.data.Message);
	        }
	    })
	}

    handleSubmit = (serviceFunc, values) => {

    }

    closeModalIfExist = (args) => {
        if (this.props.closeWrappingModal)
            this.props.closeWrappingModal(args);
    }

	
	render() {
        const {fields, loading, formData} = this.state;
        const {mode, form} = this.props;
        let _fields = fields;

        return (
            <RvForm
                footer={<div>
                    {mode != "view" ? <Button type="primary" htmlType="submit">??????</Button> : null}
                    <Button onClick={this.closeModalIfExist}>??????</Button>
                </div>}
                loading={loading}
                onEditSubmit={this.handleEditSubmit}
                onCreateSubmit={this.handleCreateSubmit}
				onActiveSubmit={this.handleActiveSubmit}
                {...this.props}>

                {RvForm.Item.transform(_fields, mode, formData)}
			<EditableTable dataSource={timeRangeList} />
            </RvForm>

        );
    }


    static contextTypes = {}
    static propTypes = {
        id: PropTypes.any,
        mode: PropTypes.string,
    }
    static defaultProps = {
        mode: "create",
    }
}
