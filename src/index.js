import { Transform, Translate, Scale, Rotate, SkewX, SkewY } from './transform.js';
export { Transform, Translate, Scale, Rotate, SkewX, SkewY };

export class Playdough {
    constructor(parent = document.body) {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        // Set inline styles
        this.svg.style.display = 'block';
        this.svg.style.width = '100%';
        this.svg.style.height = '100%';
        this.svg.style.position = 'absolute';
        this.svg.style.margin = "0";
        this.svg.style.padding = "0";

        parent.appendChild(this.svg);
        this.updateViewBox();

        window.addEventListener('resize', () => this.updateViewBox());
    }

    updateViewBox() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const svgHeight = 1000;
        const svgWidth = (svgHeight * width) / height;
        const xMidPoint = svgWidth / 2;
        const yMidPoint = svgHeight / 2;
        this.svg.setAttribute('viewBox', `${-xMidPoint} ${-yMidPoint} ${svgWidth} ${svgHeight}`);
    }

    draw(shape) {
        this.svg.appendChild(shape.getElement());
    }
}


export class Shape {
    constructor() {
        this.transform = new Transform();
    }

    translate(x, y) {
        this.transform.update(new Translate(x, y));
        this.updateTransform();
    }

    scale(factor) {
        this.transform.update(new Scale(factor));
        this.updateTransform();
    }

    rotate(angle) {
        this.transform.update(new Rotate(angle));
        this.updateTransform();
    }

    skewX(amount) {
        this.transform.update(new SkewX(amount));
        this.updateTransform();
    }

    skewY(amount) {
        this.transform.update(new SkewY(amount));
        this.updateTransform();
    }

    updateTransform() {
        this.element.setAttribute('transform', this.transform.toString());
    }
}

export class Circle extends Shape {
    constructor(radius) {
        super();
        this.element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.element.setAttribute('r', radius);
        this.element.setAttribute('fill', 'black');
    }

    getElement() {
        return this.element;
    }
}
