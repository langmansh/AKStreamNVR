var SIZES = ['字节', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export function formatBytes(bytes, decimals, jd = 1024) {
    for (var i = 0, r = bytes, b = jd; r > b; i++) r /= b;
    return `${parseFloat(r.toFixed(decimals))} ${SIZES[i]}`;
}


export const createAutoTrggerDownloadLink = (url, name, linkTarget) => {
    const link = document.createElement('a');
    link.href = url;
    if (name) {
        link.setAttribute('download', name);
    }
    if (linkTarget)
        link.setAttribute('target', linkTarget);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}


export const hasJsonStructure = (str) => {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        return Object.prototype.toString.call(result) === '[object Object]'
            || Array.isArray(result);
    } catch (err) {
        return false;
    }
}


export const strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);


export const BizRegex = {
    emailOrMobile: /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)|(\d{7,15})$/,
    mobile: /^\d{11}$/,
    vmobile: /^\d{6}$/,
    phone: /^\d{7,15}$/,
    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    loginName: /^[a-zA-Z\u4e00-\u9fa5][\w\u4e00-\u9fa5]+$/,
    captcha: /^\d{1,6}$/,
    noblank: /^[^\s]*$/,
    json: /^[^\s]*$/,
}

//是否是JSONObject
export const isJsonObject = (jsonStr) => {
    try {
        if (typeof JSON.parse(jsonStr) === "object" && !Array.isArray(JSON.parse(jsonStr))) {
            return true;
        }
    } catch (e) {
        console.log("not in json structure or value");
    }
    return false;
}

export const isJsonArray = (jsonStr) => {
    try {
        if (Array.isArray(JSON.parse(jsonStr))) {
            return true;
        }
    } catch (e) {
        console.log("not in json structure or value");
    }
    return false;
}

export const findDomainFromUrl = (url) => {
    var result;
    var match;
    if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
        result = match[1]
        if (match = result.match(/^([^\.]+\.)+(.+\..+)$/)) {
            result = match[2];
        }
    }
    return result;
}
