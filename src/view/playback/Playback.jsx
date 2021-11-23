import React from "react";

import moment from "moment";
import "./Playback.less";
import TimeSlider2 from "../../component/PlaybackTimeSlider/TimeSlider2";
import ReactPlayer from "../../component/ReactPlayer";
import { Calendar, message } from "antd";
// import {findChannelRecordDaily, findChannelRecordMonthly} from "../../service/channel";
import {
  GetHistroyRecordFileList,
  GetHistroyRecordFileStatus,
  HistroyVideo,
  GetRecordFileList,
} from "../../service/channel";

export default class PlaybackPlay extends React.Component {
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
        kernel: "native",
        // kernel: 'hlsjs',
        // kernel: 'flvjs',
        live: false,
        // type: 'video/x-flv',
        config: {
          // flvType: "flv",
          enableWorker: true,
          hasAudio: false,
          enableStashBuffer: false,
          stashInitialSize: 384,
        },
      },
    };
  }

  calDisabledDateFuc = (date) => {
    const { recordMonthly } = this.state;
    if (recordMonthly && recordMonthly.flagArr) {
      return recordMonthly.flagArr[date.date() - 1] === "0";
    }
    return true;
  };

  componentDidMount() {
    this.loadChannelRecord();
  }

  loadChannelRecord = () => {
    this.loadChannelRecordMonthly();
    // this.loadChannelRecordDaily();
  };
  UNSAFE_componentWillReceiveProps() {
    this.loadChannelRecordMonthly();
  }
  loadChannelRecordMonthly = (params) => {
    const { channel } = this.props;
    console.log("channel", channel);
    // GetHistroyRecordFileList(channel.deviceId, channel.channelId, {
    //   sipRecordFileQueryType: "time",
    //   startTime: this.state.calValue.format("YYYY-MM-DD 00:00:00"),
    //   endTime: this.state.calValue.format("YYYY-MM-DD 23:59:59"),
    //   taskId: 0,
    //   ...params,
    // })
    //   .then((res) => {
    // setTimeout(() => {
    // let obj = {
    //   pageIndex: 1, //页码，从1开始
    //   pageSize: 200, //每页多少行记录
    //   orderBy: [
    //     //可以多个排序字段
    //     {
    //       fieldName: "endTime", //数据库中的字段
    //       orderByDir: "DESC", //排序方法
    //     },
    //   ],
    // };
    let obj = {
      pageIndex: 1, //页码，从1开始
      pageSize: 500, //每页多少行记录
      orderBy: [
        //可以多个排序字段
        {
          fieldName: "endTime", //数据库中的字段
          orderByDir: "DESC", //排序方法
        },
      ],
      mainId: channel.mainId,
      // mainId: "C803F44C",
      startTime: this.state.calValue.format("YYYY-MM-DD 00:00:00"),
      endTime: this.state.calValue.format("YYYY-MM-DD 23:59:59"),
    };
    GetRecordFileList(obj).then((res) => {
      const { data } = res;
      console.log("data", data);

      // return;
      if (data.total == 0) {
        message.error("没有找到录像资源");
      } else {
        this.setState({
          recordMonthly: {
            ...data.recordFileList,
            // flagArr: Array.from(res.data.taskId)
            taskId: 1,
            ssrcId: Array.from(data.recordFileList),
          },
        });
        this.setState({
          playSrcIdx: data.total && data.total > 0 ? data.total : null,
          recordDaily: {
            ...res.recordFileList,
            taskId: 1,
            list: data.recordFileList
              ? data.recordFileList.map((record, recordIndex) => {
                  const beginTime = moment(
                    record.startTime,
                    "YYYY-MM-DD HH:mm:ss"
                  );
                  const endTime = moment(record.endTime, "YYYY-MM-DD HH:mm:ss");

                  return {
                    ...record,
                    beginTime: beginTime.valueOf(),
                    endTime: endTime.valueOf(),
                    style: {
                      background: "rgba(14,255,0,0.49)",
                    },
                    idx: recordIndex,
                  };
                })
              : [],
          },
        });
      }
    });
    // }, 2000);
    // })
    // .then((res) => {
    //   setTimeout(() => {
    //     console.log(res);
    //   }, 2000);
    // });
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
  };

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
    this.setState(
      {
        calValue: date,
      },
      () => {
        this.loadChannelRecord();
      }
    );
  };

  handlePlayerEnded = () => {
    const { recordDaily, playSrcIdx } = this.state;
    console.log("播完了:", playSrcIdx, recordDaily.list[playSrcIdx].mp4Full);

    if (playSrcIdx + 1 < recordDaily.list.length) {
      this.setState({
        playSrcIdx: playSrcIdx + 1,
      });
    }
  };

  handlePlayerPlay = () => {
    const { playbackRate } = this.state;
    // console.log(playbackRate)
    this.reactPlayer && this.reactPlayer.setPlaybackRate(playbackRate);
  };

  handlePlayeTimeUpdate = (e) => {
    const { recordDaily, playSrcIdx, playTimestamp } = this.state;
    // recordDaily.list[playSrcIdx].beginTime;
    // recordDaily.list[0].startTime;
    console.log("e", moment(recordDaily.list[playSrcIdx].startTime));
    console.log("e", e.target.currentTime);

    this.setState({
      // playTimestamp: recordDaily.list[playSrcIdx].beginTime + (e.target.currentTime * 1000)
      playTimestamp: moment(recordDaily.list[playSrcIdx].startTime)
        .add(e.target.currentTime, "s")
        .valueOf(),
    });
  };

  handlePlaybackRateChange = (e) => {
    const playbackRate = e.target.playbackRate;
    this.setState(
      {
        playbackRate,
      },
      () => {
        this.reactPlayer && this.reactPlayer.setPlaybackRate(playbackRate);
      }
    );
  };

  render() {
    const { recordDaily, playinfo, calValue, playSrcIdx, playTimestamp } =
      this.state;

    console.log(
      "recordDaily.list[playSrcIdx].mp4Full",
      playSrcIdx,
      recordDaily &&
        recordDaily.list &&
        recordDaily.list.length > 0 &&
        recordDaily.list[playSrcIdx] &&
        recordDaily.list[playSrcIdx].downloadUrl
    );

    if (recordDaily && recordDaily.list && recordDaily.list.length > 0) {
      if (recordDaily.list[0].downloadUrl) {
        // HistroyVideo(recordDaily.taskId,recordDaily.list[0].ssrcId).then(res => {
        // recordDaily.list[0].downloadUrl = res.data.playUrl
        // })
      }
    }
    return (
      <div className={"playback-play-container"}>
        <div className={"playback-play-header"}>
          <div className={"playback-player"}>
            {playSrcIdx != null &&
              recordDaily &&
              recordDaily.list &&
              recordDaily.list.length > 0 &&
              recordDaily.list[playSrcIdx] && (
                <ReactPlayer
                  ref={(reactPlayer) => (this.reactPlayer = reactPlayer)}
                  className={"playback-zpplayer-player"}
                  {...playinfo}
                  // src={recordDaily.list[playSrcIdx].mp4Full}
                  src={recordDaily.list[playSrcIdx].downloadUrl}
                  onRateChange={this.handlePlaybackRateChange}
                  onEnded={this.handlePlayerEnded}
                  onPlay={this.handlePlayerPlay}
                  onTimeUpdate={this.handlePlayeTimeUpdate}
                  // autoplay={true}
                  muted={true}
                />
              )}
          </div>
          <div className={"playback-calendar"}>
            <Calendar
              fullscreen={false}
              value={calValue}
              onChange={this.handleCalendarSelect}
              //   disabledDate={this.calDisabledDateFuc}
            />
          </div>
        </div>

        <div className={"playback-play-bottom"}>
          <TimeSlider2
            minTimestamp={moment(calValue).startOf("day").valueOf()}
            maxTimestamp={moment(calValue)
              .add(1, "day")
              .startOf("day")
              .valueOf()}
            playTimestamp={
              playTimestamp
                ? playTimestamp
                : moment(calValue).startOf("day").valueOf()
            }
            playTimestampChange={(time, recordInfo, playOffset) => {
              console.log(12312321321321);
              console.log("changeMp4:", time, recordInfo);
              console.log("playOffset:", playOffset);
              // console.log("playTimestamp:", moment(playTimestamp).format("YYYY-MM-DD hh:mm:ss"))
              console.log(
                "playTimestamp:",
                moment(time).format("YYYY-MM-DD HH:mm:ss")
              );
              const activeTime = moment(time);
              //   const activeTime = moment(time).format("YYYY-MM-DD HH:mm:ss");
              recordDaily.list.some((v, i) => {
                if (
                  activeTime.isBetween(moment(v.startTime), moment(v.endTime))
                ) {
                  console.log("vvvvv", v, i);
                  this.setState(
                    {
                      //   recordInfo: v,
                      playSrcIdx: i,
                      //   playSrcIdx: recordInfo ? recordInfo.idx : null,
                      playTimestamp: time,
                    },
                    () => {
                      //   if (playOffset && this.reactPlayer)
                      //     this.reactPlayer.setCurrentTime(playOffset / 1000);
                    }
                  );
                  return true;
                }
              });
            }}
            timecell={recordDaily && recordDaily.list ? recordDaily.list : []}
          />
        </div>
      </div>
    );
  }

  static contextTypes = {};
  static propTypes = {};
  static defaultProps = {};
}
