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
var di_1 = require('../core/di');
var lang_1 = require('../facade/lang');
var exceptions_1 = require('../facade/exceptions');
var cpl = require('./directive_metadata');
var md = require('../core/metadata/directives');
var directive_resolver_1 = require('../core/linker/directive_resolver');
var view_resolver_1 = require('../core/linker/view_resolver');
var directive_lifecycle_reflector_1 = require('../core/linker/directive_lifecycle_reflector');
var interfaces_1 = require('../core/linker/interfaces');
var reflection_1 = require('../core/reflection/reflection');
var di_2 = require('../core/di');
var platform_directives_and_pipes_1 = require('../core/platform_directives_and_pipes');
var util_1 = require('./util');
var url_resolver_1 = require('./url_resolver');
var RuntimeMetadataResolver = (function() {
  function RuntimeMetadataResolver(_directiveResolver, _viewResolver, _platformDirectives) {
    this._directiveResolver = _directiveResolver;
    this._viewResolver = _viewResolver;
    this._platformDirectives = _platformDirectives;
    this._cache = new Map();
  }
  RuntimeMetadataResolver.prototype.getMetadata = function(directiveType) {
    var meta = this._cache.get(directiveType);
    if (lang_1.isBlank(meta)) {
      var dirMeta = this._directiveResolver.resolve(directiveType);
      var moduleUrl = null;
      var templateMeta = null;
      var changeDetectionStrategy = null;
      if (dirMeta instanceof md.ComponentMetadata) {
        var cmpMeta = dirMeta;
        moduleUrl = calcModuleUrl(directiveType, cmpMeta);
        var viewMeta = this._viewResolver.resolve(directiveType);
        templateMeta = new cpl.CompileTemplateMetadata({
          encapsulation: viewMeta.encapsulation,
          template: viewMeta.template,
          templateUrl: viewMeta.templateUrl,
          styles: viewMeta.styles,
          styleUrls: viewMeta.styleUrls
        });
        changeDetectionStrategy = cmpMeta.changeDetection;
      }
      meta = cpl.CompileDirectiveMetadata.create({
        selector: dirMeta.selector,
        exportAs: dirMeta.exportAs,
        isComponent: lang_1.isPresent(templateMeta),
        dynamicLoadable: true,
        type: new cpl.CompileTypeMetadata({
          name: lang_1.stringify(directiveType),
          moduleUrl: moduleUrl,
          runtime: directiveType
        }),
        template: templateMeta,
        changeDetection: changeDetectionStrategy,
        inputs: dirMeta.inputs,
        outputs: dirMeta.outputs,
        host: dirMeta.host,
        lifecycleHooks: interfaces_1.LIFECYCLE_HOOKS_VALUES.filter(function(hook) {
          return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType);
        })
      });
      this._cache.set(directiveType, meta);
    }
    return meta;
  };
  RuntimeMetadataResolver.prototype.getViewDirectivesMetadata = function(component) {
    var _this = this;
    var view = this._viewResolver.resolve(component);
    var directives = flattenDirectives(view, this._platformDirectives);
    for (var i = 0; i < directives.length; i++) {
      if (!isValidDirective(directives[i])) {
        throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
      }
    }
    return directives.map(function(type) {
      return _this.getMetadata(type);
    });
  };
  RuntimeMetadataResolver = __decorate([di_2.Injectable(), __param(2, di_2.Optional()), __param(2, di_2.Inject(platform_directives_and_pipes_1.PLATFORM_DIRECTIVES)), __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, view_resolver_1.ViewResolver, Array])], RuntimeMetadataResolver);
  return RuntimeMetadataResolver;
})();
exports.RuntimeMetadataResolver = RuntimeMetadataResolver;
function flattenDirectives(view, platformDirectives) {
  var directives = [];
  if (lang_1.isPresent(platformDirectives)) {
    flattenArray(platformDirectives, directives);
  }
  if (lang_1.isPresent(view.directives)) {
    flattenArray(view.directives, directives);
  }
  return directives;
}
function flattenArray(tree, out) {
  for (var i = 0; i < tree.length; i++) {
    var item = di_1.resolveForwardRef(tree[i]);
    if (lang_1.isArray(item)) {
      flattenArray(item, out);
    } else {
      out.push(item);
    }
  }
}
function isValidDirective(value) {
  return lang_1.isPresent(value) && (value instanceof lang_1.Type);
}
function calcModuleUrl(type, cmpMetadata) {
  var moduleId = cmpMetadata.moduleId;
  if (lang_1.isPresent(moduleId)) {
    var scheme = url_resolver_1.getUrlScheme(moduleId);
    return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId : "package:" + moduleId + util_1.MODULE_SUFFIX;
  } else {
    return reflection_1.reflector.importUri(type);
  }
}
