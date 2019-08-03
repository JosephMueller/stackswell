export default class Utils {

    static deep_clone(object) {
        return JSON.parse(JSON.stringify(object));
    }

}