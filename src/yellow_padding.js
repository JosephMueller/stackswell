function input() { 
  // var doc = context.document;
  // var result = doc.askForUserInput_initialValue("How many copies do you want?", 10)
  // [doc askForUserInput:"How many copies do you want?" initialValue:"10"];
  // log(result)


  var alert = COSAlertWindow.new();
  alert.setMessageText("Configure your confetti")
  alert.addButtonWithTitle("Ok");
  alert.addButtonWithTitle("Cancel");


// Create the main view
  var viewWidth = 400;
  var viewHeight = 300;
  var viewSpacer = 10;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
  alert.addAccessoryView(view);


  // Create labels & textfields
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 33, (viewWidth - 100), 35));
  var horizontalLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 65, (viewWidth / 2) - 10, 20));
  var verticalTextField = NSTextField.alloc().initWithFrame(NSMakeRect(140, viewHeight - 65, (viewWidth / 2) - 10, 20));
  

  var verticalLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 85, 130, 20));
  var horizontalTextField = NSTextField.alloc().initWithFrame(NSMakeRect(140, viewHeight - 85, 130, 20));

  

  // Configure labels
  infoLabel.setStringValue("Margins");
  infoLabel.setSelectable(false);
  infoLabel.setEditable(false);
  infoLabel.setBezeled(false);
  infoLabel.setDrawsBackground(false);

  horizontalLabel.setStringValue("SM");
  horizontalLabel.setSelectable(false);
  horizontalLabel.setEditable(false);
  horizontalLabel.setBezeled(false);
  horizontalLabel.setDrawsBackground(false);

  verticalLabel.setStringValue("MD");
  verticalLabel.setSelectable(false);
  verticalLabel.setEditable(false);
  verticalLabel.setBezeled(false);
  verticalLabel.setDrawsBackground(false);



  // Add labels
  view.addSubview(infoLabel);
  view.addSubview(horizontalLabel);
  view.addSubview(verticalLabel);

  // Optional: Make TAB key work to switch between textfields
  verticalTextField.setNextKeyView(horizontalTextField);

  // Add textfields
  view.addSubview(horizontalTextField);
  view.addSubview(verticalTextField);


  log([alert][0].runModal())

log(horizontalTextField.stringValue()) 
log(verticalTextField.stringValue())

}
export default function (context) {
	  // const selectedLayers = context.selection
  var selection = context.selection;
  var loop = selection.objectEnumerator();


	// this is to address the spacing shadow layer
	//  its kind of ugly, but layer union drops all the shadows
	//  and shadows don't have names to address
	var unique_hex = "#FFFF7F";

	while (item = loop.nextObject()) {
		if (item.class() === MSShapeGroup) {
			var shadows = item.style().shadows(), spacing_shadow
			if (shadows && shadows.length >= 1) {
				var last = shadows.length - 1
				shadows[last].setBlurRadius(0)
				shadows[last].setSpread(0)
				shadows[last].setOffsetX(0)
				shadows[last].setOffsetY(parseInt(horizontalTextField.stringValue()))
				shadows[last].setBlurRadius(0)
				// shadows[last].setColor([MSImmutableColor colorWithSVGString: "#FFFF7F"])
			}
		}
	}

  // const selectedCount = selectedLayers.length

  // console.log(selectedLayers)

  // if (selectedCount === 0) {
  //   context.document.showMessage('No layers are selected.')
  // } else {
  //   context.document.showMessage(`${selectedCount} layers change selected.`)
  // }
}