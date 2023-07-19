import { Transform, Translate, Scale, Rotate, SkewX, SkewY } from './transform.js';
import { Style } from './style.js';

export class Shape {
    constructor(elementName) {
        this._element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
        this._transform = new Transform();
        this._style = new Style();
        this._style.fill = 'black';
    }

    get element() {
        this._element.setAttribute('transform', this._transform.toString());
        this._element.setAttribute('style', this._style.toString());
        return this._element
    }

    // Transforms

    translate(x, y) {
        this._transform.update(new Translate(x, y));
    }

    scale(factor) {
        this._transform.update(new Scale(factor));
    }

    rotate(angle) {
        this._transform.update(new Rotate(angle));
    }

    skewX(amount) {
        this._transform.update(new SkewX(amount));
    }

    skewY(amount) {
        this._transform.update(new SkewY(amount));
    }

    // Style

    set style(style) {
        this._style = style;
    }

    get style() {
        return this._style;
    }

    set fill(color) {
        this._style.fill = color;
    }

    set stroke(color) {
        this._style.stroke = color;
    }

    set strokeWidth(width) {
        this._style.strokeWidth = width;
    }

    set linecap(cap) {
        this._style.linecap = cap;
    }

    set linejoin(join) {
        this._style.linejoin = join;
    }

    set dasharray(array) {
        this._style.dasharray = array;
    }

    set dashoffset(offset) {
        this._style.dashoffset = offset;
    }

    set miterlimit(limit) {
        this._style.miterlimit = limit;
    }
}

export class Circle extends Shape {
    constructor(radius) {
        super('circle');
        this._element.setAttribute('r', radius);
    }

    set r(radius) {
        this._element.setAttribute('r', radius);
    }

    get r() {
        return this._element.getAttribute('r');
    }
}