/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */
const path = require('path')

module.exports = {
    origin: 'https://test.miniprogram.com',
    entry: '/',
    router: {
        index: ['/'],
        explore: ['/explore'],
        cart: ['/cart'],
        me: ['/me'],
    },
    redirect: {
        notFound: 'index',
        accessDenied: 'index',
        explore: "/explore",
        cart: "/cart",
        me: "/me"
    },
    generate: {
        autoBuildNpm: 'npm',
        tabBar: {
            color: '#000000',
            selectedColor: '#DE554F',
            backgroundColor: '#ffffff',
            list: [{
                pageName: 'index',
                text: '优选',
                iconPath: path.resolve(__dirname, '../src/img/home.png'),
                selectedIconPath: path.resolve(__dirname, '../src/img/home-active.png'),
            }, {
                pageName: 'explore',
                text: '发现',
                iconPath: path.resolve(__dirname, '../src/img/explore.png'),
                selectedIconPath: path.resolve(__dirname, '../src/img/explore-active.png'),
            }, {
                pageName: 'cart',
                text: '购物车',
                iconPath: path.resolve(__dirname, '../src/img/shop-cart.png'),
                selectedIconPath: path.resolve(__dirname, '../src/img/shop-cart-active.png'),
            }, {
                pageName: 'me',
                text: '我的',
                iconPath: path.resolve(__dirname, '../src/img/me.png'),
                selectedIconPath: path.resolve(__dirname, '../src/img/me-active.png'), 
            }],
        },
    },
    app: {
        backgroundTextStyle: 'dark',
        backgroundColor: '#F6F6F6',
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: '#DE554F',
        navigationBarTitleText: '值得买京东优选',
        enablePullDownRefresh: false
    },
    appExtraConfig: {
        sitemapLocation: 'sitemap.json',
    },
    global: {
        rem: true,
        share: true,
        windowScroll: false,
        backgroundColor: '#F7F7F7',
    },
    pages: {
        index: {
            extra: {
                navigationBarTextStyle: 'white',
            }
        },
        explore: {
            extra: {
                navigationBarTextStyle: 'white',
            }
        },
        cart: {
            extra: {
                navigationBarTitleText: '购物车',
                navigationBarBackgroundColor: '#ffffff',
            }
        },
        me: {
            extra: {
                navigationBarTitleText: '个人中心',
                navigationBarBackgroundColor: '#ffffff',
            }
        }
    },
    optimization: {
        domSubTreeLevel: 10,

        elementMultiplexing: true,
        textMultiplexing: true,
        commentMultiplexing: true,
        domExtendMultiplexing: true,

        styleValueReduce: 5000,
        attrValueReduce: 5000,
    },
    projectConfig: {
        projectname: 'multipages',
        appid: 'wx8a0eefd4d44f2648',
    },
}
