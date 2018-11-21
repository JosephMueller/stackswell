export default class UI {

    static createTextField(view, settings) {
        var textField = NSTextField.alloc().initWithFrame(NSMakeRect(
                settings.x,
                settings.y,
                settings.width,
                settings.height
        ));

        let value;
        if (settings.isNumber) {
            const numberFormatter = NSNumberFormatter.new();
            numberFormatter.numberStyle = NSNumberFormatterDecimalStyle;
            value = numberFormatter.stringFromNumber(NSNumber.numberWithDouble(NSString.alloc().initWithString(settings.initValue).doubleValue()));
        } else {
            value = settings.initValue;
        }
        textField.setStringValue(value);

        view.addSubview(textField);

        return textField;
    }

    static createLabel(view, settings) {
        var fontSize = settings.fontSize === undefined ? 11 : settings.fontSize;

        var label = NSTextField.alloc().initWithFrame(NSMakeRect(
                settings.x,
                settings.y,
                settings.width,
                settings.height
        ));
        label.setEditable_(false);
        label.setSelectable_(false);
        label.setBezeled_(false);
        label.setDrawsBackground_(false);
        // label.setFont(NSFont.systemFontOfSize_(fontSize));
        label.setStringValue(settings.message);
        view.addSubview(label);

        return label;
    }

    static createDropdown(view, settings) {
        // Creating the input
        var popup = NSPopUpButton.alloc();

        var dropdown = popup.initWithFrame(NSMakeRect(
                settings.x,
                settings.y,
                settings.width,
                settings.height
        ));

        let selectedIndex = 0;
        settings.options.forEach((option, index) => {
            dropdown.addItemWithTitle(option);
            if (settings.selected_option == option) {
                selectedIndex = index;
            }
        });
        dropdown.selectItemAtIndex(selectedIndex);

        // Adding the PopUpButton to the dialog
        view.addSubview(dropdown);

        return dropdown;
    }

    static createCheckBox(view, settings) {
        // Creating the input
        var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(
                settings.x,
                settings.y,
                settings.width,
                settings.height
        ));

        // Setting the options for the checkbox
        checkbox.setButtonType(NSSwitchButton);
        checkbox.setBezelStyle(0);
        if (settings.message !== undefined) {
            checkbox.setTitle(settings.message);
        }
        checkbox.setState(settings.enabled ? NSOnState : NSOffState);

        view.addSubview(checkbox);

        return checkbox;
    }

    static build_dialog(title, primaryButtonTitle, secondaryButtonTitle = undefined) {
        const dialog = COSAlertWindow.new();

        dialog.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon2x.png").path()));
        dialog.setMessageText(title);

        dialog.addButtonWithTitle(primaryButtonTitle);
        if (secondaryButtonTitle !== undefined) {
            dialog.addButtonWithTitle("Cancel");
        }
        return dialog;
    }

    static build_accessory_view(width, height, dialog) {
        const view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, height));
        dialog.addAccessoryView(view);
        return view;
    }

}