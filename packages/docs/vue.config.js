const path = require('path');

module.exports = {
	// parallel: false,
	transpileDependencies: ['buetify'],
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "~@/assets/variables"`
			},
			scss: {
				prependData: `@import "~@/assets/variables";`
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				vue$: path.resolve(__dirname, './node_modules/vue'),
				'fp-ts/lib': 'fp-ts/es6',
				'io-ts/lib': 'io-ts/es6'
			}
		},
	}
};
