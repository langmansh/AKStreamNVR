import React from 'react';
import "./About.less"
import RvPage from "../../component/RvPage/RvPage";

export default class About extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {


        return (
            <RvPage className={"home-page"} noHeader>
                111
            </RvPage>
        );
    }

    static propTypes = {}
    static defaultProps = {}
}
