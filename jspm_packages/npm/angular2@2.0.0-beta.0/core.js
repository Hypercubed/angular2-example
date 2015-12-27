/* */ 
'use strict';
function __export(m) {
  for (var p in m)
    if (!exports.hasOwnProperty(p))
      exports[p] = m[p];
}
__export(require('./src/core/metadata'));
__export(require('./src/core/util'));
__export(require('./src/core/prod_mode'));
__export(require('./src/core/di'));
__export(require('./src/facade/facade'));
var lang_1 = require('./src/facade/lang');
exports.enableProdMode = lang_1.enableProdMode;
var application_ref_1 = require('./src/core/application_ref');
exports.platform = application_ref_1.platform;
exports.createNgZone = application_ref_1.createNgZone;
exports.PlatformRef = application_ref_1.PlatformRef;
exports.ApplicationRef = application_ref_1.ApplicationRef;
var application_tokens_1 = require('./src/core/application_tokens');
exports.APP_ID = application_tokens_1.APP_ID;
exports.APP_COMPONENT = application_tokens_1.APP_COMPONENT;
exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
exports.PACKAGE_ROOT_URL = application_tokens_1.PACKAGE_ROOT_URL;
exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
__export(require('./src/core/zone'));
__export(require('./src/core/render'));
__export(require('./src/core/linker'));
var debug_element_1 = require('./src/core/debug/debug_element');
exports.DebugElement = debug_element_1.DebugElement;
exports.Scope = debug_element_1.Scope;
exports.inspectElement = debug_element_1.inspectElement;
exports.asNativeElements = debug_element_1.asNativeElements;
__export(require('./src/core/testability/testability'));
__export(require('./src/core/change_detection'));
__export(require('./src/core/platform_directives_and_pipes'));
__export(require('./src/core/platform_common_providers'));
__export(require('./src/core/application_common_providers'));
__export(require('./src/core/reflection/reflection'));
