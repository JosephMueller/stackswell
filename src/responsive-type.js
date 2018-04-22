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
    function act_on_layer(layer, break_point, stacks_well) {
        if (layer.class() == "MSTextLayer") {
            stacks_well.scale_text(layer, break_point);
        } else if(layer.class() == "MSLayerGroup") {
            Array.from(layer.layers()).forEach(layer => act_on_layer(layer, break_point, stacks_well));
        }
    }
   
    stacks_well.artboards.forEach(function(artboard){
        var break_point = stacks_well.find_break_point_for_artboard(artboard);
        console.log('Break point: ' , break_point);
        Array.from(artboard.layers()).forEach(layer => act_on_layer(layer, break_point, stacks_well));
    });
}