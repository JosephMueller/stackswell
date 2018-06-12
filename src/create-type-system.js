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
}

function createDropdown(view, settings) {
	// Creating the input
	var popup = NSPopUpButton.alloc();
	console.log(popup);

	var dropdown = popup.initWithFrame(NSMakeRect(
		settings.x,
		settings.y,
		settings.width,
		settings.height
	));

	settings.options.forEach(option => dropdown.addItemWithTitle(option));

	// Adding the PopUpButton to the dialog
	view.addSubview(dropdown);
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

function dialog(context) {
	var alert = COSAlertWindow.new();

	alert.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon2x.png").path()));
	alert.setMessageText("Create type system");

	// Creating dialog buttons
	alert.addButtonWithTitle("Generate System");
	// alert.addButtonWithTitle("Cancel"); // TODO how to close

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
		checkBoxes: [
			{
				x: 110,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "Left"
			},
			{
				x: 160,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "Center"
			},
						{
				x: 210,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "Right"
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


	viewLine = viewSpacer.nextLine();
	var breakpoint_checkboxes = {
		checkBoxes: [
			{
				x: 75,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "XS"
			},
			{
				x: 125,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "SM"
			},
						{
				x: 175,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "MD"
			},
			{
				x: 225,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "LG"
			},
						{
				x: 275,
				y: viewLine,
				width: 50,
				height: viewLineHeight,
				message: "XL"
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
		
	createTextField(view, line_height)
	createLabel(view, line_height.label);

	createTextField(view, paragraph_spacing);
	createLabel(view, paragraph_spacing.label);

	alignment_checkboxes.checkBoxes.forEach(checkbox => createCheckBox(view, checkbox));
	createLabel(view, alignment_checkboxes.label);

	createTextField(view, text_color_1);
	createLabel(view, text_color_1.label);

	createTextField(view, text_color_2);
	createLabel(view, text_color_2.label);

	breakpoint_checkboxes.checkBoxes.forEach(checkbox => createCheckBox(view, checkbox));
	createLabel(view, breakpoint_checkboxes.label);

	createTextField(view, naming_convention);
	createLabel(view, naming_convention.label);
	return alert;
}
export default function (context) {
	console.log('works 2');
	var options = ['Sketch'];
	var app = NSApplication.sharedApplication();
	var doc = context.document;
	// app.displayDialog_withTitle("This is an alert box!", "Alert Box Title");
	// var result = doc.askForUserInput_initialValue("How many copies do you want?", "10");
	// console.log(result);
	dialog(context).runModal();
}