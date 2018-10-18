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


var alignments = ['Left', // 0
'Center', // 2
'Right' // 1
];
var alignment_is = [0, 2, 1];

function createTextField(view, settings) {
  var textField = NSTextField.alloc().initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height));
  textField.setStringValue(settings.initValue);
  view.addSubview(textField);
  return textField;
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
  return label;
}

function createDropdown(view, settings) {
  // Creating the input
  var popup = NSPopUpButton.alloc();
  var dropdown = popup.initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height));
  settings.options.forEach(function (option) {
    return dropdown.addItemWithTitle(option);
  }); // Adding the PopUpButton to the dialog

  view.addSubview(dropdown);
  return dropdown;
}

function createCheckBox(view, settings) {
  // Creating the input
  var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(settings.x, settings.y, settings.width, settings.height)); // Setting the options for the checkbox

  checkbox.setButtonType(NSSwitchButton);
  checkbox.setBezelStyle(0);
  checkbox.setTitle(settings.message);
  checkbox.setState(settings.enabled ? NSOnState : NSOffState);
  view.addSubview(checkbox);
  return checkbox;
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

var Model =
/*#__PURE__*/
function () {
  function Model() {
    _classCallCheck(this, Model);

    this.properties = {};
  }

  _createClass(Model, [{
    key: "addProp",
    value: function addProp(name, value) {
      this.properties[name] = value;
    }
  }, {
    key: "addPropArray",
    value: function addPropArray(name, value) {
      if (!(name in this.properties)) {
        this.properties[name] = [];
      }

      this.properties[name].push(value);
    }
  }, {
    key: "get",
    value: function get(value) {
      var prop = this.properties[value] || value;
      var prop_type = prop.class();

      if (prop_type == 'NSPopUpButton') {
        return prop.titleOfSelectedItem();
      } else if (prop_type == 'NSTextField' || prop_type == 'NSButton') {
        return prop.stringValue();
      } else {
        console.log('unknown prop type ' + prop_type);
      }
    }
  }, {
    key: "getArray",
    value: function getArray(value) {
      var props = this.properties[value],
          out = [],
          self = this;
      props.forEach(function (prop) {
        return out.push(self.get(prop));
      });
      return out;
    }
  }]);

  return Model;
}();

function create_dialog(context) {
  var alert = COSAlertWindow.new();
  alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon2x.png").path()));
  alert.setMessageText("Create Type System"); // Creating dialog buttons

  alert.addButtonWithTitle("Generate System");
  alert.addButtonWithTitle("Cancel"); // Creating the view

  var viewWidth = 1200; // the width of the modal

  var viewHeight = 300; // the height of the modal

  var viewLineHeight = 25; // the height of each line in the modal
  // keep current line state

  var viewSpacer = new Spacer(viewHeight, 35);
  var viewLine = viewSpacer.nextLine(); // var type_scale = {
  // 	x: 100,
  // 	y: viewLine,
  // 	width: 190,
  // 	height: viewLineHeight,
  // 	options: [
  // 		'1.067 Minor Second',
  // 		'1.125 Major Second',
  // 		'1.200 Minor Third',
  // 		'1.250 Major Third',
  // 		'1.333 Perfect Fourth',
  // 		'1.414 Augmented Fourth',
  // 		'1.500 Perfect Fifth',
  // 		'1.6 Minor Sixth',
  // 		'1.618 Golden Ratio',
  // 		'1.667 Major Sixth',
  // 		'1.778 Minor Seventh',
  // 		'1.875 Major Seventh',
  // 		'2 Octave',
  // 		'2.5 Major Tenth'
  // 	],
  // 	label: {
  // 		x: 0,
  // 		y: viewLine,
  // 		width: 100,
  // 		height: viewLineHeight,
  // 		fontSize: 12,
  // 		message: "Type Scale"
  // 	}
  // };

  var type_scale = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: 1.25,
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
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Line Height"
    }
  };
  viewLine = viewSpacer.nextLine();
  var paragraph_spacing = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: 0,
    label: {
      x: 0,
      y: viewLine,
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Paragraph Spacing"
    }
  };
  viewLine = viewSpacer.nextLine();
  var alignment_checkboxes = {
    checkBoxes: [{
      x: 100,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "Left",
      enabled: true
    }, {
      x: 150,
      y: viewLine,
      width: 70,
      height: viewLineHeight,
      message: "Center",
      enabled: true
    }, {
      x: 220,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "Right",
      enabled: true
    }],
    label: {
      x: 0,
      y: viewLine,
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Alignment"
    }
  }; // viewLine = viewSpacer.nextLine();
  // var text_color_1 = {
  // 	x: 150,
  // 	y: viewLine,
  // 	width: 190,
  // 	height: viewLineHeight,
  // 	initValue: "#00000",
  // 	label: {
  // 		x: 0,
  // 		y: viewLine,
  // 		width: 190,
  // 		height: viewLineHeight,
  // 		fontSize: 12,
  // 		message: "Text Color 1"
  // 	}
  // };
  // viewLine = viewSpacer.nextLine();
  // var text_color_2 = {
  // 	x: 150,
  // 	y: viewLine,
  // 	width: 190,
  // 	height: viewLineHeight,
  // 	initValue: "#FF6966",
  // 	label: {
  // 		x: 0,
  // 		y: viewLine,
  // 		width: 190,
  // 		height: viewLineHeight,
  // 		fontSize: 12,
  // 		message: "Text Color 2"
  // 	}
  // };
  // viewLine = viewSpacer.nextLine();
  // var breakpoint_scale = {
  // 	x: 100,
  // 	y: viewLine,
  // 	width: 190,
  // 	height: viewLineHeight,
  // 	options: [
  // 		'1.067 Minor Second',
  // 		'1.125 Major Second',
  // 		'1.200 Minor Third',
  // 		'1.250 Major Third',
  // 		'1.333 Perfect Fourth',
  // 		'1.414 Augmented Fourth',
  // 		'1.500 Perfect Fifth',
  // 		'1.6 Minor Sixth',
  // 		'1.618 Golden Ratio',
  // 		'1.667 Major Sixth',
  // 		'1.778 Minor Seventh',
  // 		'1.875 Major Seventh',
  // 		'2 Octave',
  // 		'2.5 Major Tenth'
  // 	],
  // 	label: {
  // 		x: 0,
  // 		y: viewLine,
  // 		width: 100,
  // 		height: viewLineHeight,
  // 		fontSize: 12,
  // 		message: "Breakpoint Scale"
  // 	}
  // };

  viewLine = viewSpacer.nextLine();
  var breakpoint_scale = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: 1.25,
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
      x: 100,
      y: viewLine,
      width: 40,
      height: viewLineHeight,
      message: "XS",
      enabled: true
    }, {
      x: 140,
      y: viewLine,
      width: 40,
      height: viewLineHeight,
      message: "SM",
      enabled: true
    }, {
      x: 180,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "MD",
      enabled: true
    }, {
      x: 220,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "LG",
      enabled: true
    }, {
      x: 260,
      y: viewLine,
      width: 50,
      height: viewLineHeight,
      message: "XL",
      enabled: true
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
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    initValue: 'E.g. "Blue"',
    // TODO make this a variable/search if changing
    label: {
      x: 0,
      y: viewLine,
      width: 75,
      height: viewLineHeight,
      message: "Color Name"
    }
  };
  viewLine = viewSpacer.nextLine();
  var rounding = {
    x: 100,
    y: viewLine,
    width: 190,
    height: viewLineHeight,
    options: ['Normal', 'Multiples of Four', 'Multiples of Eight', 'None'],
    label: {
      x: 0,
      y: viewLine,
      width: 100,
      height: viewLineHeight,
      fontSize: 12,
      message: "Rounding"
    }
  };
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);
  var model = new Model();
  model.addProp('type_scale', createTextField(view, type_scale)); // model.addProp('type_scale', createTextField(view, type_scale));

  createLabel(view, type_scale.label);
  model.addProp('line_height', createTextField(view, line_height));
  createLabel(view, line_height.label);
  model.addProp('paragraph_spacing', createTextField(view, paragraph_spacing));
  createLabel(view, paragraph_spacing.label);
  alignment_checkboxes.checkBoxes.forEach(function (checkbox) {
    return model.addPropArray('alignments', createCheckBox(view, checkbox));
  });
  createLabel(view, alignment_checkboxes.label); // model.addProp('text_color_1', createTextField(view, text_color_1));
  // createLabel(view, text_color_1.label);
  // model.addProp('text_color_2', createTextField(view, text_color_2));
  // createLabel(view, text_color_2.label);

  model.addProp('breakpoint_scale', createTextField(view, breakpoint_scale));
  createLabel(view, breakpoint_scale.label);
  breakpoint_checkboxes.checkBoxes.forEach(function (checkbox) {
    return model.addPropArray('breakpoints', createCheckBox(view, checkbox));
  });
  createLabel(view, breakpoint_checkboxes.label);
  model.addProp('naming_convention', createTextField(view, naming_convention));
  createLabel(view, naming_convention.label);
  model.addProp('rounding', createDropdown(view, rounding));
  createLabel(view, rounding.label);
  return {
    alert: alert,
    model: model
  };
}

function reverse_layers_and_fix_x(new_layers, chosen_alignments, type_scale, breakpoint_scale) {
  var max_width = 0;
  new_layers.forEach(function (layer) {
    var current_width = layer.frame().width(),
        current_x = layer.frame().x();

    if (current_width > max_width) {
      max_width = current_width;
    }
  });
  new_layers.forEach(function (layer) {
    var pieces = layer.stringValue().split('/'),
        current_column = alignments.indexOf(pieces.pop());
    layer.frame().setX(layer.frame().x() + max_width * Math.max(2, breakpoint_scale, type_scale) * current_column);
  });
  return new_layers;
}

function get_rounding(rounding_type) {
  if (rounding_type == 'Normal') {
    return Math.round;
  } else if (rounding_type == 'Multiples of 4') {
    return function (x) {
      return x - x % 4 + Math.round(parseFloat(x % 4) / 4.0) * 4;
      ;
    };
  } else if (rounding_type == 'Multiples of 8') {
    return function (x) {
      return x - x % 8 + Math.round(parseFloat(x % 8) / 8.0) * 8;
    };
  }

  return function (x) {
    return x;
  };
}
/**
 * options: {
	current_layer:,
	lh, // line height
	x, // x pos
	y, // y pos
	fs, // font size
	ps, // paragraph spacing
	style_name,
	replace_text_with
 }
 */


function create_text_and_style(options) {
  var new_layer = options.current_layer.copy(); // setup the line height
  // TODO is this supposed to go into the style?
  //
  // new_layer.setTextAlignment(options.alignment);
  // setup the frame

  new_layer.frame().setY(options.y);
  new_layer.frame().setX(options.x); // new_layer.setLineHeight(options.lh);
  // get the current style & attributes

  var current_text_style = options.current_layer.style().textStyle(),
      current_attributes = current_text_style.attributes(),
      new_para_style = NSMutableParagraphStyle.alloc().init(); // set the paragraph properties

  new_para_style.setParagraphStyle(current_attributes.NSParagraphStyle); // var old = new_para_style.maximumLineHeight();
  // new_para_style.lineHeight = options.lh;
  // new_para_style.setLineSpacing(options.lh);

  new_para_style.setMaximumLineHeight(options.lh);
  new_para_style.setMinimumLineHeight(options.lh);
  new_para_style.setAlignment(options.alignment_i);
  new_para_style.setParagraphSpacing(options.ps); // create a new text style

  var textStyleAttributes = {
    // NSColor.colorWithRed_green_blue_alpha(1,0,0,1)
    'NSColor': current_attributes.MSAttributedStringColorAttribute.NSColorWithColorSpace(null),
    'NSFont': NSFont.fontWithName_size_(options.current_layer.font().fontName(), options.fs),
    'NSParagraphStyle': new_para_style
  };
  var textStyle = MSTextStyle.styleWithAttributes_(textStyleAttributes); // add the text style to a style

  var style = MSStyle.alloc().init();
  style.setTextStyle_(textStyle); // add the style to shared style

  var hexVal = options.naming_convention ? options.naming_convention : '#' + textStyleAttributes.NSColor.hexValue();
  var ss;
  var allocator = MSSharedStyle.alloc(); // Sketch 50, 51

  if (allocator.initWithName_firstInstance) {
    ss = allocator.initWithName_firstInstance(options.style_name.replace('COLOR', hexVal), style);
  } // sketch 52 onwards
  else {
      ss = allocator.initWithName_style(options.style_name.replace('COLOR', hexVal), style);
    }

  context.document.documentData().layerTextStyles().addSharedObject(ss); // TODO can cache upto .layerTextStyles()
  // replace the text in the layer

  new_layer.replaceTextPreservingAttributeRanges(options.replace_text_with.replace('COLOR', hexVal));
  new_layer.setName(options.replace_text_with.replace('COLOR', hexVal)); // set the style of the layer

  new_layer.setStyle(style); // textStyle.syncOwningTextLayerWithThisStyle();
  // save the shared style

  ss.updateToMatch(style);
  ss.resetReferencingInstances();
  return new_layer;
}

function handle_sumbit(dialog, context) {
  var response = dialog.alert.runModal();

  var Text = __webpack_require__(/*! sketch/dom */ "sketch/dom").Text;

  if (response == '1000') {
    console.log('Generate Type System');
    console.log('Type Scale: ' + dialog.model.get('type_scale'));
    console.log('Line Height: ' + dialog.model.get('line_height'));
    console.log('Rounding: ' + dialog.model.get('rounding')); // console.log('Paragraph Spacing: '+ dialog.model.get('paragraph_spacing'));
    // console.log(dialog.model.getArray('breakpoints'));

    console.log(dialog.model.getArray('alignments'));
    var selected_layers = Array.from(context.document.selectedLayers().layers());

    if (selected_layers.length === 0) {
      console.log('No text area selected');
      return;
    }

    var current_layer = selected_layers[0];

    if (current_layer.class() != "MSTextLayer") {
      console.log('Wrong layer type selected');
      return;
    }

    var current_layer_parent = current_layer.parentGroup();
    var fs = current_layer.fontSize(),
        lh = parseFloat(current_layer.lineHeight()),
        ts = parseFloat(dialog.model.get('type_scale')),
        ls = parseFloat(dialog.model.get('line_height')),
        bs = parseFloat(dialog.model.get('breakpoint_scale')),
        ps = parseFloat(dialog.model.get('paragraph_spacing')),
        chosen_alignments = dialog.model.getArray('alignments'),
        chosen_breakpoints = dialog.model.getArray('breakpoints'),
        rounding = get_rounding(dialog.model.get('rounding')),
        naming_convention = dialog.model.get('naming_convention'),
        y = current_layer.frame().y() + 25,
        // + start 25 pixels below the selected text layer
    x = current_layer.frame().x();
    var current_text_style = current_layer.style().textStyle(),
        current_attributes = current_text_style.attributes();
    var new_layers = [];
    var break_points = ['XS', 'SM', 'MD', 'LG', '.XL'];
    var header_tags = ['P', 'H6', 'H5', 'H4', 'H3', 'H2', 'H1']; // TODO also delete the original selected text layer

    var breakpoint_group_spacing = 100;
    break_points.forEach(function (breakpoint, breakpoint_i) {
      // when you move across a break point
      //  start over at the selected layers font size
      var current_fs = fs;

      if (chosen_breakpoints[breakpoint_i] == '1') {
        header_tags.forEach(function (header_tag, header_tag_i) {
          y += current_fs + lh;
          lh = ls * current_fs;
          alignments.forEach(function (alignment, alignment_i) {
            var name = "".concat(breakpoint, "/").concat(header_tag, "/COLOR/").concat(alignment);

            if (chosen_alignments[alignment_i] == '1') {
              var new_y = y;
              var new_layer = create_text_and_style({
                current_layer: current_layer,
                lh: rounding(lh),
                x: x,
                y: new_y,
                fs: rounding(current_fs),
                ps: rounding(ps * lh),
                style_name: name,
                replace_text_with: name,
                alignment_i: alignment_is[alignment_i],
                alignment: alignment.toLowerCase(),
                naming_convention: naming_convention == 'E.g. "Blue"' ? false : naming_convention
              });
              new_layers.push(new_layer);
            } else {
              console.log("".concat(alignment, " not selected"));
            }
          });
          current_fs *= ts;
        });
        y += breakpoint_group_spacing;
        fs *= bs;
      } else {
        console.log("".concat(breakpoint, " not chosen"));
      }
    });
    current_layer_parent.insertLayers_afterLayer(reverse_layers_and_fix_x(new_layers, chosen_alignments, ts, bs), current_layer);
  } else if (response == '1001') {
    console.log('Cancel');
  } else {
    console.log('Unhandled response');
    console.log(response);
  }
}

var doc;
/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var options = ['Sketch'];
  var app = NSApplication.sharedApplication();
  doc = context.document; // app.displayDialog_withTitle("This is an alert box!", "Alert Box Title");
  // var result = doc.askForUserInput_initialValue("How many copies do you want?", "10");
  // console.log(result);

  handle_sumbit(create_dialog(context), context);
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

        if (!library.document() || !library.document().layerTextStyles() || !library.document().layerTextStyles().sharedStyles()) {
          return;
        }

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
            if (!library) {
              return symbol;
            }

            return this.librariesController.importShareableObjectReference_intoDocument(MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol, library), MSDocument.currentDocument().documentData()).symbolMaster();
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



/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

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