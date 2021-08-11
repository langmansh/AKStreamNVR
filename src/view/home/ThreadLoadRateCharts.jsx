import React from 'react';
import {Axis, Chart, Geom, Tooltip} from "bizcharts";
import moment from "moment";

export default class ThreadLoadRateCharts extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        
        this.state = {
         
        }
    }

    componentDidMount() {

    }



    render() {
        return (
            <div>
                <Chart
                    forceFit
                    height={200}
                    data={this.props.chartData}
                    scale={{
                        time: {
                            // 需要自己计算合理的ticks分隔，不然会出现数据空白的现象
                            tickCount: 10
                        },
                        averageLoad: {
                            ticks: [0, 25, 50, 75, 100]
                        }
                    }}
                    padding={["auto", "auto", "auto", "auto"]}
                >
                    <Axis name="time" title={null} label={{
                        formatter: val => {
                            const ti = moment(parseInt(val));
                            return ti.format("mm:ss");
                        }
                    }}/>
                    <Axis
                        name="averageLoad"
                        title={null}
                        label={{
                            formatter: val => `${val}%`
                        }}
                    />
                    <Tooltip/>
                    <Geom
                        type="line"
                        position="time*averageLoad"
                        color={`l (270) 0:rgba(47,194,91,1) 0.5:rgba(206,241,141,1) 1:rgba(255,0,0,1)`}
                        tooltip={[
                            "time*averageLoad",
                            (time, averageLoad) => ({
                                title: moment(time).format("MM-DD HH:mm:ss"),
                                name: "平均负载率",
                                value: `${averageLoad.toFixed(2)}%`
                            })
                        ]}
                        select={[
                            true,
                            {
                                mode: "single"
                            }
                        ]}
                    />
                </Chart>
            </div>
        );
    }


    static propTypes = {}
    static defaultProps = {}
}
