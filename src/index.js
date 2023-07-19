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

    draw(shape, style) {
        const element = shape.createElement();

        // if no style, use black fill
        if (style) {
            // element.setAttribute('style', style);
        } else {
            element.setAttribute('fill', 'black');
        }

        this.svg.appendChild(element);
    }
}


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
