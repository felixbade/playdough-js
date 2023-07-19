import { Transform, Translate, Scale, Rotate, SkewX, SkewY } from './transform.js';
export { Transform, Translate, Scale, Rotate, SkewX, SkewY };

import { Shape, Circle } from './shape.js';
export { Shape, Circle };

import { Style } from './style.js';
export { Style };

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

        // Pointer position
        // initial is in the middle of the svg
        this._pointerX = this.svg.clientWidth / 2;
        this._pointerY = this.svg.clientHeight / 2;
        this._mouseDown = false;

        window.addEventListener('mousemove', (event) => {
            this._pointerX = event.clientX;
            this._pointerY = event.clientY;
        });

        window.addEventListener('mousedown', () => {
            this._mouseDown = true;
        });

        window.addEventListener('mouseup', () => {
            this._mouseDown = false;
        });

        this.onRedraw = () => {};
        this.doRedraw();
    }

    doRedraw() {
        this.onRedraw();
        window.requestAnimationFrame(() => this.doRedraw());
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

    add(shape) {
        this.svg.appendChild(shape.element);
    }

    get pointer() {
        // return mouse position in svg coordinates
        const point = this.svg.createSVGPoint();
        point.x = this._pointerX;
        point.y = this._pointerY;
        return point.matrixTransform(this.svg.getScreenCTM().inverse());
    }

    get mouseDown() {
        return this._mouseDown;
    }
}