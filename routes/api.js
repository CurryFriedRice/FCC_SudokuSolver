'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      
      //console.log(req.body);
      let puzString = req.body.puzzle;
      let coords = req.body.coordinate;
      let gridVal = req.body.value;

      let response;
      //okay so we need to ensure that the data is present
      if( puzString === null || typeof puzString == typeof undefined ||
          coords === null || typeof coords == typeof undefined ||
          gridVal === null || typeof gridVal == typeof undefined
        ) res.json({error: 'Required field(s) missing'});
      else{
        
        response = solver.isValidCoord(coords);
        
        if(response === true) response = solver.isValidValue(gridVal);
        if(response === true) response = solver.validate(puzString);

        let row = coords[0], column = coords[1];
        //console.log(row + " | " + column);
        
        //So the coordinates are valid, the value is valid, and the puzzle is valid
        //Let's try begin trying to place values into the grid
        if(response == true){
          response = {valid :true};
          let failValue = 
          {
            row: solver.checkRowPlacement(puzString, row, column, gridVal),
            col: solver.checkColPlacement(puzString, row, column, gridVal),
            reg: solver.checkRegPlacement(puzString, row, column, gridVal)
          }
          if(failValue.row == false){
            response['valid'] = false;
            if(response['conflict'] === undefined) response['conflict'] = ['row'];
          }
          if(failValue.col == false){
            response['valid'] = false;
            if(response['conflict'] === undefined) response['conflict'] = ['column'];
            else response['conflict'].push('column');
          }
          if(failValue.reg == false){
            response['valid'] = false;
            if(response['conflict'] === undefined) response['conflict'] = ['region'];
            else response['conflict'].push('region');
          }
          
          //Set baseline to the response
          response['puzzle'] = puzString;
          response['coordinate'] = coords;
          response['val'] = gridVal;
        }
          res.json(response);
        
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let response;
      //console.log(req.body);
      let puzString = req.body.puzzle;
      if(puzString === null || typeof puzString == typeof undefined)response = {error: 'Required field missing'};
      else {
      response = solver.validate(puzString);
      //console.log(response);
      //If we find out that this is solvable

      if(response == true){ 
        response = solver.solve(puzString);  
        if(response.includes('.'))response = {puzzle: puzString, error: 'Puzzle cannot be solved' }
        else response = {puzzle: puzString, solution: response }
        //console.log(response);
        }
      }
      res.json(response);
    });
};
