# Angular 2 + JSPM!

A simple example of Angular 2 using JSPM/SystemJS.

This repo is an example of [Angular 2](https://angular.io/) application using [SystemJS](https://github.com/systemjs/systemjs) and [JSPM](http://jspm.io/).  In this example I use NPM for all development tools and build scripts (no gulp or grunt).  The front end resources are installed and managed using JSPM and loaded using SystemJS (the Universal dynamic module loader).  JavaScript resources, styles and templates are dynamically loaded during development and bundled for production using [SystemJS builder](https://github.com/systemjs/builder) via the JSPOM cli.  

* Angular2 Beta-0
* ES6 syntax and modules (+ES7 Decorators) via Babel (no typescript)
* [Twitter Bootstrap](http://getbootstrap.com/)
* Manage front end resources using JSPM
* Load resources using SystemJS
* Bundle builds via SystemJS Builder
* Template and styles compilation via SystemJS plugins
* [Semi-Standard Style](https://github.com/Flet/semistandard) (because languages have punctuation)
* gh-pages deploy via [tschaub/gh-pages](https://github.com/tschaub/gh-pages)
* Routing capability

## Quick start

```bash
git clone --depth 1 https://github.com/Hypercubed/angular2-example.git
cd angular2-example
npm install
npm start
```

## Other commands

- `npm run check` -  run semi-standard on application files
- `npm run bundle` - bundle resources and inject into SystemJS config
- `npm run unbundle` - unbundle resources and remove bundle
- `npm run start:dist` - bundle and start server
- `npm run deploy` - bundle, deploy to gh-pages, unbundle

## File Structure

This example follows the [angular-cli](https://github.com/angular/angular-cli) structure.

```
root/
 ├──src/
 │   ├──jspm_packages/
 │   ├──app/
 │   │   ├──components/
 │   │   ├──services/
 │   │   ├──pipes/
 │   │   ├──main.js
 │   │   ├──main.html
 │   │   └──main.css
 |   ├──app.js
 |   ├──index.html
 |   ├──config.js
 |   ├──build.js
 |   └──build.js.map
 ├──package.json
 └──README.md
```

## Other Example Repos

* [angular2-go](https://github.com/johnpapa/angular2-go) (John Papa)
  - TypeScript, SystemJS
* [ng2-jspm-seed](https://github.com/robwormald/ng2-jspm-seed) (Rob Wormald)
  - TypeScript, Gulp, JSPM
* [babel-angular2-app](https://github.com/shuhei/babel-angular2-app) (Shuhei Kagawa)
  - Babel, ES6+, Gulp, Karma, Browserify

## License

MIT
