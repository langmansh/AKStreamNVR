export function newMessages() {
    return {
        default: '字段 %s 校验失败',
        required: '%s 必填',
        enum: '%s 必须是 %s 中的一个',
        whitespace: '%s 不能为空',
        date: {
            format: '%s 日期对象 %s 无效，当转换 %s时',
            parse: '%s 日期对象不能被解析, %s 无效',
            invalid: '%s 日期对象 %s 无效',
        },
        types: {
            string: '%s 不是一个 %s',
            method: '%s 不是一个 %s (function)',
            array: '%s 不是一个 %s',
            object: '%s 不是一个 %s',
            number: '%s 不是一个 %s',
            date: '%s 不是一个 %s',
            boolean: '%s 不是一个 %s',
            integer: '%s 不是一个 %s',
            float: '%s 不是一个 %s',
            regexp: '%s 不是一个有效的 %s',
            email: '%s 不是一个有效的 %s',
            url: '%s 不是一个有效的 %s',
            hex: '%s 不是一个有效的 %s',
        },
        string: {
            len: '字段 %s 须包含 %s 个字符',
            min: '字段 %s 须大于 %s 个字符',
            max: '字段 %s 须小于 %s 个字符',
            range: '字段 %s 须小于 %s 到 %s 个字符',
        },
        number: {
            len: '字段 %s 须等于 %s',
            min: '字段 %s 须大于 %s',
            max: '字段 %s 须小于 %s',
            range: '字段 %s 须介于 %s 、 %s 之间',
        },
        array: {
            len: '字段 %s 的长度须等于 %s',
            min: '字段 %s 的长度须大于 %s',
            max: '字段 %s 的长度须小于 %s',
            range: '字段 %s 的长度须介于 %s 、 %s 之间',
        },
        pattern: {
            mismatch: '字段 %s 的值 %s 不匹配正则 %s',
        },
        clone() {
            const cloned = JSON.parse(JSON.stringify(this));
            cloned.clone = this.clone;
            return cloned;
        },
    };
}

export const messages = newMessages();
