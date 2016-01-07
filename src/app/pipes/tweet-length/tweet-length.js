import twttr from 'twitter-text';

import {Pipe} from 'angular2/core';

@Pipe({
  name: 'TweetLength'
})
export class TweetLengthPipe {
  transform (value) {
    return twttr.getTweetLength(value);
  }
}

@Pipe({
  name: 'TweetEncode'
})
export class TweetEncode {
  transform (value) {
    return window.encodeURIComponent(value);
  }
}
