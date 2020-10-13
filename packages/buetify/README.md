
> `Buetify` is a modular library of responsive UI components for [Vue.js](https://vuejs.org/) incorporating the [Bulma](http://bulma.io/) framework and design.

## WIP
This is a work in progress. I started `Buetify` in order to gain a better understanding of design principles, accessibility and Vue.
It initially started as a fork of `Buefy` which is awesome and what should be used in a production setting. This library also includes a lot of ideas
from Vuetify in terms of accessibility and how to incorporate typescript into a Vue project. 

Since the components are in such a high state of flux I have not invested the time into testing and documentation that would accompany a production ready library.

## Differences from Buefy

### Main Differences
* Written in Typescript
* Uses only render functions to maximize type safety
* Has light / dark theme functionality
* Completely tree-shakeable and modular. Importing an individual component only imports the styling and code relating to that component. This comes at a cost of a more manual setup which will hopefully be mitigated by a vue-cli plugin in the future.
* Greater emphasis on accessibility. This is by no means a finished product in terms of accessibility, but I think offers an improvement.

### Small Differences
* Requires all components to be nested inside a `b-app` component for themes, notifications, and modals to work properly
* Requires additional webpack config such that sass variables are prepended to all sass files. This prevents the need from importing all sass upfront.
* Small differences in naming conventions, e.g. `variant` rather than `type` for color props
* Icons need to be passed as vue components rather than strings. This was done to simplify how icons are handled. Default icons are provided.

## Quick start

You need [Vue.js](https://vuejs.org/) **version 3.0+**.

### 1 Install via npm / yarn

```bash
npm install buetify
yarn install buetify
```

### 2 Create a variables.sass file
```sass
// variables.sass

// provide any variable overrides here. Be careful to not include 
// any actual styles as they will be prepended to every sass file in your bundle.

@import '~buetify/src/sass/variables'
@import '~bulma/sass/utilities/initial-variables'

```

### 3 Update webpack config
```javascript
// webpack.config.js

module.exports = {
  module: {
    rules: [
      // SASS has different line endings than SCSS
      // and cannot use semicolons in the markup
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss'"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss'"
            },
          },
        ],
      },
      // SCSS has different line endings than SASS
      // and needs a semicolon after the import.
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss';"
            },
          },
        ],
      },
    ],
  },
}
```

### 4 Import and use `Buetify`

No need to install `buetify` as a plugin in your `main.js` file. Just import the components you need where they are needed.

Inside Vue component
```typescript
import Vue from 'vue';
import BApp from 'buetify/lib/components/app';

export default Vue.extend({
    name: 'MyComponent',
    components: {
    	BApp
    }
});

```
