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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/create-type-system.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/create-type-system.js":
/*!***********************************!*\
  !*** ./src/create-type-system.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stackswell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stackswell.js */ "./src/stackswell.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function createTextField(view, settings) {
  var textField = NSTextField.alloc().initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height));
  textField.setStringValue(settings.initValue);
  view.addSubview(textField);
}

function createLabel(view, settings) {
  var fontSize = settings.fontSize === undefined ? 11 : settings.fontSize;
  var label = NSTextField.alloc().initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height));
  label.setEditable_(false);
  label.setSelectable_(false);
  label.setBezeled_(false);
  label.setDrawsBackground_(false); // label.setFont(NSFont.systemFontOfSize_(fontSize));

  label.setStringValue(settings.message);
  view.addSubview(label);
}

function createDropdown(view, settings) {
  // Creating the input
  var popup = NSPopUpButton.alloc();
  console.log(popup);
  var dropdown = popup.initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height));
  settings.options.forEach(function (option) {
    return dropdown.addItemWithTitle(option);
  }); // Adding the PopUpButton to the dialog

  view.addSubview(dropdown);
}

function createCheckBox(view, settings) {
  // Creating the input
  var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height)); // Setting the options for the checkbox

  checkbox.setButtonType(NSSwitchButton);
  checkbox.setBezelStyle(0);
  checkbox.setTitle(settings.message);
  checkbox.setState(NSOffState);
  view.addSubview(checkbox);
}

var Spacer =
/*#__PURE__*/
function () {
  function Spacer(window_height, line_height) {
    _classCallCheck(this, Spacer);

    this.wh = window_height, this.lh = line_height;
  }

  _createClass(Spacer, [{
    key: "nextLine",
    value: function nextLine() {
      // returns the y coordinate for the next line
      // TODO: accept an argument to pass a diff line height at invocation time
      this.wh -= this.lh;
      return this.wh;
    }
  }]);

  return Spacer;
}();

function dialog(context) {
  var alert = COSAlertWindow.new();
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon2x.png").path()));
  alert.setMessageText("Create type system"); // Creating dialog buttons

  alert.addButtonWithTitle("Generate System"); // alert.addButtonWithTitle("Cancel"); // TODO how to close
  // Creating the view

  var viewWidth = 1000; // the width of the modal

  var viewHeight = 300; // the height of the modal

  var viewLineHeight = 25; // the height of each line in the modal
  // keep current line state

  var viewSpacer = new Spacer(viewHeight, viewLineHeight);
  var viewLine = viewSpacer.nextLine();
  var type_scale = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    options: ['1.067 Minor Second', '1.125 Major Second', '1.200 Minor Third', '1.250 Major Third', '1.333 Perfect Fourth', '1.414 Augmented Fourth', '1.500 Perfect Fifth', '1.618 Golden Ratio'],
    label: {
      x: 0,
      y: viewLine,
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Type Scale"
    }
  };
  viewLine = viewSpacer.nextLine();
  var line_height = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: 1.333,
    label: {
      x: 0,
      y: viewLine,
      width: 190,
      height: viewLineHeight,
      fontSize: 12,
      message: "Line Height"
    }
  };
  viewLine = viewSpacer.nextLine();
  var paragraph_spacing = {
    x: 150,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: 1.333,
    label: {
      x: 0,
      y: viewLine,
      width: 190,
      height: viewLineHeight,
      fontSize: 12,
      message: "Paragraph Spacing"
    }
  };
  viewLine = viewSpacer.nextLine();
  var alignment_checkboxes = {
    checkBoxes: [{
      x: 110,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "Left"
    }, {
      x: 160,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "Center"
    }, {
      x: 210,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "Right"
    }],
    label: {
      x: 0,
      y: viewLine,
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Alignment"
    }
  };
  viewLine = viewSpacer.nextLine();
  var text_color_1 = {
    x: 150,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: "#00000",
    label: {
      x: 0,
      y: viewLine,
      width: 190,
      height: viewLineHeight,
      fontSize: 12,
      message: "Text Color 1"
    }
  };
  viewLine = viewSpacer.nextLine();
  var text_color_2 = {
    x: 150,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: "#FF6966",
    label: {
      x: 0,
      y: viewLine,
      width: 190,
      height: viewLineHeight,
      fontSize: 12,
      message: "Text Color 2"
    }
  };
  viewLine = viewSpacer.nextLine();
  var type_scale = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    options: ['1.067 Minor Second', '1.125 Major Second', '1.200 Minor Third', '1.250 Major Third', '1.333 Perfect Fourth', '1.414 Augmented Fourth', '1.500 Perfect Fifth', '1.618 Golden Ratio'],
    label: {
      x: 0,
      y: viewLine,
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Breakpoint Scale"
    }
  };
  viewLine = viewSpacer.nextLine();
  var breakpoint_checkboxes = {
    checkBoxes: [{
      x: 75,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "XS"
    }, {
      x: 125,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "SM"
    }, {
      x: 175,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "MD"
    }, {
      x: 225,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "LG"
    }, {
      x: 275,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "XL"
    }],
    label: {
      x: 0,
      y: viewLine,
      width: 75,
      height: viewLineHeight,
      fontSize: 12,
      message: "Breakpoints"
    }
  };
  viewLine = viewSpacer.nextLine();
  var naming_convention = {
    x: 80,
    y: viewLine,
    width: 300,
    height: viewLineHeight,
    initValue: "Type Face/Color/Alignment",
    label: {
      x: 0,
      y: viewLine,
      width: 75,
      height: viewLineHeight,
      message: "BkPt/H#/"
    }
  };
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);
  createDropdown(view, type_scale);
  createLabel(view, type_scale.label);
  createTextField(view, line_height);
  createLabel(view, line_height.label);
  createTextField(view, paragraph_spacing);
  createLabel(view, paragraph_spacing.label);
  alignment_checkboxes.checkBoxes.forEach(function (checkbox) {
    return createCheckBox(view, checkbox);
  });
  createLabel(view, alignment_checkboxes.label);
  createTextField(view, text_color_1);
  createLabel(view, text_color_1.label);
  createTextField(view, text_color_2);
  createLabel(view, text_color_2.label);
  breakpoint_checkboxes.checkBoxes.forEach(function (checkbox) {
    return createCheckBox(view, checkbox);
  });
  createLabel(view, breakpoint_checkboxes.label);
  createTextField(view, naming_convention);
  createLabel(view, naming_convention.label);
  return alert;
}

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  console.log('works 2');
  var options = ['Sketch'];
  var app = NSApplication.sharedApplication();
  var doc = context.document; // app.displayDialog_withTitle("This is an alert box!", "Alert Box Title");
  // var result = doc.askForUserInput_initialValue("How many copies do you want?", "10");
  // console.log(result);

  dialog(context).runModal();
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
  }

  _createClass(StacksWell, [{
    key: "init",
    value: function init() {
      var self = this;
      this.avail_txt_styles.forEach(function (style) {
        self.style_map[style.name()] = style;
        self.style_map[style.style().sharedObjectID()] = self.style_map[style.name()];
      });
      return this;
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
    value: function get_style_from_label_and_style(label, style) {
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
        }
      }

      console.log('No style found for break point & style ' + label + ' ' + style);
      var next_smaller = this.get_next_smaller_label(label);

      if (next_smaller) {
        console.log('Trying a smaller style to use: ' + next_smaller);
        return this.get_style_from_label_and_style(next_smaller, style);
      }
    }
  }, {
    key: "get_style_from_text",
    value: function get_style_from_text(text) {
      return this.style_map[text.style().sharedObjectID()];
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
        var style_to_apply = this.get_style_from_label_and_style(label, current_style);

        if (style_to_apply) {
          console.log("Going to apply: " + style_to_apply.name());
          text.setStyle_(style_to_apply.style());
        }
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

//# sourceMappingURL=create-type-system.js.map