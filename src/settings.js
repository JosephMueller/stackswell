import Constants from "./constants";

export const DEFAULT_SETTINGS = {
    type_scale: "1.25",
    line_height: "1.333",
    paragraph_spacing: "0",
    alignments: ["1", "1", "1"],
    breakpoint_scale: "1.25",
    chosen_breakpoints: ["1", "1", "1", "1", "1"],
    breakpoint_labels: ["XS", "SM", "MD", "LG", ".XL"],
    naming_convention: "",
    rounding: "Normal"
};
/*
XS: 0-575
SM: 576-766
MD: 767 - 990
LG: 991 - 1198
XL: 1199+
 */
export const DEFAULT_BREAKPOINTS = [575, 766, 990, 1198];
export const HEADER_TAGS = ["P", "H6", "H5", "H4", "H3", "H2", "H1"];
export const ALIGNMENTS = ["Left", "Center", "Right"];

export default class Settings {
    static KEY = "settings";

    static load(context) {
        const user_defaults = NSUserDefaults.alloc().initWithSuiteName(context.plugin.identifier());
        let settings = context.command.valueForKey_onDocument(Settings.KEY, context.document.documentData());
        //console.log(settings);
        if (settings == null) {
            settings = DEFAULT_SETTINGS;
        }
        return settings;
    }

    static save(dialog, context, text_color) {
        const settings = {
            type_scale: dialog.model.get('type_scale', DEFAULT_SETTINGS.type_scale, {is_number: true}),
            line_height: dialog.model.get('line_height', DEFAULT_SETTINGS.line_height, {is_number: true}),
            paragraph_spacing: dialog.model.get('paragraph_spacing', DEFAULT_SETTINGS.paragraph_spacing, {is_number: true}),
            alignments: dialog.model.getArray('alignments'),
            breakpoint_scale: dialog.model.get('breakpoint_scale', DEFAULT_SETTINGS.breakpoint_scale, {is_number: true}),
            chosen_breakpoints: dialog.model.getArray('chosen_breakpoints'),
            breakpoint_labels: dialog.model.getArray('breakpoint_labels', DEFAULT_SETTINGS.breakpoint_labels),
            naming_convention: dialog.model.get('naming_convention', DEFAULT_SETTINGS.naming_convention, Constants.NAMING_CONVENTION_PLACHOLDER_TEXT),
            rounding: dialog.model.get('rounding'),
            text_color: text_color
        };
        //console.log(settings);
        context.command.setValue_forKey_onDocument(settings, Settings.KEY, context.document.documentData());
        return settings;
    }

}

