//import {mazeGenerator} from "./maze_DFS.js";

const canvas=document.getElementById("playScreen");
const ctx=canvas.getContext("2d");
let interval = null;
let started = false;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
const xSpeed = 2;
const ySpeed = 2;
const baseVar ={
    x: 1,
    y: 1,

    dy: ySpeed,
    
    sink: true,

    //number of cells in a row and in a column: can change to 2 diff values later
    cellNum: 20,

    grid: [ [2, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
            [0, 0, 1, 0, 0, 1, 0, 1, 0, 3],
            [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 0, 0, 1, 0, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0],]
}


let cellLength;
let playerSize;

document.addEventListener("keydown", playerCtrlPressed);
document.addEventListener("keyup", playerCtrlReleased);
document.getElementById("submit").addEventListener("click", inputMapSize);

function inputMapSize(){
    const inputSize = document.getElementById("input-box").value;
    if(inputSize <= 100){
        if(started === false){
            baseVar.cellNum = inputSize;
        }
        else{
            baseVar.cellNum = inputSize;
            clearInterval(interval);
            start();
        }
    }
    else alert("Maze size cannot be larger than 100!");

}

// this function would only be called once at the start
function start(){ 
    cellLength = canvas.width / baseVar.cellNum;
    playerSize = canvas.width / baseVar.cellNum - 1;
    baseVar.grid = mazeGenerator(baseVar.cellNum); 
    baseVar.x = 0;
    baseVar.y = 0;
    document.getElementById("complete").style.display = "none";
    interval = setInterval(() => {draw()}, 10);

}

// this function runs once each time frame is refeshed
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createMaze(baseVar.grid);
    player();
}

function playerCtrlPressed(e){
    if(e.keyCode === 39) { // right
        rightPressed = true;
    }
    else if(e.keyCode === 37) { //left
        leftPressed = true;
    }
    else if(e.keyCode === 32) { //left
        e.preventDefault();
        console.log("pressed space");
        spacePressed = true;
        if(started === false){
            document.getElementById("startscreen").style.display = "none";
            started = true;
            document.querySelector("canvas").style.display = "block";
            start();
        }
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
}


function createMaze(grid){
    ctx.beginPath();
    for(let x = 0; x < baseVar.cellNum; x++){
        for(let y = 0; y < baseVar.cellNum; y++){
            let cellType = grid[y][x];
            createBlock(x, y, cellType);
        }
    }
    
    ctx.closePath();
    
}

function createBlock(x, y, cellType){

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

}



function player(){
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 255, 0)'
    ctx.fillRect(baseVar.x, baseVar.y, playerSize, playerSize);
    ctx.closePath();
    //player movement 
    playerMovement();
}

function collisionDetection(tempPlayerX, tempPlayerY){
    const playerWidth = playerSize;
    const playerHeight = playerWidth;
    let collided = false
    for(let col = 0; col < baseVar.cellNum; col++){
        for(let row = 0; row < baseVar.cellNum; row++){
            
            let gridX = col * cellLength;
            let gridY = row * cellLength;

            if (baseVar.grid[row][col] === 0) {
                //check if collided with player
                if ((Math.abs(gridX - tempPlayerX) < playerWidth) 
                    && (Math.abs(gridY - tempPlayerY) < playerHeight )){
            
                    collided = true;

                }
            }
            else if(baseVar.grid[row][col] === 3){
                if ((Math.abs(gridX - tempPlayerX) < 2) 
                    && (Math.abs(gridY - tempPlayerY) < 2 )){

                    console.log("you finished! congrats!");
                    document.getElementById("complete").style.display = "block";
                    clearInterval(interval);
                    started = false;

                }    
            }
        }
    }
    return collided;
}


function playerMovement(){

    let dx = xSpeed;
    let dy = baseVar.dy;
    let tempPlayerX = baseVar.x;
    let tempPlayerY = baseVar.y;

    let col = Math.floor(baseVar.x/ cellLength);
    let row = Math.floor(baseVar.y / cellLength);


    if (rightPressed) {
        if((baseVar.x + dx + playerSize) > canvas.width){
            dx = 0;
        }
        if(col >= (baseVar.cellNum - 1)){
            dx = 0
        }

        tempPlayerX += dx;
        if (collisionDetection(tempPlayerX, tempPlayerY) === false) {
            baseVar.x = tempPlayerX;
        }
    }
    else if(leftPressed){
        if(baseVar.x <= 0){
            dx = 0;
        }
        if(col < 0 ){
            dx = 0
        }

        tempPlayerX -= dx;
        if (collisionDetection(tempPlayerX, tempPlayerY) === false) {
            baseVar.x = tempPlayerX;
        }

    }

    else if (spacePressed){

        baseVar.dy = -baseVar.dy;
        spacePressed = false;

    }    

    if(baseVar.dy > 0){
        if(row >= (baseVar.cellNum - 1)){
            dy = 0;
        }
    }
    else{
        if(baseVar.y <= 0){
            dy = 0;
        }
    }
    tempPlayerY += dy;
    if (collisionDetection(tempPlayerX, tempPlayerY) === false) {
        baseVar.y = tempPlayerY;
    }
    

}
