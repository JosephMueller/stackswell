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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/responsive-type.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/responsive-type.js":
/*!********************************!*\
  !*** ./src/responsive-type.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stackswell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stackswell.js */ "./src/stackswell.js");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var stacks_well = new _stackswell_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
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
    if (layer.class() == "MSTextLayer") {
      stacks_well.scale_text(layer, break_point);
    } else if (layer.class() == "MSLayerGroup") {
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
});

/***/ }),

/***/ "./src/stackswell.js":
/*!***************************!*\
  !*** ./src/stackswell.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StacksWell; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StacksWell =
/*#__PURE__*/
function () {
  function StacksWell(options) {
    _classCallCheck(this, StacksWell);

    this.labels = options.labels;
    this.break_points = options.break_points;
    this.context = options.context;
    this.style_map = {};
    this.librariesController = AppController.sharedInstance().librariesController();
    this.libraries_map = {};
    this.foreign_text_styles_map = {};
  }

  _createClass(StacksWell, [{
    key: "init",
    value: function init() {
      var self = this;
      this.avail_txt_styles.forEach(function (style) {
        self.style_map[style.name()] = style;
        self.style_map[style.style().sharedObjectID()] = self.style_map[style.name()];
      });
      this.librariesController.userLibraries().forEach(function (library) {
        self.libraries_map[library.libraryID()] = {};
        library.document().layerTextStyles().sharedStyles().forEach(function (librarySharedStyle) {
          if (!self.is_compatible_style(librarySharedStyle)) {
            return;
          }

          self.libraries_map[library.libraryID()][librarySharedStyle.style().sharedObjectID()] = librarySharedStyle;
          self.libraries_map[library.libraryID()][librarySharedStyle.name()] = librarySharedStyle;
        });
      });
      this.context.document.documentData().foreignTextStyles().forEach(function (style) {
        self.foreign_text_styles_map[style.localShareID()] = style;
      });
      return this;
    }
  }, {
    key: "get_library_styles_map_from_text",
    value: function get_library_styles_map_from_text(text) {
      if (!(text.style().sharedObjectID() in this.foreign_text_styles_map)) {
        console.log(text.style().sharedObjectID() + ' not in foreign_text_styles_map');
        return {};
      }

      var foreign_style = this.foreign_text_styles_map[text.style().sharedObjectID()];

      if (!(foreign_style.libraryID() in this.libraries_map)) {
        console.log(foreign_style.libraryID() + ' not in libraries_map');
        return {};
      }

      return this.libraries_map[foreign_style.libraryID()];
    }
  }, {
    key: "get_library_style_of_text",
    value: function get_library_style_of_text(text) {
      if (!(text.style().sharedObjectID() in this.foreign_text_styles_map)) {
        console.log(text.style().sharedObjectID() + ' not in foreign_text_styles_map');
        return null;
      }

      var foreign_style = this.foreign_text_styles_map[text.style().sharedObjectID()];

      if (!(foreign_style.libraryID() in this.libraries_map)) {
        console.log(foreign_style.libraryID() + ' not in libraries_map');
        return null;
      }

      if (!(foreign_style.remoteShareID() in this.libraries_map[foreign_style.libraryID()])) {
        console.log('foreign remoteShareID not found in libraries map');
        return null;
      }

      return this.libraries_map[foreign_style.libraryID()][foreign_style.remoteShareID()];
    }
  }, {
    key: "get_next_smaller_label",
    value: function get_next_smaller_label(label) {
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
  }, {
    key: "get_style_from_label_and_style",
    value: function get_style_from_label_and_style(label, style, text) {
      // if we found one, chop off the first part of the name
      //   ex. md/H1/Black/Left -> H1,Black,Left        
      if (style) {
        var pieces = style.name().split('/');
        pieces.shift();
      } // since we might provide an array of labels
      //  ex. label = ['XL', '.XL', '_XL']
      //  try each break point


      for (var i = 0; i < label.length; i++) {
        // reconstruct the style name
        //  ex. label = ['XL', '.XL', '_XL'], pieces = ['H1','Black','Left']
        //      bp = 'XL/H1/Black/Left Style'
        var bp = [label[i]].concat(pieces).join('/'); // if we have a style that maps to this reconstructed name
        //  give it back, otherwise try the next available break point in labels

        if (bp in this.style_map) {
          return this.style_map[bp];
        } else if (bp in this.get_library_styles_map_from_text(text)) {
          // TODO this could prob get cached
          return this.get_library_styles_map_from_text(text)[bp];
        }
      }

      console.log('No style found for break point & style ' + label + ' ' + style);
      var next_smaller = this.get_next_smaller_label(label);

      if (next_smaller) {
        console.log('Trying a smaller style to use: ' + next_smaller);
        return this.get_style_from_label_and_style(next_smaller, style, text);
      }
    }
  }, {
    key: "get_style_from_text",
    value: function get_style_from_text(text) {
      return this.style_map[text.style().sharedObjectID()] || this.get_library_style_of_text(text);
    }
  }, {
    key: "getStyleFromName",
    value: function getStyleFromName(name) {
      return this.style_map[name];
    }
  }, {
    key: "get_master_symbol_for_breakpoint",
    value: function get_master_symbol_for_breakpoint(break_point, old_symbol) {
      // check if the symbol is part of a library, 
      //  and if it is, use the library symbols as choices for replacement
      var library = this.librariesController.libraryForShareableObject(old_symbol);
      console.log('Has library? ' + library);
      var avail_symbols = library ? library.document().localSymbols() : this.avail_symbols;

      for (var j = 0; j < break_point.length; j++) {
        for (var i = 0; i < avail_symbols.length; i++) {
          var symbol = avail_symbols[i],
              label = break_point[j]; // chop off the end of the symbol (the size part)

          var pieces = old_symbol.name().split('/');
          pieces.pop();
          var old_symbol_name = pieces.join('/'); // if the symbol that you are on 
          // has the "label" (the break point size) 
          // entirely, and only, in between two slashes (ignore case)
          // AND
          // if the symbol that you are on
          // has the rest of the "old_symbol" (the target of this function)

          if (symbol.name().toUpperCase().split('/').indexOf(label.toUpperCase()) !== -1 && symbol.name().toUpperCase().includes(old_symbol_name.toUpperCase())) {
            return library ? this.context.document.localSymbolForSymbol_inLibrary(symbol, library) : symbol;
          }
        }
      }

      console.log('No symbol found for break point ' + break_point);
      var next_smaller = this.get_next_smaller_label(break_point);

      if (next_smaller) {
        console.log('Trying to find symbol for the next smaller size: ' + next_smaller);
        return this.get_master_symbol_for_breakpoint(next_smaller, old_symbol);
      }
    }
  }, {
    key: "scale_text",
    value: function scale_text(text, label) {
      var current_style = this.get_style_from_text(text);

      if (current_style) {
        console.log("Current style is: " + current_style.name());
        var style_to_apply = this.get_style_from_label_and_style(label, current_style, text);

        if (style_to_apply) {
          console.log("Going to apply: " + style_to_apply.name());
          text.setStyle_(style_to_apply.style());
        }
      } else {
        console.log('text layer style not found in doc or libraries');
      }
    }
  }, {
    key: "is_compatible_style",
    value: function is_compatible_style(style) {
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
  }, {
    key: "is_compatible_symbol",
    value: function is_compatible_symbol(symbol) {
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
  }, {
    key: "find_break_point_for_artboard",
    value: function find_break_point_for_artboard(artboard) {
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
  }, {
    key: "in_artboard",
    value: function in_artboard(artboard_layers, layer) {
      if (artboard_layers.indexOf(layer) !== -1) {
        return true;
      }

      var artboard_groups = artboard_layers.filter(function (symbol) {
        return symbol.class() == 'MSLayerGroup';
      });

      for (var i = 0; i < artboard_groups.length; i++) {
        var group = artboard_groups[i];

        if (Array.from(group.layers()).indexOf(layer) !== -1) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "selected_layers",
    get: function get() {
      return Array.from(this.context.document.selectedLayers().layers());
    }
  }, {
    key: "avail_txt_styles",
    get: function get() {
      var self = this;
      return Array.from(this.context.document.documentData().layerTextStyles().objects()).filter(function (style) {
        return self.is_compatible_style(style);
      });
    }
  }, {
    key: "avail_symbols",
    get: function get() {
      var self = this;
      return Array.from(this.context.document.documentData().localSymbols()).filter(function (symbol) {
        return self.is_compatible_symbol(symbol);
      });
    }
  }, {
    key: "artboards",
    get: function get() {
      return Array.from(this.context.document.currentPage().children()).filter(function (item) {
        return item.class() == "MSArtboardGroup";
      });
    }
  }]);

  return StacksWell;
}();



/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=responsive-type.js.map