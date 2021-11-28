import React from 'react';
import "./ZLPlayer.less"
import {findChannelByVas,GetRecordFileList} from "../../service/channel";
import queryString from 'query-string';
import Loader from "../../component/Loader";
import {Icon, Input, Radio, Tabs, Tooltip,Table, Divider,Pagination} from "antd";
import ReactPlayer from '../../component/ReactPlayer';
import hlsjs from 'hls.js';
import flvjs from 'flv.js';
import grindPlayerSwf from '../../component/ReactPlayer/GrindPlayer.swf';
import flashlsOSMFSwf from '../../component/ReactPlayer/flashlsOSMF.swf';
import UAParser from 'ua-parser-js';
import ReactTimeout from "react-timeout";
import classNames from "classnames";
import {apiDomin} from "../../config/apiconfig";



@ReactTimeout
export default class ZLPlayer extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.channelParams = queryString.parse(this.props.location.search);

        const {stream} = this.channelParams;
        this.state = {
            data:[],
            recordparams:{
                pageIndex:1,
                pageSize:2,
                mainId:stream,
            },
            dataTotal: 0,
            // page: 1,
            // pageSize: 10,
            iframe: false,
            channelData: null,
            currentUrl:'',
            isLive:true,
            playBaseProps: {
                muted: true,
                videoProps: {
                    className: "zpplayer-player-video",
                },
                playerProps: {},
                onKernelError: () => {
                    console.log("onKernelError")
                },
                onCanPlay: () => {
                    this.reactPlayer.play()
                },
                onWaiting: (a, b, c, d) => {
                    console.log("onWaiting")
                },
                onEmptied: () => {
                    console.log("onEmptied")
                },

                onCanPlayThrough: () => {
                    console.log("onCanPlayThrough")
                },
                onLoadedData: () => {
                    console.log("onLoadedData")
                },
                onLoadedMetadata: () => {
                    console.log("onLoadedMetadata")
                },
                onError: () => {
                    console.log("onError")
                }
            },
        }
        

    }

    componentDidMount() {
        document.body.style.minWidth = "100px";
        const ua = UAParser(global.navigator.userAgent);
        this.channelParams = queryString.parse(this.props.location.search);

        const {mediaServerIp, vhost, app, stream, iframe=false} = this.channelParams;
		const urldata = {
			play_addrs:{
				flv:`http://${mediaServerIp}/`+app+'/'+stream+'.flv',
				hls:`http://${mediaServerIp}/`+app+'/'+stream+'/hls.m3u8',
				rtmp:`rtmp://${mediaServerIp}/`+app+'/'+stream,
                rtsp:`rtsp://${mediaServerIp}/`+app+'/'+stream,
			}
		}
		
        this.setState({
            loading: true,
            iframe
        }, () => {
			this.setState({
			    channelData: urldata,
                currentUrl:urldata.play_addrs.flv,
			    params: this.channelParams,
			}, () => {
			    this.changePlayType("flvjs")
			})
			this.setState({
			    loading: false,
			})

            // findChannelByVas(vhost, app, stream)
            //     .then(res => {
            //         this.setState({
            //             channelData: res.data,
            //             params: this.channelParams,
            //         }, () => {
            //             this.changePlayType("flvjs")
            //         })
            //     }).finally(() => {
            //     this.setState({
            //         loading: false,
            //     })
            // })
        })

        this.loadData(this.state.recordparams)
    }

    loadData = (params) => {
        console.log(params)
    	GetRecordFileList({
    	    pageIndex: params ? params.pageIndex : this.state.recordparams.pageIndex,
    	    pageSize: this.state.pageSize,
			orderBy: [
			    {
			      "fieldName": "recordDate",
			      "orderByDir": 0
			    }
			],
            mainId:this.state.recordparams.mainId,
    	    // active: 1,
    	    ...params
    	}).then(res => {
    	    this.setState({
    	        data: res.data.recordFileList,
    	        dataTotal: res.data.total,
    	        pageIndex: res.data.request.pageIndex,
    	        pageSize: res.data.request.pageSize,
    	    })
    	})
    }

    playRecord = (record) => {
        this.setState({
            isLive:false,
            currentUrl: record.downloadUrl,
        })
    }

    downRecord = (videoUrl) => {
        StreamLive(channel.mediaServerId,channel.mainId).then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				message.success('推流成功!');
			}
        })
    }

    changePlay = (type) => {
        const {channelData} = this.state;
        if (type == "flv") {
            this.setState({
                isLive:true,
                currentUrl: channelData.play_addrs.flv,
            })
        }else if (type == "rtmp") {
            this.setState({
                isLive:true,
                currentUrl: channelData.play_addrs.rtmp,
            })
        }else if (type == "rtsp") {
            this.setState({
                isLive:true,
                currentUrl: channelData.play_addrs.rtsp,
            })
        }
        
    }

    changePlayType = (type) => {
        const {channelData} = this.state;
        if (type == "flvjs") {
            this.setState({
                playinfo: {
                    kernel: 'flvjs',
                    vtype: 'flvjs',
                    live: true,
                    src: channelData.play_addrs.flv,
                    type: 'video/x-flv',

                    config: {
                        enableWorker: true,
                        hasAudio: false,
                        //enableStashBuffer: false,
                        //stashInitialSize: 384
                    },
                }
            })
        } else if (type == "hlsjs") {
            this.setState({
                playinfo: {
                    kernel: 'hlsjs',
                    vtype: 'hlsjs',
                    live: true,
                    src: channelData.play_addrs.hls,
                    type: 'application/x-mpegURL',
                }

            })
        } else if (type == "flash_rtmp") {
            this.setState({
                playinfo: {
                    kernel: 'flash',
                    vtype: 'flash_rtmp',
                    live: true,
                    src: channelData.play_addrs.rtmp.replace('http','rtmp'),
                    type: "rtmp/mp4",
                }
            })
        }

    }


    render() {
        const {channelData, params, playinfo, playBaseProps} = this.state;
        if (!this.state.channelData || !playinfo) {
            return <Loader spinning={true}/>
        }

        const columns = [
            { title: '录像名称', dataIndex: 'channelName', key: 'channelName' },
            { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
            { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
            { title: '时长(秒)', dataIndex: 'duration', key: 'duration' },
            { 
                title: '文件大小(MB)', dataIndex: 'fileSize', key: 'fileSize',render: (text) => (
                    <span>
                        {
                            Math.round(text / 1024 /1024)
                        }
                    </span>
               ),
            },
            {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 150,
              render: (text,record) => (
                <span>
                    {
                        <a href="javascript:;" onClick={()=>this.playRecord(record)}>播放</a>
                    }
                    <Divider type="vertical" />
                    {
                        <a href={record.downloadUrl}  >下载</a>
                    }
                </span>
               ),
            },
          ];
          

        return (
            <div className={classNames("zpplayer-wrapping",{"iframe-wrapping":this.state.iframe})}>
                <div className={"zpplayer-header"}>
                    {channelData.name}
                </div>

                <div className={"zpplayer-content"}>
               
                    <div className={"zpplayer-video"}>

                        <live-player 
                            id="AKPlayer"
                            video-url={this.state.currentUrl}  // 视频url
                            fluent = 'true' // 流畅模式
                            live={this.state.isLive} // 是否直播, 标识要不要显示进度条
                            stretch='true' // 是否拉伸
                            controls={true}> 
                        </live-player>
                        {/* {'hlsjs' === playinfo.kernel && (
                            <ReactPlayer ref={(reactPlayer) => this.reactPlayer = reactPlayer} className={"zpplayer-player"} {...playinfo} {...playBaseProps} autoplay/>
                        )}
                        {'flvjs' === playinfo.kernel && (
                            <ReactPlayer ref={(reactPlayer) => this.reactPlayer = reactPlayer} className={"zpplayer-player"} {...playinfo} {...playBaseProps} autoplay/>
                        )}
                        {'flash' === playinfo.kernel && (
                            <ReactPlayer.GrindPlayer ref={(reactPlayer) => this.reactPlayer = reactPlayer} {...playinfo} grindPlayerSwf={grindPlayerSwf} flashlsOSMFSwf={flashlsOSMFSwf}/>
                        )} */}

                    </div>
                    <div className={"zpplayer-bottom"}>
                        <Tabs type="card"
                              className="zl-des-card-container"
                              tabBarExtraContent={
                                  <div style={{paddingRight: 3}}>
                                      <Radio.Group defaultValue={playinfo.vtype} buttonStyle="solid" onChange={(e) => {
                                          this.changePlay(e.target.value)
                                      }}>
                                          <Radio.Button value="flv">FLV</Radio.Button>
                                          <Radio.Button value="rtmp">RTMP</Radio.Button>
                                          <Radio.Button value="rtsp">RTSP</Radio.Button>
                                          {/* <Tooltip title={!channelData.play_addrs.hls ? "当前通道未开启HLS直播" : null}>
                                              <Radio.Button value="hlsjs" disabled={!channelData.play_addrs.hls}>HLS</Radio.Button>
                                          </Tooltip> */}

                                      </Radio.Group>
                                  </div>

                              }
                        >
                            <Tabs.TabPane tab="分享地址&视频源地址" key="1">
                                <div className={"zpplayer-bottom-tab-pane"}>
                                    <div>
                                        <div>分享地址：</div>
                                        <div><Input value={location.href} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>iframe：</div>
                                        <div><Input value={`<iframe src="${location.href}&iframe=yes&aspect=640x360" width="640" height="360" allowfullscreen allow="autoplay"></iframe>`} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>flv：</div>
                                        <div><Input value={channelData.play_addrs.flv} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>rtsp：</div>
                                        <div><Input value={channelData.play_addrs.rtsp} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>rtmp：</div>
                                        <div><Input value={channelData.play_addrs.rtmp.replace('http','rtmp')} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                    <div>
                                        <div>hls：</div>
                                        <div><Input value={channelData.play_addrs.hls} addonAfter={<Icon type="copy"/>}/></div>
                                    </div>
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="录像文件" key="2">
                                <div className={"zpplayer-bottom-tab-pane"}>
                                <Table 
                                    columns={columns} 
                                    dataSource={this.state.data} 
                                    pagination={{
                                        onChange: page => {
                                            this.loadData({
                                                pageIndex: page,
                                            })
                                        },
                                        current: this.state.pageIndex,
                                        showQuickJumper: true,
                                        total: this.state.dataTotal,
                                        pageSize: this.state.pageSize,
                                    }} 
                                />
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>

            </div>
        );
    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
