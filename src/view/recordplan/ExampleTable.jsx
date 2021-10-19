import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, DatePicker } from 'antd';
import "./ExampleTable.less";
import moment from 'moment';

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

      if (values.startTime !== undefined) {
        values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
      }
      if (values.endTime !== undefined) {
        values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss');
      }

      handleSave({ ...record, ...values });
    });
  };

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
              message:  `输入正确的${title}`,
            },
          ],
          initialValue: record[dataIndex],
        })(dataIndex === 'weekDay' ? <Select
          // showSearch
          // style={{ width: 200 }}
          // placeholder="选择星期"
          optionFilterProp="children"
          // onChange={onChange}
          // onFocus={onFocus}
          onBlur={this.save}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="1">星期一</Option>
          <Option value="2">星期二</Option>
          <Option value="3">星期三</Option>
          <Option value="4">星期四</Option>
          <Option value="5">星期五</Option>
          <Option value="6">星期六</Option>
          <Option value="0">星期天</Option>
        </Select> : <DatePicker
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

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '星期',
        dataIndex: 'weekDay',
        editable: true,
      },
      {
        title: '开始录制时间',
        dataIndex: 'startTime',
        editable: true,
      },
      {
        title: '结束录制时间',
        dataIndex: 'endTime',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="是否删除该条计划？" onConfirm={() => this.handleDelete(record.streamDvrPlanId)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      count: 0,
    };
  }

  handleClick = () => {
    console.log(this.props)
    this.props.getMsg(this.state.dataSource)
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.streamDvrPlanId !== key) });
  };

  handleAdd = () => {
    const {mode} = this.props
    const { dataSource } = mode === 'edit' ? this.props : this.state;
    const { count } = this.state;
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
    const {mode} = this.props
    const { dataSource } = mode === 'edit' ? this.props : this.state;
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.streamDvrPlanId === item.streamDvrPlanId);
    // const item = newData[index];
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      this.setState({ dataSource: newData });
      this.handleClick();
    } else {
      newData.push(dataSource);
      this.setState({ dataSource: newData });
    }
    // newData.splice(index, 1, {
    //   ...item,
    //   ...row,
    // });

    // this.setState({ dataSource: newData });
  };

  render() {
    const {mode} = this.props
    const { dataSource } = mode === 'edit' ? this.props : this.state;

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
          添加规则
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