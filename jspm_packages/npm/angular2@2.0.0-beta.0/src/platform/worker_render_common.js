/* */ 
'use strict';
var lang_1 = require('../facade/lang');
var message_bus_1 = require('../web_workers/shared/message_bus');
var ng_zone_1 = require('../core/zone/ng_zone');
var core_1 = require('../../core');
var common_dom_1 = require('../../platform/common_dom');
var di_1 = require('../core/di');
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
var compiler_1 = require('../../compiler');
var xhr_impl_1 = require('./browser/xhr_impl');
var testability_1 = require('../core/testability/testability');
var testability_2 = require('./browser/testability');
var browser_adapter_1 = require('./browser/browser_adapter');
var wtf_init_1 = require('../core/profile/wtf_init');
var renderer_1 = require('../web_workers/ui/renderer');
var xhr_impl_2 = require('../web_workers/ui/xhr_impl');
var service_message_broker_1 = require('../web_workers/shared/service_message_broker');
var client_message_broker_1 = require('../web_workers/shared/client_message_broker');
var serializer_1 = require('../web_workers/shared/serializer');
var api_1 = require('../web_workers/shared/api');
var render_proto_view_ref_store_1 = require('../web_workers/shared/render_proto_view_ref_store');
var render_view_with_fragments_store_1 = require('../web_workers/shared/render_view_with_fragments_store');
exports.WORKER_SCRIPT = lang_1.CONST_EXPR(new di_1.OpaqueToken("WebWorkerScript"));
exports.WORKER_RENDER_MESSAGING_PROVIDERS = lang_1.CONST_EXPR([renderer_1.MessageBasedRenderer, xhr_impl_2.MessageBasedXHRImpl]);
exports.WORKER_RENDER_PLATFORM = lang_1.CONST_EXPR([core_1.PLATFORM_COMMON_PROVIDERS, new di_1.Provider(core_1.PLATFORM_INITIALIZER, {
  useValue: initWebWorkerRenderPlatform,
  multi: true
})]);
exports.WORKER_RENDER_APP_COMMON = lang_1.CONST_EXPR([core_1.APPLICATION_COMMON_PROVIDERS, exports.WORKER_RENDER_MESSAGING_PROVIDERS, new di_1.Provider(core_1.ExceptionHandler, {
  useFactory: _exceptionHandler,
  deps: []
}), new di_1.Provider(dom_tokens_1.DOCUMENT, {
  useFactory: _document,
  deps: []
}), new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
  useClass: dom_events_1.DomEventsPlugin,
  multi: true
}), new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
  useClass: key_events_1.KeyEventsPlugin,
  multi: true
}), new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, {
  useClass: hammer_gestures_1.HammerGesturesPlugin,
  multi: true
}), new di_1.Provider(dom_renderer_1.DomRenderer, {useClass: dom_renderer_1.DomRenderer_}), new di_1.Provider(core_1.Renderer, {useExisting: dom_renderer_1.DomRenderer}), new di_1.Provider(shared_styles_host_2.SharedStylesHost, {useExisting: shared_styles_host_1.DomSharedStylesHost}), new di_1.Provider(compiler_1.XHR, {useClass: xhr_impl_1.XHRImpl}), xhr_impl_2.MessageBasedXHRImpl, new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, {useClass: service_message_broker_1.ServiceMessageBrokerFactory_}), new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, {useClass: client_message_broker_1.ClientMessageBrokerFactory_}), serializer_1.Serializer, new di_1.Provider(api_1.ON_WEB_WORKER, {useValue: false}), render_view_with_fragments_store_1.RenderViewWithFragmentsStore, render_proto_view_ref_store_1.RenderProtoViewRefStore, shared_styles_host_1.DomSharedStylesHost, testability_1.Testability, browser_details_1.BrowserDetails, animation_builder_1.AnimationBuilder, common_dom_1.EventManager]);
function initializeGenericWorkerRenderer(injector) {
  var bus = injector.get(message_bus_1.MessageBus);
  var zone = injector.get(ng_zone_1.NgZone);
  bus.attachToZone(zone);
  zone.run(function() {
    exports.WORKER_RENDER_MESSAGING_PROVIDERS.forEach(function(token) {
      injector.get(token).start();
    });
  });
}
exports.initializeGenericWorkerRenderer = initializeGenericWorkerRenderer;
function initWebWorkerRenderPlatform() {
  browser_adapter_1.BrowserDomAdapter.makeCurrent();
  wtf_init_1.wtfInit();
  testability_2.BrowserGetTestability.init();
}
exports.initWebWorkerRenderPlatform = initWebWorkerRenderPlatform;
function _exceptionHandler() {
  return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
}
function _document() {
  return dom_adapter_1.DOM.defaultDoc();
}
