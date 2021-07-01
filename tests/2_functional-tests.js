const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    let constPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let constSolution ='135762984946381257728459613694517832812936745357824196473298561581673429269145378'; 
  suite('Post Requests', () =>{
  test("Solve a puzzle with valid puzzle string: POST request to /api/solve",function(done){
    let formData = {puzzle: constPuzzle};
    chai
      .request(server)
      .post("/api/solve")
      .type('form')
      .send(formData)
      .end(function (err, res){
        assert.equal(res.status, 200);
        let retVal = res.body;
        //console.log(res.body);
        //console.log(res.text);
        assert.property(retVal, 'puzzle', "Valid puzzle is not returning 'puzzle' value");
        assert.property(retVal, 'solution', "Valid puzzle is not returning 'solution' value");
        done();
      });
  });  

  test("Solve a puzzle with missing puzzle string: POST request to /api/solve",function(done){
    
    chai
      .request(server)
      .post("/api/solve")
      .type('form')
      .send()
      .end(function (err, res){
        assert.equal(res.status, 200);
        let retVal = res.body;
        //console.log(res.body);
        //console.log(res.text);
        assert.deepEqual(retVal, {error: 'Required field missing'}, "Valid puzzle is not returning 'puzzle' value");
        done();
      });
  });

  test("Solve a puzzle with invalid characters: POST request to /api/solve",function(done){
       let formData = {puzzle: '1A5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'};
      chai
      .request(server)
      .post("/api/solve")
      .type('form')
      .send(formData)
      .end(function (err, res){
        assert.equal(res.status, 200);
        let retVal = res.body;
        //console.log(res.body);
        //console.log(res.text);
        assert.deepEqual(retVal,{ error: 'Invalid characters in puzzle' }, "Valid puzzle is not returning 'puzzle' value");
        done();
      });
  });

  test("Solve a puzzle with incorrect length: POST request to /api/solve",function(done){
       let formData = {puzzle: '..5.1.85.4....2432......11..69.83.9.....6.62.71...9......1945....4.37.4.3..6..'};
      chai
      .request(server)
      .post("/api/solve")
      .type('form')
      .send(formData)
      .end(function (err, res){
        assert.equal(res.status, 200);
        let retVal = res.body;
        //console.log(res.body);
        //console.log(res.text);
        assert.deepEqual(retVal,{ error: 'Expected puzzle to be 81 characters long' }, "Valid puzzle is not returning 'puzzle' value");
        done();
      });
  });

  test("Solve a puzzle that cannot be solved: POST request to /api/solve",function(done){
      let formData = {puzzle:         '..9..5.1.85.4....2432......11..69.83.9.....6.62.71...9......1945....4.37.4.3..6..'}
      chai
      .request(server)
      .post("/api/solve")
      .type('form')
      .send(formData)
      .end(function (err, res){
        assert.equal(res.status, 200);
        let retVal = res.body;
        //console.log(res.body);
        //console.log(res.text);
        assert.deepEqual(retVal,{puzzle: formData['puzzle'], error: 'Puzzle cannot be solved' }, "Valid puzzle is not returning 'puzzle' value");
        done();
      });
    });
  });

  suite("GET requests", () => {
  test("Check a puzzle placement with all fields: POST request to /api/check",function(done){
      let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'B3',
          value: '6'
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "valid": true, "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "coordinate": "B3", "val": "6" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });

  test("Check a puzzle placement with single placement conflict: POST request to /api/check",function(done){
      let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'A2',
          value: '1'
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "valid": false, "conflict": [ "row" ], "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "coordinate": "A2", "val": "1" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });

  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check",function(done){
        let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'A1',
          value: '1'
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "valid": false, "conflict": [ "row" ,"column"], "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "coordinate": "A1", "val": "1" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });

  test("Check a puzzle placement with all placement conflicts: POST request to /api/check",function(done){
        let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'D2',
          value: '9'
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        //console.log(retVal);
        let compVal = { "valid": false, "conflict": [ "row", "column", "region" ], "puzzle": "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..", "coordinate": "D2", "val": "9" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });

  test("Check a puzzle placement with missing required fields: POST request to /api/check",function(done){
      let formData = 
        {
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "error": "Required field(s) missing"};
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });
  
  test("Check a puzzle placement with invalid characters: POST request to /api/check",function(done){
    let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'L2',
          value: '9 '
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal =  {"error": "Invalid coordinate"};
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });
  

  test("Check a puzzle placement with incorrect length: POST request to /api/check",function(done){
        let formData = 
        {
          puzzle: '5.1.85.4....2432......1...69.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'A2',
          value: '9 '
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "error": "Expected puzzle to be 81 characters long" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });
  
  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check",function(done){
      let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'L2',
          value: '9'
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "error": "Invalid coordinate" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
  });
  
  test("Check a puzzle placement with invalid placement value: POST request to /api/check",function(done){
          let formData = 
        {
          puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
          coordinate: 'A2',
          value: 'A'
        };
      chai
      .request(server)
      .post("/api/check")
      .type('form')
      .send(formData)
      .end(function (err, res){
        let retVal = res.body;
        let compVal = { "error": "Invalid value" };
        assert.deepEqual(retVal, compVal, "The returned value does not match the comparison value");
        done();
      });
    });
  });
});

/*
 chai
      .request(server)
      .post("/api/issues/functionalTests")
      .type('form')
      .send(formData)
      .end(function (err, res){
        //console.log();
        assert.deepEqual(JSON.parse(res.text), formData, "Form Data does not match");
        done();
      });
*/