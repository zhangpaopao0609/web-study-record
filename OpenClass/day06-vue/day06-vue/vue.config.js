const port = 6090;
const title = 'paopao';

const path = require('path');
const resolve = (dir) => {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/arrow',
    devServer: {
        port
    },
    configureWebpack: {
        name: title
    },
    chainWebpack(config) {
        config.module.rule('svg')
            .exclude.add(resolve('./src/assets/svg/wechat.svg'));

        // 添加svg-sprite-loader
        config.module.rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('./src/assets/svg/wechat.svg'))
                .end()  // add完上下文进入了数组，使用end回退
            .use('svg-sprite-loader')
                .loader('svg-sprite-loader')
                .options({ symbolId: 'icon-[name]' })
                .end()
    }
}