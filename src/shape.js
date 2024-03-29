import { Transform } from './transform.js';
import { Style } from './style.js';

export class Shape {
    constructor(elementName) {
        this._element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
        this._transform = new Transform();
        this._style = new Style();
        this._style.fill = 'black';
    }

    duplicate() {
        const result = new Shape(this._element.tagName);
        result._element = this._element.cloneNode(true);
        result._transform = this._transform.duplicate();
        result._style = this._style.duplicate();
        result.updateTransform();
        result.updateStyle();
        return result;
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

    get transform() {
        return this._transform;
    }

    set translation(translation) {
        this._transform.translation = translation;
        this.updateTransform();
    }

    get translation() {
        return this._transform.translation;
    }

    set scaling(scaling) {
        this._transform.scaling = scaling;
        this.updateTransform();
    }

    set rotation(rotation) {
        this._transform.rotation = rotation;
        this.updateTransform();
    }

    set stretch(stretch) {
        this._transform.stretch = stretch;
        this.updateTransform();
    }

    set stretchAngle(angle) {
        this._transform.stretchAngle = angle;
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
        if (!color) {
            color = 'none';
        }
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
    constructor(diameter) {
        super('circle');
        this._element.setAttribute('r', diameter / 2);
    }

    set r(radius) {
        this._element.setAttribute('r', radius);
    }

    get r() {
        return this._element.getAttribute('r');
    }

    set d(diameter) {
        this._element.setAttribute('r', diameter / 2);
    }

    get d() {
        return this._element.getAttribute('r') * 2;
    }
}

export class Square extends Shape {
    constructor(length) {
        super('rect');
        this.size = length;
    }

    set size(length) {
        this._element.setAttribute('x', -length/2);
        this._element.setAttribute('y', -length/2);
        this._element.setAttribute('width', length);
        this._element.setAttribute('height', length);
    }

    get size() {
        return this._element.getAttribute('width');
    }
}

export class Container extends Shape {
    constructor() {
        super('g');
    }

    add(shape) {
        this.element.appendChild(shape.element);
    }
}