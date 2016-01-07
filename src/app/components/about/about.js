import {Component} from 'angular2/core';

import template from './about.md!md';

@Component({
  selector: 'my-about',
  template,
  directives: []
})
export class AboutComponent {
  constructor () {
  }
}
