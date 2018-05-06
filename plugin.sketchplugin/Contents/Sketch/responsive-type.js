var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(4)
  var sketchDebugger = __webpack_require__(6)
  var actions = __webpack_require__(8)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (context) {
    var stacks_well = new _stackswell2['default']({
        labels: [['XS'], ['SM'], ['MD'], ['LG'], ['.XL', 'XL', '_XL']],
        break_points: [576, // 0-575 xs
        767, // 576-766 sm
        991, // 767-990 md
        1199 // 990-1198 lg
        // 1999+ xl
        ],
        context: context
    }).init();
    function act_on_layer(layer, break_point, stacks_well) {
        if (layer['class']() == "MSTextLayer") {
            stacks_well.scale_text(layer, break_point);
        } else if (layer['class']() == "MSLayerGroup") {
            Array.from(layer.layers()).forEach(function (layer) {
                return act_on_layer(layer, break_point, stacks_well);
            });
        }
    }

    stacks_well.artboards.forEach(function (artboard) {
        var break_point = stacks_well.find_break_point_for_artboard(artboard);
        console.log('Break point: ', break_point);
        Array.from(artboard.layers()).forEach(function (layer) {
            return act_on_layer(layer, break_point, stacks_well);
        });
    });
};

var _stackswell = __webpack_require__(9);

var _stackswell2 = _interopRequireDefault(_stackswell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(5)

module.exports.toArray = __webpack_require__(2)
module.exports.prepareStackTrace = __webpack_require__(1)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(1)
var toArray = __webpack_require__(2)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(7)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StacksWell = function () {
    function StacksWell(options) {
        _classCallCheck(this, StacksWell);

        this.labels = options.labels;
        this.break_points = options.break_points;
        this.context = options.context;
        this.style_map = {};
    }

    _createClass(StacksWell, [{
        key: 'init',
        value: function () {
            function init() {
                var self = this;
                this.avail_txt_styles.forEach(function (style) {
                    self.style_map[style.name()] = style;
                    self.style_map[style.style().sharedObjectID()] = self.style_map[style.name()];
                });
                return this;
            }

            return init;
        }()
    }, {
        key: 'get_next_smaller_label',
        value: function () {
            function get_next_smaller_label(label) {
                for (var i = this.labels.length - 1; i >= 0; i--) {
                    for (var j = 0; j < this.labels[i].length; j++) {
                        if (label == this.labels[i][j]) {
                            i -= 1;
                            if (i < 0) {
                                return null;
                            } else {
                                return this.labels[i];
                            }
                        }
                    }
                }
            }

            return get_next_smaller_label;
        }()
    }, {
        key: 'get_style_from_label_and_style',
        value: function () {
            function get_style_from_label_and_style(label, style) {
                // if we found one, chop off the first part of the name
                //   ex. md/H1/Black/Left -> H1,Black,Left        
                if (style) {
                    var pieces = style.name().split('/');
                    pieces.shift();
                }

                // since we might provide an array of labels
                //  ex. label = ['XL', '.XL', '_XL']
                //  try each break point
                for (var i = 0; i < label.length; i++) {
                    // reconstruct the style name
                    //  ex. label = ['XL', '.XL', '_XL'], pieces = ['H1','Black','Left']
                    //      bp = 'XL/H1/Black/Left Style'
                    var bp = [label[i]].concat(pieces).join('/');
                    // if we have a style that maps to this reconstructed name
                    //  give it back, otherwise try the next available break point in labels
                    if (bp in this.style_map) {
                        return this.style_map[bp];
                    }
                }
                console.log('No style found for break point & style ' + label + ' ' + style);
                next_smaller = this.get_next_smaller_label(label);
                if (next_smaller) {
                    console.log('Trying a smaller style to use: ' + next_smaller);
                    return this.get_style_from_label_and_style(next_smaller, style);
                }
            }

            return get_style_from_label_and_style;
        }()
    }, {
        key: 'get_style_from_text',
        value: function () {
            function get_style_from_text(text) {
                return this.style_map[text.style().sharedObjectID()];
            }

            return get_style_from_text;
        }()
    }, {
        key: 'getStyleFromName',
        value: function () {
            function getStyleFromName(name) {
                return this.style_map[name];
            }

            return getStyleFromName;
        }()
    }, {
        key: 'get_master_symbol_for_breakpoint',
        value: function () {
            function get_master_symbol_for_breakpoint(break_point, old_symbol) {
                var avail_symbols = this.avail_symbols;
                for (var j = 0; j < break_point.length; j++) {
                    for (var i = 0; i < avail_symbols.length; i++) {
                        var symbol = avail_symbols[i],
                            label = break_point[j];

                        // chop off the end of the symbol (the size part)
                        var pieces = old_symbol.name().split('/');
                        pieces.pop();
                        var old_symbol_name = pieces.join('/');
                        // if the symbol that you are on 
                        // has the "label" (the break point size) 
                        // entirely, and only, in between two slashes (ignore case)
                        // AND
                        // if the symbol that you are on
                        // has the rest of the "old_symbol" (the target of this function)
                        if (symbol.name().toUpperCase().split('/').indexOf(label.toUpperCase()) !== -1 && symbol.name().toUpperCase().includes(old_symbol_name.toUpperCase())) {

                            return symbol;
                        }
                    }
                }

                console.log('No symbol found for break point ' + break_point);
                next_smaller = this.get_next_smaller_label(break_point);
                if (next_smaller) {
                    console.log('Trying to find symbol for the next smaller size: ' + next_smaller);
                    return this.get_master_symbol_for_breakpoint(next_smaller, old_symbol);
                }
            }

            return get_master_symbol_for_breakpoint;
        }()
    }, {
        key: 'scale_text',
        value: function () {
            function scale_text(text, label) {
                var current_style = this.get_style_from_text(text);
                if (current_style) {
                    console.log("Current style is: " + current_style.name());

                    var style_to_apply = this.get_style_from_label_and_style(label, current_style);
                    if (style_to_apply) {
                        console.log("Going to apply: " + style_to_apply.name());
                        text.setStyle_(style_to_apply.style());
                    }
                }
            }

            return scale_text;
        }()
    }, {
        key: 'is_compatible_style',
        value: function () {
            function is_compatible_style(style) {
                var style_name = style.name();
                for (var i = 0; i < this.labels.length; i++) {
                    for (var j = 0; j < this.labels[i].length; j++) {
                        if (style_name.toUpperCase().startsWith(this.labels[i][j].toUpperCase())) {
                            return true;
                        }
                    }
                }
                return false;
            }

            return is_compatible_style;
        }()
    }, {
        key: 'is_compatible_symbol',
        value: function () {
            function is_compatible_symbol(symbol) {
                var symbol_name = symbol.name();
                for (var i = 0; i < this.labels.length; i++) {
                    for (var j = 0; j < this.labels[i].length; j++) {
                        if (symbol_name.toUpperCase().split('/').indexOf(this.labels[i][j].toUpperCase()) !== -1) {
                            return true;
                        }
                    }
                }
                return false;
            }

            return is_compatible_symbol;
        }()
    }, {
        key: 'find_break_point_for_artboard',
        value: function () {
            function find_break_point_for_artboard(artboard) {
                var width = artboard.frame().width();
                console.log('artboard width ' + width);
                var found = 0;
                for (; found < this.break_points.length; found++) {
                    if (width < this.break_points[found]) {
                        return this.labels[found];
                    }
                }

                return this.labels[found];
            }

            return find_break_point_for_artboard;
        }()
    }, {
        key: 'in_artboard',
        value: function () {
            function in_artboard(artboard_layers, layer) {
                if (artboard_layers.indexOf(layer) !== -1) {
                    return true;
                }

                var artboard_groups = artboard_layers.filter(function (symbol) {
                    return symbol['class']() == 'MSLayerGroup';
                });

                for (var i = 0; i < artboard_groups.length; i++) {
                    var group = artboard_groups[i];
                    if (Array.from(group.layers()).indexOf(layer) !== -1) {
                        return true;
                    }
                }
                return false;
            }

            return in_artboard;
        }()
    }, {
        key: 'selected_layers',
        get: function () {
            function get() {
                return Array.from(this.context.document.selectedLayers().layers());
            }

            return get;
        }()
    }, {
        key: 'avail_txt_styles',
        get: function () {
            function get() {
                var self = this;
                return Array.from(this.context.document.documentData().layerTextStyles().objects()).filter(function (style) {
                    return self.is_compatible_style(style);
                });
            }

            return get;
        }()
    }, {
        key: 'avail_symbols',
        get: function () {
            function get() {
                var self = this;
                return Array.from(this.context.document.documentData().localSymbols()).filter(function (symbol) {
                    return self.is_compatible_symbol(symbol);
                });
            }

            return get;
        }()
    }, {
        key: 'artboards',
        get: function () {
            function get() {
                return Array.from(this.context.document.currentPage().children()).filter(function (item) {
                    return item['class']() == "MSArtboardGroup";
                });
            }

            return get;
        }()
    }]);

    return StacksWell;
}();

exports['default'] = StacksWell;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
