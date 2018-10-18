import StacksWell from './stackswell.js'

var alignments = [
	'Left', // 0
	'Center', // 2
	'Right' // 1
];

var alignment_is = [
	0,
	2,
	1
];

function createTextField(view, settings) {
	var textField = NSTextField.alloc().initWithFrame(NSMakeRect(
		settings.x,
		settings.y,
		settings.width,
		settings.height
	));

	textField.setStringValue(settings.initValue);

	view.addSubview(textField);

	return textField;
}

function createLabel(view, settings) {
    var fontSize  = settings.fontSize === undefined ? 11 : settings.fontSize;

    var label = NSTextField.alloc().initWithFrame(NSMakeRect(
    	settings.x,
		settings.y,
		settings.width,
		settings.height
    ));
    label.setEditable_(false);
    label.setSelectable_(false);
    label.setBezeled_(false);
    label.setDrawsBackground_(false);
    // label.setFont(NSFont.systemFontOfSize_(fontSize));
    label.setStringValue(settings.message);
    view.addSubview(label);

    return label;
}

function createDropdown(view, settings) {
	// Creating the input
	var popup = NSPopUpButton.alloc();

	var dropdown = popup.initWithFrame(NSMakeRect(
		settings.x,
		settings.y,
		settings.width,
		settings.height
	));

	settings.options.forEach(option => dropdown.addItemWithTitle(option));

	// Adding the PopUpButton to the dialog
	view.addSubview(dropdown);

	return dropdown;
}

function createCheckBox(view, settings) {
	// Creating the input
	var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(
		settings.x,
		settings.y,
		settings.width,
		settings.height
	));

	// Setting the options for the checkbox
	checkbox.setButtonType(NSSwitchButton);
	checkbox.setBezelStyle(0);
	checkbox.setTitle(settings.message);
	checkbox.setState(settings.enabled ? NSOnState : NSOffState);

	view.addSubview(checkbox);

	return checkbox;
}

class Spacer {
	constructor(window_height, line_height) {
		this.wh = window_height,
		this.lh = line_height;
	}

	nextLine() {
		// returns the y coordinate for the next line
		// TODO: accept an argument to pass a diff line height at invocation time
		this.wh -= this.lh;
		return this.wh;
	}
}

class Model {
	constructor() {
		this.properties = {};
	}

	addProp(name, value) {
		this.properties[name] = value;
	}

	addPropArray(name, value) {
		if(!(name in this.properties)) {
			this.properties[name] = [];
		}
		this.properties[name].push(value);
	}

	get (value) {
		var prop = this.properties[value] || value;
		var prop_type = prop.class();
		if (prop_type == 'NSPopUpButton') {
			return prop.titleOfSelectedItem();
		} else if (prop_type == 'NSTextField' || prop_type == 'NSButton') {
			return prop.stringValue();
		} else {
			console.log('unknown prop type '+prop_type);
		}
	}
	getArray(value) {
		var props = this.properties[value],
			out = [],
			self = this;

		props.forEach(prop => out.push(self.get(prop)));

		return out;
	}
}

function create_dialog(context) {
	var alert = COSAlertWindow.new();

	alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon2x.png").path()));
	alert.setMessageText("Create Type System");

	// Creating dialog buttons
	alert.addButtonWithTitle("Generate System");
	alert.addButtonWithTitle("Cancel");


	// Creating the view
	var viewWidth = 1200; // the width of the modal
	var viewHeight = 300; // the height of the modal
	var viewLineHeight = 25; // the height of each line in the modal


	// keep current line state
	var viewSpacer = new Spacer(viewHeight, 35);
	var viewLine = viewSpacer.nextLine();

	// var type_scale = {
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
		checkBoxes: [
			{
				x: 100,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "Left",
				enabled: true
			},
			{
				x: 150,
				y: viewLine,
				width: 70,
				height: viewLineHeight,
				message: "Center",
				enabled: true
			},
						{
				x: 220,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "Right",
				enabled: true
			}
		],
		label: {
			x: 0,
			y: viewLine,
			width: 100,
			height: viewLineHeight,
			fontSize: 12,
			message: "Alignment"
		}
	};

	// viewLine = viewSpacer.nextLine();
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
		checkBoxes: [
			{
				x: 100,
				y: viewLine,
				width: 40,
				height: viewLineHeight,
				message: "XS",
				enabled: true
			},
			{
				x: 140,
				y: viewLine,
				width: 40,
				height: viewLineHeight,
				message: "SM",
				enabled: true
			},
						{
				x: 180,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "MD",
				enabled: true
			},
			{
				x: 220,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "LG",
				enabled: true
			},
						{
				x: 260,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "XL",
				enabled: true
			}
		],
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
		initValue: 'E.g. "Blue"', // TODO make this a variable/search if changing
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
		options: [
			'Normal',
			'Multiples of Four',
			'Multiples of Eight',
			'None'
		],
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

	model.addProp('type_scale', createTextField(view, type_scale));
	// model.addProp('type_scale', createTextField(view, type_scale));
	createLabel(view, type_scale.label);

	model.addProp('line_height', createTextField(view, line_height));
	createLabel(view, line_height.label);

	model.addProp('paragraph_spacing', createTextField(view, paragraph_spacing));
	createLabel(view, paragraph_spacing.label);

	alignment_checkboxes.checkBoxes.forEach(checkbox => model.addPropArray('alignments',createCheckBox(view, checkbox)));
	createLabel(view, alignment_checkboxes.label);

	// model.addProp('text_color_1', createTextField(view, text_color_1));
	// createLabel(view, text_color_1.label);

	// model.addProp('text_color_2', createTextField(view, text_color_2));
	// createLabel(view, text_color_2.label);

	model.addProp('breakpoint_scale', createTextField(view, breakpoint_scale));
	createLabel(view, breakpoint_scale.label);

	breakpoint_checkboxes.checkBoxes.forEach(checkbox => model.addPropArray('breakpoints', createCheckBox(view, checkbox)));
	createLabel(view, breakpoint_checkboxes.label);


	model.addProp('naming_convention', createTextField(view, naming_convention));
	createLabel(view, naming_convention.label);


	model.addProp('rounding', createDropdown(view, rounding));
	createLabel(view, rounding.label);

	return {
		alert : alert,
		model : model
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
	if (rounding_type == 'Normal'){
		return Math.round;
	} else if (rounding_type == 'Multiples of 4') {
		return function (x) {
			return x - (x % 4) + Math.round(parseFloat(x % 4)/4.0)*4;;
		}
	} else if (rounding_type == 'Multiples of 8') {
		return function (x) {
			return x - (x % 8) + Math.round(parseFloat(x % 8)/8.0)*8;
		}
	}
	return function (x) { return x; };
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
	var new_layer = options.current_layer.copy();

	// setup the line height
	// TODO is this supposed to go into the style?
	//
	// new_layer.setTextAlignment(options.alignment);

	// setup the frame
	new_layer.frame().setY(options.y);
	new_layer.frame().setX(options.x);
	// new_layer.setLineHeight(options.lh);

	// get the current style & attributes
	var current_text_style = options.current_layer.style().textStyle(),
		current_attributes = current_text_style.attributes(),
		new_para_style = NSMutableParagraphStyle.alloc().init();

	// set the paragraph properties
	new_para_style.setParagraphStyle(current_attributes.NSParagraphStyle);

	// var old = new_para_style.maximumLineHeight();
	// new_para_style.lineHeight = options.lh;
	// new_para_style.setLineSpacing(options.lh);
	new_para_style.setMaximumLineHeight(options.lh);
	new_para_style.setMinimumLineHeight(options.lh);
	new_para_style.setAlignment(options.alignment_i);
	new_para_style.setParagraphSpacing(options.ps);

	// create a new text style
	var textStyleAttributes = {
		// NSColor.colorWithRed_green_blue_alpha(1,0,0,1)
		'NSColor' : current_attributes.MSAttributedStringColorAttribute.NSColorWithColorSpace(null),
		'NSFont' : NSFont.fontWithName_size_(options.current_layer.font().fontName(), options.fs),
		'NSParagraphStyle' : new_para_style
	};
	var textStyle = MSTextStyle.styleWithAttributes_(textStyleAttributes);

	// add the text style to a style
	var style = MSStyle.alloc().init();
	style.setTextStyle_(textStyle);

	// add the style to shared style
	var hexVal = options.naming_convention ? options.naming_convention : '#'+textStyleAttributes.NSColor.hexValue();
	let ss;
	const allocator = MSSharedStyle.alloc();
	// Sketch 50, 51
	if (allocator.initWithName_firstInstance) {
		ss = allocator.initWithName_firstInstance(options.style_name.replace('COLOR', hexVal), style);
	}
	// sketch 52 onwards
	else {

		ss = allocator.initWithName_style(options.style_name.replace('COLOR', hexVal), style)
	}

	context.document.documentData().layerTextStyles().addSharedObject(ss); // TODO can cache upto .layerTextStyles()

	// replace the text in the layer
	new_layer.replaceTextPreservingAttributeRanges(options.replace_text_with.replace('COLOR', hexVal));
	new_layer.setName(options.replace_text_with.replace('COLOR', hexVal));

	// set the style of the layer
	new_layer.setStyle(style);
	// textStyle.syncOwningTextLayerWithThisStyle();

	// save the shared style
	ss.updateToMatch(style);
	ss.resetReferencingInstances();
	return new_layer;
}

function handle_sumbit (dialog, context) {
	var response = dialog.alert.runModal();
	var Text = require('sketch/dom').Text;

	if (response == '1000') {
		console.log('Generate Type System');

		console.log('Type Scale: '+dialog.model.get('type_scale'));
		console.log('Line Height: '+ dialog.model.get('line_height'));
		console.log('Rounding: '+ dialog.model.get('rounding'));
		// console.log('Paragraph Spacing: '+ dialog.model.get('paragraph_spacing'));
		// console.log(dialog.model.getArray('breakpoints'));
		console.log(dialog.model.getArray('alignments'));
		var selected_layers = Array.from(context.document.selectedLayers().layers());

		if (selected_layers.length === 0) {
			console.log('No text area selected');
			return
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
			y = current_layer.frame().y() + 25, // + start 25 pixels below the selected text layer
			x = current_layer.frame().x();

		var current_text_style = current_layer.style().textStyle(),
			current_attributes = current_text_style.attributes();

		var new_layers = [];
		var break_points = [
			'XS',
			'SM',
			'MD',
			'LG',
			'.XL'
		];
		var header_tags = [
			'P',
			'H6',
			'H5',
			'H4',
			'H3',
			'H2',
			'H1'
		];

		// TODO also delete the original selected text layer
		var breakpoint_group_spacing = 100;
		break_points.forEach(function (breakpoint, breakpoint_i) {
			// when you move across a break point
			//  start over at the selected layers font size
			var current_fs = fs;
			if (chosen_breakpoints[breakpoint_i] == '1') {
				header_tags.forEach(function (header_tag, header_tag_i) {
					y += (current_fs + lh);
					lh = ls * current_fs;
					alignments.forEach(function (alignment, alignment_i) {
						var name = `${breakpoint}/${header_tag}/COLOR/${alignment}`;
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
							console.log(`${alignment} not selected`);
						}
					});
					current_fs *= ts;
				});
				y += breakpoint_group_spacing;
				fs *= bs;
			} else {
				console.log(`${breakpoint} not chosen`);
			}
		});

		current_layer_parent.insertLayers_afterLayer(reverse_layers_and_fix_x(new_layers, chosen_alignments, ts, bs), current_layer);
	}
	else if (response == '1001') {
		console.log('Cancel');
	} else {
		console.log('Unhandled response');
		console.log(response);
	}
}
var doc;
export default function (context) {
	var options = ['Sketch'];
	var app = NSApplication.sharedApplication();
	doc = context.document;
	// app.displayDialog_withTitle("This is an alert box!", "Alert Box Title");
	// var result = doc.askForUserInput_initialValue("How many copies do you want?", "10");
	// console.log(result);
	handle_sumbit(create_dialog(context), context);
}