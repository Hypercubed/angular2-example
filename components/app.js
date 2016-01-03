import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import './app.css!';
import template from './app.html!text';

import {AboutComponent} from './about/about';
import {DashboardComponent} from './dashboard/dashboard';

@Component({
  selector: 'my-app',
  template,
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', name: 'Dashboard', component: DashboardComponent, useAsDefault: true},
  {path: '/about', name: 'About', component: AboutComponent}
])
export class AppComponent {

}
