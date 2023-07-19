import { Transform, Translate, Scale, Rotate, SkewX, SkewY } from './transform.js';

export class Shape {
    constructor(elementName) {
        this._element = document.createElementNS('http://www.w3.org/2000/svg', elementName);
        this._transform = new Transform();
    }

    createElement() {
        const element = this._element.cloneNode(true); // deep clone
        element.setAttribute('transform', this._transform.toString());
        return element;
    }

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
}

export class Circle extends Shape {
    constructor(radius) {
        super('circle');
        this._element.setAttribute('r', radius);
    }
}