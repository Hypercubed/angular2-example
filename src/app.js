import {View, Component, bootstrap} from 'angular2/angular2';
import appTemplate from './app.html!text';
import './app.css!';

@Component({ selector: 'my-app' })
@View({
  template: appTemplate
})
export class AppComponent {
  name;
  constructor(){
    this.name = 'Angular2';
    setTimeout(() => {
      this.name = 'Angular2!!!'
    },1500);
  }
}
