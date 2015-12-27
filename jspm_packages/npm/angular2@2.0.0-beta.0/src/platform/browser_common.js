/* */ 
'use strict';
var lang_1 = require('../facade/lang');
var di_1 = require('../core/di');
var core_1 = require('../../core');
var common_1 = require('../../common');
var testability_1 = require('../core/testability/testability');
var dom_adapter_1 = require('./dom/dom_adapter');
var dom_events_1 = require('./dom/events/dom_events');
var key_events_1 = require('./dom/events/key_events');
var hammer_gestures_1 = require('./dom/events/hammer_gestures');
var dom_tokens_1 = require('./dom/dom_tokens');
var dom_renderer_1 = require('./dom/dom_renderer');
var shared_styles_host_1 = require('./dom/shared_styles_host');
var shared_styles_host_2 = require('./dom/shared_styles_host');
var browser_details_1 = require('../animate/browser_details');
var animation_builder_1 = require('../animate/animation_builder');
var browser_adapter_1 = require('./browser/browser_adapter');
var testability_2 = require('./browser/testability');
var wtf_init_1 = require('../core/profile/wtf_init');
var event_manager_1 = require('./dom/events/event_manager');
var dom_tokens_2 = require('./dom/dom_tokens');
exports.DOCUMENT = dom_tokens_2.DOCUMENT;
var title_1 = require('./browser/title');
exports.Title = title_1.Title;
var common_dom_1 = require('../../platform/common_dom');
exports.DebugElementViewListener = common_dom_1.DebugElementViewListener;
exports.ELEMENT_PROBE_PROVIDERS = common_dom_1.ELEMENT_PROBE_PROVIDERS;
exports.ELEMENT_PROBE_BINDINGS = common_dom_1.ELEMENT_PROBE_BINDINGS;
exports.inspectNativeElement = common_dom_1.inspectNativeElement;
exports.By = common_dom_1.By;
var browser_adapter_2 = require('./browser/browser_adapter');
exports.BrowserDomAdapter = browser_adapter_2.BrowserDomAdapter;
var tools_1 = require('./browser/tools/tools');
exports.enableDebugTools = tools_1.enableDebugTools;
exports.disableDebugTools = tools_1.disableDebugTools;
exports.BROWSER_PROVIDERS = lang_1.CONST_EXPR([core_1.PLATFORM_COMMON_PROVIDERS, new di_1.Provider(core_1.PLATFORM_INITIALIZER, {
  useValue: initDomAdapter,
  multi: true
})]);
function _exceptionHandler() {
  return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
}
function _document() {
  return dom_adapter_1.DOM.defaultDoc();
}
exports.BROWSER_APP_COMMON_PROVIDERS = lang_1.CONST_EXPR([core_1.APPLICATION_COMMON_PROVIDERS, common_1.FORM_PROVIDERS, new di_1.Provider(core_1.PLATFORM_PIPES, {
  useValue: common_1.COMMON_PIPES,
  multi: true
}), new di_1.Provider(core_1.PLATFORM_DIRECTIVES, {
  useValue: common_1.COMMON_DIRECTIVES,
  multi: true
}), new di_1.Provider(core_1.ExceptionHandler, {
  useFactory: _exceptionHandler,
  deps: []
}), new di_1.Provider(dom_tokens_1.DOCUMENT, {
  useFactory: _document,
  deps: []
}), new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, {
  useClass: dom_events_1.DomEventsPlugin,
  multi: true
}), new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, {
  useClass: key_events_1.KeyEventsPlugin,
  multi: true
}), new di_1.Provider(event_manager_1.EVENT_MANAGER_PLUGINS, {
  useClass: hammer_gestures_1.HammerGesturesPlugin,
  multi: true
}), new di_1.Provider(dom_renderer_1.DomRenderer, {useClass: dom_renderer_1.DomRenderer_}), new di_1.Provider(core_1.Renderer, {useExisting: dom_renderer_1.DomRenderer}), new di_1.Provider(shared_styles_host_2.SharedStylesHost, {useExisting: shared_styles_host_1.DomSharedStylesHost}), shared_styles_host_1.DomSharedStylesHost, testability_1.Testability, browser_details_1.BrowserDetails, animation_builder_1.AnimationBuilder, event_manager_1.EventManager]);
function initDomAdapter() {
  browser_adapter_1.BrowserDomAdapter.makeCurrent();
  wtf_init_1.wtfInit();
  testability_2.BrowserGetTestability.init();
}
exports.initDomAdapter = initDomAdapter;
