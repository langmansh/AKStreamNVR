import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import Root from "./Root";
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';

require('promise.prototype.finally').shim();
moment.locale('zh-cn');
ReactDOM.render(<Root />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
