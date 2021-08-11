import React, {Component} from 'react';
import PropTypes from 'prop-types';
import black from '../../style/black.png';

export default class RvImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src,
            errored: false,
        };
    }

    onError = () => {
        if (!this.state.errored) {
            this.setState({
                src: this.props.fallbackSrc,
                errored: true,
            },()=>{
                this.props.func && this.props.func()
            });
        }
    }

    render() {
        const {src} = this.state;
        const {
            src: _1,
            fallbackSrc: _2,
            ...props
        } = this.props;

        return (
            <img
                src={src}
                onError={this.onError}
                {...props}
            />
        );
    }
}

Image.propTypes = {
    src: PropTypes.string,
    fallbackSrc: PropTypes.string,
    onError: PropTypes.func
};
