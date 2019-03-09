/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> unselected box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
var time = 0;
var player = "You ";
let turn = 'X';
newValue = 1;


function initializeGrid() {
    var x = 0;
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            x++;
            tempArray.push(-x);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        if (grid[colIdx][rowIdx] < 0) {
            additionalClass += ' unselected';

        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div id = "'+ colIdx + rowIdx + '" colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    document.getElementById(colIdx + rowIdx).classList.remove("unselected");
    if (document.getElementById(colIdx + rowIdx).innerHTML === '') {
        if (newValue == 1) {
            newValue = 2;
        } else {
            newValue = 1;
        }
        grid[colIdx][rowIdx] = newValue;
    }
    renderMainGrid();
    addClickHandlers();
    setTimeout(function() {
        checkWinner();
    }, 10);
    setTimeout(function() {
        if (player == "AI ") {
            var allboxes = document.getElementsByClassName("unselected");
            var aibox = allboxes[Math.round(Math.random() * (allboxes.length))].getAttribute("id");
            document.getElementById(aibox).click();
        }
    }, 1000);
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkWinner() {
    for (var i = 0; i <=2; i++) {
        for (var j = 0; j <=2; j++) {
            if ((grid[i][0] == grid[i][1]) && (grid[i][0] == grid[i][2])) {
                alert(player + 'WON');
                window.location.reload(false);
                return false;
            } else if ((grid[0][i] == grid[1][i]) && (grid[0][i] == grid[2][i])) {
                alert(player + 'WON');
                window.location.reload(false);
                return false;
            } else if ((grid[0][0] == grid[1][1]) && (grid[0][0] == grid[2][2])) {
                alert(player + 'WON');
                window.location.reload(false);
                return false;
            } else if ((grid[2][0] == grid[1][1]) && (grid[2][0] == grid[0][2])) {
                alert(player + 'WON');
                window.location.reload(false);
                return false;
            }
        }
    }    
    
    // TOGGLE player and AI
    if (player == "You ") {
        player = "AI ";
    } else {
        player = "You ";
    }
    time++;
    if (time > 5) {
        checkdraw();
    }
}

function checkdraw() {
    for (var i = 0; i <=2; i++) {
        for (var j = 0; j <=2; j++) {
            if (grid[i][j] < 0) {
                return;
            }
        }
    }
    alert('DRAW');
    window.location.reload(false);
}

function reset() {
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

reset();