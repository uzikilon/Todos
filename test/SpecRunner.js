require.config({
  baseUrl: "/js/",
  urlArgs: 'cb=' + Math.random(), // cache buster
  packages: {
    'specs': {
      name: 'specs',
      location: '/test/specs'
    } 
  },
  paths: {
    jquery: 'lib/jquery-1.8.0',
    underscore: 'lib/underscore-1.3.3',
    backbone: 'lib/backbone-0.9.2',
    chai: '../test/lib/chai',
    mocha: '../test/lib/mocha',
    sinon: '../test/lib/sinon-1.4.2',
    'backbone.localStorage': 'lib/backbone.localStorage'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    mocha: {
      exports: 'mocha'
    },
    sinon: {
      exports: "sinon"
    }
  }
});

window.store = "TestStore"; // override local storage store name - for testing


// Require libraries
require(['underscore', 'mocha', 'chai', 'sinon'], function(_, mocha, chai, sinon){

  // Chai
  chai.Assertion.includeStack = false;
  expect = chai.expect;
  assert = chai.assert;
  
  // Mocha
  mocha.setup({ui: 'bdd', slow: 500});
  // mocha.setup('bdd');

  var specs = [];
  specs.addSpec = function(spec){
    this.push('../test/specs/' + spec);
  };
    
  specs.addSpec('models/Todo');

  specs.addSpec('views/ClearCompleted');
  specs.addSpec('views/CountView');
  specs.addSpec('views/FooterView');
  specs.addSpec('views/MarkAll');
  specs.addSpec('views/NewTask');
  specs.addSpec('views/TaskList');
  specs.addSpec('views/TaskView');

  // Require base tests before starting
  require(specs, function(){
  // require(specs, function(){
    // Start runner
    mocha.run().globals(['_', '$', 'jQuery', 'Backbone']);
  });

});