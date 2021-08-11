import React from 'react';
import {findServerConfigParams} from "../../service/global";
import Loader from "../../component/Loader";
import {List} from "antd";

export default class ServerConfigParams extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            serverConfigParams: null
        }
    }

    componentDidMount() {
        this.loadServerConfigParams();
    }

    loadServerConfigParams = () => {
        findServerConfigParams().then(res => {
            if (res.code == 0) {
                this.setState({
                    serverConfigParams: res.data[0]
                })
            }
        })
    }

    render() {
        const {serverConfigParams} = this.state;
        if(!serverConfigParams){
            return <Loader spinning={true}/>
        }

        const paramList= Object.entries(serverConfigParams);
        console.log("Object.entries(serverConfigParams):", paramList)

        return (
            <div>
                <List
                    size="small"
                    header={null}
                    footer={null}
                    bordered
                    dataSource={paramList}
                    renderItem={([pName, pVal]) => {
                        return (
                            <List.Item className={"servier-config-param-list-item"}>
                                <div>{pName}</div>
                                <div>{pVal}</div>
                            </List.Item>
                        )
                    }}
                />
            </div>
        );
    }


    static propTypes = {}
    static defaultProps = {}
}
