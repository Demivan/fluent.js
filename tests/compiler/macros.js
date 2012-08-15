var fs = require('fs');
var Compiler = process.env.L20N_COV
  ? require('../../lib-cov/compiler.js')
  : require('../../lib/compiler.js');

function read(filename) {
  var fixtures = './tests/fixtures/json/';
  return JSON.parse(fs.readFileSync(fixtures + filename)).body;
}

describe('Funky macros', function(){
  var filename = 'macros.json';
  var ast;
  var env = {
    entries: {},
    globals: {}
  };

  before(function() {
    ast = read(filename);
  });

  beforeEach(function() {
    env.entries = {};
    Compiler.compile(ast, env.entries);
  });

  describe('nth Fibonnaci number', function(){
    it('returns 6765 for [20]', function(){
      var value = env.entries['callFib'].toString();
      value.should.equal('6765');
    });
  });
  describe('factorial', function(){
    it('returns 120 for [5]', function(){
      var value = env.entries['callFac'].toString();
      value.should.equal('120');
    });
  });
  describe('logical OR expression', function(){
    it('returns the second operand if the first one is false', function(){
      var value = env.entries['callZeroOrFac'].toString();
      value.should.equal('120');
    });
  });
});
