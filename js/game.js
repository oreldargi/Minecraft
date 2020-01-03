const colNum = 25;
const rowNum = 25;

let currentTool = "axe";
let currentBlock = "tree";

let boardMatrix = [];

// generates new game board based on table
// and adds all cells to boardMatrix for internal use
function createEmptyMatrix (){
    const matrix = document.createElement('table');
    matrix.align = 'center';
    matrix.style.height = `750px`;
    matrix.style.width = `750px`;
    matrix.border = 0;
    matrix.style.background = "url(./images/sky.jpg)";
    for (let i = 0; i < rowNum; i++) {
        const row = document.createElement('tr');
        row.border = 0;
        matrix.appendChild(row);
        boardMatrix.push([]);
        for (let j = 0; j < colNum; j++) {
            const cell = document.createElement('td');
            cell.classList.add(`cell[${i},${j}]`);
            cell.style.height = `30px`;
            cell.style.width = `30px`;
            cell.border = 0;
            cell.addEventListener("click", cellOnClick);
            row.appendChild(cell);
            boardMatrix[i].push(cell);
        }
    }
    return matrix
}

// changes the state of a cell (the image displayed)
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
        case "leaf":
            cell.style.background = "url(./images/leaf.jpg)";
            break;
        case "empty":
            cell.style.background = null;
            break;
        default:
            cell.style.background = null;
    }
}

// returns the state of the cell based on the current background image
function getState(cell) {
    switch (cell.style.background) {
        case 'url("./images/ground.jpg")':
            return "ground";
        case 'url("./images/rock.jpg")':
            return "rock";
        case 'url("./images/tree.jpg")':
            return "tree";
        case 'url("./images/leaf.jpg")':
            return "leaf";
        default:
            return "empty";
    }
}

// if a tool is chosen and matches the cell type - removes the image from cell
// if block is chosen and cell is empty - puts block image in cell
function cellOnClick(cell) {
    if (getState(cell.target) === "ground" && currentTool === "shovel"){
        setState(cell.target,"empty");
        setCurrentBlock("ground");
        return;
    }

    if (getState(cell.target) === "rock" && currentTool === "pickaxe"){
        setState(cell.target,"empty");
        setCurrentBlock("rock");
        return;
    }

    if (getState(cell.target) === "tree" && currentTool === "axe"){
        setState(cell.target,"empty");
        setCurrentBlock("tree");
        return;
    }

    if (getState(cell.target) === "leaf" && currentTool === "axe"){
        setState(cell.target,"empty");
        setCurrentBlock("leaf");
        return;
    }

    if (getState(cell.target) === "empty" && currentTool === "block" && getState(document.querySelector("#block")) !== "empty") {
        setState(cell.target,currentBlock);
        setState(document.querySelector("#block"),"empty")
    }
}

// sets the current tool
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

// changes the currentBlock var and the image in the block tool
function setCurrentBlock(type){
    currentBlock = type;
    setState(document.querySelector("#block"),type) ;
}

// generates ground in cells
function generateGround(){
    for (let row = 15 ; row < rowNum; row ++) {
        for (let cell=0; cell < colNum; cell ++) {
            setState(boardMatrix[row][cell],"ground")
        }
    }
}

// generates rock in cells
function generateRocks() {
    for (let cell=0; cell < 10; cell ++) {
        let row = 14;
        setState(boardMatrix[row][cell],"rock")
    }
}

// generates tree cells in random location
function generateTree() {
    let treePosition = 10 + Math.floor(Math.random() * (10));

    for (let row = 9 ; row < 15; row ++) {
        let cell = treePosition;
        setState(boardMatrix[row][cell],"tree")
    }

    for (let row = 6 ; row < 9; row ++) {
        for (let cell=treePosition -2 ; cell <= treePosition + 2; cell ++) {
            setState(boardMatrix[row][cell],"leaf")
        }
    }
}

// creates new game board
function createNewGame() {
    document.querySelector(".board").appendChild(createEmptyMatrix());
    generateGround();
    generateRocks();
    generateTree();
}

document.querySelector("#axe").addEventListener("click",toolOnClick);
document.querySelector("#pickaxe").addEventListener("click",toolOnClick);
document.querySelector("#shovel").addEventListener("click",toolOnClick);
document.querySelector("#block").addEventListener("click",toolOnClick);
setState(document.querySelector("#block"),currentBlock);
createNewGame();
