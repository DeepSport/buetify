// @ts-nocheck
const fs = require('fs-extra')
const path = require('path')
const Prerenderer = require('@prerenderer/prerenderer')
const Renderer = require('@prerenderer/renderer-puppeteer');
const minify = require('html-minifier').minify;
const meta = require('../../src/views/documentation').meta;

function cleanHtml(html: any) {
	console.log(html);
	html = html.replace(/<style(?:.|\n)*<\/style>/, '').replace('id="app"', 'id="app" data-server-rendered="true"');
	return minify(html, {
		minifyCSS: true,
		removeAttributeQuotes: true,
		removeComments: true
	});
}


function postProcess(context: any){
	return {
		route: context.route,
		originalRoute: context.originalRoute,
		html: cleanHtml(context.html),
		outputPath: context.outputPath
	};
}
function main() {
	return new Promise((resolve, reject) => {
		const prerenderer = new Prerenderer({
			staticDir: path.resolve(__dirname, '../../dist'),
			renderer: new Renderer({
				maxConcurrentRoutes: 1,
				renderAfterDocumentEvent: 'networkidle0'
			})
		});
		console.log('initializing prerenderer');
		prerenderer.initialize()
			.then(() => {
				const routes = Object.keys(meta)
				console.log('Routes: ', JSON.stringify(routes))
				return prerenderer.renderRoutes([''])
			})
			.then(renderedRoutes => {
				console.log ('post processing routes');
				return renderedRoutes.map(postProcess)
			})
			.then(renderedRoutes => {
				console.log('routes processed')
				renderedRoutes.forEach(rendered => {
					if (!rendered.outputPath) {
						rendered.outputPath = path.join(__dirname, '../../dist', rendered.route, 'index.html')
					}
				})
				return renderedRoutes;
			})
			.then(processedRoutes => {
				console.log('writing files');
				const promises = Promise.all(processedRoutes.map(processedRoute => {
					return fs.ensureDir(path.dirname(processedRoute.outputPath))
						.then(() => {
							return new Promise((resolve, reject) => {
								fs.outputFile(processedRoute.outputPath, processedRoute.html.trim(), err => {
									if (err) reject(`[prerender-spa-plugin] Unable to write rendered route to file "${processedRoute.outputPath}" \n ${err}.`)
									else resolve()
								})
							})
						})
						.catch(err => {
							if (typeof err === 'string') {
								err = `[prerender-spa-plugin] Unable to create directory ${path.dirname(processedRoute.outputPath)} for route ${processedRoute.route}. \n ${err}`
							}

							throw err
						})
				}))

				return promises
			})
			.then(r => {
				prerenderer.destroy()
				resolve();
			})
			.catch(err => {
				prerenderer.destroy()
				const msg = '[prerender-spa-plugin] Unable to prerender all routes!'
				console.error(msg)
				reject(msg);
			})
	});
}

main()
