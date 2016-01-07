// polyfills
import 'es6-shim';
import 'es6-promise';
import 'es7-reflect-metadata/dist/browser';
import 'zone.js/lib/browser/zone-microtask';
import 'zone.js/lib/browser/long-stack-trace-zone';

// Angular 2
import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {AppComponent} from './app/main';

// bootstrap
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

if (!window.location.origin.match(/localhost/)) {
  // prod mode
  enableProdMode();
}

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
