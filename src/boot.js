import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {AppComponent} from './app';

import 'bootstrap/css/bootstrap.css!';

bootstrap(AppComponent, [ROUTER_PROVIDERS]);
