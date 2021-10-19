import React from 'react';
import "./RecordPlan.less"
import {Button,message, Table,Icon, Input, Radio, Tabs, Tooltip} from "antd";
import {GetRecordPlanList,DeleteRecordPlanByName} from "../../service/channel";
import RvPage from "../../component/RvPage/RvPage";
import EditForm from "./EditForm";
import RvModal from "../../component/RvModal/RvModal";

export default class Device extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            data: [],
            dataTotal: 0,
            page: 1,
            pageSize: 10,
        }
    }
    
    componentDidMount() {
        this.loadChanelsData()
    }
    
    loadChanelsData = (name) => {
    	GetRecordPlanList(name).then(res => {
			
			if(res._success == true && res._statusCode == 200 && res.data.length > 0)
			{
				this.setState({
				    data: res.data,
				    dataTotal: res.data.length,
				    page: res.data.length,
				    pageSize: res.data.length,
				})
			}else{
				this.setState({
				    data: [],
				    dataTotal: 0,
				    page: 1,
				    pageSize: 1,
				})
			}
    	})
    }
    
    editRecordPlan = (record) => {
        RvModal.open({
            width: 1120,
            title: `编辑录制计划: ${record.name}`,
            footer: null,
            onCancel: (args) => args.refresh && this.loadChanelsData(),
        }, <EditForm mode="edit" record={record} />)
    }

    
    deleteRecordPlan = (record) => {
        DeleteRecordPlanByName(record.name).then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				message.success('删除『' + record.name + '』成功!');
				this.loadChanelsData()
			}
        })
    }
    
    render() {
    
    
        return (
            <RvPage className={"home-page"} headerTools={
				<div>
					<Button icon={"plus"} type="primary" onClick={() => {
					    RvModal.open({
					        width: 950,
					        title: `创建录制计划`,
					        footer: null,
					        onCancel: (args) => args.refresh && this.loadChanelsData(),
					    }, <EditForm mode="create"/>)
					}}>创建录制计划</Button>
				</div>
			}>
                <Table className={"device-table"}
                       columns={[
                           {
                               title: '录制计划名称',
                               dataIndex: 'name',
                               key: 'name',
                           },
    					   {
    					       title: '录制计划描述',
    					       dataIndex: 'describe',
    					       key: 'describe',
    					   },
						   {
						       title: '天数限制',
						       dataIndex: 'limitDays',
						       key: 'limitDays',
						   },
						   {
						       title: '空间大小限制(GB)',
						       dataIndex: 'limitSpace',
						       key: 'limitSpace',
							   render: (text, record) => (
							       text / 1024 / 1024 / 1024
							   ),
						   },
						   {
						       title: '超出后停止计划',
						       dataIndex: 'overStepPlan',
						       key: 'overStepPlan',
						       width: 160,
							   render: (text, record) => (
							       text == 0 ? '停止录制'  : '删除文件'
							   ),
						   },
                           {
                               title: '操作',
                               key: 'action',
                               width: 200,
                               render: (text, record) => (
								   <div>
										{/*<span>*/}
										{/*{<a href="javascript:;" onClick={()=>this.editRecordPlan(record)}>编辑</a>}*/}
										{/*</span>*/}
										{/*&nbsp;&nbsp;&nbsp;*/}
										<span>
										{<a href="javascript:;" onClick={()=>this.deleteRecordPlan(record)}>删除</a>}
										</span>
								   </div>
                                   
                               ),
                           },
                       ]}
                       dataSource={this.state.data}
                       pagination={{
                           onChange: page => {
                               this.loadChanelsData({
                                   page: page,
                               })
                           },
                           current: this.state.page,
                           showQuickJumper: true,
                           total: this.state.dataTotal,
                           pageSize: this.state.pageSize,
                       }}
                />
            </RvPage>
        );
    }
    
    static propTypes = {}
    static defaultProps = {}
}
