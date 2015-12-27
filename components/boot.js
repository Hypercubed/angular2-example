// polyfills
import 'es6-shim';
import 'es6-promise';
import 'es7-reflect-metadata/dist/browser';
import 'zone.js/lib/browser/zone-microtask';
import 'zone.js/lib/browser/long-stack-trace-zone';

// Angular 2
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app';

// bootstrap
import 'bootstrap/css/bootstrap.css!';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
