import React from 'react';
import "./ZLPlayer.less"
import {findChannelByVas,GetRecordFileList,DeleteRecordFile} from "../../service/channel";
import queryString from 'query-string';
import Loader from "../../component/Loader";
import {Icon,message, Input, Radio, Tabs, Tooltip,Table, Divider,Pagination} from "antd";
import ReactPlayer from '../../component/ReactPlayer';
import UAParser from 'ua-parser-js';
import ReactTimeout from "react-timeout";
import classNames from "classnames";
import {apiDomin} from "../../config/apiconfig";
import AKStreamPlayer from '../../component/RvJessibuca/App.js';


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
                deleted:false,
            },
            dataTotal: 0,
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
				flv:`${apiDomin}/`+app+'/'+stream+'.live.flv',
				hls:`${apiDomin}/`+app+'/'+stream+'/hls.m3u8',
				rtmp:`${apiDomin}/`+app+'/'+stream,
                rtsp:`${apiDomin}/`+app+'/'+stream,
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
        })

        this.loadData(this.state.recordparams)
    }

    loadData = (params) => {
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
            deleted:false,
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

    deleteRecordFile = (dbId) => {
    	DeleteRecordFile(dbId).then(res => {
    	    if(res._success && res._statusCode === 200 && res.data)
			{
				message.success('删除录像文件成功!');
                this.loadData(this.state.recordparams)
			}
            else
            {
                message.error('删除录像文件失败!');
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
                currentUrl: channelData.play_addrs.rtmp.replace('http','rtmp'),
            })
        }
        // else if (type == "rtsp") {
        //     console.log(channelData.play_addrs.rtsp.replace('http','rtsp'))
        //     this.setState({
        //         isLive:true,
        //         currentUrl: channelData.play_addrs.rtsp.replace('http','rtsp'),
        //     })
        // }
        
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
        // let player = new WasmPlayer(null, 'video', this.callbackfun,{
        //     muted:true,stretch:true,fluent:true,isLive:this.state.isLive
        // })
        // player.play(this.state.currentUrl, 1)

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
                    <Divider type="vertical" />
                    {
                        <a href="javascript:;" onClick={()=>this.deleteRecordFile(record.id)}>删除</a>
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
                        <AKStreamPlayer 
                            playUrl={this.state.currentUrl}
                            hasAudio={false}
                        />
                        {/* <div id="video"></div> */}
                        {/* <easy-player
                            id="player"
                            // video-url  undefined 容易白屏 设置为 ''
                            video-url={this.state.currentUrl || ''}
                            video-title="AKStreamNVR"
                            fluent="true" // 流畅模式
                            stretch // 是否拉伸
                            muted="true" // 是否静音
                            hide-big-play-button
                            live={this.state.isLive}
                            auto-play
                            controls
                            // current-time={currentTime}
                            // aspect="fullscreen" // 长比高的值过大 可能导致样式布局变化  不随外层div大小
                        ></easy-player> */}
                        {/* <live-player 
                            id="AKPlayer"
                            video-url={this.state.currentUrl}  // 视频url
                            fluent = 'true' // 流畅模式
                            live={this.state.isLive} // 是否直播, 标识要不要显示进度条
                            stretch='true' // 是否拉伸
                            controls={true}> 
                        </live-player> */}

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
                                          {/* <Radio.Button value="rtsp">RTSP</Radio.Button> */}
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
                                        <div><Input value={channelData.play_addrs.rtsp.replace('http','rtsp')} addonAfter={<Icon type="copy"/>}/></div>
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
