/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var interfaces_1 = require('../interfaces');
var enums_1 = require('../enums');
var static_response_1 = require('../static_response');
var base_response_options_1 = require('../base_response_options');
var core_1 = require('../../../core');
var browser_jsonp_1 = require('./browser_jsonp');
var exceptions_1 = require('../../facade/exceptions');
var lang_1 = require('../../facade/lang');
var Observable_1 = require('rxjs/Observable');
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
var JSONPConnection = (function() {
  function JSONPConnection() {}
  return JSONPConnection;
})();
exports.JSONPConnection = JSONPConnection;
var JSONPConnection_ = (function(_super) {
  __extends(JSONPConnection_, _super);
  function JSONPConnection_(req, _dom, baseResponseOptions) {
    var _this = this;
    _super.call(this);
    this._dom = _dom;
    this.baseResponseOptions = baseResponseOptions;
    this._finished = false;
    if (req.method !== enums_1.RequestMethod.Get) {
      throw exceptions_1.makeTypeError(JSONP_ERR_WRONG_METHOD);
    }
    this.request = req;
    this.response = new Observable_1.Observable(function(responseObserver) {
      _this.readyState = enums_1.ReadyState.Loading;
      var id = _this._id = _dom.nextRequestID();
      _dom.exposeConnection(id, _this);
      var callback = _dom.requestCallback(_this._id);
      var url = req.url;
      if (url.indexOf('=JSONP_CALLBACK&') > -1) {
        url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
      } else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
        url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
      }
      var script = _this._script = _dom.build(url);
      var onLoad = function(event) {
        if (_this.readyState === enums_1.ReadyState.Cancelled)
          return;
        _this.readyState = enums_1.ReadyState.Done;
        _dom.cleanup(script);
        if (!_this._finished) {
          var responseOptions_1 = new base_response_options_1.ResponseOptions({
            body: JSONP_ERR_NO_CALLBACK,
            type: enums_1.ResponseType.Error,
            url: url
          });
          if (lang_1.isPresent(baseResponseOptions)) {
            responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
          }
          responseObserver.error(new static_response_1.Response(responseOptions_1));
          return;
        }
        var responseOptions = new base_response_options_1.ResponseOptions({
          body: _this._responseData,
          url: url
        });
        if (lang_1.isPresent(_this.baseResponseOptions)) {
          responseOptions = _this.baseResponseOptions.merge(responseOptions);
        }
        responseObserver.next(new static_response_1.Response(responseOptions));
        responseObserver.complete();
      };
      var onError = function(error) {
        if (_this.readyState === enums_1.ReadyState.Cancelled)
          return;
        _this.readyState = enums_1.ReadyState.Done;
        _dom.cleanup(script);
        var responseOptions = new base_response_options_1.ResponseOptions({
          body: error.message,
          type: enums_1.ResponseType.Error
        });
        if (lang_1.isPresent(baseResponseOptions)) {
          responseOptions = baseResponseOptions.merge(responseOptions);
        }
        responseObserver.error(new static_response_1.Response(responseOptions));
      };
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
      _dom.send(script);
      return function() {
        _this.readyState = enums_1.ReadyState.Cancelled;
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
        if (lang_1.isPresent(script)) {
          _this._dom.cleanup(script);
        }
      };
    });
  }
  JSONPConnection_.prototype.finished = function(data) {
    this._finished = true;
    this._dom.removeConnection(this._id);
    if (this.readyState === enums_1.ReadyState.Cancelled)
      return;
    this._responseData = data;
  };
  return JSONPConnection_;
})(JSONPConnection);
exports.JSONPConnection_ = JSONPConnection_;
var JSONPBackend = (function(_super) {
  __extends(JSONPBackend, _super);
  function JSONPBackend() {
    _super.apply(this, arguments);
  }
  return JSONPBackend;
})(interfaces_1.ConnectionBackend);
exports.JSONPBackend = JSONPBackend;
var JSONPBackend_ = (function(_super) {
  __extends(JSONPBackend_, _super);
  function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
    _super.call(this);
    this._browserJSONP = _browserJSONP;
    this._baseResponseOptions = _baseResponseOptions;
  }
  JSONPBackend_.prototype.createConnection = function(request) {
    return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
  };
  JSONPBackend_ = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [browser_jsonp_1.BrowserJsonp, base_response_options_1.ResponseOptions])], JSONPBackend_);
  return JSONPBackend_;
})(JSONPBackend);
exports.JSONPBackend_ = JSONPBackend_;
