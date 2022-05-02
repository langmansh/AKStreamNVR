import React from 'react';
import { Icon,Slider } from 'antd';
import './RvPtz.less';
import {PtzCtrl} from "../../service/channel";

class RvPtz extends React.Component {

    constructor(props) {
        super(props);
        const {deviceId,channelId} = this.props;
        this.state = {
            deviceId:deviceId,
            channelId:channelId,
            speed:50,
        }
    }

    componentDidMount() {

    }

    onChange = (checked) => {

    }

    

    PtzClickHandle = (ptzType) => {
        console.log(ptzType)
        let ptzClass = {
            ptzCommandType:ptzType,
            speed:this.state.speed,
            deviceId:this.state.deviceId,
            channelId:this.state.channelId
        }

        PtzCtrl(ptzClass).then((res) => {
            if (res._statusCode == 200 && res._success == true) {
                console.log(res.data)
            } else {
                console.log(res.data)
            }
        })
    }

    changeSpeedHandle = (value) => {
        this.setState({
            speed: value,
        })
    }

    render() {
        return (
            <div className="outer-ring">
                <Icon type="caret-up"  className="caret-up" onClick={()=>this.PtzClickHandle(1)} />
                <Icon type="caret-down"  className="caret-down" onClick={()=>this.PtzClickHandle(4)} />
                <Icon type="caret-left"  className="caret-left" onClick={()=>this.PtzClickHandle(7)} />
                <Icon type="caret-right"  className="caret-right" onClick={()=>this.PtzClickHandle(8)} />

                <div className="inner-ring">
                    <Icon type="plus"  className="plus" onClick={()=>this.PtzClickHandle(9)} />
                    <div className="line"></div>
                    <Icon type="minus"  className="minus" onClick={()=>this.PtzClickHandle(10)} />
                </div>

                <Icon type="caret-left" className="ob-caret-left" onClick={()=>this.PtzClickHandle(2)} />
                <Icon type="caret-up" className="ob-caret-up" onClick={()=>this.PtzClickHandle(3)}  />
                <Icon type="caret-right" className="ob-caret-right" onClick={()=>this.PtzClickHandle(6)} />
                <Icon type="caret-down" className="ob-caret-down" onClick={()=>this.PtzClickHandle(5)} />

                <div className="ptz-speed">
                    <Slider defaultValue={50} max={254} min={1} onChange={this.changeSpeedHandle} tooltipVisible />
                </div>
               
            </div>
            
        );
    }


    static propTypes = {}
    static defaultProps = {}
}

export default RvPtz;