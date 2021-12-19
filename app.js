const canvas=document.getElementById("playScreen");
const ctx=canvas.getContext("2d");
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

const baseVar ={
    x: 0,
    y: 0,
    dx: 2,
    dy: -1,

    sink: true,

    grid: [ [2, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
            [1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 1, 0, 3],
            [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],]
}

start();
// this function would only be called once at the start
function start(){
    document.addEventListener("keydown", playerCtrlPressed);
    document.addEventListener("keyup", playerCtrlReleased);
    setInterval(() => {draw()}, 10);
}

// this function runs once each time frame is refeshed
function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createMaze(baseVar.grid);
    player(baseVar);
}

function playerCtrlPressed(e){
    if(e.keyCode === 39) { // right
        rightPressed = true;
    }
    else if(e.keyCode === 37) { //left
        leftPressed = true;
    }
    else if(e.keyCode === 32) { //left
        spacePressed = true;
    }
}

function playerCtrlReleased(e){
    console.log(e);
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
/*     else if(e.keyCode === 32) { //left
        spacePressed = false;
    } */
}

function createBlock(cellNum, x, y, cellType){
    const cellLength = canvas.width / cellNum;

    //must set colour before drawing cell
    if (cellType === 0){
        ctx.fillStyle = 'rgb(255, 255, 255)';
    }
    else if (cellType === 2){
        ctx.fillStyle = 'rgb(0, 0, 255)';
    }
    else if (cellType === 3){
        ctx.fillStyle = 'rgb(255, 0, 0)';
    }
    else{
        ctx.fillStyle = 'rgb(0, 0, 0)';
    }
    ctx.fillRect(x*cellLength, y*cellLength, cellLength, cellLength);

    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
}

function createMaze(grid){
    ctx.beginPath();
    //number of cells in a row and in a column: can change to 2 diff values later
    const cellNum = 10 
    for(let x = 0; x < cellNum; x++){
        for(let y = 0; y < cellNum; y++){
            let cellType = grid[y][x];
            createBlock(cellNum, x, y, cellType);
        }
    }
    
    ctx.closePath();
    

}

function player(baseVar){
    const cellNum = 10
    const playerSize = canvas.width / cellNum - 1;
    let x = baseVar.x;
    let y = baseVar.y;
    let dx = baseVar.dx;
    let dy = baseVar.dy;
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 255, 0)'
    ctx.fillRect(x, y, playerSize, playerSize);
    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
    ctx.closePath();

    //player movement 
    if(y + dy < 0) {
        dy = 0;
    }
    if(y + dy > (canvas.height - playerSize)) {
        dy = 0;
    }

    if (rightPressed) {
       baseVar.x += dx; 
    }
    else if(leftPressed){
        baseVar.x -= dx;
    }
    else if (spacePressed){

        baseVar.dy = -baseVar.dy;
        console.log(baseVar.dy);
        spacePressed = false;
    }
    baseVar.y += dy;



    
}

function playerMovement(){

}