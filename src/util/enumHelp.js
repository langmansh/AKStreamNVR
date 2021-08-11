// RvEnum的帮助类

/**
 * 获取枚举对象
 * @param rvEnumsObj    所有的枚举集对象
 * @param rvEnumType    枚举类型
 * @returns {string}    枚举对象
 */
export const getEnum = (rvEnumsObj, rvEnumType) => {
    return (rvEnumType in rvEnumsObj) ? rvEnumsObj[rvEnumType] : "";
}

/**
 * 获取枚举描述
 * @param rvEnumsObj    所有的枚举集对象
 * @param rvEnumType    枚举类型
 * @param rvEnumName    枚举名称
 * @returns {string}    枚举描述
 */
export const getEnumDesc = (rvEnumsObj, rvEnumType, rvEnumName) => {
    const rvEnum = getEnum(rvEnumsObj, rvEnumType);
    return (rvEnum && rvEnumName in rvEnum) ? rvEnum[rvEnumName].enumDesc : "";
}

