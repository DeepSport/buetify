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
	configureWebpack: () => {
		console.log(process.env.VUE_CLI_MODERN_BUILD);
		return {
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
			plugins: process.env.VUE_CLI_MODERN_BUILD
				? [
					new PrerenderSpaPlugin({
						staticDir: path.resolve(__dirname, 'dist'),
						routes: ['/', '/documentation'],
						renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
							renderAfterDocumentEvent: 'custom-render-trigger',
						}),
						postProcess: (renderedRoute: any) => {
							renderedRoute.html = renderedRoute.html
								.replace('id="app"', 'id="app" data-server-rendered="true"')

							return renderedRoute
						}
					})
				]
				: []
		}
	},
	pwa: {
		workboxOptions: {
			exclude: [/_redirects/]
		}
	}
};
