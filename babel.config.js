const bue = require('./package.json')

const env = process.env.NODE_ENV

module.exports = {
    presets: [
        ['@babel/preset-env', {
            modules: false,
        }],
    ],
    plugins: [
        ['transform-define', {
            __BUE_VERSION__: bue.version,
            __REQUIRED_VUE__: bue.dependencies.vue,
        }],
    ],
    env: {
        test: {
            presets: [
                ['@babel/preset-env', {
                    targets: { node: true },
                }],
            ],
            plugins: [
                ['module-resolver', {
                    root: ['./src'],
                    alias: {
                        '~components': 'components',
                        '~directives': 'directives',
                        '~mixins': 'mixins',
                        '~util': 'util',
                    },
                }],
            ],
        },
        es5: {
            presets: ['@babel/preset-env'],
        },
        lib: {
            presets: [
                ['@babel/preset-env', {
                    targets: 'last 1 chrome version',
                    modules: false,
                }]
            ],
        },
    },
}

if (['lib', 'es5'].includes(env)) {
    module.exports.plugins.push('./build/babel-transform-sass-paths.js')
}

if (env !== 'lib') {
    module.exports.plugins.push('@babel/plugin-proposal-object-rest-spread')
}
