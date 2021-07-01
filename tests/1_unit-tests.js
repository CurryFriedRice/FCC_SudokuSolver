const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {

    test('valid puzzle string of 81 characters', function(done){
    let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let solution ='135762984946381257728459613694517832812936745357824196473298561581673429269145378'; 
      assert.equal(solver.validate(puzzle), true, "Puzzle input was not valid");
      done();
    });

    test('puzzle string with invalid characters (not 1-9 or .)', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....92691A.37.';
      assert.deepEqual(solver.validate(puzzle), { error: 'Invalid characters in puzzle' }, "Puzzle did not contain any invalid Characters");
      done();
    });
    
    test('puzzle string that is not 81 characters in length', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37';
      assert.deepEqual(solver.validate(puzzle),{ error: 'Expected puzzle to be 81 characters long' }, "Puzzle was 81 characters long");
      done();
      
    });
    
    test('valid row placement', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      
      assert.equal(solver.checkRowPlacement(puzzle,"A",4,7),true, 'row placement was invalid');
      done();
    });
    
    test('invalid row placement', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.checkRowPlacement(puzzle,"A",4,5),false, 'row placement was invalid');
      done();
    });
    
    test('valid column placement', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.checkColPlacement(puzzle,"A",4,7),true, 'col placement was valid');
      done();
    });

      test('invalid column placement', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.checkColPlacement(puzzle,"B",4,1),false, 'col placement was valid');
      done();
    });
    
    test('valid region (3x3 grid) placement', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.checkRegPlacement(puzzle, "A", 4, 7),true, 'Regionm placement was valid');
      done();
    });

    test('invalid region (3x3 grid) placement', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      assert.equal(solver.checkRegPlacement(puzzle, "A", 4, 5),false, 'Regionm placement was valid');
      done();
    });

    test('Valid puzzle strings pass the solver', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let solution ='135762984946381257728459613694517832812936745357824196473298561581673429269145378'; 
      assert.equal(solver.solve(puzzle),solution, 'row placement was valid');
      done();
    });

    test('Invalid puzzle strings fail the solver', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914737.';
      assert.equal(solver.solve(puzzle),puzzle, 'row placement was valid');
      done();
    });

    test('Solver returns the expected solution for an incomplete puzzle', function(done){
      let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
      let solution ='135762984946381257728459613694517832812936745357824196473298561581673429269145378'; 

      assert.equal(solver.solve(puzzle),solution, 'row placement was valid');
      done();
    });
  
//End of Tests
});

