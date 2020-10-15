const path = require('path');

module.exports = {
	// parallel: false,
	transpileDependencies: ['buetify'],
	css: {
		loaderOptions: {
			sass: {
				additionalData: `@import "~@/assets/variables"`
			},
			scss: {
				additionalData: `@import "~@/assets/variables";`
			}
		}
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				vue$: path.resolve(__dirname, '../../node_modules/vue'),
				'fp-ts/lib': 'fp-ts/es6/',
				'io-ts/lib': 'io-ts/es6/',
				'buetify/src': path.resolve(__dirname, '../buetify/src/'),
				'buetify/lib': path.resolve(__dirname, '../buetify/src/')
			}
		},
	},
	chainWebpack: config => {
		config.module
			.rule('raw')
			.test(/\.txt$/)
			.use('raw-loader')
			.loader('raw-loader')
			.end()
	}
};

