export class Transform {
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

    // return transform in svg format
    toString() {
        return `matrix(${this.matrix[0][0]}, ${this.matrix[1][0]}, ${this.matrix[0][1]}, ${this.matrix[1][1]}, ${this.matrix[0][2]}, ${this.matrix[1][2]})`;
    }
}

export class Translate extends Transform {
    constructor(x, y) {
        super([[1, 0, x], [0, 1, y], [0, 0, 1]]);
    }
}

export class Scale extends Transform {
    constructor(factorX, factorY) {
        // if only one factor is given, scale uniformly
        if (factorY === undefined) {
            factorY = factorX;
        }
        super([[factorX, 0, 0], [0, factorY, 0], [0, 0, 1]]);
    }
}

export class Rotate extends Transform {
    constructor(angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        super([[cos, -sin, 0], [sin, cos, 0], [0, 0, 1]]);
    }
}

export class SkewX extends Transform {
    constructor(amount) {
        super([[1, 0, 0], [amount, 1, 0], [0, 0, 1]]);
    }
}

export class SkewY extends Transform {
    constructor(amount) {
        super([[1, amount, 0], [0, 1, 0], [0, 0, 1]]);
    }
}