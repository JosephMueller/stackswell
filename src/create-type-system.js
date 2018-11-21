import StacksWell from './stackswell'
import Settings, { DEFAULT_SETTINGS, HEADER_TAGS, ALIGNMENTS } from "./settings";
import Constants from "./constants";
import Spacer from "./spacer.js";
import UI from "./ui.js";
import ViewModel from "./view-model";
import Utils from "./utils";
import { rename_text_styles } from "./common";

var alignment_is = [
    0,
    2,
    1
];

function create_dialog(settings) {
    const dialog = UI.build_dialog("Create Type System", "Generate System", "Cancel");

    // Creating the view
    const viewHeight = 317;
    const viewLineHeight = 25; // the height of each line in the modal
    const label_width = 100;
    const control_width = 200;

    // keep current line state
    var viewSpacer = new Spacer(viewHeight, 35);
    var viewLine = viewSpacer.nextLine();

    var type_scale = {
        x: label_width,
        y: viewLine,
        width: control_width,
        height: viewLineHeight,
        initValue: settings.type_scale,
        isNumber: true,
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Type Scale"
        }
    };

    viewLine = viewSpacer.nextLine();
    var line_height = {
        x: label_width,
        y: viewLine,
        width: control_width,
        height: viewLineHeight,
        initValue: settings.line_height,
        isNumber: true,
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Line Height"
        }
    };

    viewLine = viewSpacer.nextLine();
    var paragraph_spacing = {
        x: label_width,
        y: viewLine,
        width: control_width,
        height: viewLineHeight,
        initValue: settings.paragraph_spacing,
        isNumber: true,
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Paragraph Spacing"
        }
    };

    viewLine = viewSpacer.nextLine();
    var alignment_checkboxes = {
        checkBoxes: [
            {
                x: label_width,
                y: viewLine,
                width: 50,
                height: viewLineHeight,
                message: "Left",
                enabled: settings.alignments[0] == "1"
            },
            {
                x: label_width + 50,
                y: viewLine,
                width: 70,
                height: viewLineHeight,
                message: "Center",
                enabled: settings.alignments[1] == "1"
            },
            {
                x: label_width + 120,
                y: viewLine,
                width: 50,
                height: viewLineHeight,
                message: "Right",
                enabled: settings.alignments[2] == "1"
            }
        ],
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Alignment"
        }
    };

    viewLine = viewSpacer.nextLine();
    var breakpoint_scale = {
        x: label_width,
        y: viewLine,
        width: control_width,
        height: viewLineHeight,
        initValue: settings.breakpoint_scale,
        isNumber: true,
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Breakpoint Scale"
        }
    };

    viewLine = viewSpacer.nextLine();
    const x = label_width;
    const checkbox_width = 20;
    const textfield_width = 40;
    const horz_spacing = checkbox_width + textfield_width + 9;
    const vert_spacing = 30;
    const textfield_margin_left = 20;
    var breakpoints = {
        checkBoxes: [
            {
                x: x,
                y: viewLine,
                width: checkbox_width,
                height: viewLineHeight,
                enabled: settings.chosen_breakpoints[0] == "1"
            },
            {
                x: x + horz_spacing,
                y: viewLine,
                width: checkbox_width,
                height: viewLineHeight,
                enabled: settings.chosen_breakpoints[1] == "1"
            },
            {
                x: x + (2 * horz_spacing),
                y: viewLine,
                width: checkbox_width,
                height: viewLineHeight,
                enabled: settings.chosen_breakpoints[2] == "1"
            },
            {
                x: x,
                y: viewLine - vert_spacing,
                width: checkbox_width,
                height: viewLineHeight,
                enabled: settings.chosen_breakpoints[3] == "1"
            },
            {
                x: x + horz_spacing,
                y: viewLine - vert_spacing,
                width: checkbox_width,
                height: viewLineHeight,
                enabled: settings.chosen_breakpoints[4] == "1"
            },
        ],
        textFields: [
            {
                x: x + textfield_margin_left,
                y: viewLine,
                width: textfield_width,
                height: viewLineHeight,
                initValue: settings.breakpoint_labels[0]
            },
            {
                x: x + horz_spacing + textfield_margin_left,
                y: viewLine,
                width: textfield_width,
                height: viewLineHeight,
                initValue: settings.breakpoint_labels[1]
            },
            {
                x: x + (2 * horz_spacing) + textfield_margin_left,
                y: viewLine,
                width: textfield_width,
                height: viewLineHeight,
                initValue: settings.breakpoint_labels[2]
            },
            {
                x: x + textfield_margin_left,
                y: viewLine - vert_spacing,
                width: textfield_width,
                height: viewLineHeight,
                initValue: settings.breakpoint_labels[3]
            },
            {
                x: x + horz_spacing + textfield_margin_left,
                y: viewLine - vert_spacing,
                width: textfield_width,
                height: viewLineHeight,
                initValue: settings.breakpoint_labels[4]
            }

        ],
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Breakpoints"
        }
    };

    viewLine = viewSpacer.nextLine(67);
    var naming_convention = {
        x: label_width,
        y: viewLine,
        width: control_width,
        height: viewLineHeight,
        initValue: settings.naming_convention.length === 0 ? Constants.NAMING_CONVENTION_PLACHOLDER_TEXT : settings.naming_convention, // TODO make this a variable/search if changing
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            message: "Color Name"
        }
    };

    viewLine = viewSpacer.nextLine();
    var rounding = {
        x: label_width,
        y: viewLine,
        width: control_width,
        height: viewLineHeight,
        options: [
            'Normal',
            'Multiples of Four',
            'Multiples of Eight',
            'None'
        ],
        selected_option: settings.rounding,
        label: {
            x: 0,
            y: viewLine,
            width: label_width,
            height: viewLineHeight,
            fontSize: 12,
            message: "Rounding"
        }
    };

    const accessoryView = UI.build_accessory_view(300, viewHeight, dialog)
    var view_model = new ViewModel();

    view_model.addProp('type_scale', UI.createTextField(accessoryView, type_scale));
    UI.createLabel(accessoryView, type_scale.label);

    view_model.addProp('line_height', UI.createTextField(accessoryView, line_height));
    UI.createLabel(accessoryView, line_height.label);

    view_model.addProp('paragraph_spacing', UI.createTextField(accessoryView, paragraph_spacing));
    UI.createLabel(accessoryView, paragraph_spacing.label);

    alignment_checkboxes.checkBoxes.forEach(checkbox => view_model.addPropArray('alignments', UI.createCheckBox(accessoryView, checkbox)));
    UI.createLabel(accessoryView, alignment_checkboxes.label);

    view_model.addProp('breakpoint_scale', UI.createTextField(accessoryView, breakpoint_scale));
    UI.createLabel(accessoryView, breakpoint_scale.label);

    breakpoints.checkBoxes.forEach(checkbox => view_model.addPropArray('chosen_breakpoints', UI.createCheckBox(accessoryView, checkbox)));
    breakpoints.textFields.forEach(text_field => view_model.addPropArray('breakpoint_labels', UI.createTextField(accessoryView, text_field)));
    UI.createLabel(accessoryView, breakpoints.label);

    view_model.addProp('naming_convention', UI.createTextField(accessoryView, naming_convention));
    UI.createLabel(accessoryView, naming_convention.label);

    view_model.addProp('rounding', UI.createDropdown(accessoryView, rounding));
    UI.createLabel(accessoryView, rounding.label);

    return {
        dialog: dialog,
        model: view_model
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
                current_column = ALIGNMENTS.indexOf(pieces.pop());
        layer.frame().setX(layer.frame().x() + max_width * Math.max(2, breakpoint_scale, type_scale) * current_column);
    });

    return new_layers;
}

function get_rounding(rounding_type) {
    if (rounding_type == 'Normal') {
        return Math.round;
    } else if (rounding_type == 'Multiples of 4') {
        return function (x) {
            return x - (x % 4) + Math.round(parseFloat(x % 4) / 4.0) * 4;
            ;
        }
    } else if (rounding_type == 'Multiples of 8') {
        return function (x) {
            return x - (x % 8) + Math.round(parseFloat(x % 8) / 8.0) * 8;
        }
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
        'NSColor': current_attributes.MSAttributedStringColorAttribute.NSColorWithColorSpace(null),
        'NSFont': NSFont.fontWithName_size_(options.current_layer.font().fontName(), options.fs),
        'NSParagraphStyle': new_para_style
    };
    var textStyle = MSTextStyle.styleWithAttributes_(textStyleAttributes);

    // add the text style to a style
    var style = MSStyle.alloc().init();
    style.setTextStyle_(textStyle);

    // add the style to shared style
    var hexVal = options.naming_convention ? options.naming_convention : '#' + current_attributes.MSAttributedStringColorAttribute.hexValue();
    const style_name = options.style_name.replace('COLOR', hexVal);
    let shared_style = context.document.documentData().layerTextStyles().sharedStyles().find(sharedStyle => {
        return sharedStyle.name() == style_name;
    });
    if (shared_style != null) {
        context.document.documentData().layerTextStyles().removeSharedObject(shared_style);
    }
    shared_style = MSSharedStyle.alloc();

    if (shared_style.initWithName_firstInstance) {
        // < v52
        shared_style = shared_style.initWithName_firstInstance(style_name, style);
    } else {
        // >= v52
        shared_style = shared_style.initWithName_style(style_name, style);
    }
    context.document.documentData().layerTextStyles().addSharedObject(shared_style); // TODO can cache upto .layerTextStyles()

    // replace the text in the layer
    new_layer.replaceTextPreservingAttributeRanges(style_name);
    new_layer.setName(style_name);
    new_layer.setSharedStyle(shared_style);
    new_layer.setStyle(style);
    shared_style.updateToMatch(style);
    shared_style.resetReferencingInstances();
    return new_layer;
}

function handle_sumbit(dialog, old_settings, context) {
    var response = dialog.dialog.runModal();
    var Text = require('sketch/dom').Text;

    if (response == '1000') {
        console.log('Generate Type System');

        console.log('Type Scale: ' + dialog.model.get('type_scale'));
        console.log('Line Height: ' + dialog.model.get('line_height'));
        console.log('Rounding: ' + dialog.model.get('rounding'));
        // console.log('Paragraph Spacing: '+ dialog.model.get('paragraph_spacing'));
        // console.log(dialog.model.getArray('chosen_breakpoints'));
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

        const settings = Settings.save(dialog, context, current_layer.textColor().immutableModelObject().hexValue());
        rename_text_styles(old_settings, settings, context.document.documentData());

        var current_layer_parent = current_layer.parentGroup();
        var fs = current_layer.fontSize(),
                lh = parseFloat(current_layer.lineHeight()),
                ts = parseFloat(dialog.model.get('type_scale', DEFAULT_SETTINGS.type_scale, {is_number: true})),
                ls = parseFloat(dialog.model.get('line_height', DEFAULT_SETTINGS.line_height, {is_number: true})),
                bs = parseFloat(dialog.model.get('breakpoint_scale', DEFAULT_SETTINGS.breakpoint_scale, {is_number: true})),
                ps = parseFloat(dialog.model.get('paragraph_spacing', DEFAULT_SETTINGS.paragraph_spacing, {is_number: true})),
                chosen_alignments = dialog.model.getArray('alignments'),
                chosen_breakpoints = dialog.model.getArray('chosen_breakpoints'),
                breakpoint_labels = dialog.model.getArray('breakpoint_labels', DEFAULT_SETTINGS.breakpoint_labels),
                rounding = get_rounding(dialog.model.get('rounding')),
                naming_convention = dialog.model.get('naming_convention', DEFAULT_SETTINGS.naming_convention, {placeholder: Constants.NAMING_CONVENTION_PLACHOLDER_TEXT}),
                y = current_layer.frame().y() + 25, // + start 25 pixels below the selected text layer
                x = current_layer.frame().x();

        var current_text_style = current_layer.style().textStyle(),
                current_attributes = current_text_style.attributes();

        var new_layers = [];

        // TODO also delete the original selected text layer
        var breakpoint_group_spacing = 100;
        breakpoint_labels.forEach(function (breakpoint_label, breakpoint_label_i) {
            // when you move across a break point
            //  start over at the selected layers font size
            var current_fs = fs;
            if (chosen_breakpoints[breakpoint_label_i] == "1") {
                HEADER_TAGS.forEach(function (header_tag) {
                    y += (current_fs + lh);
                    lh = ls * current_fs;
                    ALIGNMENTS.forEach(function (alignment, alignment_i) {
                        var name = `${breakpoint_label}/${header_tag}/COLOR/${alignment}`;
                        if (chosen_alignments[alignment_i] == "1") {
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
                                naming_convention: naming_convention == "" ? false : naming_convention
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
                console.log(`${breakpoint_label} not chosen`);
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

export default function (context) {
    const settings = Settings.load(context);
    const old_settings = Utils.deep_clone(settings);
    handle_sumbit(create_dialog(settings), old_settings, context);
}