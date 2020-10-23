"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
// @ts-ignore
var prerender_spa_plugin_1 = tslib_1.__importDefault(require("prerender-spa-plugin"));
var documentation_1 = require("./src/views/documentation/");
var isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    transpileDependencies: ['buetify'],
    css: {
        loaderOptions: {
            sass: {
                additionalData: "@import \"~@/assets/variables\""
            },
            scss: {
                additionalData: "@import \"~@/assets/variables\";"
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path_1.default.resolve(__dirname, './src'),
                vue$: isProduction
                    ? path_1.default.resolve(__dirname, '../../node_modules/vue/dist/vue.runtime.esm-browser.js')
                    : path_1.default.resolve(__dirname, '../../node_modules/vue'),
                'fp-ts/lib': 'fp-ts/es6/',
                'io-ts/lib': 'io-ts/es6/',
                'buetify/src': path_1.default.resolve(__dirname, '../buetify/src/'),
                'buetify/lib': path_1.default.resolve(__dirname, '../buetify/src/')
            }
        },
        // @ts-ignore
        plugins: isProduction ? [new prerender_spa_plugin_1.default(path_1.default.resolve(__dirname, 'dist'), Object.keys(documentation_1.meta))] : []
    },
    pwa: {
        workboxOptions: {
            exclude: [/_redirects/]
        }
    }
};
//# sourceMappingURL=vue.config.js.map