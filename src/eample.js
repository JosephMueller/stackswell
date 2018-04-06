// This contains all the code to create a fully functional dialog window with text input, radio buttons, checkboxes, dropdowns ... 

var doc, page, app, layer, layers, layerCount, userDefaults;

//Input variables
var horizontalInput;
var verticalInput;
var opacityInput;
var rotationInput;
var randomSizeInput;
var flipInput;
var matrixFormat;

function initVars(context) {
  doc = context.document;

  app = [NSApplication sharedApplication];
  userDefaults = NSUserDefaults.alloc().initWithSuiteName("com.yummygum.sketch.confetti");


}


function getInputFromUser(context){
  // Create and show dialog window

  var window = createWindow(context);
  var alert = window[0];

  var response = alert.runModal()

  if(response == "1000"){
    // This code only runs when the user clicks 'OK';


    // The user entered some input in the dialog window and closed it.
    // We should save the preferences of the user so the user doesn't have to
    // re-enter them when running the plugin for a second time.

    // Save horizontal textfield
    horizontalInput = horizontalTextField.stringValue();
    [userDefaults setObject:horizontalInput forKey:"horizontalInput"]; // Save to user defaults

    // Save vertical textfield
    verticalInput = verticalTextField.stringValue();
    [userDefaults setObject:verticalInput forKey:"verticalInput"]; // Save to user defaults

    // Save opacity dropdown
    opacityInput = opacityCheckbox.stringValue();
    [userDefaults setObject:opacityInput forKey:"opacityInput"]; // Save to user defaults

    // Save rotation dropdown
    rotationInput = rotationCheckbox.stringValue();
    [userDefaults setObject:rotationInput forKey:"rotationInput"]; // Save to user defaults

    // Save random size dropdown
    randomSizeInput = randomSizeCheckbox.stringValue();
    [userDefaults setObject:randomSizeInput forKey:"randomSizeInput"]; // Save to user defaults

    // Save flip size checkbox
    flipInput = flipDropdown.indexOfSelectedItem();
    [userDefaults setObject:flipInput forKey:"flipInput"];

    // Save radio button
    rdbInput = matrixFormat.cells().indexOfObject(matrixFormat.selectedCell());


    // Save to user defaults
    userDefaults.synchronize(); // save

    return true;
  } else {
    return false;
  }

}

function createWindow(context) {
  initVars(context);

  // Setup the window
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


  // Create labels
  var infoLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 33, (viewWidth - 100), 35));
  var horizontalLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 65, (viewWidth / 2) - 10, 20));
  var verticalLabel = NSTextField.alloc().initWithFrame(NSMakeRect(140, viewHeight - 65, (viewWidth / 2) - 10, 20));
  var flipLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 210, (viewWidth - 100), 20));


  // Configure labels
  infoLabel.setStringValue("Your confetti is distributed in a grid. Setup your grid to get the results you're looking for.");
  infoLabel.setSelectable(false);
  infoLabel.setEditable(false);
  infoLabel.setBezeled(false);
  infoLabel.setDrawsBackground(false);

  horizontalLabel.setStringValue("Columns ↔");
  horizontalLabel.setSelectable(false);
  horizontalLabel.setEditable(false);
  horizontalLabel.setBezeled(false);
  horizontalLabel.setDrawsBackground(false);

  verticalLabel.setStringValue("Rows ↕");
  verticalLabel.setSelectable(false);
  verticalLabel.setEditable(false);
  verticalLabel.setBezeled(false);
  verticalLabel.setDrawsBackground(false);

  flipLabel.setStringValue("Flip shapes: ");
  flipLabel.setSelectable(false);
  flipLabel.setEditable(false);
  flipLabel.setBezeled(false);
  flipLabel.setDrawsBackground(false);


  // Add labels
  view.addSubview(infoLabel);
  view.addSubview(horizontalLabel);
  view.addSubview(verticalLabel);
  view.addSubview(flipLabel);


  // Create textfields
  horizontalTextField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 85, 130, 20));
  verticalTextField = NSTextField.alloc().initWithFrame(NSMakeRect(140, viewHeight - 85, 130, 20));

  // Optional: Make TAB key work to switch between textfields
  [horizontalTextField setNextKeyView:verticalTextField];

  // Add textfields
  view.addSubview(horizontalTextField);
  view.addSubview(verticalTextField);



  // Create checkboxes
  opacityCheckbox = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - 125, viewWidth - viewSpacer, 20));
  randomSizeCheckbox = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - 150, (viewWidth / 2) - viewSpacer, 20));
  rotationCheckbox = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - 175, (viewWidth / 2) - viewSpacer, 20));

  // Configure checkboxes

  opacityCheckbox.setButtonType(NSSwitchButton);
  opacityCheckbox.setBezelStyle(0);
  opacityCheckbox.setTitle("Randomize opacity (70% - 100%)");
  opacityCheckbox.setState(getOpacityValue(context));

  rotationCheckbox.setButtonType(NSSwitchButton);
  rotationCheckbox.setBezelStyle(0);
  rotationCheckbox.setTitle("Randomize rotation");
  rotationCheckbox.setState(getRotationValue(context));

  randomSizeCheckbox.setButtonType(NSSwitchButton);
  randomSizeCheckbox.setBezelStyle(0);
  randomSizeCheckbox.setTitle("Randomize size");
  randomSizeCheckbox.setState(getRandomSizeValue(context));

  // Add checkboxes
  view.addSubview(opacityCheckbox);
  view.addSubview(rotationCheckbox);
  view.addSubview(randomSizeCheckbox);



  // Create dropdown
  flipDropdown = NSPopUpButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - 230, (viewWidth / 2) + 10 - viewSpacer, 22));

  // Configure dropdown
  [flipDropdown addItemWithTitle:"No flip"];
  [flipDropdown addItemWithTitle:"Horizontal flip"];
  [flipDropdown addItemWithTitle:"Vertical flip"];
  [flipDropdown addItemWithTitle:"Horizontal and Vertical flip"];

  // //Set default selected value (conform to saved user preference)
  var flipDropdownSelectionIndex = getFlipValue(context);
  //[flipDropdown selectItemAtIndex:flipDropdownSelectionIndex];
  flipDropdown.selectItemAtIndex(2);

  // Add dropdown
  view.addSubview(flipDropdown);

  // Create radiobuttons prototype
  var buttonFormat;
  buttonFormat = NSButtonCell.alloc().init();
  buttonFormat.setButtonType(NSRadioButton);

  // Create and configure matrix for radio buttons
  matrixFormat = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
            NSMakeRect(0, viewHeight - 290, 400, 50),
            NSRadioModeMatrix,
            buttonFormat,
            1,
            3
        );

  matrixFormat.setCellSize(CGSizeMake(100, 25));

  var cells = matrixFormat.cells();
              cells.objectAtIndex(0).setTitle("Horizontal");
              cells.objectAtIndex(1).setTitle("Vertical");
              cells.objectAtIndex(2).setTitle("Both");

  [matrixFormat selectCellAtRow: 0 column: 2]; // zero based

  // Add matrix
  view.addSubview(matrixFormat);


  // Show the dialog window
  return [alert];
}



function getHorizontalValue(context){
  // Gets and returns saved setting
  // If there is no saved setting, return default

  var horizontalValue = userDefaults.objectForKey("horizontalInput");

  if(horizontalValue != undefined){
    return horizontalValue

  } else {
    return "4" // Default value
  }

}

function getVerticalValue(context){
  // Gets and returns saved setting
  // If there is no saved setting, return default

  var verticalValue = userDefaults.objectForKey("verticalInput");

  if(verticalValue != undefined){
    return verticalValue

  } else {
    return "3" // Default value
  }

}

function getOpacityValue(context){
  // Gets and returns saved setting
  // If there is no saved setting, return default

  var opacityInput = userDefaults.objectForKey("opacityInput");

  var state = NSOffState; // default

  if(opacityInput != undefined){


    if(opacityInput == 0){
      state = NSOffState;
    }

    if(opacityInput == 1){
      state = NSOnState;
    }

  }


  return state;

}

function getRotationValue(context){
  // Gets and returns saved setting
  // If there is no saved setting, return default

  var rotationValue = userDefaults.objectForKey("rotationInput");

  var state = NSOffState; // default

  if(rotationValue != undefined){


    if(rotationValue == 0){
      state = NSOffState;
    }

    if(rotationValue == 1){
      state = NSOnState;
    }

  }

  return state;

}

function getRandomSizeValue(context){
  // Gets and returns saved setting
  // If there is no saved setting, return default

  var randomSizeValue = userDefaults.objectForKey("randomSizeInput");

  var state = NSOffState; // default

  if(randomSizeValue != undefined){

    if(randomSizeValue == 0){
      state = NSOffState;
    }

  if(randomSizeValue == 1){
      state = NSOnState;
    }

  }

  return state;

}

function getFlipValue(context){
  // Gets and returns saved setting
  // If there is no saved setting, return default

  var flipValue = userDefaults.objectForKey("flipInput");

  var selectionIndex = 0; // Default value

  if(flipValue != undefined){
    // Index is equal to stored user preference value
    selectionIndex = flipValue;
  }

  return selectionIndex;


}

function settings(context){
  // Display settings window

  // Create and show dialog window

  var window = createWindow(context);
  var alert = window[0];

  var response = alert.runModal()

  if(response == "1000"){
    // This code only runs when the user clicks 'Ok';

    // Save user input to user preferences

    // The user entered some input in the dialog window and closed it.
    // We should save the preferences of the user so the user doesn't have to
    // re-enter them when running the plugin for a second time.

    // Save horizontal textfield
    horizontalInput = horizontalTextField.stringValue();
    [userDefaults setObject:horizontalInput forKey:"horizontalInput"]; // Save to user defaults

    // Save vertical textfield
    verticalInput = verticalTextField.stringValue();
    [userDefaults setObject:verticalInput forKey:"verticalInput"]; // Save to user defaults

    // Save opacity dropdown
    opacityInput = opacityCheckbox.stringValue();
    [userDefaults setObject:opacityInput forKey:"opacityInput"]; // Save to user defaults

    // Save rotation dropdown
    rotationInput = rotationCheckbox.stringValue();
    [userDefaults setObject:rotationInput forKey:"rotationInput"]; // Save to user defaults

    // Save random size dropdown
    randomSizeInput = randomSizeCheckbox.stringValue();
    [userDefaults setObject:randomSizeInput forKey:"randomSizeInput"]; // Save to user defaults

    // Save flip size checkbox
    flipInput = flipDropdown.indexOfSelectedItem();
    [userDefaults setObject:flipInput forKey:"flipInput"];

    // Save radio button
    rdbInput = matrixFormat.cells().indexOfObject(matrixFormat.selectedCell());


    // Save to user defaults
    userDefaults.synchronize(); // save


    return true;

  }




}