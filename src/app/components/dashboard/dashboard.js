import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, Control} from 'angular2/common';

import template from './dashboard.html!text';
import {transform as transformService} from '../../services/shorter-service';

import {TweetLengthPipe, TweetEncode} from '../../pipes/tweet-length/tweet-length';

import 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';

import 'twitter';

@Component({
  selector: 'my-dashboard',
  template,
  pipes: [TweetLengthPipe, TweetEncode],
  directives: [FORM_DIRECTIVES]
})
export class DashboardComponent {
  inputControl = new Control();
  maxControl = new Control();

  max = 140;
  title = transformService('Shorten your too large tweets', { max: 0 });
  input = 'Imagine, a tweet.  Unfortunately, one hundred and forty characters is too little...  Here is a way to shorten your tweets. High five #angular2 and @Hypercubed  http://hypercubed.github.io/angular2-example/';

  constructor () {
    const onInputChange = this.inputControl.valueChanges;
    const onMaxChange = this.maxControl.valueChanges;

    onInputChange
      .combineLatest(onMaxChange)
      .debounceTime(32)
      .startWith([this.input, this.max])
      /* .distinctUntilChanged(function (curr, prev) {
        return curr[1] === prev[1] && curr[0] === prev[0];
      }) */
      .subscribe(curr => this.output = transformService(curr[0], { max: curr[1] }));
  }
}
