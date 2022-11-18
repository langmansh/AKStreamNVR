import React from 'react';
import "./PlayForm.less"
import {Input,Tabs,Icon} from "antd";
import {StreamLive} from "../../service/channel";
import {apiDomin} from "../../config/apiconfig";
import AKStreamPlayer from '../../component/RvJessibuca/App.js';
import RvPtz from '../../component/RvPtz/RvPtz';


export default class PlayForm extends React.Component {

    constructor(props) {
        super(props);

        const {channel} = this.props;
        
        this.state = {
            playUrl:{},
            channel:channel
        }

    }


    componentDidMount() {
        this.loadChannel();
    }


    loadChannel = (params) => {
        // const {channel} = this.props;
        StreamLive(this.state.channel.mediaServerId,this.state.channel.mainId).then(res => {
			if(res._success && res._statusCode === 200 && res.data)
			{
				this.setState({
                    playUrl:{
                        flv:res.data.playUrl[1],
                        hls:res.data.playUrl[4],
                        rtmp:res.data.playUrl[3],
                        rtsp:res.data.playUrl[2],
                        // flv:`${apiDomin}/`+this.state.channel.app+'/'+this.state.channel.mainId+'.live.flv',
                        // hls:`${apiDomin}/`+this.state.channel.app+'/'+this.state.channel.mainId+'/hls.m3u8',
                        // rtmp:`${apiDomin}/`+this.state.channel.app+'/'+this.state.channel.mainId,
                        // rtsp:`${apiDomin}/`+this.state.channel.app+'/'+this.state.channel.mainId,
                    }
                })
			}
        })
    }


    render() {
        // let player = new WasmPlayer(null, 'video', this.callbackfun,{
        //     Height:true
        // })
        // player.play(this.state.playUrl.flv, 1)
        // let pUrl = "http://221.10.33.44:18000/rtp/15FF0A94.live.flv"
        
    
        return (
            
            <div className={"playback-play-container"}>

                <div className={"playback-play-header"}>
                    <div className={"playback-player"}>
 
                        <AKStreamPlayer 
                            playUrl={this.state.playUrl.flv == undefined ? `${apiDomin}/`+this.state.channel.app+'/'+this.state.channel.mainId+'.live.flv':this.state.playUrl.flv}
                            hasAudio={false}
                        />
                        
                    </div>
                    
                        <RvPtz 
                            deviceId={this.state.channel.deviceId}
                            channelId={this.state.channel.channelId}
                        />
                    
                </div>

                <div className={"playback-play-bottom"}>
                    <div className={"playback-calendar"}>
                            <Tabs>
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
                                            <div><Input value={this.state.playUrl.flv} addonAfter={<Icon type="copy"/>}/></div>
                                        </div>
                                        <div>
                                            <div>rtsp：</div>
                                            <div><Input value={this.state.playUrl.rtsp == null ? null : this.state.playUrl.rtsp.replace('http','rtsp')} addonAfter={<Icon type="copy"/>}/></div>
                                        </div>
                                        <div>
                                            <div>rtmp：</div>
                                            <div><Input value={this.state.playUrl.rtmp == null ? null : this.state.playUrl.rtmp.replace('http','rtmp')} addonAfter={<Icon type="copy"/>}/></div>
                                        </div>
                                        <div>
                                            <div>hls：</div>
                                            <div><Input value={this.state.playUrl.hls} addonAfter={<Icon type="copy"/>}/></div>
                                        </div>
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

