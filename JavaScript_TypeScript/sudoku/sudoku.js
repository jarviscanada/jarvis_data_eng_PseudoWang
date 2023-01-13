function solveSudoku(board) {
    if (!board || !board.length)
        return;
    solve(board);
}
function solve(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === ".") {
                for (var num = 1; num <= 9; num++) {
                    if (isValid(board, i, j, num.toString())) {
                        board[i][j] = num.toString();
                        // recursively solve
                        if (solve(board)) {
                            return true;
                        }
                        else {
                            board[i][j] = ".";
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function isValid(board, row, col, num) {
    for (var i = 0; i < 9; i++) {
        if (board[i][col] !== "." && board[i][col] === num)
            return false;
        if (board[row][i] !== "." && board[row][i] === num)
            return false;
        if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] !== "." &&
            board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === num)
            return false;
    }
    return true;
}
