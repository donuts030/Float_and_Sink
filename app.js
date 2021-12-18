const canvas=document.getElementById("playScreen");
const ctx=canvas.getContext("2d");

start();
// this function would only be called once at the start
function start(){
    const baseVar ={
        x: canvas.width/2,
        y: canvas.height-30,
        dx: 0,
        dy: -2,

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



    setInterval(() => {draw(baseVar)}, 10);
}

// this function runs once each time frame is refeshed
function draw(baseVar){
    //player();
    createMaze(baseVar.grid);
}

class block{
    
}

function createBlock(cellNum, x, y, cellType){
    const cellLength = canvas.width / cellNum;
    if (cellType === 0){
        ctx.fillStyle = 'rgb(0, 0, 0)';
    }
    else{
        ctx.fillStyle = 'rgb(255, 255, 255)'
    }
    ctx.fillRect(x*cellLength, y*cellLength, cellLength, cellLength);

    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
}

function createMaze(grid){
    ctx.beginPath();
    const cellNum = 10 //number of cells in a row and in a column
    for(let x = 0; x < cellNum; x++){
        for(let y = 0; y < cellNum; y++){
            let cellType = grid[y][x];
            createBlock(cellNum, x, y, cellType);
        }
    }
    
    ctx.closePath();
    

}

function player(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillRect(x, y, 20, 10);
    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
    ctx.closePath();
    x += dx;
    y += dy;

    if(y + dy < 0) {
        dy = -dy;
    }
    
}

function playerMovement(){

}