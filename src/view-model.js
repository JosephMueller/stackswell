export default class ViewModel {

    constructor() {
        this.properties = {};
    }

    addProp(name, value) {
        this.properties[name] = value;
    }

    addPropArray(name, value) {
        if (!(name in this.properties)) {
            this.properties[name] = [];
        }
        this.properties[name].push(value);
    }

    get(value, defaultValue = undefined, options = undefined) {
        options = options || {};
        var prop = this.properties[value] || value;
        var prop_type = prop.class();
        if (prop_type == 'NSPopUpButton') {
            return String(prop.titleOfSelectedItem());
        } else if (prop_type == 'NSTextField' || prop_type == 'NSButton') {
            let val = String(prop.stringValue());
            if (options.is_number) {
                if (isNaN(val)) {
                    return defaultValue;
                }
                const numberFormatter = NSNumberFormatter.new();
                numberFormatter.numberStyle = NSNumberFormatterDecimalStyle;
                const number = numberFormatter.numberFromString(val);
                return String(number.stringValue());
            }
            if (val.trim().length == 0) {
                return defaultValue;
            }
            if (options.placeholder && val == options.placeholder) {
                return "";
            }
            return val;
        } else {
            console.log('unknown prop type ' + prop_type);
        }
    }

    getArray(value, defaultValues = undefined) {
        var props = this.properties[value],
                out = [],
                self = this;

        props.forEach((prop, index) => out.push(self.get(prop, defaultValues !== undefined ? defaultValues[index] : undefined)));

        return out;
    }
}