import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import template from './dashboard.html!text';
import {transform as transformService} from '../../services/shorter-service';

import twttr from 'twitter-text';

@Component({
  template,
  directives: [FORM_DIRECTIVES]
})
export class DashboardComponent {
  constructor () {
    this.max = 140;
    this.title = transformService('Shorten your too large tweets', 0);
    // this.input = 'Imagine you want to write a tweet.  Unfortunately, one hundred and forty characters is too little.  Here is one very stupid way to shorten your tweets. High five #angular2';
    this.input = 'Unfortunately, one hundred and forty characters is too little...  Here is one very stupid way to shorten your tweets. High five #angular2.  @imagine  http://www.imagine.com';
    this.update();
  }

  update () {
    this.output = transformService(this.input, { max: this.max });
  }

  tweetLength (l) {
    return twttr.getTweetLength(l);
  }
}
