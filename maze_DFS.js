
let mazeSize;

let grid;

let visited ;

let stack = [{currRow: 0, currCol: 0}];

const longestStack = {
    length: 0,
    row: 0,
    col: 0
};

let currRow = 0;
let currCol = 0;


function mazeGenerator(cellNum){
    mazeSize = cellNum;
    grid = [];
    visited = [];
    stack = [{currRow: 0, currCol: 0}];
    longestStack.length = 0;
    longestStack.row = 0;
    longestStack.col = 0;
    currRow = 0;
    currCol = 0;
    startGrid();
    createVisitedList();
    mazeSearch();
    for(let i = 0; i < mazeSize; i++){
    console.log(grid[i].toString()); 
    }
    return grid;
}

function startGrid(){
    for(let row = 0; row < mazeSize; row++){
        let arrRow = [];
        for(let col = 0; col < mazeSize; col++){
            if(row % 2 !== 0 || col % 2 !== 0){
                arrRow[col] = 0;
            }
            else{
                arrRow[col] = 1;
            }
        }
        grid.push(arrRow);
    }

    grid[0][0] = 2;

    console.log(grid);
}

function mazeSearch(){
    console.log("stack length: "+stack.length);
    let direction = Math.floor(Math.random() * 4) ;// 0 is top, 1 is right, 2 is bottom, 3 is left
    let init = direction;
    let add = Math.floor(Math.random() * 2);
    // const top = grid[currRow][currCol - 2];
    // const right = grid[currRow + 2][currCol];
    // const bottom = grid[currRow][currCol + 2];
    // const left = grid[currRow - 2][currCol];
    while(stack.length > 0){

        if((currCol - 2)>= 0 && direction === 0 && visited[currRow][currCol - 2] === 0){
            grid[currRow][currCol - 1] = 1;
            visited[currRow][currCol - 2] = 1;
            currCol -= 2;
            stack.push({currRow, currCol});
            direction = Math.floor(Math.random() * 4);
            init = direction;
            add = Math.floor(Math.random() * 2);
            checkLongest()

        }
        else if((currRow + 2) < mazeSize  && direction === 1 && visited[currRow + 2][currCol] === 0 ){
            grid[currRow + 1][currCol] = 1;
            visited[currRow + 2][currCol] = 1;
            currRow += 2;
            stack.push({currRow, currCol});
            direction = Math.floor(Math.random() * 4);
            init = direction;
            add = Math.floor(Math.random() * 2);
            checkLongest()
        }
        else if((currCol + 2) < mazeSize && direction === 2 && visited[currRow][currCol + 2] === 0){
            grid[currRow][currCol + 1] = 1;
            visited[currRow][currCol + 2] = 1;
            currCol += 2;
            stack.push({currRow, currCol});
            direction = Math.floor(Math.random() * 4);
            init = direction;
            add = Math.floor(Math.random() * 2);
            checkLongest()
        }
        else if((currRow - 2)>= 0 && direction === 3 && visited[currRow - 2][currCol] === 0 ){
            grid[currRow - 1][currCol] = 1;
            visited[currRow - 2][currCol] = 1;
            currRow -= 2;
            stack.push({currRow, currCol});
            direction = Math.floor(Math.random() * 4);
            init = direction;
            add = Math.floor(Math.random() * 2);
            checkLongest()
        }

        else {

            if (add === 0){
                if( ++ direction >= 4){
                    direction = 0;
                }
            }

            else{
                if( -- direction < 0){
                    direction = 3;
                }
            } 
            
            if(direction === init){
                backtrack();
                direction = Math.floor(Math.random() * 4);
                init = direction;
                add = Math.floor(Math.random() * 2);
            }

        }
        
    }
    grid[longestStack.row][longestStack.col] = 3; //set end cell


}

function createVisitedList(){

    for(let row = 0; row < mazeSize; row++){
        let arrRow = [];
        for(let col = 0; col < mazeSize; col++){
            if(row % 2 !== 0 || col % 2 !== 0){
                arrRow[col] = 2;
            }
            else{
                arrRow[col] = 0;
            }
        }
        visited.push(arrRow);
    }

    visited[0][0] = 1;

    //console.log(visited);
}

function backtrack(){
    const currCell = stack.pop();
    currRow = currCell["currRow"];
    currCol = currCell["currCol"];
}

function checkLongest(){
    if(longestStack.length < stack.length){
        longestStack.length = stack.length;
        longestStack.row = currRow;
        longestStack.col = currCol;
    }
}
