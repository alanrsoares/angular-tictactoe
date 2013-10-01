'use strict';

function TicTacToeCtrl($scope) {

    var newBoard = function () {

        var rows = new Array(3);

        for (var i = 0; i < 3; i++) {

            var cells = rows[i] = new Array(3);

            for (var j = 0; j < 3; j++) {
                cells[j] = { position: { x: i, y: j }, value: "" };
            }
        }

        console.log(rows);

        return rows;
    };

    var switchPlayer = function () {
        var player = $scope.player;
        return player === "X" ? "O" : "X";
    };

    var resolveStreak = function (streak) {

        if (streak[0].value !== "" &&
            streak[0].value === streak[1].value &&
            streak[1].value === streak[2].value) {
            return streak[0].value;
        }

        return null;
    };

    var resolveDiagonals = function () {

        var set = new Array(2);

        for (var i = 0; i < 2; i++) {

            set[i] = new Array(2);

            var x = 2, y = 0;

            for (var j = 0; j < 3; j++) {
                if (i === 0) {
                    set[i][j] = $scope.rows[j][j];
                } else {
                    set[i][j] = $scope.rows[x][y];
                    x--;
                    y++;
                }
            }
        }

        for (var k = 0; k < 2; k++) {

            var solved = resolveStreak(set[k]);

            if (solved) return solved;
        }

        return null;
    };

    var resolveLines = function () {

        var set = new Array(3);

        for (var i = 0; i < 3; i++) {

            set[i] = new Array(3);

            for (var j = 0; j < 3; j++) {
                set[i][j] = $scope.rows[i][j];
            }
        }

        for (var k = 0; k < 3; k++) {
            var solved = resolveStreak(set[k]);

            if (solved) return solved;
        }

        return null;
    };

    var resolveColumns = function () {

        var set = new Array(3);

        for (var i = 0; i < 3; i++) {

            set[i] = new Array(3);

            for (var j = 0; j < 3; j++) {
                set[i][j] = $scope.rows[j][i];
            }
        }

        for (var k = 0; k < 3; k++) {
            var solved = resolveStreak(set[k]);

            if (solved) return solved;
        }

        return null;
    };

    var getWinner = function () {

        switch (true) {
            case (resolveDiagonals() != null):
                return resolveDiagonals();
            case (resolveLines() != null):
                return resolveLines();
            case (resolveColumns() != null):
                return resolveColumns();
            default:
                return null;
        }
    };

    var tryToCalculateWinner = function () {
        $scope.winner = getWinner();
    };

    $scope.player = switchPlayer();

    $scope.resetBoard = function () {
        $scope.rows = newBoard();
        $scope.winner = null;
    };

    $scope.resetBoard();

    $scope.cellClick = function (cell) {

        if (!$scope.winner) {
            cell.value = $scope.player;
            $scope.player = switchPlayer();
            tryToCalculateWinner();
        }

    };
}