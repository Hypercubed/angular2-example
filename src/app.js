import {View, Component, FORM_DIRECTIVES} from 'angular2/angular2';
import appTemplate from './app.html!text';
import './app.css!';
import {transform as transformService} from './shorter-service';

@Component({ selector: 'my-app' })
@View({
  template: appTemplate,
  directives: [FORM_DIRECTIVES]
})
export class AppComponent {
  constructor(){
    this.title = transformService('Shorten your too large tweets', 0);
    this.max = 140;
    this.input = 'Imagine you want to write a tweet.  Unfortunately, one hundred and forty characters is too little.  Here is one very stupid way to shorten your tweets. High five #angular2';
    this.output = transformService(this.input, this.max);
  }

  update() {
    this.output = transformService(this.input, this.max);
  }
}
