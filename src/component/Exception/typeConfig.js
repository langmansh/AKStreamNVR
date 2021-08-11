import b403 from '../../style/image/exception/403.svg'
import b404 from '../../style/image/exception/404.svg'
import b500 from '../../style/image/exception/500.svg'

const config = {
    403: {
        img: b403,
        title: '403',
        desc: '抱歉，你无权访问该页面',
    },
    404: {
        img: b404,
        title: '404',
        desc: '抱歉，你访问的页面不存在',
    },
    500: {
        img: b500,
        title: '500',
        desc: '抱歉，服务器出错了',
    },
};

export default config;
