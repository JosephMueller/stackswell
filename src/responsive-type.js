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
        Array.from(artboard.layers()).forEach(function (layer) {
            if (layer.class() == "MSLayerGroup") {
                var texts = Array.from(layer.layers()).filter(text => text.class() == "MSTextLayer");
                texts.forEach(text => stacks_well.scale_text(text, break_point));
            } else if (layer.class() == "MSTextLayer") {
                stacks_well.scale_text(layer, break_point);
            }
        });
    });
}