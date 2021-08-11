import React from 'react';
import PropTypes from "prop-types";
import moment from "moment";
import "./TimeSlider.less"
import RvResponsiveCanvas from "../RvResponsiveCanvas/RvResponsiveCanvas";

export default class TimeSlider2 extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            minTimestamp: this.props.minTimestamp,
            maxTimestamp: this.props.maxTimestamp,
            playTimestamp: this.props.playTimestamp,
            timecell: this.props.timecell
        }
        this.redrawFlag = false;
    }

    componentDidMount() {
        setTimeout(() => {
            this.initCanval(false);
            console.log("componentDidMount", false)
        }, 100)

    }

    componentDidUpdate() {
        this.initCanval(true);
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        const {maxTimestamp, minTimestamp, playTimestamp, timecell} = nextProps;
        // 当传入的type发生变化的时候，更新state
        if (maxTimestamp !== prevState.maxTimestamp || minTimestamp !== prevState.minTimestamp || playTimestamp !== prevState.playTimestamp || timecell !== prevState.timecell) {
            return {
                minTimestamp,
                maxTimestamp,
                playTimestamp,
                timecell,
            };
        }
        // 否则，对于state不进行任何操作
        return null;
    }


    initCanval = () => {
        if (!this.redrawFlag) {
            this.ctx = this.canvas.getContext("2d");
            this.minutesPerStep = [1, 2, 5, 10, 15, 20, 30, 60, 120, 180, 240, 360, 720, 1440]; // min/格
            this.graduationStep = 20;//刻度间最小宽度，单位px
            this.hoursPerRuler = 24;//时间轴显示24小时
            this.startTimestamp = moment().startOf('day').valueOf();
            this.distanceBetweenGtitle = 80;
            this.zoom = 24;
            this.gIsMouseout = false;//拖动mousedown标记
            this.gIsMousewheel = false;//拖动mousedown标记
            this.gIsMousedown = false;//拖动mousedown标记
            this.gIsMousemove = false;//拖动mousemove标记
            this.gMousedownCursor = null;//拖动mousedown的位置
            this.gIsDragStartTime = null;
            this.hoverTooltip = null;
        }

        this.canvansW = this.canvas.width;
        this.canVansH = this.canvas.height;


        if (this.gIsMousewheel || this.gIsMousedown || this.gIsMousemove)
            return;

        this.timecell = this.state.timecell;
        this.maxTimestamp = this.state.maxTimestamp;
        this.minTimestamp = this.state.minTimestamp;
        this.playTimestamp = this.state.playTimestamp;

        this.onBeforeClickRulerCallback = null;
        if (this.redrawFlag) {
            this.clearCanvas();
        }

        this.init(this.startTimestamp, this.playTimestamp, this.hoverTooltip, this.timecell, this.redrawFlag);
        this.redrawFlag = true
    }

    /**
     * 初始化
     * @param {*} startTimestamp 最左侧时间
     * @param {*} timecell 录像段数组
     * @param {*} redrawFlag 是否重绘标记
     */
    init = (startTimestamp, playTimestamp, hoverTooltip, timecell, redrawFlag) => {


        if (startTimestamp < this.minTimestamp) {
            startTimestamp = this.minTimestamp
        }

        const startEndX = this.hoursPerRuler * 60 * 60 * 1000;
        const end_timestramp = startTimestamp + startEndX;
        if (end_timestramp > this.maxTimestamp) {
            startTimestamp = this.maxTimestamp - startEndX;
        }

        this.timecell = timecell;
        this.startTimestamp = startTimestamp;
        this.playTimestamp = playTimestamp;
        this.drawCellBg();
        this.addGraduations(startTimestamp);
        this.addCells(timecell);
        this.drawLine(0, this.canVansH, this.canvansW, this.canVansH, "rgb(151, 158, 167)", 1); //底线
		
        var px_per_ms = this.canvansW / startEndX;
        var pos_x = (playTimestamp - this.startTimestamp) * px_per_ms

        this.drawLine(pos_x, 0, pos_x, 33, "#3c82ff", 2); //中间播放点时间线
        if (!redrawFlag) {//只有第一次进入才需要添加事件
            this.addEvents();
        }
        var time = startTimestamp + (this.hoursPerRuler * 3600 * 1000) / 2;
        this.ctx.fillStyle = "#006cff";

        var _pos_x = pos_x - 60;
        if (this.canvansW < pos_x + 60) {
            _pos_x = this.canvansW - 110
        } else if (pos_x < 60) {
            _pos_x = 0
        }
        this.ctx.font = "15px Arial";
        this.ctx.fillText(this.formatTime(playTimestamp), _pos_x, 53);

        if(this.hoverTooltip){
            this.drawLine(this.hoverTooltip.linePos, 0, this.hoverTooltip.linePos, 50, "rgba(53,53,53,0.5)", 1);
            this.ctx.fillStyle = "rgba(53,53,53,0.5)";


            var _pos_x = this.hoverTooltip.linePos - 50;
            if (this.canvansW < this.hoverTooltip.linePos + 50) {
                _pos_x = this.canvansW - 100
            } else if (this.hoverTooltip.linePos < 50) {
                _pos_x = 0
            }

            this.ctx.font = "14px Arial";
            this.ctx.fillText(this.formatTime(this.hoverTooltip.time), _pos_x, 70);
        }


    }

    /**
     * 绘制添加刻度
     * @param {*} startTimestamp 最左侧时间
     */
    addGraduations = (startTimestamp) => {


        var _this = this;
        var px_per_min = _this.canvansW / (_this.hoursPerRuler * 60); // px/min
        var px_per_ms = _this.canvansW / (_this.hoursPerRuler * 60 * 60 * 1000); // px/ms
        var px_per_step = _this.graduationStep;  // px/格 默认最小值20px
        var min_per_step = px_per_step / px_per_min; // min/格
        for (var i = 0; i < _this.minutesPerStep.length; i++) {
            if (min_per_step <= _this.minutesPerStep[i]) { //让每格时间在minutes_per_step规定的范围内
                min_per_step = _this.minutesPerStep[i];
                px_per_step = px_per_min * min_per_step;
                break
            }
        }

        var medium_step = 30;
        for (var i = 0; i < _this.minutesPerStep.length; i++) {
            if (_this.distanceBetweenGtitle / px_per_min <= _this.minutesPerStep[i]) {
                medium_step = _this.minutesPerStep[i];
                break;
            }
        }

        var num_steps = _this.canvansW / px_per_step; //总格数
        var graduation_left;
        var graduation_time;
        var caret_class;
        var lineH;
        var ms_offset = _this.msToNextStep(startTimestamp, min_per_step * 60 * 1000);//开始的偏移时间 ms
        var px_offset = ms_offset * px_per_ms; //开始的偏移距离 px
        var ms_per_step = px_per_step / px_per_ms; // ms/step
        for (var i = 0; i < num_steps; i++) {
            graduation_left = px_offset + i * px_per_step; // 距离=开始的偏移距离+格数*px/格
            graduation_time = startTimestamp + ms_offset + i * ms_per_step; //时间=左侧开始时间+偏移时间+格数*ms/格

            var date = new Date(graduation_time);


            if (date.getUTCHours() == 0 && date.getUTCMinutes() == 0) {
                caret_class = 'big';
                lineH = 25;
                var big_date = _this.graduationTitle(date);
                _this.ctx.font = "12px Arial";
                _this.ctx.fillText(big_date, graduation_left - 20, 30);
                _this.ctx.fillStyle = "rgba(53,53,53,0.55)";
            } else if (graduation_time / (60 * 1000) % medium_step == 0) {
                caret_class = 'middle';
                lineH = 15;
                var middle_date = _this.graduationTitle(date);
                _this.ctx.font = "12px Arial";
                _this.ctx.fillText(middle_date, graduation_left - 20, 30);
                _this.ctx.fillStyle = "rgba(53,53,53,0.55)";
            } else {
                lineH = 10;
            }
            // drawLine(graduation_left,0,graduation_left,lineH,"rgba(151,158,167,0.4)",1);
            _this.drawLine(graduation_left, 0, graduation_left, lineH, "rgba(151,158,167,1)", 1);
        }


    }

    /**
     * 绘制线
     * @param {*} beginX
     * @param {*} beginY
     * @param {*} endX
     * @param {*} endY
     * @param {*} color
     * @param {*} width
     */
    drawLine = (beginX, beginY, endX, endY, color, width) => {
        this.ctx.beginPath();
        this.ctx.moveTo(beginX, beginY);
        this.ctx.lineTo(endX, endY);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.stroke();
    }

    /**
     * 添加录像段
     * @param {*} cells 录像数组
     */
    addCells = (cells) => {
        var _this = this;
        cells.forEach(cell => {
            _this.drawCell(cell)
        });
    }

    /**
     * 绘制录像块
     * @param {*} cell cell包括beginTime ms;endTime ms;style
     */
    drawCell = (cell) => {
        var _this = this;
        var px_per_ms = _this.canvansW / (_this.hoursPerRuler * 60 * 60 * 1000); // px/ms
        var beginX = (cell.beginTime - _this.startTimestamp) * px_per_ms;
        var cell_width = (cell.endTime - cell.beginTime) * px_per_ms;
        _this.ctx.fillStyle = cell.style.background;
        _this.ctx.fillRect(beginX, 0, cell_width, 15);
    }

    /**
     * 绘制录像块背景
     */
    drawCellBg = () => {
        this.ctx.fillStyle = "rgb(220,226,223)";
        this.ctx.fillRect(0, 0, this.canvansW, 15);
    }

    /**
     * 时间轴事件
     */
    addEvents = () => {
        var _this = this;
        if (_this.canvas.addEventListener) {
            _this.canvas.addEventListener('mousewheel', _this.mousewheelFunc.bind(_this));
            _this.canvas.addEventListener('mousedown', _this.mousedownFunc.bind(_this));
            _this.canvas.addEventListener('mousemove', _this.mousemoveFunc.bind(_this));
            _this.canvas.addEventListener('mouseup', _this.mouseupFunc.bind(_this));
            _this.canvas.addEventListener('mouseout', _this.mouseoutFunc.bind(_this));

        }
    }

    /**
     * 拖动/点击 mousedown事件
     */
    mousedownFunc = (e) => {
        this.gIsMousedown = true;
        this.gMousedownCursor = this.getCursorXPosition(e);//记住mousedown的位置
        this.gIsDragStartTime = moment();
    }

    /**
     * 拖动/鼠标hover显示 mousemove事件
     */
    mousemoveFunc = (e) => {
        var _this = this;
        _this.hoverTooltip=null;
        var pos_x = _this.getCursorXPosition(e);
        var px_per_ms = _this.canvansW / (_this.hoursPerRuler * 60 * 60 * 1000); // px/ms
        _this.clearCanvas();
        if (_this.gIsMousedown) {
            var diff_x = pos_x - _this.gMousedownCursor;


            _this.startTimestamp = _this.startTimestamp - Math.round(diff_x / px_per_ms);
            _this.init(_this.startTimestamp, _this.playTimestamp, _this.hoverTooltip,_this.timecell, true);
            _this.gIsMousemove = true;
            _this.gMousedownCursor = pos_x;
        } else {
            var time = _this.startTimestamp + pos_x / px_per_ms;
            _this.hoverTooltip = {
                linePos: pos_x,
                time: time
            }


            _this.init(_this.startTimestamp, _this.playTimestamp, _this.hoverTooltip, _this.timecell, true);


        }
    }

    /**
     * 拖动/点击 mouseup事件
     */
    mouseupFunc = (e) => {
        var _this = this;

        //避免点击被误认为拖拽
        const dragTimeLen = moment().diff(this.gIsDragStartTime);
        if (dragTimeLen < 100) {
            _this.gIsMousemove = false;
            _this.gIsMousedown = false;
        }

        //console.log("a.diff(b):", dragTimeLen)
        if (_this.gIsMousemove) { //拖动 事件
            _this.gIsMousemove = false;
            _this.gIsMousedown = false;
            //_this.playTimestamp = _this.startTimestamp + (_this.hoursPerRuler * 3600 * 1000) / 2;
        } else { // click 事件
            _this.gIsMousedown = false;
            var posx = _this.getCursorXPosition(e); //鼠标距离 px
            var ms_per_px = (_this.zoom * 3600 * 1000) / _this.canvansW; // ms/px
            _this.playTimestamp = _this.startTimestamp + posx * ms_per_px;
            _this.setPlaytimestamp(_this.playTimestamp);

            _this.playTimestampChange()
        }
    }

    /**
     * 鼠标移出隐藏时间 mouseout事件
     * @param {*} e
     */
    mouseoutFunc = () => {
        var _this = this;
        _this.gIsMouseout = true;
        _this.clearCanvas();
        _this.hoverTooltip=null;
        _this.init(_this.startTimestamp, _this.playTimestamp, _this.hoverTooltip, _this.timecell, true);
        _this.gIsMouseout = false;

    }

    /**
     * 滚轮放大缩小，以时间轴中心为准 mousewheel事件
     */
    mousewheelFunc = (event) => {
        var _this = this;
        _this.gIsMousewheel = true;
        if (event && event.preventDefault) {
            event.preventDefault()
        } else {
            window.event.returnValue = false;
            return false;
        }

        var e = window.event || event;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));


        var pos_x = _this.getCursorXPosition(e);
        var px_per_ms = _this.canvansW / (_this.hoursPerRuler * 60 * 60 * 1000);
        var eventPositionTime =  _this.startTimestamp + pos_x / px_per_ms;//m


        // s 记住当前中间的时间
        //var middle_time = _this.startTimestamp + (_this.hoursPerRuler * 3600 * 1000) / 2; //ms 记住当前中间的时间
        if (delta < 0) {
            _this.zoom = _this.zoom + 4;
            if (_this.zoom >= 24) {
                _this.zoom = 24;//放大最大24小时
            }
            _this.hoursPerRuler = _this.zoom;
        } else if (delta > 0) {// 放大
            _this.zoom = _this.zoom - 4;
            if (_this.zoom <= 1) {
                _this.zoom = 1;//缩小最小1小时
            }
            _this.hoursPerRuler = _this.zoom;
        }

        _this.clearCanvas();

        var px_per_ms2 = _this.canvansW / (_this.hoursPerRuler * 60 * 60 * 1000);
        _this.startTimestamp= eventPositionTime - pos_x / px_per_ms2

        //_this.startTimestamp = middle_time - (_this.hoursPerRuler * 3600 * 1000) / 2; //startTimestamp = 当前中间的时间 - zoom/2
        _this.init(_this.startTimestamp, _this.playTimestamp, _this.hoverTooltip, _this.timecell, true)
        _this.gIsMousewheel = false;
    }

    /**
     * 获取鼠标posx
     * @param {*} e
     */
    getCursorXPosition = (e) => {
        var posx = 0;

        if (!e) {
            e = window.event;
        }

        /*if (e.pageX || e.pageY) {
            posx = e.pageX;
        }else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        }*/
        posx = e.offsetX;

        return posx;
    }

    /**
     * 返回时间轴上刻度的时间
     * @param {*} datetime new Date 格式
     */
    graduationTitle = (datetime) => {
        if (datetime.getHours() == 0 && datetime.getMinutes() == 0 && datetime.getMilliseconds() == 0) {
            /* return ('0' + datetime.getDate().toString()).substr(-2) + '.' +
                 ('0' + (datetime.getMonth() + 1).toString()).substr(-2) + '.' +
                 datetime.getFullYear();*/
            return datetime.getFullYear() + '-' +
                ('0' + datetime.getDate().toString()).substr(-2) + '-' +
                ('0' + (datetime.getMonth() + 1).toString()).substr(-2);

        }
        return datetime.getHours() + ':' + ('0' + datetime.getMinutes().toString()).substr(-2);
    };

    /**
     * 返回 2018-01-01 10:00:00 格式时间
     * @param {*} time
     */
    formatTime = (time) => {
        var newTime = new Date(time);
        var year = newTime.getFullYear();
        var month = newTime.getMonth() + 1;
        if (month < 10) {
            var month = "0" + month;
        }
        var date = newTime.getDate();
        if (date < 10) {
            var date = "0" + date;
        }
        var hour = newTime.getHours();
        if (hour < 10) {
            var hour = "0" + hour;
        }
        var minute = newTime.getMinutes();
        if (minute < 10) {
            var minute = "0" + minute;
        }
        var second = newTime.getSeconds();
        if (second < 10) {
            var second = "0" + second;
        }
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    /**
     * 左侧开始时间的偏移，返回单位ms
     * @param {*} timestamp
     * @param {*} step
     */
    msToNextStep = (timestamp, step) => {
        var remainder = timestamp % step;
        return remainder ? step - remainder : 0;
    }

    /**
     * 设置时间，让这个时间点跳到中间红线处
     *  @param {*} playTimestamp 单位ms
     */
    setPlaytimestamp = (playTimestamp) => {
        //console.log(moment(time).format("MM-DD HH:mm:ss"))
        this.clearCanvas();
        // this.startTimestamp = playTimestamp - (this.hoursPerRuler * 60 * 60 * 1000) / 2;
        this.init(this.startTimestamp, playTimestamp, this.hoverTooltip,this.timecell, true)
    }


    /**
     * 清除canvas 每次重新绘制需要先清除
     */
    clearCanvas = () => {
        this.ctx.clearRect(0, 0, 1500, 150);
    }


    /**
     * 返回点击或者拖动的时间点
     */
    playTimestampChange = () => {
        var _this = this;
        if (_this.playTimestamp != null) {
            if (this.props.playTimestampChange) {
                const selectedCell = this.timecell.find(cell => cell.beginTime <= _this.playTimestamp && cell.endTime >= _this.playTimestamp);
                this.props.playTimestampChange(_this.playTimestamp, selectedCell, selectedCell && _this.playTimestamp - selectedCell.beginTime);
            }
        }
    }

    draw() {
        // Draw whatever
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }


    render() {
        return (
            <div className={"timeslider-canvas-wrap"}>
                <RvResponsiveCanvas
                    canvasRef={el => (this.canvas = el)}
                    scale={1}
                    style={{
                        cursor: "pointer",
                        border: "1px solid #cccccc",
                        backgroundColor: "#f5f5f5"
                    }}
                    onDragStart={() => {
                        return false;
                    }}
                    onResize={() => this.initCanval()}
                />
            </div>
        );
    }


    static propTypes = {
        timecell: PropTypes.array,
    }
    static defaultProps = {}
}
