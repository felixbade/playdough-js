class Matrix {
    constructor(matrix) {
        this.matrix = matrix || [[1, 0, 0], [0, 1, 0], [0, 0, 1]];  // Initialized with identity matrix
    }

    duplicate() {
        const result = new Matrix();
        result.matrix = this.matrix.map(row => row.slice());
        return result;
    }

    multiplyRaw(other) {
        let result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    result[i][j] += this.matrix[i][k] * other.matrix[k][j];
                }
            }
        }

        return result;
    }

    multiply(other) {
        const result = this.multiplyRaw(other);
        return new Transform(result);
    }

    update(other) {
        this.matrix = this.multiplyRaw(other);
    }

    toString() {
        return `matrix(${this.matrix[0][0]}, ${this.matrix[1][0]}, ${this.matrix[0][1]}, ${this.matrix[1][1]}, ${this.matrix[0][2]}, ${this.matrix[1][2]})`;
    }
}


export class Translate extends Matrix {
    constructor(x, y) {
        super([[1, 0, x], [0, 1, y], [0, 0, 1]]);
    }

    duplicate() {
        return new Translate(this.x, this.y);
    }

    set x(x) {
        this.matrix[0][2] = x;
    }

    get x() {
        return this.matrix[0][2];
    }

    set y(y) {
        this.matrix[1][2] = y;
    }

    get y() {
        return this.matrix[1][2];
    }
}

class Scale extends Matrix {
    constructor(factor) {
        super([[factor, 0, 0], [0, factor, 0], [0, 0, 1]]);
    }
}

class Rotate extends Matrix {
    constructor(angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        super([[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]]);
    }
}

class StretchHorizontal extends Matrix {
    // determinant is 1
    constructor(amount) {
        super([[Math.sqrt(amount), 0, 0], [0, 1 / Math.sqrt(amount), 0], [0, 0, 1]]);
    }
}

export class Transform {
    constructor() {
        this.scale = 1
        this.translate = new Translate(0, 0)
        this.rotationValue = 0
        this.stretchAmount = 1
        this.stretchAngleValue = 0
    }

    duplicate() {
        const result = new Transform();
        result.scale = this.scale;
        result.translate = this.translate.duplicate();
        result.rotationValue = this.rotationValue;
        result.stretchAmount = this.stretchAmount;
        result.stretchAngleValue = this.stretchAngleValue;
        return result;
    }

    get matrix() {
        let matrix = new Matrix();
        matrix.update(this.translate);
        matrix.update(new Scale(this.scale));
        matrix.update(new Rotate(this.rotationValue));
        matrix.update(new Rotate(this.stretchAngleValue));
        matrix.update(new StretchHorizontal(this.stretchAmount));
        matrix.update(new Rotate(-this.stretchAngleValue));
        return matrix
    }

    toString() {
        return this.matrix.toString()
    }

    set translation(translation) {
        this.translate = translation
    }

    get translation() {
        return this.translate
    }

    set scaling(scaling) {
        this.scale = scaling
    }

    set rotation(rotation) {
        this.rotationValue = rotation
    }

    set stretch(stretchAmount) {
        this.stretchAmount = stretchAmount
    }

    set stretchAngle(stretchAngle) {
        this.stretchAngleValue = stretchAngle
    }

}