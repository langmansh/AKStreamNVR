import React from 'react';
import {connect} from "react-redux";
import {Avatar, Icon, Menu, Popover} from "antd";
import {logoutUser} from "../../redux/modules/userAuth/action";
import {bindActionCreators} from "redux";

@connect(
    state => ({
        userAuth: state.userAuth,
    }),
    {logoutUser},
    null,
    {
        forwardRef: true
    }
)
export default class LoginedUserMenu extends React.Component {

    constructor(props) {
        super(props);
        //const that = this;
        this.state = {
            showNavbarPopover: false,
        }
    }

    componentDidMount() {

    }

    render() {
        const {userAuth} = this.props;



        const LoginedUserOperateMenu = (
            <Menu
                theme="light"
                mode='vertical'
                selectable={false}
                onClick={({key}) => {
                    switch (key) {
                        case `logout`:
                            this.props.logoutUser();
                            break;
                    }

                    this.setState({showNavbarPopover: false})
                }}
            >
                <Menu.Item key={"logout"}>
                    <a>
                        <Icon type="poweroff"/>
                        <span>退出登录</span>
                    </a>
                </Menu.Item>
            </Menu>
        )


        return (
            <Menu
                theme="dark"
                mode='horizontal'
                selectable={false}
            >

                {/*<Menu.Item>
                    <Popover content={<div>我是通知</div>} placement="bottomRight" title="Title" trigger="click">
                        <div>
                            <Badge count={0}>
                                <Icon type="bell"/>
                            </Badge>
                        </div>
                    </Popover>
                </Menu.Item>*/}
                <Menu.Item>
                    <Popover overlayClassName="navbar-popover"
                             content={LoginedUserOperateMenu}
                             placement="bottomRight"
                             visible={this.state.showNavbarPopover}
                             onVisibleChange={(show) => {
                                 this.setState({showNavbarPopover: show})
                             }}
                             title={null}
                             trigger="click">
                        <div className={"logined-user-avatar-wrap"}>
                            <span className="logined-user-avatar-desc">
                                <span>admin</span>
                                <span>管理员</span>
                            </span>

                            {
                                userAuth.userModel && userAuth.userModel.avatarUrl ?
                                    <Avatar size={32} src={userAuth.userModel.avatarUrl}/> : <Avatar size={32} icon="user"/>
                            }


                        </div>
                    </Popover>
                </Menu.Item>
            </Menu>
        );
    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
