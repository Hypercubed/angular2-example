import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import template from './dashboard.html!text';
import {transform as transformService} from '../../services/shorter-service';

import {TweetLengthPipe, TweetEncode} from '../../pipes/tweet-length/tweet-length';

import 'twitter';

@Component({
  selector: 'my-dashboard',
  template,
  pipes: [TweetLengthPipe, TweetEncode],
  directives: [FORM_DIRECTIVES]
})
export class DashboardComponent {
  constructor () {
    this.max = 140;
    this.title = transformService('Shorten your too large tweets', 0);
    this.input = 'Imagine, a tweet.  Unfortunately, one hundred and forty characters is too little...  Here is a way to shorten your tweets. High five #angular2 and @Hypercubed  http://hypercubed.github.io/angular2-example/';
    this.update();
  }

  update () {
    this.output = transformService(this.input, { max: this.max });
  }
}
