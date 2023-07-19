class Matrix {
    constructor(matrix) {
        this.matrix = matrix || [[1, 0, 0], [0, 1, 0], [0, 0, 1]];  // Initialized with identity matrix
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


class Translate extends Matrix {
    constructor(x, y) {
        super([[1, 0, x], [0, 1, y], [0, 0, 1]]);
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
        this.scale = new Scale(1)
        this.translate = new Translate(0, 0)
        this.rotationValue = 0
        this.stretchHorizontal = 1
        this.stretchDiagonal = 1
    }

    get matrix() {
        const logStretchHorizontal = Math.log(this.stretchHorizontal)
        const logStretchDiagonal = Math.log(this.stretchDiagonal)
        const sqLogStretchHorizontal = Math.pow(logStretchHorizontal, 2)
        const sqLogStretchDiagonal = Math.pow(logStretchDiagonal, 2)
        const logStretchAmount = Math.sqrt(sqLogStretchHorizontal + sqLogStretchDiagonal)
        const stretchAmount = Math.exp(logStretchAmount)
        // Divide by 2 because diagonal and orthogonal
        // Full cycle is 180 degrees
        const stretchAngle = Math.atan2(logStretchDiagonal, logStretchHorizontal) / 2

        let matrix = new Matrix();
        matrix.update(this.translate);
        matrix.update(this.scale);
        matrix.update(new Rotate(this.rotationValue));
        matrix.update(new Rotate(stretchAngle));
        matrix.update(new StretchHorizontal(stretchAmount));
        matrix.update(new Rotate(-stretchAngle));
        return matrix
    }

    toString() {
        return this.matrix.toString()
    }

    set translation(translation) {
        this.translate = new Translate(translation.x, translation.y)
    }

    set scaling(scaling) {
        this.scale = new Scale(scaling)
    }

    set horizontalStretch(horizontalStretch) {
        this.stretchHorizontal = horizontalStretch
    }

    set diagonalStretch(diagonalStretch) {
        this.stretchDiagonal = diagonalStretch
    }

    set rotation(rotation) {
        this.rotationValue = rotation
    }

}