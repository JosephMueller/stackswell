class StacksWell
{
    constructor(options) {
        this.labels = options.labels;
        this.break_points = options.break_points;
        this.context = options.context;
        this.document = options.context.document;
        this.style_map = {};
        this.librariesController = AppController.sharedInstance().librariesController();
        this.libraries_map = {};
        this.foreign_text_styles_map = {};
    }

    get selected_layers() {
        return Array.from(this.context.document.selectedLayers().layers())
    }

    // local and referenced foreign text shared styles
    get avail_txt_styles() {
        var self = this;
        return Array.from(this.context
            .document
            .documentData()
            .allTextStyles()
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
        // local and referenced foreign shared text styles
        this.avail_txt_styles.forEach(sharedStyle => {
            this.style_map[sharedStyle.name()] = sharedStyle;
            this.style_map[sharedStyle.objectID()] = sharedStyle;
        });

        // foreign shared text styles
        //console.log('Foreign text styles');
        this.librariesController.userLibraries().forEach(library => {
            this.libraries_map[library.libraryID()] = {};
            if (!library.document()
                || !library.document().layerTextStyles()
                || !library.document().layerTextStyles().sharedStyles()) {
                return;
            }
            library.document().layerTextStyles().sharedStyles().forEach(shared_text_style => {
                if (!this.is_compatible_style(shared_text_style)) {
                    return;
                }
                const data = {shared_text_style, library};
                this.foreign_text_styles_map[shared_text_style.objectID()] = data;
                this.foreign_text_styles_map[shared_text_style.name()] = data;
                //console.log(`  ${sharedTextStyle.name()}`);
            });
        });

        print('completed initialization')
        return this;
    }

    get_shared_text_style_from_library(name) {
        const shared_text_style_data = this.foreign_text_styles_map[name];
        if (shared_text_style_data != null) {
            const foreign_text_style = MSForeignTextStyle.alloc().initWithOriginalObject_inLibrary(shared_text_style_data.shared_text_style, shared_text_style_data.library);
            this.document.documentData().addForeignTextStyle(foreign_text_style);
            const shared_text_style = foreign_text_style.localObject();
            this.style_map[shared_text_style.name()] = shared_text_style;
            this.style_map[shared_text_style.objectID()] = shared_text_style;
            return shared_text_style;
        }
        return null;
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
            //console.log(`${text.parentArtboard().name()}.${text.name()}: ${style.name()}`);
            // if we have a style that maps to this reconstructed name
            //  give it back, otherwise try the next available break point in labels
            if (bp in this.style_map) {
                return this.style_map[bp];
            } else {
                const shared_text_style = this.get_shared_text_style_from_library(bp);
                if (shared_text_style != null) {
                    return shared_text_style;
                }
            }
        }
        // console.log('No style found for break point & style '+ label + ' ' + style);
        var next_smaller = this.get_next_smaller_label(label);
        if (next_smaller) {
            // console.log('Trying a smaller style to use: '+ next_smaller);
            return this.get_style_from_label_and_style(next_smaller, style, text);
        }
    }

  getStyleFromName(name) {
        return this.style_map[name];
    }

    get_master_symbol_for_breakpoint(break_point, old_symbol) {
        // check if the symbol is part of a library,
        //  and if it is, use the library symbols as choices for replacement
        var library = this.librariesController.libraryForShareableObject(old_symbol);
        // console.log('Has library? '+library);
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

        // console.log('No symbol found for break point ' + break_point);
        var next_smaller = this.get_next_smaller_label(break_point);
        if (next_smaller) {
            // console.log('Trying to find symbol for the next smaller size: '+next_smaller);
            return this.get_master_symbol_for_breakpoint(next_smaller, old_symbol);
        }
    }

    scale_text(text, label) {
        var current_style = text.sharedStyle();
        if (current_style) {
            console.log(`  Current style is: ${current_style.name()}`);

            var style_to_apply  = this.get_style_from_label_and_style(label, current_style, text);
            if (style_to_apply) {
                console.log(`  Going to apply: ${style_to_apply.name()}`);
                text.setSharedStyle(style_to_apply);
            }
        } else {
            console.log(`  text layer ${text.name()} has no text style`);
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