const colNum = 25;
const rowNum = 25;

let currentTool = "axe";

let boardMatrix = [];
const matrix1 = {
    col:[],
    row:[],
};

function createEmptyMatrix (row,col){
    const matrix = document.createElement('table');
    matrix.align = 'center';
    matrix.style.height = `750px`;
    matrix.style.width = `750px`;
    for (let i = 0; i < rowNum; i++) {
        const row = document.createElement('tr');
        matrix.appendChild(row);
        boardMatrix.push([]);
        for (let j = 0; j < colNum; j++) {
            const cell = document.createElement('td');
            cell.classList.add(`cell[${i},${j}]`);
            cell.style.height = `30px`;
            cell.style.width = `30px`;
            cell.addEventListener("click", cellOnClick);
            row.appendChild(cell);
            boardMatrix[i].push(cell);
        }
    }
    return matrix
}

function setState(cell, state) {
    switch (state) {
        case "ground":
            cell.style.background = "url(./images/ground.jpg)";
            break;
        case "rock":
            cell.style.background = "url(./images/rock.jpg)";
            break;
        case "tree":
            cell.style.background = "url(./images/tree.jpg)";
            break;
        case "empty":
            cell.style.background = null;
            break;
        default:
            cell.style.background = null;
    }
}

function getState(cell) {
    switch (cell.style.background) {
        case 'url("./images/ground.jpg")':
            return "ground";
        case 'url("./images/rock.jpg")':
            return "rock";
        case 'url("./images/tree.jpg")':
            return "tree";
        default:
            return null;
    }
}

function cellOnClick(cell) {
    if (getState(cell.target) === "ground" && currentTool === "shovel"){
        setState(cell.target,"empty");
        return;
    }

    if (getState(cell.target) === "rock" && currentTool === "pickaxe"){
        setState(cell.target,"empty");
        return;
    }

    if (getState(cell.target) === "tree" && currentTool === "axe"){
        setState(cell.target,"empty");
        return;
    }
}

function toolOnClick(tool){
    switch (tool.target.id) {
        case "axe":
            console.log("axe");
            currentTool = "axe";
            break;
        case "pickaxe":
            console.log("pickaxe");
            currentTool = "pickaxe";
            break;
        case "shovel":
            console.log("shovel");
            currentTool = "shovel";
            break;
        case "block":
            console.log("block");
            currentTool = "block";
            break;
    }
}

let matrix = createEmptyMatrix();
matrix.style.background = "url(./images/sky.jpg)";
document.querySelector(".board").appendChild(matrix);

for (let row = 15 ; row < rowNum; row ++) {
    for (let cell=0; cell < colNum; cell ++) {
        setState(boardMatrix[row][cell],"ground")
    }
}

for (let row = 9 ; row < 15; row ++) {
    let cell = 20;
    setState(boardMatrix[row][cell],"tree")
}

for (let cell=0; cell < 10; cell ++) {
    let row = 14;
    setState(boardMatrix[row][cell],"rock")
}


document.querySelector("#axe").addEventListener("click",toolOnClick);
document.querySelector("#pickaxe").addEventListener("click",toolOnClick);
document.querySelector("#shovel").addEventListener("click",toolOnClick);
document.querySelector("#block").addEventListener("click",toolOnClick);
