         
const canvas=document.getElementById("playScreen");
const ctx=canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height-30;
let dx = -2;
let dy = 0;

function draw(){
    player();
}
setInterval(draw, 10);

function player(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillRect(x, y, 20, 10);
    //ctx.fillStyle = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
    ctx.closePath();
    x += dx;
    y += dy;
}

function playerMovement(){

}