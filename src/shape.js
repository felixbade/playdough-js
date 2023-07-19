import { Transform, Translate, Scale, Rotate, SkewX, SkewY } from './transform.js';
import { Style } from './style.js';

export class Shape {
    constructor(elementName) {
        this._element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
        this._transform = new Transform();
        this._style = new Style();
        this._style.fill = 'black';
    }

    updateStyle() {
        this._element.setAttribute('style', this._style.toString());
    }

    updateTransform() {
        this._element.setAttribute('transform', this._transform.toString());
    }

    get element() {
        return this._element
    }

    // Transforms

    translate(x, y) {
        this._transform.update(new Translate(x, y));
        this.updateTransform();
    }

    set translation(translation) {
        this._transform.translation = translation;
        this.updateTransform();
    }

    scale(factor) {
        this._transform.update(new Scale(factor));
        this.updateTransform();
    }

    rotate(angle) {
        this._transform.update(new Rotate(angle));
        this.updateTransform();
    }

    skewX(amount) {
        this._transform.update(new SkewX(amount));
        this.updateTransform();
    }

    skewY(amount) {
        this._transform.update(new SkewY(amount));
        this.updateTransform();
    }

    // Style

    set style(style) {
        this._style = style;
        this.updateStyle();
    }

    get style() {
        return this._style;
    }

    set fill(color) {
        this._style.fill = color;
        this.updateStyle();
    }

    set stroke(color) {
        this._style.stroke = color;
        this.updateStyle();
    }

    set strokeWidth(width) {
        this._style.strokeWidth = width;
        this.updateStyle();
    }

    set linecap(cap) {
        this._style.linecap = cap;
        this.updateStyle();
    }

    set linejoin(join) {
        this._style.linejoin = join;
        this.updateStyle();
    }

    set dasharray(array) {
        this._style.dasharray = array;
        this.updateStyle();
    }

    set dashoffset(offset) {
        this._style.dashoffset = offset;
        this.updateStyle();
    }

    set miterlimit(limit) {
        this._style.miterlimit = limit;
        this.updateStyle();
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