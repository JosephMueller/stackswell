class StacksWell
{
    constructor(options) {
        this.labels = options.labels;
        this.break_points = options.break_points;
        this.context = options.context;
        this.style_map = {};
        this.librariesController = AppController.sharedInstance().librariesController();
        this.libraries_map = {};
        this.foreign_text_styles_map = {};
    }
    get selected_layers() {
        return Array.from(this.context.document.selectedLayers().layers())
    }
    get avail_txt_styles() {
        var self = this;
        return Array.from(this.context
            .document
            .documentData()
            .layerTextStyles()
            .objects()
        ).filter(style => self.is_compatible_style(style));
    }

    get avail_symbols() {
        var self = this;
        return Array.from(this.context
            .document
            .documentData()
            .localSymbols()
        ).filter(symbol => self.is_compatible_symbol(symbol))
    }

    get artboards() {
        return Array.from(this.context
            .document
            .currentPage()
            .children())
            .filter(item => item.class() == "MSArtboardGroup")
    }

    init() {
        var self = this;
        this.avail_txt_styles.forEach(function (style) {
            self.style_map[style.name()] = style;
            self.style_map[style.style().sharedObjectID()] = self.style_map[style.name()];
        });
        this.librariesController.userLibraries().forEach(function (library) {
            self.libraries_map[library.libraryID()] = {};
            if (!library.document()
                || !library.document().layerTextStyles()
                || !library.document().layerTextStyles().sharedStyles()) {
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
        this.context.document.documentData().foreignTextStyles().forEach(style => {
            self.foreign_text_styles_map[style.localShareID()] = style;
        });

        return this;
    }

    get_library_styles_map_from_text(text) {
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

    get_library_style_of_text(text) {
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
    get_next_smaller_label(label) {
        for (var i = this.labels.length - 1; i >=0; i--) {
            for (var j = 0; j < this.labels[i].length; j++) {
                if (label == this.labels[i][j]) {
                    i-=1;
                    if (i < 0) {
                        return null;
                    } else {
                        return this.labels[i];
                    }
                }
            }
        }
    }

    get_style_from_label_and_style(label, style, text) {
        // if we found one, chop off the first part of the name
        //   ex. md/H1/Black/Left -> H1,Black,Left        
        if (style) {
            var pieces = style.name().split('/');
            pieces.shift();
        }

        // since we might provide an array of labels
        //  ex. label = ['XL', '.XL', '_XL']
        //  try each break point
        for (var i =0; i < label.length; i ++) {
            // reconstruct the style name
            //  ex. label = ['XL', '.XL', '_XL'], pieces = ['H1','Black','Left']
            //      bp = 'XL/H1/Black/Left Style'
            var bp = [label[i]].concat(pieces).join('/');
            // if we have a style that maps to this reconstructed name
            //  give it back, otherwise try the next available break point in labels
            if (bp in this.style_map) {
                return this.style_map[bp];
            } else if (bp in this.get_library_styles_map_from_text(text)) { // TODO this could prob get cached
                return this.get_library_styles_map_from_text(text)[bp];
            }
        }
        console.log('No style found for break point & style '+ label + ' ' + style);
        var next_smaller = this.get_next_smaller_label(label);
        if (next_smaller) {
            console.log('Trying a smaller style to use: '+ next_smaller);
            return this.get_style_from_label_and_style(next_smaller, style, text);
        }
    }

    get_style_from_text(text) {
        return this.style_map[text.style().sharedObjectID()] || this.get_library_style_of_text(text);
    }

    getStyleFromName(name) {
        return this.style_map[name];
    }

    get_master_symbol_for_breakpoint(break_point, old_symbol) {
        // check if the symbol is part of a library, 
        //  and if it is, use the library symbols as choices for replacement
        var library = this.librariesController.libraryForShareableObject(old_symbol);
        console.log('Has library? '+library);
        var avail_symbols = library ? library.document().localSymbols() : this.avail_symbols;

        for (var j = 0; j < break_point.length; j++) { 
            for (var i = 0; i < avail_symbols.length; i++) {
                var symbol = avail_symbols[i],
                    label = break_point[j];

                // chop off the end of the symbol (the size part)
                var pieces = old_symbol.name().split('/');
                pieces.pop();
                var old_symbol_name = pieces.join('/');
                // if the symbol that you are on 
                // has the "label" (the break point size) 
                // entirely, and only, in between two slashes (ignore case)
                // AND
                // if the symbol that you are on
                // has the rest of the "old_symbol" (the target of this function)
                if (symbol.name().toUpperCase().split('/').indexOf(label.toUpperCase()) !== -1
                    && symbol.name().toUpperCase().includes(old_symbol_name.toUpperCase())
                ) {
                    if (!library) {
                        return symbol;
                    }

                    
                    return this.librariesController.importShareableObjectReference_intoDocument(
                        MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol,library), 
                        MSDocument.currentDocument().documentData()
                    ).symbolMaster();
                }
            }
        }

        console.log('No symbol found for break point ' + break_point);
        var next_smaller = this.get_next_smaller_label(break_point); 
        if (next_smaller) { 
            console.log('Trying to find symbol for the next smaller size: '+next_smaller);
            return this.get_master_symbol_for_breakpoint(next_smaller, old_symbol);
        } 
    }

    scale_text(text, label) {
        var current_style = this.get_style_from_text(text);
        if (current_style) {
            console.log("Current style is: "+ current_style.name()); 

            var style_to_apply  = this.get_style_from_label_and_style(label, current_style, text);
            if (style_to_apply) {
                console.log("Going to apply: "+ style_to_apply.name());
                text.setStyle_(style_to_apply.style());    
            }
        } else {
            console.log('text layer style not found in doc or libraries');
        }
    }

    is_compatible_style(style) {
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
    is_compatible_symbol(symbol) {
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
    find_break_point_for_artboard(artboard) { 
        var width = artboard.frame().width();
        console.log('artboard width '+width);
        var found = 0;
        for (; found < this.break_points.length; found++) {
            if (width < this.break_points[found]) {
                return this.labels[found];
            }
        }
        
        return this.labels[found];
    }

    in_artboard(artboard_layers, layer) {
        if (artboard_layers.indexOf(layer) !== -1) {
            return true;
        }

        var artboard_groups = artboard_layers.filter(symbol => symbol.class() == 'MSLayerGroup');

        for (var i = 0; i < artboard_groups.length; i++) {
            var group = artboard_groups[i];
            if (Array.from(group.layers()).indexOf(layer) !== -1) {
                return true;
            }
        }
        return false;
    }
}

export {StacksWell as default}