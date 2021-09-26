// Return a square matrix of [n * n] dimension with c value on diagonal and 0 elsewhere
function matrix_diag(c, n) {
    var i, j, Z = Array(n * n);
    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            Z[j * n + i] = 0;
    for (i = 0; i < n; i++)
        Z[i * n + i] = c;
    return Z;
}
;
// Transpose a matrix X  of [n * m] dimension in [m * n] dimension matrix
function matrix_transpose(X, n, m) {
    var i, j, Z = Array(m * n);
    for (i = 0; i < n; i++)
        for (j = 0; j < m; j++)
            Z[j * n + i] = X[i * m + j];
    return Z;
}
;
// All element of [n * m] matrix are multiplied by value c
function matrix_scale(X, c, n, m) {
    var i, j;
    for (i = 0; i < n; i++)
        for (j = 0; j < m; j++)
            X[i * m + j] *= c;
}
;
// Add 2  [n * m] matrix X and Y 
function matrix_add(X, Y, n, m) {
    var i, j, Z = Array(n * m);
    for (i = 0; i < n; i++)
        for (j = 0; j < m; j++)
            Z[i * m + j] = X[i * m + j] + Y[i * m + j];
    return Z;
}
;
// Naive matrix multiplication [n * m] * [m* p] = [n * p] matrix
function matrix_multiply(X, Y, n, m, p) {
    var i, j, k, Z = Array(n * p);
    for (i = 0; i < n; i++) {
        for (j = 0; j < p; j++) {
            Z[i * p + j] = 0;
            for (k = 0; k < m; k++)
                Z[i * p + j] += X[i * m + k] * Y[k * p + j];
        }
    }
    return Z;
}
;
// Cholesky decomposition
function matrix_chol(X, n) {
    var i, j, k, p = Array(n);
    for (i = 0; i < n; i++)
        p[i] = X[i * n + i];
    for (i = 0; i < n; i++) {
        for (j = 0; j < i; j++)
            p[i] -= X[i * n + j] * X[i * n + j];
        if (p[i] <= 0)
            return false;
        p[i] = Math.sqrt(p[i]);
        for (j = i + 1; j < n; j++) {
            for (k = 0; k < i; k++)
                X[j * n + i] -= X[j * n + k] * X[i * n + k];
            X[j * n + i] /= p[i];
        }
    }
    for (i = 0; i < n; i++)
        X[i * n + i] = p[i];
    return true;
}
;
// Inversion of cholesky decomposition
function matrix_chol2inv(X, n) {
    var i, j, k, sum;
    for (i = 0; i < n; i++) {
        X[i * n + i] = 1 / X[i * n + i];
        for (j = i + 1; j < n; j++) {
            sum = 0;
            for (k = i; k < j; k++)
                sum -= X[j * n + k] * X[k * n + i];
            X[j * n + i] = sum / X[j * n + j];
        }
    }
    for (i = 0; i < n; i++)
        for (j = i + 1; j < n; j++)
            X[i * n + j] = 0;
    for (i = 0; i < n; i++) {
        X[i * n + i] *= X[i * n + i];
        for (k = i + 1; k < n; k++)
            X[i * n + i] += X[k * n + i] * X[k * n + i];
        for (j = i + 1; j < n; j++)
            for (k = j; k < n; k++)
                X[i * n + j] += X[k * n + i] * X[k * n + j];
    }
    for (i = 0; i < n; i++)
        for (j = 0; j < i; j++)
            X[i * n + j] = X[j * n + i];
}
;
// Inversion via gauss-jordan elimination
function matrix_solve(X, n) {
    var m = n;
    var b = Array(n * n);
    var indxc = Array(n);
    var indxr = Array(n);
    var ipiv = Array(n);
    var i, icol, irow, j, k, l, ll;
    var big, dum, pivinv, temp;
    irow = 0;
    icol = 0;
    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++) {
            if (i == j)
                b[i * n + j] = 1;
            else
                b[i * n + j] = 0;
        }
    for (j = 0; j < n; j++)
        ipiv[j] = 0;
    for (i = 0; i < n; i++) {
        big = 0;
        for (j = 0; j < n; j++) {
            if (ipiv[j] != 1) {
                for (k = 0; k < n; k++) {
                    if (ipiv[k] == 0) {
                        if (Math.abs(X[j * n + k]) >= big) {
                            big = Math.abs(X[j * n + k]);
                            irow = j;
                            icol = k;
                        }
                    }
                }
            }
        }
        ++(ipiv[icol]);
        if (irow != icol) {
            for (l = 0; l < n; l++) {
                temp = X[irow * n + l];
                X[irow * n + l] = X[icol * n + l];
                X[icol * n + l] = temp;
            }
            for (l = 0; l < m; l++) {
                temp = b[irow * n + l];
                b[irow * n + l] = b[icol * n + l];
                b[icol * n + l] = temp;
            }
        }
        indxr[i] = irow;
        indxc[i] = icol;
        if (X[icol * n + icol] == 0)
            return false; // Singular
        pivinv = 1 / X[icol * n + icol];
        X[icol * n + icol] = 1;
        for (l = 0; l < n; l++)
            X[icol * n + l] *= pivinv;
        for (l = 0; l < m; l++)
            b[icol * n + l] *= pivinv;
        for (ll = 0; ll < n; ll++) {
            if (ll != icol) {
                dum = X[ll * n + icol];
                X[ll * n + icol] = 0;
                for (l = 0; l < n; l++)
                    X[ll * n + l] -= X[icol * n + l] * dum;
                for (l = 0; l < m; l++)
                    b[ll * n + l] -= b[icol * n + l] * dum;
            }
        }
    }
    for (l = (n - 1); l >= 0; l--)
        if (indxr[l] != indxc[l]) {
            for (k = 0; k < n; k++) {
                temp = X[k * n + indxr[l]];
                X[k * n + indxr[l]] = X[k * n + indxc[l]];
                X[k * n + indxc[l]] = temp;
            }
        }
    return true;
}

//# sourceMappingURL=../maps/matrix/matrix.js.map
