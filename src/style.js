export class Style {
    constructor() {
        this._attributes = {};
    }

    duplicate() {
        const result = new Style();
        result._attributes = Object.assign({}, this._attributes);
        return result;
    }

    // setter for fill property
    // this.fill = 'red';
    set fill(color) {
        this._attributes.fill = color;
    }

    set stroke(color) {
        this._attributes.stroke = color;
    }

    set strokeWidth(width) {
        this._attributes['stroke-width'] = width;
    }

    set linecap(cap) {
        this._attributes['stroke-linecap'] = cap;
    }

    set linejoin(join) {
        this._attributes['stroke-linejoin'] = join;
    }

    set dasharray(array) {
        this._attributes['stroke-dasharray'] = array;
    }

    set dashoffset(offset) {
        this._attributes['stroke-dashoffset'] = offset;
    }

    set miterlimit(limit) {
        this._attributes['stroke-miterlimit'] = limit;
    }

    toString() {
        let result = '';
        for (let key in this._attributes) {
            result += `${key}: ${this._attributes[key]};`;
        }
        return result;
    }
}