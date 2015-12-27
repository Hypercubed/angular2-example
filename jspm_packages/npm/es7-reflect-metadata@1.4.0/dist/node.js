/* */ 
exports["Reflect"] = (function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId])
      return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      exports: {},
      id: moduleId,
      loaded: false
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.loaded = true;
    return module.exports;
  }
  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;
  __webpack_require__.p = "";
  return __webpack_require__(0);
})([function(module, exports, __webpack_require__) {
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var Reflect = __webpack_require__(1);
  __export(__webpack_require__(1));
  global.Reflect = Reflect;
}, function(module, exports, __webpack_require__) {
  var get_proto_of_type_1 = __webpack_require__(2);
  var to_property_key_1 = __webpack_require__(3);
  var is_constructor_1 = __webpack_require__(5);
  var is_undefined_1 = __webpack_require__(6);
  var is_array_1 = __webpack_require__(7);
  var is_object_1 = __webpack_require__(8);
  var metadata_1 = __webpack_require__(9);
  var ordinary_own_metadata_keys_1 = __webpack_require__(18);
  var get_or_create_metadata_map_1 = __webpack_require__(19);
  var ordinary_metadata_keys_1 = __webpack_require__(21);
  function decorate(decorators, target, targetKey, targetDescriptor) {
    if (!is_undefined_1.isUndefined(targetDescriptor)) {
      if (!is_array_1.isArray(decorators)) {
        throw new TypeError();
      } else if (!is_object_1.isObject(target)) {
        throw new TypeError();
      } else if (is_undefined_1.isUndefined(targetKey)) {
        throw new TypeError();
      } else if (!is_object_1.isObject(targetDescriptor)) {
        throw new TypeError();
      }
      targetKey = to_property_key_1.toPropertyKey(targetKey);
      return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      if (!is_array_1.isArray(decorators)) {
        throw new TypeError();
      } else if (!is_object_1.isObject(target)) {
        throw new TypeError();
      }
      targetKey = to_property_key_1.toPropertyKey(targetKey);
      return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
    } else {
      if (!is_array_1.isArray(decorators)) {
        throw new TypeError();
      } else if (!is_constructor_1.isConstructor(target)) {
        throw new TypeError();
      }
      return DecorateConstructor(decorators, target);
    }
  }
  exports.decorate = decorate;
  function metadata(metadataKey, metadataValue) {
    function decorator(target, targetKey) {
      if (!is_undefined_1.isUndefined(targetKey)) {
        if (!is_object_1.isObject(target)) {
          throw new TypeError();
        }
        targetKey = to_property_key_1.toPropertyKey(targetKey);
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
      } else {
        if (!is_constructor_1.isConstructor(target)) {
          throw new TypeError();
        }
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
      }
    }
    return decorator;
  }
  exports.metadata = metadata;
  function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
  }
  exports.defineMetadata = defineMetadata;
  function hasMetadata(metadataKey, target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return OrdinaryHasMetadata(metadataKey, target, targetKey);
  }
  exports.hasMetadata = hasMetadata;
  function hasOwnMetadata(metadataKey, target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
  }
  exports.hasOwnMetadata = hasOwnMetadata;
  function getMetadata(metadataKey, target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return OrdinaryGetMetadata(metadataKey, target, targetKey);
  }
  exports.getMetadata = getMetadata;
  function getOwnMetadata(metadataKey, target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
  }
  exports.getOwnMetadata = getOwnMetadata;
  function getMetadataKeys(target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return ordinary_metadata_keys_1.ordinaryMetadataKeys(target, targetKey);
  }
  exports.getMetadataKeys = getMetadataKeys;
  function getOwnMetadataKeys(target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    return ordinary_own_metadata_keys_1.ordinaryOwnMetadataKeys(target, targetKey);
  }
  exports.getOwnMetadataKeys = getOwnMetadataKeys;
  function deleteMetadata(metadataKey, target, targetKey) {
    if (!is_object_1.isObject(target)) {
      throw new TypeError();
    } else if (!is_undefined_1.isUndefined(targetKey)) {
      targetKey = to_property_key_1.toPropertyKey(targetKey);
    }
    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(target, targetKey, false);
    if (is_undefined_1.isUndefined(metadataMap)) {
      return false;
    }
    if (!metadataMap.delete(metadataKey)) {
      return false;
    }
    if (metadataMap.size > 0) {
      return true;
    }
    var targetMetadata = metadata_1.__Metadata__.get(target);
    targetMetadata.delete(targetKey);
    if (targetMetadata.size > 0) {
      return true;
    }
    metadata_1.__Metadata__.delete(target);
    return true;
  }
  exports.deleteMetadata = deleteMetadata;
  function DecorateConstructor(decorators, target) {
    for (var i = decorators.length - 1; i >= 0; --i) {
      var decorator = decorators[i];
      var decorated = decorator(target);
      if (!is_undefined_1.isUndefined(decorated)) {
        if (!is_constructor_1.isConstructor(decorated)) {
          throw new TypeError();
        }
        target = decorated;
      }
    }
    return target;
  }
  function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
    for (var i = decorators.length - 1; i >= 0; --i) {
      var decorator = decorators[i];
      var decorated = decorator(target, propertyKey, descriptor);
      if (!is_undefined_1.isUndefined(decorated)) {
        if (!is_object_1.isObject(decorated)) {
          throw new TypeError();
        }
        descriptor = decorated;
      }
    }
    return descriptor;
  }
  function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
    for (var i = decorators.length - 1; i >= 0; --i) {
      var decorator = decorators[i];
      decorator(target, propertyKey);
    }
  }
  function OrdinaryHasMetadata(MetadataKey, O, P) {
    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
    if (hasOwn) {
      return true;
    }
    var parent = get_proto_of_type_1.getProtoOfType(O);
    if (parent !== null) {
      return OrdinaryHasMetadata(MetadataKey, parent, P);
    }
    return false;
  }
  function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
      return false;
    }
    return Boolean(metadataMap.has(MetadataKey));
  }
  function OrdinaryGetMetadata(MetadataKey, O, P) {
    var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
    if (hasOwn) {
      return OrdinaryGetOwnMetadata(MetadataKey, O, P);
    }
    var parent = get_proto_of_type_1.getProtoOfType(O);
    if (parent !== null) {
      return OrdinaryGetMetadata(MetadataKey, parent, P);
    }
    return undefined;
  }
  function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
      return undefined;
    }
    return metadataMap.get(MetadataKey);
  }
  function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(O, P, true);
    metadataMap.set(MetadataKey, MetadataValue);
  }
}, function(module, exports) {
  var functionPrototype = Function.prototype;
  function getProtoOfType(O) {
    var proto = Object.getPrototypeOf(O);
    if (typeof O !== "function" || O === functionPrototype) {
      return proto;
    }
    if (proto !== functionPrototype) {
      return proto;
    }
    var prototype = O.prototype;
    var prototypeProto = Object.getPrototypeOf(prototype);
    if (prototypeProto == null || prototypeProto === Object.prototype) {
      return proto;
    }
    var constructor = prototypeProto.constructor;
    if (typeof constructor !== "function") {
      return proto;
    }
    if (constructor === O) {
      return proto;
    }
    return constructor;
  }
  exports.getProtoOfType = getProtoOfType;
}, function(module, exports, __webpack_require__) {
  var is_symbol_1 = __webpack_require__(4);
  function toPropertyKey(value) {
    if (is_symbol_1.isSymbol(value)) {
      return value;
    }
    return String(value);
  }
  exports.toPropertyKey = toPropertyKey;
}, function(module, exports) {
  function isSymbol(x) {
    return typeof x === "symbol";
  }
  exports.isSymbol = isSymbol;
}, function(module, exports) {
  function isConstructor(x) {
    return typeof x === "function";
  }
  exports.isConstructor = isConstructor;
}, function(module, exports) {
  function isUndefined(x) {
    return x === undefined;
  }
  exports.isUndefined = isUndefined;
}, function(module, exports) {
  function isArray(x) {
    return Array.isArray(x);
  }
  exports.isArray = isArray;
}, function(module, exports) {
  function isObject(x) {
    return typeof x === "object" ? x !== null : typeof x === "function";
  }
  exports.isObject = isObject;
}, function(module, exports, __webpack_require__) {
  var weakmap_1 = __webpack_require__(10);
  var _WeakMap = typeof WeakMap === "function" ? WeakMap : weakmap_1.createWeakMapPolyfill();
  exports.__Metadata__ = new _WeakMap();
}, function(module, exports, __webpack_require__) {
  var create_unique_key_1 = __webpack_require__(11);
  var get_or_create_weakmap_1 = __webpack_require__(17);
  exports.rootKey = create_unique_key_1.createUniqueKey();
  var WeakMap = (function() {
    function WeakMap() {
      this._key = create_unique_key_1.createUniqueKey();
    }
    WeakMap.prototype.has = function(target) {
      var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, false);
      if (table) {
        return this._key in table;
      }
      return false;
    };
    WeakMap.prototype.get = function(target) {
      var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, false);
      if (table) {
        return table[this._key];
      }
      return undefined;
    };
    WeakMap.prototype.set = function(target, value) {
      var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, true);
      table[this._key] = value;
      return this;
    };
    WeakMap.prototype.delete = function(target) {
      var table = get_or_create_weakmap_1.getOrCreateWeakMapTable(exports.rootKey, target, false);
      if (table && this._key in table) {
        return delete table[this._key];
      }
      return false;
    };
    WeakMap.prototype.clear = function() {
      this._key = create_unique_key_1.createUniqueKey();
    };
    return WeakMap;
  })();
  exports.WeakMap = WeakMap;
  function createWeakMapPolyfill() {
    return WeakMap;
  }
  exports.createWeakMapPolyfill = createWeakMapPolyfill;
}, function(module, exports, __webpack_require__) {
  var helper_constants_1 = __webpack_require__(12);
  var has_own_1 = __webpack_require__(13);
  var create_uuid_1 = __webpack_require__(14);
  exports.keys = {};
  function createUniqueKey() {
    var key;
    do {
      key = helper_constants_1.WEAKMAP_PREFIX + create_uuid_1.createUUID();
    } while (has_own_1.hasOwn.call(exports.keys, key));
    exports.keys[key] = true;
    return key;
  }
  exports.createUniqueKey = createUniqueKey;
}, function(module, exports) {
  exports.UUID_SIZE = 16;
  exports.WEAKMAP_PREFIX = "@@WeakMap@@";
}, function(module, exports) {
  exports.hasOwn = Object.prototype.hasOwnProperty;
}, function(module, exports, __webpack_require__) {
  var helper_constants_1 = __webpack_require__(12);
  var gen_randombytes_1 = __webpack_require__(15);
  function createUUID() {
    var data = gen_randombytes_1.genRandomBytes(helper_constants_1.UUID_SIZE);
    data[6] = data[6] & 0x4f | 0x40;
    data[8] = data[8] & 0xbf | 0x80;
    var result = "";
    for (var offset = 0; offset < helper_constants_1.UUID_SIZE; ++offset) {
      var byte = data[offset];
      if (offset === 4 || offset === 6 || offset === 8) {
        result += "-";
      }
      if (byte < 16) {
        result += "0";
      }
      result += byte.toString(16).toLowerCase();
    }
    return result;
  }
  exports.createUUID = createUUID;
}, function(module, exports, __webpack_require__) {
  var crypto = __webpack_require__(16);
  function genRandomBytes(size) {
    return crypto.randomBytes(size);
  }
  exports.genRandomBytes = genRandomBytes;
}, function(module, exports) {
  module.exports = require('crypto');
}, function(module, exports, __webpack_require__) {
  var has_own_1 = __webpack_require__(13);
  function getOrCreateWeakMapTable(rootKey, target, create) {
    if (!has_own_1.hasOwn.call(target, rootKey)) {
      if (!create) {
        return undefined;
      }
      Object.defineProperty(target, rootKey, {value: Object.create(null)});
    }
    return target[rootKey];
  }
  exports.getOrCreateWeakMapTable = getOrCreateWeakMapTable;
}, function(module, exports, __webpack_require__) {
  var get_or_create_metadata_map_1 = __webpack_require__(19);
  function ordinaryOwnMetadataKeys(target, targetKey) {
    var metadataMap = get_or_create_metadata_map_1.getOrCreateMetadataMap(target, targetKey, false);
    var keys = [];
    if (metadataMap) {
      metadataMap.forEach(function(_, key) {
        return keys.push(key);
      });
    }
    return keys;
  }
  exports.ordinaryOwnMetadataKeys = ordinaryOwnMetadataKeys;
}, function(module, exports, __webpack_require__) {
  var metadata_1 = __webpack_require__(9);
  var map_1 = __webpack_require__(20);
  var _Map = typeof Map === "function" ? Map : map_1.createMapPolyfill();
  function getOrCreateMetadataMap(target, targetKey, create) {
    var targetMetadata = metadata_1.__Metadata__.get(target);
    if (!targetMetadata) {
      if (!create) {
        return undefined;
      }
      targetMetadata = new _Map();
      metadata_1.__Metadata__.set(target, targetMetadata);
    }
    var keyMetadata = targetMetadata.get(targetKey);
    if (!keyMetadata) {
      if (!create) {
        return undefined;
      }
      keyMetadata = new _Map();
      targetMetadata.set(targetKey, keyMetadata);
    }
    return keyMetadata;
  }
  exports.getOrCreateMetadataMap = getOrCreateMetadataMap;
}, function(module, exports) {
  exports.cacheSentinel = {};
  var Map = (function() {
    function Map() {
      this._keys = [];
      this._values = [];
      this._cache = exports.cacheSentinel;
    }
    Object.defineProperty(Map.prototype, "size", {
      get: function() {
        return this._keys.length;
      },
      enumerable: true,
      configurable: true
    });
    Map.prototype.has = function(key) {
      if (key === this._cache) {
        return true;
      }
      if (this._find(key) >= 0) {
        this._cache = key;
        return true;
      }
      return false;
    };
    Map.prototype.get = function(key) {
      var index = this._find(key);
      if (index >= 0) {
        this._cache = key;
        return this._values[index];
      }
      return undefined;
    };
    Map.prototype.set = function(key, value) {
      this.delete(key);
      this._keys.push(key);
      this._values.push(value);
      this._cache = key;
      return this;
    };
    Map.prototype.delete = function(key) {
      var index = this._find(key);
      if (index >= 0) {
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        this._cache = exports.cacheSentinel;
        return true;
      }
      return false;
    };
    Map.prototype.clear = function() {
      this._keys.length = 0;
      this._values.length = 0;
      this._cache = exports.cacheSentinel;
    };
    Map.prototype.forEach = function(callback, thisArg) {
      var size = this.size;
      for (var i = 0; i < size; ++i) {
        var key = this._keys[i];
        var value = this._values[i];
        this._cache = key;
        callback.call(this, value, key, this);
      }
    };
    Map.prototype._find = function(key) {
      var keys = this._keys;
      var size = keys.length;
      for (var i = 0; i < size; ++i) {
        if (keys[i] === key) {
          return i;
        }
      }
      return -1;
    };
    Map.length = 0;
    return Map;
  })();
  exports.Map = Map;
  function createMapPolyfill() {
    return Map;
  }
  exports.createMapPolyfill = createMapPolyfill;
}, function(module, exports, __webpack_require__) {
  var ordinary_own_metadata_keys_1 = __webpack_require__(18);
  var get_proto_of_type_1 = __webpack_require__(2);
  var set_1 = __webpack_require__(22);
  var _Set = typeof Set === "function" ? Set : set_1.createSetPolyfill();
  function ordinaryMetadataKeys(O, P) {
    var ownKeys = ordinary_own_metadata_keys_1.ordinaryOwnMetadataKeys(O, P);
    var parent = get_proto_of_type_1.getProtoOfType(O);
    if (parent === null) {
      return ownKeys;
    }
    var parentKeys = ordinaryMetadataKeys(parent, P);
    if (parentKeys.length <= 0) {
      return ownKeys;
    }
    if (ownKeys.length <= 0) {
      return parentKeys;
    }
    var set = new _Set();
    var keys = [];
    for (var _i = 0; _i < ownKeys.length; _i++) {
      var key = ownKeys[_i];
      var hasKey = set.has(key);
      if (!hasKey) {
        set.add(key);
        keys.push(key);
      }
    }
    for (var _a = 0; _a < parentKeys.length; _a++) {
      var key = parentKeys[_a];
      var hasKey = set.has(key);
      if (!hasKey) {
        set.add(key);
        keys.push(key);
      }
    }
    return keys;
  }
  exports.ordinaryMetadataKeys = ordinaryMetadataKeys;
}, function(module, exports) {
  exports.cacheSentinel = {};
  var Set = (function() {
    function Set() {
      this._map = new Map();
    }
    Object.defineProperty(Set.prototype, "size", {
      get: function() {
        return this._map.size;
      },
      enumerable: true,
      configurable: true
    });
    Set.prototype.has = function(value) {
      return this._map.has(value);
    };
    Set.prototype.add = function(value) {
      this._map.set(value, value);
      return this;
    };
    Set.prototype.delete = function(value) {
      return this._map.delete(value);
    };
    Set.prototype.clear = function() {
      this._map.clear();
    };
    Set.prototype.forEach = function(callback, thisArg) {
      this._map.forEach(callback, thisArg);
    };
    Set.length = 0;
    return Set;
  })();
  exports.Set = Set;
  function createSetPolyfill() {
    return Set;
  }
  exports.createSetPolyfill = createSetPolyfill;
}]);
