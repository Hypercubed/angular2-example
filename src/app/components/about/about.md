# Angular 2 + JSPM!

A simple example of Angular 2 using SystemJS.

This repo is an example of [Angular 2](https://angular.io/) application using [JSPM](http://jspm.io/).  In this example I use NPM for all development tools and build scripts (no gulp or grunt).  The front end resources are installed and managed using JSPM and loaded using [SystemJS](https://github.com/systemjs/systemjs) (the Universal dynamic module loader).  JavaScript resources, styles and templates are dynamically loaded during development and bundled for production using [SystemJS builder](https://github.com/systemjs/builder).  

* Angular2 Beta-0
* ES6 syntax and modules (+ES7 Decorators) via Babel (no typescript)
* [Twitter Bootstrap](http://getbootstrap.com/)
* Manage front end resources using JSPM
* Bundle builds via SystemJS Builder
* Template Compilation
* [Semi-Standard Style](https://github.com/Flet/semistandard) (because languages have punctuation)
* gh-pages deploy via [tschaub/gh-pages](https://github.com/tschaub/gh-pages)
* Routing

## Quick start

```bash
git clone https://github.com/Hypercubed/angular2-example.git
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
