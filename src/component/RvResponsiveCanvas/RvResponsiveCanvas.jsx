import React, {Component} from 'react';
import getSize from './get-size';


export default class RvResponsiveCanvas extends Component {
    static defaultProps = {
        scale: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    };

    state = {
        width: 0,
        height: 0,
    };

    $canvas;

    componentDidMount() {
        window.addEventListener('resize', this.handleResize, false);
        this.setSize();


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize, false);
    }

    handleResize = () => {
        this.setSize();
        this.props.onResize(this.state.width, this.state.height);
    };

    setSize = () => {
        const parent = this.$canvas.parentElement;

        if (!parent) {
            return;
        }

        const [width, height] = getSize(parent);

        this.setState({width, height});
    };

    setRef = (el) => {
        if (!el) {
            return;
        }

        const {canvasRef} = this.props;

        this.$canvas = el;
        if (typeof canvasRef === 'function') {
            canvasRef(el);
        }
    };

    render() {
        const {scale, onResize, canvasRef, style, ...props} = this.props;
        const {width, height} = this.state;

        return (
            <canvas
                {...props}
                ref={this.setRef}
                width={width * scale}
                height={height * scale}
                style={{...style, width, height}}
            />
        );
    }
}