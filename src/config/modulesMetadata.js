import TreeModel from "tree-model"

/**
 * 主要业务模块的元数据(树形结构), 菜单和路由可以根据此数据生成出来
 *
 * navClass: Navigation 的 className, (只有顶级节点有效)
 *
 * type :
 *      menu - 主菜单 (不填的默认值, 在顶部和左侧导航栏中呈现)
 *      nav - 导航 (不在页面中呈现, 路由也不会自动生成, 仅作为元数据存在, 相关功能页面通过元数据来手动构建)
 *      button - 功能按钮 (不在页面中呈现, 仅作为元数据存在,仅作为元数据存在, 相关功能页面通过元数据来手动构建)
 *
 * external :  是否外部链接
 * routerExact :  约定默认(不填的话)为 true, Router的匹配模式,  <Route exact .../> 参考 React Route 的 API
 * routerInnerComponent :  是否生成路由Router, 有值就生成, 基础路径在src目录
 */
const metadata = {
    name: 'ROOT',
    children: [
        {
            name: '控制台',
            path: '',
            icon: 'rvicon-map',
            navClass: "module-bpm",
            type: "menu",
            routerInnerComponent: () => import(`@/view/home/Home`),
            routerExact: true,
        },
        {
            name: '视频广场',
            path: 'plaza',
            icon: 'rvicon-map',
            navClass: "module-bpm",
            type: "menu",
            routerInnerComponent: () => import(`@/view/plaza/Plaza`),
            routerExact: false,
        },
        {
		    name: '设备列表',
		    path: 'devicelist',
		    icon: 'rvicon-map',
		    navClass: "module-bpm",
		    type: "menu",
		    routerInnerComponent: () => import(`@/view/devicelist/DeviceList`),
		    routerExact: false,
		},
		{
		    name: '设备管理',
		    path: 'device',
		    icon: 'rvicon-map',
		    navClass: "module-bpm",
		    type: "menu",
		    routerInnerComponent: () => import(`@/view/device/Device`),
		    routerExact: false,
		},
		{
		    name: '录像计划',
		    path: 'recordplan',
		    icon: 'rvicon-map',
		    navClass: "module-bpm",
		    type: "menu",
		    routerInnerComponent: () => import(`@/view/recordplan/RecordPlan`),
		    routerExact: false,
		}
        // {
        //     name: '录像回看',
        //     path: 'playback',
        //     icon: 'rvicon-map',
        //     navClass: "module-bpm",
        //     type: "menu",
        //     routerInnerComponent: () => import(`@/view/playback/Playback`),
        //     routerExact: false,
        // }
        // {
        //     name: '通道配置',
        //     path: 'channel',
        //     icon: 'rvicon-map',
        //     navClass: "module-bpm",
        //     type: "menu",
        //     routerInnerComponent: () => import(`@/view/channel/Channel`),
        //     routerExact: false,
        // },{
        //     name: '版本信息',
        //     path: 'about',
        //     icon: 'rvicon-map',
        //     navClass: "module-bpm",
        //     type: "menu",
        //     routerInnerComponent: () => import(`@/view/about/About`),
        //     routerExact: false,
        // }
    ]
};

/**
 * 生成一个基于元数据的TreeModel
 */
const metadataTree = new TreeModel();
const metadataTreeRoot = metadataTree.parse(metadata);

/**
 *  开始遍历元数据
 *  节点值会做以下处理
 *  1, 给未设置的属性的设置默认值( type, routerExact)
 *  2, 计算非叶节点的perms,
 *  3, 计算节点的fullpath (将自身和祖先节点的path拼接)
 */
metadataTreeRoot.walk(node => {
    if (!node.isRoot()) {
        //得到当前节点的路径, 排除掉 Root 节点
        const avaiableNodePaths = node.getPath().filter(n => !n.isRoot()).map(n => n.model.path);
        //得到当前节点的配置权限信息列表（已去重）
        const nodeChildrenAuthorities = [...new Set(node.all().map(n => n.model.authorities).reduce(function (pre = [], cur) {
            return cur ? pre.concat(cur) : pre;
        }))];

        node.model = Object.assign(
            {
                type: "menu",
                target: "_self",
                external: false,
                onclick: () => null,
                routerExact: true,
            },
            node.model,
            {
                fullpath: `/${avaiableNodePaths.join("/")}`,
                authorities: nodeChildrenAuthorities,
            }
        )
    }
})

/**
 * 用于生成 react route 的元数据
 */
const routesMetaData = metadataTreeRoot.all(node => node.model.routerInnerComponent ? true : false)
    .map((node, index) => {
        return node.model
    });


/**
 * 用于生成主导航菜单 的元数据, 直接使用metadataTreeRoot
 */
const navigationMetaData = metadataTreeRoot;


export {
    metadata,
    routesMetaData,
    navigationMetaData,
}


