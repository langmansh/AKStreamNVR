const path = require('path');
const {override, useEslintRc, fixBabelImports, addBabelPresets, addBabelPlugins, addWebpackResolve, addLessLoader, addDecoratorsLegacy} = require('customize-cra');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = override(
    useEslintRc(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': "#4777e8",
            '@link-color': '#4777e8',
        },

    }),

    addWebpackResolve({
        alias: {'@': path.resolve(__dirname, 'src')}
    }),


    addBabelPlugins(
        "@babel/plugin-syntax-object-rest-spread",
        ['@babel/plugin-proposal-decorators', {'legacy': true}]
    ),
    addBabelPresets([
        '@emotion/babel-preset-css-prop'
    ]),

    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),


);
