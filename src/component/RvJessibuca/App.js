import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.jessibuca = null;
        this.showOperateBtns = false;

        this.$container = null;
        this.forceNoOffscreen = false;
   
        const{playUrl,hasAudio} = this.props;
        console.log(playUrl)
        this.state = {
            playUrl: playUrl,
            hasAudio:hasAudio,
            isPlaying: false
        }
    }


    componentDidMount() {
        this.create();
        
        this.state.isPlaying ? this.pause() : this.play()
    }

    componentWillUnmount() {
        this.destroy();
    }
    


    create() {
        var showOperateBtns = true; // 是否显示按钮
        var forceNoOffscreen = true; //
        let $container = document.getElementById('container');
        this.jessibuca = new window.Jessibuca({
            container: $container,
            videoBuffer: 0.2, // 缓存时长
            isResize: false,
            text: "",
            loadingText: "AKStream正在努力的加载视频中",
            useMSE: false,
            debug: false,
            hasAudio:this.state.hasAudio,
            showBandwidth: showOperateBtns, // 显示网速
            supportDblclickFullscreen:true,
            autoWasm:true,
            heartTimeoutReplay:true,
            operateBtns: {
                fullscreen: showOperateBtns,
                screenshot: showOperateBtns,
                play: showOperateBtns,
                audio: showOperateBtns,
                recorder: showOperateBtns
            },
            forceNoOffscreen: forceNoOffscreen,
            isNotMute: false,
        });
    }

    play() {
        if (this.jessibuca && this.state.playUrl) {
            this.jessibuca.play(this.state.playUrl);
            this.setState({
                isPlaying: true
            })
        }
    }

    pause() {
        if (this.jessibuca) {
            this.jessibuca.pause();
            this.setState({
                isPlaying: false
            })
        }
    }

    screenshot(){
        if(this.jessibuca){
            let file = this.jessibuca.screenshot('test','blob');
            console.log(file);
        }
    }

    destroy() {
        if (this.jessibuca) {
            this.jessibuca.destroy();
            this.setState({
                isPlaying: false
            })
        }
        // this.create();
    }

    
    

    render() {
        return (
            <div className="root">
                <div className="container-shell">
                    <div id="container"></div>
                </div>
            </div>
        )
    }
    


}


export default App;
