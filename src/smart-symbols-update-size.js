import StacksWell from './stackswell.js'

export default function (context) { 

    var stacks_well = new StacksWell({
        labels: [
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

    function smart_symbol(old_symbol, break_point, stacks_well) {
        var old_symbol_master = old_symbol.symbolMaster();
        console.log('Found symbol: '+old_symbol_master);

        var replacement = stacks_well.get_master_symbol_for_breakpoint(break_point, old_symbol_master),
            replacement_frame = replacement.frame();

        if (replacement) {
            console.log('Replace with:'+replacement);
            old_symbol.changeInstanceToSymbol(replacement);
            // after changing the old_symbol to the requested master
            // adjust its height & width to match
            console.log('Old Symbol Frame' + old_symbol.frame());
            old_symbol.frame().setHeight(replacement_frame.height());
            old_symbol.frame().setWidth(replacement_frame.width());
            console.log('New Symbol Frame' + old_symbol.frame());
        } else {
            console.log('No replacement found'); 
        }
    }

    function act_on_layer(layer, break_point, stacks_well) {
        if (layer.class() == "MSSymbolInstance") {
            smart_symbol(layer, break_point, stacks_well);
        } else if (layer.class() == "MSLayerGroup") {
            Array.from(layer.layers()).forEach(layer => act_on_layer(layer, break_point, stacks_well));
            apply_group_frame_bugfix(layer, stacks_well);
        }
    } 

    // this functino fixes a bug where:
    //   changing a group's frame size
    //   inadvertantly changes the frame size of the symbols inside the group 
    function apply_group_frame_bugfix(group, stacks_well) {
        var max_x = 0, 
            max_y = 0,
            // keep track of the old symbol frame sizes, 
            //  to apply to the (wrongly/likely bec of a bug) altered symbol 
            old_frames = {};  

        Array.from(group.layers())
            .forEach(function (symbol) {
                var old_frame = symbol.frame(),
                    x = old_frame.x(),
                    y = old_frame.y(),
                    w = old_frame.widht(),
                    h = old_frame.height();

                old_frames[symbol] = [w,h,x,y]; 

                if (symbol.class() == "MSSymbolInstance" && stacks_well.is_compatible_symbol(symbol.symbolMaster())) {
                    console.log(symbol+' '+symbol.frame());
                    var frame = symbol.frame(),
                        new_x =  frame.x() + frame.width(),
                        new_y = frame.y() + frame.height();

                    if (new_x > max_x) {
                        max_x = new_x;
                    }

                    if (new_y > max_y) {
                        max_y = new_y;
                    }
                }
            });

        group.frame().setWidth(max_x); 
        group.frame().setHeight(max_y);

        Array.from(group.layers())
            .forEach(function (item) {
                item.frame().setWidth(old_frames[item][0]); 
                item.frame().setHeight(old_frames[item][1]);
                item.frame().setX(old_frames[item][2]);
                item.frame().setY(old_frames[item][3]);
            }); 

    }

    stacks_well.artboards.forEach(function(artboard){
        var break_point = stacks_well.find_break_point_for_artboard(artboard);
        console.log('Break point: ' , break_point);

        Array.from(artboard.layers()).
            forEach(layer => act_on_layer(layer, break_point, stacks_well));
    });
}