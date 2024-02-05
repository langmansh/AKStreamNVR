import React from 'react';

import moment from "moment";
import "./PlaybackPage.less"
import TimeSlider2 from "../../component/PlaybackTimeSlider/TimeSlider2";
import ReactPlayer from "../../component/ReactPlayer";
import {Calendar,message} from "antd";
// import {findChannelRecordDaily, findChannelRecordMonthly} from "../../service/channel";
import {GetHistroyRecordFileList, GetHistroyRecordFileStatus,HistroyVideo} from "../../service/channel";

export default class PlaybackPage extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            calValue: moment(),
            disabledDates: [],

            playTimestamp: null,
            recordMonthly: null,
            recordDaily: null,

            playSrcIdx: null,
            playbackRate: 1,
            playinfo: {
                kernel: 'flvjs',
                live: false,
                type: 'video/x-flv',
                config: {
                    flvType: "flv",
					enableWorker: true,
					hasAudio: false,
                    enableStashBuffer: false,
                    stashInitialSize: 384
                },
            }
        }

    }

    calDisabledDateFuc = (date) => {
        const {recordMonthly} = this.state;
        if (recordMonthly && recordMonthly.flagArr) {
            return recordMonthly.flagArr[date.date() - 1] === "0";
        }
        return true;
    }


    componentDidMount() {
        this.loadChannelRecord();
    }


    loadChannelRecord = () => {
        this.loadChannelRecordMonthly();
        // this.loadChannelRecordDaily();
    }


    loadChannelRecordMonthly = (params) => {
        const {channel} = this.props;
		GetHistroyRecordFileList(channel.parentId,channel.deviceId,{
		    sipRecordFileQueryType: 0,
		    startTime: this.state.calValue.format("YYYY-MM-DD 00:00:00"),
		    endTime:this.state.calValue.format("YYYY-MM-DD 23:59:59"),
			taskId:0,
		    ...params
		}).then(res => {
            
			setTimeout(()=>{
				GetHistroyRecordFileStatus(res.data).then(res => {
                    if(res.data.code === 500)
                    {
                        message.error('没有找到录像资源');
                    }else{
                        this.setState({
                            recordMonthly: {
                                ...res.data.recItems,
                                // flagArr: Array.from(res.data.taskId)
                                taskId:res.data.taskId,
                                ssrcId:Array.from(res.data.recItems)
                            }
                        })
                        this.setState({
                            playSrcIdx: res.data.recItems && res.data.tatolCount > 0 ? res.data.tatolCount : null,
                            recordDaily: {
                                ...res.data.recItems,
                                taskId:res.data.taskId,
                                list: res.data.recItems ? res.data.recItems.map((record, recordIndex) => {
                            
                                    const beginTime = moment(record.startTime, "YYYY-MM-DD HH:mm:ss");
                                    const endTime = moment(record.endTime, "YYYY-MM-DD HH:mm:ss");
                            
                                    return {
                                        ...record,
                                        beginTime: beginTime.valueOf(),
                                        endTime: endTime.valueOf(),
                                        style: {
                                            background: "rgba(14,255,0,0.49)"
                                        },
                                        idx: recordIndex,
                                    }
                                }):[]
                            }
                        })
                    }
				})
			},2000)  
		}).then(res => {
			setTimeout(()=>{
				console.log(res)
			},2000)  
		})
        // findChannelRecordMonthly(channel.vhost, channel.app, channel.stream, this.state.calValue.format("YYYYMM")).then(res => {
        //     if (res.code == 0) {
        //         this.setState({
        //             recordMonthly: {
        //                 ...res.data,
        //                 flagArr: Array.from(res.data.flag)
        //             }
        //         })
        //     }
        // })

    }

    // loadChannelRecordDaily = () => {
    //     const {channel} = this.props;
    //     findChannelRecordDaily(channel.vhost, channel.app, channel.stream, this.state.calValue.format("YYYYMMDD")).then(res => {
    //         if (res.code == 0) {
    //             this.setState({
    //                 playSrcIdx: res.data && res.data.list && res.data.list.length > 0 ? 50 : null,
    //                 recordDaily: {
    //                     ...res.data,
    //                     list: res.data && res.data.list ? res.data.list.map((record, recordIndex) => {

    //                         const beginTime = moment(record.startAt, "YYYYMMDDHHmmss")
    //                         const endTime = moment(beginTime).add(record.duration, "seconds");

    //                         return {
    //                             ...record,
    //                             beginTime: beginTime.valueOf(),
    //                             endTime: endTime.valueOf(),
    //                             style: {
    //                                 background: "rgba(14,255,0,0.49)"
    //                             },
    //                             idx: recordIndex,
    //                         }
    //                     }):[]
    //                 }
    //             })
    //         }
    //     })
    // }


    handleCalendarSelect = (date) => {
        this.setState({
            calValue: date
        }, () => {
            this.loadChannelRecord();
        })
    }

    handlePlayerEnded = () => {
        const {recordDaily, playSrcIdx} = this.state;
        console.log("播完了:", playSrcIdx, recordDaily.list[playSrcIdx].mp4Full)

        if (playSrcIdx + 1 < recordDaily.list.length) {
            this.setState({
                playSrcIdx: playSrcIdx + 1
            })
        }
    }

    handlePlayerPlay = () => {
        const {playbackRate} = this.state;
		// console.log(playbackRate)
        this.reactPlayer && this.reactPlayer.setPlaybackRate(playbackRate);
    }

    handlePlayeTimeUpdate = (e) => {
        const {recordDaily, playSrcIdx, playTimestamp} = this.state;
        // recordDaily.list[playSrcIdx].beginTime;
		recordDaily.list[0].beginTime;
        this.setState({
            // playTimestamp: recordDaily.list[playSrcIdx].beginTime + (e.target.currentTime * 1000)
			playTimestamp: recordDaily.list[0].beginTime + (e.target.currentTime * 1000)
        })
    }

    handlePlaybackRateChange = (e) => {
        const playbackRate = e.target.playbackRate;
        this.setState({
            playbackRate
        }, () => {
            this.reactPlayer && this.reactPlayer.setPlaybackRate(playbackRate);
        })
    }

    render() {
        const {recordDaily, playinfo, calValue, playSrcIdx, playTimestamp} = this.state;

        console.log("recordDaily.list[playSrcIdx].mp4Full", playSrcIdx, recordDaily && recordDaily.list && recordDaily.list.length > 0 && recordDaily.list[playSrcIdx] && recordDaily.list[playSrcIdx].mp4)

		if(recordDaily && recordDaily.list && recordDaily.list.length > 0)
		{
			if(recordDaily.list[0].mediaServerStreamInfo.playUrl.length == 0)
			{
				HistroyVideo(recordDaily.taskId,recordDaily.list[0].ssrcId).then(res => {
					recordDaily.list[0].mediaServerStreamInfo.playUrl = res.data.playUrl
				})
			}
		}
        return (
            <div className={"playback-play-container"}>

                <div className={"playback-play-header"}>
                    <div className={"playback-player"}>
                        {
                            playSrcIdx != null && recordDaily && recordDaily.list && recordDaily.list.length > 0 && recordDaily.list[playSrcIdx] &&
                            <ReactPlayer
                                ref={(reactPlayer) => this.reactPlayer = reactPlayer}
                                className={"playback-zpplayer-player"}
                                {...playinfo}
                                // src={recordDaily.list[playSrcIdx].mp4Full}
								src={recordDaily.list[0].mediaServerStreamInfo.playUrl[1]}
                                onRateChange={this.handlePlaybackRateChange}
                                onEnded={this.handlePlayerEnded}
                                onPlay={this.handlePlayerPlay}
                                onTimeUpdate={this.handlePlayeTimeUpdate}
                                autoplay/>
                        }

                    </div>
                    <div className={"playback-calendar"}>
                        <Calendar fullscreen={false}
                                  value={calValue}
                                  onChange={this.handleCalendarSelect}
                                //   disabledDate={this.calDisabledDateFuc}
                        />
                    </div>
                </div>

                <div className={"playback-play-bottom"}>
                    <TimeSlider2
                        minTimestamp={moment(calValue).startOf('day').valueOf()}
                        maxTimestamp={moment(calValue).add(1, "day").startOf('day').valueOf()}
                        playTimestamp={playTimestamp ? playTimestamp : moment(calValue).startOf('day').valueOf()}
                        playTimestampChange={(time, recordInfo, playOffset) => {
							console.log(12312321321321)
                            console.log("changeMp4:", time, recordInfo)
                            this.setState({
                                playSrcIdx: recordInfo ? recordInfo.idx : null,
                                playTimestamp: time
                            }, () => {
                                if (playOffset && this.reactPlayer)
                                    this.reactPlayer.setCurrentTime(playOffset / 1000);
                            })

                        }}
                        timecell={recordDaily && recordDaily.list ? recordDaily.list : []}/>

                </div>
            </div>
			
        );

    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
