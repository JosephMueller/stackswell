class StacksWell
{
    constructor(options) {
        this.labels = options.labels;
        this.break_points = options.break_points;
        this.context = options.context;
        this.style_map = {};
    }

    get avail_txt_styles() {
        var self = this;
        return Array.from(this.context
            .document
            .documentData()
            .layerTextStyles()
            .objects()
        ).filter(style => self.is_compatible_style(style))
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
        return this;
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

    get_style_from_label_and_style(label, style) {
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
            }
        }
        console.log('No style found for break point & style '+ label + ' ' + style);
        next_smaller = this.get_next_smaller_label(label)
        if (next_smaller) {
            console.log('Trying a smaller style to use: '+ next_smaller);
            return this.get_style_from_label_and_style(next_smaller, style);
        }
    }

    get_style_from_text(text) {
        return this.style_map[text.style().sharedObjectID()];
    }

    getStyleFromName(name) {
        return this.style_map[name];
    }

    get_master_symbol_for_breakpoint(break_point, old_symbol) {
        var avail_symbols = this.avail_symbols;
        for (var j = 0; j < break_point.length; j++) {
            for (var i = 0; i < avail_symbols.length; i++) {
                var symbol = avail_symbols[i],
                    label = break_point[j];

                // chop off the end of the symbol (the size part)
                var pieces = old_symbol.name().split('/');
                pieces.pop();
                var old_symbol_name = pieces.join('/');

                if (symbol.name().toUpperCase().includes(label.toUpperCase())
                    && symbol.name().toUpperCase().includes(old_symbol_name.toUpperCase())
                ) {

                    return symbol;
                }
            }
        }

        console.log('No symbol found for break point ' + break_point);
        next_smaller = this.get_next_smaller_label(break_point); 
        if (next_smaller) { 
            console.log('Trying to find symbol for the next smaller size: '+next_smaller);
            return this.get_symbol_for_breakpoint(next_smaller, old_symbol);
        } 
    }
    swap_symbols(sym1, sym2) {
        // swaps sym1 with sym2

    }
    scale_text(text, label) {
        var current_style = this.get_style_from_text(text);
        if (current_style) {
            console.log("Current style is: "+ current_style.name()); 

            var style_to_apply  = this.get_style_from_label_and_style(label, current_style);
            if (style_to_apply) {
                console.log("Going to apply: "+ style_to_apply.name());
                text.setStyle_(style_to_apply.style());    
            }
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
}

export {StacksWell as default}