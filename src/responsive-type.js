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
            .objects())
            .filter(style => self.is_compatible_style(style))
    }

    init() {
        var self = this;
        this.avail_txt_styles.forEach(function (style) {
            self.style_map[style.name()] = style;
            self.style_map[style.style().sharedObjectID()] = self.style_map[style.name()];
        });
        return this;
    }
    
    is_compatible_style(style) {
        var style_name = style.name();
        for (var i = 0; i < this.labels.length; i++) {
            for (var j = 0; j < this.labels[i].length; j++) {
                if (style_name.startsWith(this.labels[i][j])) {
                    return true;
                }
            }
        }
        return false;
    }

    get_style_from_text(text) {
        return this.style_map[text.style().sharedObjectID()];
    }

    getStyleFromName(name) {
        return this.style_map[name];
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

    get_style_for_break_point(break_point, style) {
        // if we found one, chop off the first part of the name
        //   ex. md/H1/Black/Left -> H1,Black,Left        
        if (style) {
            var pieces = style.name().split('/');
            pieces.shift();
        }

        // since we might provide an array of break_points
        //  ex. break_point = ['XL', '.XL', '_XL']
        //  try each break point
        for (var i =0; i < break_point.length; i ++) {
            // reconstruct the style name
            //  ex. break_point = ['XL', '.XL', '_XL'], pieces = ['H1','Black','Left']
            //      bp = 'XL/H1/Black/Left Style'
            var bp = [break_point[i]].concat(pieces).join('/');
            // if we have a style that maps to this reconstructed name
            //  give it back, otherwise try the next available break point in break_points
            if (bp in this.style_map) {
                return this.style_map[bp];
            }
        } 
    }

    scale_text_style(text, break_point) {
        var current_style = this.get_style_from_text(text);
        if (current_style) {
            console.log("Current style is: "+ current_style.name()); 

            var style_to_apply  = this.get_style_for_break_point(break_point, current_style);
            if (style_to_apply) {
                console.log("Going to apply: "+ style_to_apply.name());
                text.setStyle_(style_to_apply.style());    
            }
        }
    }

    get artboards() {
        return Array.from(this.context
            .document
            .currentPage()
            .children())
            .filter(item => item.class() == "MSArtboardGroup")
    }
}

export default function (context) {
    var stacks_well = new StacksWell({
        labels: [
        // TODO this should all be .upperCased()
            ['XS'],
            ['SM'],
            ['MD'],
            ['LG'],
            ['.XL', 'XL', '_XL']
        ],
        break_points: [ 
            576, // 0-575 xs
            767, // 576-766 sm
            991, // 767-990 md
            1199 // 990-1198 lg
                 // 1999+ xl
        ],
        context: context
    }).init(); 

    stacks_well.artboards.forEach(function(artboard){
        var break_point = stacks_well.find_break_point_for_artboard(artboard);
        console.log('Break point: ' , break_point);
        Array.from(artboard.layers()).forEach(function (layer) {
            if (layer.class() == "MSLayerGroup") {
                var texts = Array.from(layer.layers()).filter(text => text.class() == "MSTextLayer");
                texts.forEach(text => stacks_well.scale_text_style(text, break_point));
            } else if (layer.class() == "MSTextLayer") {
                stacks_well.scale_text_style(layer, break_point);
            }
        });
    });
} 