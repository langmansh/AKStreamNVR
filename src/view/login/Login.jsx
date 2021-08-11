import React from 'react';
import {connect} from "react-redux";
import {Button, Form, Icon, Input} from "antd";
import {loginUser} from "../../redux/modules/userAuth/action";
import history from "../../history"
import {withLastLocation} from "react-router-last-location";
import styles from './Login.module.less';
import RvForm from "../../component/RvForm/RvForm";

@connect(
    state => ({
        userAuth: state.userAuth,
    }),
    {loginUser},
)
@RvForm.create()
@withLastLocation
export default class Login extends React.Component {

    //构造函数
    constructor(props) {
        super(props);
        //const that = this;
        this.state = {}
    }

    //组件挂载完成
    componentDidMount() {
       if(this.props.userAuth.isAuthenticated){
           history.push('/');
       }
    }

    //清空用户名输入框
    emitLoginUniqueKeyInputEmpty = () => {
        this.loginUniqueKeyInput.focus();
        this.props.form.setFieldsValue({'loginUniqueKey': ''});
    };

    //清空密码输入框
    emitLoginPasswordInputEmpty = () => {
        this.passwordInput.focus();
        this.props.form.setFieldsValue({'password': ''});
    };

    //发起登录动作
    handleLogin = async (e) => {
        e.preventDefault();

        const {loginUser,  lastLocation} = this.props;
		
        this.props.form.validateFields((err, values) => {
            if (!err) {
                loginUser(values).then(response => {
                    const {code} = response.action.payload;
                    if (code == 0) {
                        console.log("lastLocation", lastLocation)
                        if (lastLocation && lastLocation.pathname != "/login") {
                            history.push(`${lastLocation.pathname}${lastLocation.search}`)
                        } else {
                            history.push('/')
                        }
                    }
                })
            }
        })
    }


    //渲染
    render() {
        const {userAuth} = this.props;
        const {getFieldDecorator} = this.props.form;

        const loginUniqueKeyInputSuffix = this.props.form.getFieldsValue().loginUniqueKey ?
            <Icon type="close-circle" onClick={this.emitLoginUniqueKeyInputEmpty}/> : null;

        const passwordInputSuffix = this.props.form.getFieldsValue().password ?
            <Icon type="close-circle" onClick={this.emitLoginPasswordInputEmpty}/> : null;

        return (
            <div className={styles.main}>
                <div className={styles.login}>
                    <Form onSubmit={this.handleLogin}>
                        {/*<Form.Item>
                            {getFieldDecorator('loginUniqueKey', {
                                rules: [{required: true, message: `请输入用户名`}],
                            })(
                                <Input
                                    placeholder="请输入用户名"
                                    size='large'
                                    prefix={<Icon type="user" className="icon-change"/>}
                                    suffix={loginUniqueKeyInputSuffix}
                                    ref={node => this.loginUniqueKeyInput = node}
                                />
                            )}

                        </Form.Item>*/}
                        <Form.Item>
                            {getFieldDecorator('secret', {
                                rules: [{required: true, message: '请输入Secret'}],
                            })(
                                <Input type="secret"
                                       size='large'
                                       placeholder="请输入Secret"
                                       prefix={<Icon type="lock" className="icon-change"/>}
                                       suffix={passwordInputSuffix}
                                       ref={node => this.passwordInput = node}
                                />
                            )}
                        </Form.Item>


                        <Form.Item>
                            <Button type="primary"
                                    size="large"
                                    htmlType="submit"
                                    className={styles.submit}
                                    disabled={userAuth.isLogging && userAuth.isFetching}
                                    loading={userAuth.isLogging && userAuth.isFetching}>
                                立即登录
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        );
    }


    static contextTypes = {}
    static propTypes = {}
    static defaultProps = {}
}
