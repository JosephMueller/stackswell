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

    stacks_well.artboards.forEach(function(artboard){
        var break_point = stacks_well.find_break_point_for_artboard(artboard);
        console.log('Break point: ' , break_point);
        Array.from(artboard.layers())
            .filter(layer => layer.class() == "MSSymbolInstance" && stacks_well.is_compatible_style(layer))
            .forEach(function (old_symbol) {
                var old_symbol_master = old_symbol.symbolMaster();
                console.log('Found symbol: '+old_symbol_master);

                var replacement = stacks_well.get_symbol_for_breakpoint(break_point, old_symbol_master);
                if (replacement) {
                    console.log('Replace with:'+replacement);
                    old_symbol.changeInstanceToSymbol(replacement);    
                } else {
                    console.log('No replacement found'); 
                }
                
            });
    });
}