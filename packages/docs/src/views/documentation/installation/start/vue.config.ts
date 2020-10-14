// vue.config.js
module.exports = {
	transpileDependencies: ['buetify'], // buetify only compiles to esnext, this allows you to choose your own browser support
	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "~@/assets/variables"`
			},
			scss: {
				prependData: `@import "~@/assets/variables";`
			}
		}
	}
};
