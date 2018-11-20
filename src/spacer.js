export default class Spacer {

    constructor(window_height, line_height) {
        this.wh = window_height,
        this.lh = line_height;
    }

    nextLine(line_height = undefined) {
        // returns the y coordinate for the next line
        if (line_height !== undefined) {
            this.wh -= line_height;
        } else {
            this.wh -= this.lh;
        }
        return this.wh;
    }
}