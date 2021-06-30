    const getRow = function(letter)
    {
    switch(letter.toUpperCase()){
      case 'A': return 0;
      case 'B': return 1;
      case 'C': return 2;
      case 'D': return 3;
      case 'E': return 4;
      case 'F': return 5;
      case 'G': return 6;
      case 'H': return 7;
      case 'I': return 8;
      default:  return -1;
      }
    }
    const getColumn = function(number){
      let normalNum = number -1;
      if(normalNum < 0) return -100;
      else return normalNum;
      
    }


    const indexToCoord = function(index){
      let retVal = {x: -1, y: -1};
      retVal['x'] = index % 9 + 1;
      retVal['y'] = numToLetter(index);
      return retVal;
    
      function numToLetter(input/9){
      switch(input){
        case 0: return 'A';
        case 1: return 'B';
        case 2: return 'C';
        case 3: return 'D';
        case 4: return 'E';
        case 5: return 'F';
        case 6: return 'G';
        case 7: return 'H';
        case 8: return 'I';
        default:  return -1;
      }
      }
    }
    
    const updatePuzzleString = function(puzzle, index, number)
    {
      if(index > puzzle.length - 1 ) return puzzle;
      return puzzle.substring(0,index) + number + puzzle.substring(index+1);
    }
class SudokuSolver {

  validate(puzzleString) {
      /*if(puzzleString === null){
        console.log("Puzzle is null")
        return 3;
      }
      else*/ if(puzzleString.length != 81) 
      {
        console.log("Puzzle String is an incorrect length");
        return { error: 'Expected puzzle to be 81 characters long' };
      }
      else if((/([^0-9.])+/g).test(puzzleString)) 
      {
        console.log("Puzzle String contains invalid characters");
        return { error: 'Invalid characters in puzzle' };
      }
      else {
        console.log("this is a valid puzzle String");
        return true;
      }
  }

  isValidCoord(coordinate){
    if(coordinate.length < 2) return { error: 'Invalid coordinate' };
    else if(!/([A-I.])+/.test(coordinate[0]) || !/([0-9.])+/.test(coordinate[1])){ 
      //console.log(!/([A-I.])+/.test(coordinate[0]));
      //console.log(!/([0-9.])+/.test(coordinate[1]));
      return { error: 'Invalid coordinate' };
    }else
    {
      return true;
    }
    
  }

  isValidValue(value){
    if(value <= 9 && value >=0) return true;
    else return { error: 'Invalid value' };
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
    let startingRow = getRow(row);
    let startingCol = getColumn(column);
    let startingPos = startingRow*9 + startingCol;
//    console.log(puzzleString[startingPos]);
//    console.log(value);
    if(puzzleString[startingPos] === value) return true;
    else if(puzzleString[startingPos] != '.') return false;
    else
    {
      let scanRange = puzzleString.slice(startingRow, startingRow+9);
      if(scanRange.includes(value))return false; 
      else return true;
    }
    
    //console.log(location);
    //console.log(puzzleString[location]);
    
    //if(!checkValidPlacement(puzzleString, row, column))return;

  }

  checkColPlacement(puzzleString, row, column, value) {
    let startingRow = getRow(row);
    let startingCol = getColumn(column);
    let startingPos = startingRow*9 + startingCol;
    
//    console.log(puzzleString[startingPos]);
//    console.log(value);
    
    if(puzzleString[startingPos] === value) return true;
    else if(puzzleString[startingPos] != '.') return false;
    else
    {
      let scanRange = '';
      for (let i = 0; i < 9 ; i++)
      {
        scanRange += puzzleString[(startingCol + i*9)];
      }
      console.log(scanRange);
      if(scanRange.includes(value))return false; 
      else return true;
    }
  }

  checkRegPlacement(puzzleString, row, column, value) {
    let startingRow = getRow(row);
    let startingCol = getColumn(column);
    let startingPos = startingRow*9 + startingCol;

     const region = function(coord)
      {
        switch(coord)
        {
          case 0:
          case 1:
          case 2:
            return 0;
          case 3:
          case 4: 
          case 5:
            return 3;
          case 6:
          case 7:
          case 8:
            return 6;
          default:
            return -1;
        }
      }


    if(puzzleString[startingPos] === value) return true;
    else if(puzzleString[startingPos] != '.') return false;
    else
    {
      //console.log("==========");
      let scanRange = '';

      let regRow = region(startingRow);
      let regCol = region(startingCol);      
      //console.log(regRow + " | " + regCol);
      for (let i = regRow; i < regRow+3 ; i++)
      {
        for (let j = regCol; j < regCol+3; j++){
          let item = (i*9 + j);
          //console.log(item);
          scanRange += puzzleString[item];
        }
      }
      //console.log(scanRange);
      if(scanRange.includes(value))return false; 
      else return true;
    }
  }



  solve(puzzleString) {
    
    //console.log("Solving puzzle");
    //console.log(puzzleString);
    if(puzzleString === null) return {error: 'Required field missing'};
    else if (true == false)   return {error: 'Puzzle cannot be solved'};
    else{
      let pString = puzzleStrig;
      //So this should find the first instance of a .
      
      let emptySpace = pString.indexOf('.');
      let coordinates = indexToCoord(emptySpace);
      
      for(let num = 1; num<=9; num++){
        if(isValidSpace()) {}
      }



      return null;
    }
  }
}


module.exports = SudokuSolver;

