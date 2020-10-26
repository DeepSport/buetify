const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
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
				vue$: isProduction
					? path.resolve(__dirname, '../../node_modules/vue/dist/vue.runtime.esm-browser.js')
					: path.resolve(__dirname, '../../node_modules/vue'),
				'fp-ts/lib': 'fp-ts/es6/',
				'io-ts/lib': 'io-ts/es6/'
			}
		}
	},
	pwa: {
		workboxOptions: {
			exclude: [/_redirects/]
		}
	}
};
