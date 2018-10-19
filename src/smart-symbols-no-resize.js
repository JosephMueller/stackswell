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
        // console.log('Found symbol: '+old_symbol_master);

        var replacement = stacks_well.get_master_symbol_for_breakpoint(break_point, old_symbol_master);

        if (replacement) {
            // console.log('Replace with:'+replacement);
            old_symbol.changeInstanceToSymbol(replacement);
        } else {
            // console.log('No replacement found');
        }
    }

    function act_on_layer(layer, break_point, stacks_well) {
        if (layer.class() == "MSSymbolInstance") {
            smart_symbol(layer, break_point, stacks_well);
        } else if (layer.class() == "MSLayerGroup") {
            Array.from(layer.layers()).forEach(layer => act_on_layer(layer, break_point, stacks_well));
        }
    }

    var selected_layers = stacks_well.selected_layers;
    stacks_well.artboards.slice().forEach(function(artboard){
        var break_point = stacks_well.find_break_point_for_artboard(artboard);
        // console.log('Break point: ' , break_point);
        var artboard_layers = Array.from(artboard.layers());
        if (selected_layers.length > 0) {
            selected_layers.forEach(function (layer) {
                // only act on the layer if it is selected AND its in the artboard we're in right now
                // this sucks...n^2 loop
                if (stacks_well.in_artboard(artboard_layers, layer)) {
                    // console.log('Layer '+layer+' is selected');
                    act_on_layer(layer, break_point, stacks_well);
                }
            });
        } else {
            artboard_layers.forEach(layer => act_on_layer(layer, break_point, stacks_well));
        }
    });
}