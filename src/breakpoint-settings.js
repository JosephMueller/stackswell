import Settings from "./settings";
import UI from "./ui";
import DialogModel from "./dialog-model";
import {rename_text_styles} from "./common";
import Utils from "./utils";
import Spacer from "./spacer";

function handle_sumbit(dialog, old_settings, context) {
    var response = dialog.dialog.runModal();
    var Text = require('sketch/dom').Text;

    if (response == '1000') {
        const settings = Settings.save(dialog, context, old_settings.text_color);
        if (!Utils.is_equal(old_settings, settings)) {
            rename_text_styles(old_settings, settings, context.document.documentData());
        }
    }
}

function create_dialog(settings, context) {
    const dialog =UI.build_dialog("Breakpoint Settings", "OK", "Cancel");

    const viewHeight = 317; // the height of the modal
    const viewLineHeight = 25; // the height of each line in the modal
    const label_width = 100;
    var viewSpacer = new Spacer(viewHeight, 35);
    let viewLine = viewSpacer.nextLine();

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

    const accessoryView = UI.build_accessory_view(300, viewHeight, dialog);
    var model = new DialogModel();

    breakpoints.checkBoxes.forEach(checkbox => model.addPropArray('chosen_breakpoints', UI.createCheckBox(accessoryView, checkbox)));
    breakpoints.textFields.forEach(text_field => model.addPropArray('breakpoint_labels', UI.createTextField(accessoryView, text_field)));
    UI.createLabel(accessoryView, breakpoints.label);

    return {
        dialog: dialog,
        model: model
    };
}

export default function (context) {
    const settings = Settings.load(context);
    const old_settings = Utils.deep_clone(settings);
    handle_sumbit(create_dialog(settings, context), old_settings, context);
}