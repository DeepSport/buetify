import path from 'path';
// @ts-ignore
import PrerenderSpaPlugin from 'prerender-spa-plugin';
import { meta } from './src/views/documentation/';

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
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
				vue$: isProduction
					? path.resolve(__dirname, '../../node_modules/vue/dist/vue.runtime.esm-browser.js')
					: path.resolve(__dirname, '../../node_modules/vue'),
				'fp-ts/lib': 'fp-ts/es6/',
				'io-ts/lib': 'io-ts/es6/',
				'buetify/src': path.resolve(__dirname, '../buetify/src/'),
				'buetify/lib': path.resolve(__dirname, '../buetify/src/')
			}
		},
		// @ts-ignore
		plugins: isProduction
			? [
					new PrerenderSpaPlugin({
						staticDir: path.resolve(__dirname, 'dist'),
						routes: Object.keys(meta)
					})
			  ]
			: []
	},
	pwa: {
		workboxOptions: {
			exclude: [/_redirects/]
		}
	}
};
