import React from 'react';
import classnames from 'classnames';
import {omit, pick} from 'lodash';

export default class RvIcon extends React.Component {
    render() {
        const propsClassName = pick(this.props, ["className"]);
        const htmlAttrs = omit(this.props, ["className"]);


        return (
            <i className={classnames('rvicon', this.props.type, propsClassName.className)}
               {...htmlAttrs}/>
        );
    }
}



