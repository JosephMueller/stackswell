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
export const LABEL_VARIANTS = [["XL", ".XL", "_XL"]];

export default class Settings {
    static KEY = "settings";

    static load(context) {
        const documentData = context.document.documentData();
        // get settings from current document
        let settings = this._getSettings(documentData);
        if (settings == null) {
            const libraryNamesById = new Map();
            // get libraries of foreign text styles
            documentData.foreignTextStyles().forEach(foreignTextStyle => {
               libraryNamesById.set(String(foreignTextStyle.libraryID()), String(foreignTextStyle.sourceLibraryName()));
            });
            // get libraries of foreign symbols
            documentData.foreignSymbols().forEach(foreignSymbol => {
                libraryNamesById.set(String(foreignSymbol.libraryID()), String(foreignSymbol.sourceLibraryName()));
            });
            // look for settings in libraries, pick the first one it finds settings for
            for (let libraryData of libraryNamesById) {
                const [libraryId, libraryName] = libraryData;
                const library = this._getLibrary(libraryId, libraryName);
                if (library != null) {
                    settings = this._getSettings(library.document());
                    if (settings != null) {
                        console.log(`Got settings from library ${libraryName}`);
                        break;
                    }
                }
            }
            if (settings == null) {
                console.log("Couldn't getting settings document or library, using default settings");
                settings = DEFAULT_SETTINGS;
            }
        } else {
            console.log('Got settings from document');
        }
        console.log(settings);
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
            naming_convention: dialog.model.get('naming_convention', DEFAULT_SETTINGS.naming_convention, {placeholder: Constants.NAMING_CONVENTION_PLACHOLDER_TEXT}),
            rounding: dialog.model.get('rounding'),
            text_color: String(text_color)
        };
        //console.log(`save() ${JSON.stringify(settings)}`, settings);
        const settingsStr = JSON.stringify(settings);
        context.command.setValue_forKey_onDocument(settingsStr, Settings.KEY, context.document.documentData());
        return JSON.parse(settingsStr);
    }

    static _getLibrary(libraryId, libraryName) {
        let closeMatch, exactMatch;
        AppController.sharedInstance().librariesController().userLibraries().some(library => {
            if (library.enabled() && library.libraryID() == libraryId) {
                closeMatch = library;
                if (library.name() == libraryName) {
                    exactMatch = library;
                    return true;
                }
            }
        });
        return exactMatch ? exactMatch : closeMatch;
    }

    static _getSettings(documentData) {
        return JSON.parse(context.command.valueForKey_onDocument(Settings.KEY, documentData));
    }

}

