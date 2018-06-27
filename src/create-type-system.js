import StacksWell from './stackswell.js'

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
	checkbox.setState(NSOffState);

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
		var prop = this.properties[value];
		var prop_type = prop.class();
		if (prop_type == 'NSPopUpButton') {
			return prop.titleOfSelectedItem();
		} else if (prop_type == 'NSTextField') {
			return prop.stringValue();
		} else {
			console.log('unknown prop type '+prop_type);
		}
	}
}

function create_dialog(context) {
	var alert = COSAlertWindow.new();

	alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon2x.png").path()));
	alert.setMessageText("Create type system");

	// Creating dialog buttons
	alert.addButtonWithTitle("Cancel");
	alert.addButtonWithTitle("Generate System");
	

	// Creating the view
	var viewWidth = 1000; // the width of the modal
	var viewHeight = 100; // the height of the modal
	var viewLineHeight = 25; // the height of each line in the modal


	// keep current line state
	var viewSpacer = new Spacer(viewHeight, viewLineHeight);
	
	var viewLine = viewSpacer.nextLine();
	var type_scale = {
		x: 100,
		y: viewLine,
		width: 190,
		height: viewLineHeight,
		options: [
			'1.067 Minor Second',
			'1.125 Major Second',
			'1.200 Minor Third',
			'1.250 Major Third',
			'1.333 Perfect Fourth',
			'1.414 Augmented Fourth',
			'1.500 Perfect Fifth',
			'1.618 Golden Ratio'
		],
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

	// viewLine = viewSpacer.nextLine();
	// var paragraph_spacing = {
	// 	x: 150,
	// 	y: viewLine,
	// 	width: 190,
	// 	height: viewLineHeight,
	// 	initValue: 1.333,
	// 	label: {
	// 		x: 0,
	// 		y: viewLine,
	// 		width: 190,
	// 		height: viewLineHeight,
	// 		fontSize: 12,
	// 		message: "Paragraph Spacing"
	// 	}
	// };

	// viewLine = viewSpacer.nextLine();
	// var alignment_checkboxes = {
	// 	checkBoxes: [
	// 		{
	// 			x: 110,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "Left"
	// 		},
	// 		{
	// 			x: 160,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "Center"
	// 		},
	// 					{
	// 			x: 210,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "Right"
	// 		}
	// 	],
	// 	label: {
	// 		x: 0,
	// 		y: viewLine,
	// 		width: 100,
	// 		height: viewLineHeight,
	// 		fontSize: 12,
	// 		message: "Alignment"
	// 	}
	// };

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

	viewLine = viewSpacer.nextLine();
	var breakpoint_scale = {
		x: 100,
		y: viewLine,
		width: 190,
		height: viewLineHeight,
		options: [
			'1.067 Minor Second',
			'1.125 Major Second',
			'1.200 Minor Third',
			'1.250 Major Third',
			'1.333 Perfect Fourth',
			'1.414 Augmented Fourth',
			'1.500 Perfect Fifth',
			'1.618 Golden Ratio'
		],
		label: {
			x: 0,
			y: viewLine,
			width: 100,
			height: viewLineHeight,
			fontSize: 12,
			message: "Breakpoint Scale"
		}
	};


	// viewLine = viewSpacer.nextLine();
	// var breakpoint_checkboxes = {
	// 	checkBoxes: [
	// 		{
	// 			x: 75,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "XS"
	// 		},
	// 		{
	// 			x: 125,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "SM"
	// 		},
	// 					{
	// 			x: 175,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "MD"
	// 		},
	// 		{
	// 			x: 225,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "LG"
	// 		},
	// 					{
	// 			x: 275,
	// 			y: viewLine,
	// 			width: 50,
	// 			height: viewLineHeight,
	// 			message: "XL"
	// 		}
	// 	],
	// 	label: {
	// 		x: 0,
	// 		y: viewLine,
	// 		width: 75,
	// 		height: viewLineHeight,
	// 		fontSize: 12,
	// 		message: "Breakpoints"
	// 	}
	// };


	// viewLine = viewSpacer.nextLine();
	// var naming_convention = {
	// 	x: 80,
	// 	y: viewLine,
	// 	width: 300,
	// 	height: viewLineHeight,
	// 	initValue: "Type Face/Color/Alignment",
	// 	label: {
	// 		x: 0,
	// 		y: viewLine,
	// 		width: 75,
	// 		height: viewLineHeight,
	// 		message: "BkPt/H#/"
	// 	}
	// };

	var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
	alert.addAccessoryView(view);
	var model = new Model();

	model.addProp('type_scale', createDropdown(view, type_scale));
	createLabel(view, type_scale.label);
		
	model.addProp('line_height', createTextField(view, line_height));
	createLabel(view, line_height.label);

	// model.addProp('paragraph_spacing', createTextField(view, paragraph_spacing));
	// createLabel(view, paragraph_spacing.label);

	// alignment_checkboxes.checkBoxes.forEach(checkbox => model.addPropArray('alignments',createCheckBox(view, checkbox)));
	// createLabel(view, alignment_checkboxes.label);

	// model.addProp('text_color_1', createTextField(view, text_color_1));
	// createLabel(view, text_color_1.label);

	// model.addProp('text_color_2', createTextField(view, text_color_2));
	// createLabel(view, text_color_2.label);

	model.addProp('breakpoint_scale', createDropdown(view, breakpoint_scale));
	createLabel(view, breakpoint_scale.label);

	// breakpoint_checkboxes.checkBoxes.forEach(checkbox => model.addPropArray('breakpoints', createCheckBox(view, checkbox)));
	// createLabel(view, breakpoint_checkboxes.label);

	// model.addProp('naming_convention', createTextField(view, naming_convention));
	// createLabel(view, naming_convention.label);
	
	return {
		alert : alert,
		model : model
	};
}

/**
 * options: {
	current_layer:,
	lh,
	x,
	y,
	fs,
	style_name,
	replace_text_with
 }
 */
function create_text_and_style(options) {
	var new_layer = options.current_layer.copy();
	
	// setup the line height 
	// TODO is this supposed to go into the style?
	// new_layer.setLineHeight(options.lh);
	// new_layer.setTextAlignment(options.alignment);

	// setup the frame
	new_layer.frame().setY(options.y);
	new_layer.frame().setX(options.x);

	// get the current style & attributes
	var current_text_style = options.current_layer.style().textStyle(),
		current_attributes = current_text_style.attributes(),
		new_para_style = NSMutableParagraphStyle.alloc().init();

	// set the paragraph properties
	new_para_style.setParagraphStyle(current_attributes.NSParagraphStyle);
	console.log(new_para_style.lineSpacing());
	new_para_style.lineSpacing = options.lh;
	new_para_style.alignment = options.alignment_i;
	console.log(new_para_style.lineSpacing());

	// create a new text style
	var textStyleAttributes = {
		// NSColor.colorWithRed_green_blue_alpha(1,0,0,1)
		'NSColor' : current_attributes.MSAttributedStringColorAttribute.NSColorWithColorSpace(null),
		'NSFont' : NSFont.fontWithName_size_(options.current_layer.font().fontName(), options.fs),
		'NSParagraphStyle' : new_para_style
	};
	var textStyle = MSTextStyle.styleWithAttributes_(textStyleAttributes);
	// console.log(textStyleAttributes.NSColor.hexValue());
	// add the text style to a style
	var style = MSStyle.alloc().init();
	style.setTextStyle_(textStyle);

	// add the style to shared style
	var ss = MSSharedStyle.alloc().initWithName_firstInstance(options.style_name.replace('COLOR', '#'+textStyleAttributes.NSColor.hexValue()), style);
	context.document.documentData().layerTextStyles().addSharedObject(ss); // TODO can cache upto .layerTextStyles()

	new_layer.setStyle(style);
	new_layer.replaceTextPreservingAttributeRanges(options.replace_text_with.replace('COLOR', '#'+textStyleAttributes.NSColor.hexValue()));

	return new_layer;
}

function handle_sumbit (dialog, context) {
	var response = dialog.alert.runModal();
	var Text = require('sketch/dom').Text;

	if (response == '1001') {
		console.log('Generate Type System');
		
		console.log('Type Scale: '+dialog.model.get('type_scale'));
		console.log('Line Height: '+ dialog.model.get('line_height'));
		// console.log('Paragraph Spacing: '+ dialog.model.get('paragraph_spacing'));
		
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
			lh = current_layer.lineHeight(),
			ts = parseFloat(dialog.model.get('type_scale')),
			ls = parseFloat(dialog.model.get('line_height')),
			bs = parseFloat(dialog.model.get('breakpoint_scale')),
			y = current_layer.frame().y(),
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
		// start off by 1
		// TODO also delete the original selected text layer
		fs /= (ts*bs);
		lh /= ls;
		break_points.forEach(function (column, column_i) {
			fs *= bs;
			var current_fs = fs;
			header_tags.forEach(function (header_tag, header_tag_i) {
				current_fs *= ts;
				lh = Math.round(ls * current_fs);
				y += current_fs + lh + 25;

				// start off by 1
				var nx = x;
				alignments.forEach(function (alignment, alignment_i) {
					var name = `${column}/${header_tag}/COLOR/${alignment}`;
					new_layers.push(create_text_and_style({
						current_layer: current_layer,
						lh: lh,
						x: nx,
						y: y,
						fs: Math.round(current_fs),
						style_name: name,
						replace_text_with: name,
						alignment_i: alignment_is[alignment_i],
						alignment: alignment.toLowerCase()
					}));
					nx+=450*(break_points.length);
				});
			});
			y+=100;
		});
		// for (var i = 0; i < 5; i++) {
		// 	fs *= ts;
		// 	lh *= ls; 
		// 	y += fs + lh + 25;

		// 	new_layers.push(create_text_and_style({
		// 		current_layer : current_layer,
		// 		lh: lh,
		// 		x: x,
		// 		y: y,
		// 		fs: fs,
		// 		style_name: 'my/text/style/'+i,
		// 		replace_text_with: '1234123412341243'+i,
		// 		alignment: 3
		// 	}));
		// }

		current_layer_parent.insertLayers_afterLayer(new_layers, current_layer);
	}
	else if (response == '1001') {
		consoole.log('Cancel');
	} else {
		console.log('Unhandled response');
		console.log(response);
	}
}

export default function (context) {
	var options = ['Sketch'];
	var app = NSApplication.sharedApplication();
	var doc = context.document;
	// app.displayDialog_withTitle("This is an alert box!", "Alert Box Title");
	// var result = doc.askForUserInput_initialValue("How many copies do you want?", "10");
	// console.log(result);
	handle_sumbit(create_dialog(context), context);
}