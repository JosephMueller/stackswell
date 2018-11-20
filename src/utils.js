export default class Utils {

    static deep_clone(object) {
        return JSON.parse(JSON.stringify(object));
    }

    static is_equal(object1, object2) {
        if (object1.constructor === Array && object2.constructor === Array) {
            if (object1.length !== object2.length) {
                return false;
            }
            for (let i = 0; i < object1.length; i++) {
                if (object1[i] != object2[i]) {
                    return false;
                }
            }
            return true;
        } else {
            return object1 == object2;
        }
    }

}