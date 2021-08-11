import React from 'react';
import {Switch} from "antd";


export default class RvSwitch extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {}
    }

    componentDidMount() {

    }

    onChange = (checked) => {
        if (this.props.onChange) {
            this.props.onChange(checked ? 1 : 0)
        }
    }


    render() {
        const {checkedChildren, unCheckedChildren, value} = this.props;
        return (
            <Switch checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} checked={value ? true : false} onChange={this.onChange}/>
        );
    }


    static propTypes = {}
    static defaultProps = {
        checkedChildren: "",
        unCheckedChildren: "",
    }
}
