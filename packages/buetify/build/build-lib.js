// rimraf es5 lib lib-temp
// tsc -p tsconfig.dist.json
// cross-env NODE_ENV=es5 babel lib-temp --out-dir es5 --source-maps -q
// mv ./lib-temp/entry-lib.js ./lib-temp/index.js
// cross-env NODE_ENV=lib babel lib-temp --out-dir lib --source-maps -q

'use strict'
const shell = require('shelljs')

shell.rm('-rf', 'lib', 'lib-temp')
shell.exec('yarn run tsc -p ./tsconfig.json')
shell.exec('yarn run cross-env NODE_ENV=lib babel lib-temp --out-dir lib --source-maps')
shell.exec('yarn run tsc -d -p ./tsconfig.json --emitDeclarationOnly --declarationDir lib')
shell.rm('-rf', 'lib-temp')
