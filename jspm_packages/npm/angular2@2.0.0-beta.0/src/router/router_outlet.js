/* */ 
'use strict';
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
var __param = (this && this.__param) || function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var async_1 = require('../facade/async');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var exceptions_1 = require('../facade/exceptions');
var core_1 = require('../../core');
var routerMod = require('./router');
var instruction_1 = require('./instruction');
var hookMod = require('./lifecycle_annotations');
var route_lifecycle_reflector_1 = require('./route_lifecycle_reflector');
var _resolveToTrue = async_1.PromiseWrapper.resolve(true);
var RouterOutlet = (function() {
  function RouterOutlet(_elementRef, _loader, _parentRouter, nameAttr) {
    this._elementRef = _elementRef;
    this._loader = _loader;
    this._parentRouter = _parentRouter;
    this.name = null;
    this._componentRef = null;
    this._currentInstruction = null;
    if (lang_1.isPresent(nameAttr)) {
      this.name = nameAttr;
      this._parentRouter.registerAuxOutlet(this);
    } else {
      this._parentRouter.registerPrimaryOutlet(this);
    }
  }
  RouterOutlet.prototype.activate = function(nextInstruction) {
    var _this = this;
    var previousInstruction = this._currentInstruction;
    this._currentInstruction = nextInstruction;
    var componentType = nextInstruction.componentType;
    var childRouter = this._parentRouter.childRouter(componentType);
    var providers = core_1.Injector.resolve([core_1.provide(instruction_1.RouteData, {useValue: nextInstruction.routeData}), core_1.provide(instruction_1.RouteParams, {useValue: new instruction_1.RouteParams(nextInstruction.params)}), core_1.provide(routerMod.Router, {useValue: childRouter})]);
    return this._loader.loadNextToLocation(componentType, this._elementRef, providers).then(function(componentRef) {
      _this._componentRef = componentRef;
      if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerOnActivate, componentType)) {
        return _this._componentRef.instance.routerOnActivate(nextInstruction, previousInstruction);
      }
    });
  };
  RouterOutlet.prototype.reuse = function(nextInstruction) {
    var previousInstruction = this._currentInstruction;
    this._currentInstruction = nextInstruction;
    if (lang_1.isBlank(this._componentRef)) {
      throw new exceptions_1.BaseException("Cannot reuse an outlet that does not contain a component.");
    }
    return async_1.PromiseWrapper.resolve(route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerOnReuse, this._currentInstruction.componentType) ? this._componentRef.instance.routerOnReuse(nextInstruction, previousInstruction) : true);
  };
  RouterOutlet.prototype.deactivate = function(nextInstruction) {
    var _this = this;
    var next = _resolveToTrue;
    if (lang_1.isPresent(this._componentRef) && lang_1.isPresent(this._currentInstruction) && route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerOnDeactivate, this._currentInstruction.componentType)) {
      next = async_1.PromiseWrapper.resolve(this._componentRef.instance.routerOnDeactivate(nextInstruction, this._currentInstruction));
    }
    return next.then(function(_) {
      if (lang_1.isPresent(_this._componentRef)) {
        _this._componentRef.dispose();
        _this._componentRef = null;
      }
    });
  };
  RouterOutlet.prototype.routerCanDeactivate = function(nextInstruction) {
    if (lang_1.isBlank(this._currentInstruction)) {
      return _resolveToTrue;
    }
    if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerCanDeactivate, this._currentInstruction.componentType)) {
      return async_1.PromiseWrapper.resolve(this._componentRef.instance.routerCanDeactivate(nextInstruction, this._currentInstruction));
    }
    return _resolveToTrue;
  };
  RouterOutlet.prototype.routerCanReuse = function(nextInstruction) {
    var result;
    if (lang_1.isBlank(this._currentInstruction) || this._currentInstruction.componentType != nextInstruction.componentType) {
      result = false;
    } else if (route_lifecycle_reflector_1.hasLifecycleHook(hookMod.routerCanReuse, this._currentInstruction.componentType)) {
      result = this._componentRef.instance.routerCanReuse(nextInstruction, this._currentInstruction);
    } else {
      result = nextInstruction == this._currentInstruction || (lang_1.isPresent(nextInstruction.params) && lang_1.isPresent(this._currentInstruction.params) && collection_1.StringMapWrapper.equals(nextInstruction.params, this._currentInstruction.params));
    }
    return async_1.PromiseWrapper.resolve(result);
  };
  RouterOutlet = __decorate([core_1.Directive({selector: 'router-outlet'}), __param(3, core_1.Attribute('name')), __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, routerMod.Router, String])], RouterOutlet);
  return RouterOutlet;
})();
exports.RouterOutlet = RouterOutlet;
